# Authentication
The problem, every application needs a way for a user to login. Generally in the in web applications a user when logs in is given an access token, that give the web-client or application access to the resource the client is requesting. OpenID connect is the specification that defines how these Access tokens should be issued, created and managed through ou an application. For our application we will be following the best practices of OpenID Connect, and OAuth2 authentication, authorization flows.

To follow the OpenID/OAuth2 specification you will need a few resources in your systems. First, a way to create-clients to talk to properly talk to your OpenID Connect/OAuth2 server. For this application we will be using [hydra](https://github.com/ory/hydra) a very reliable open source OpenID Connect/OAuth2 server that is written in go, and can operate at massive scale. It's very well documented and is a certified server. 

## Basic 5 minutes setup

1. Start the server, sql database, and tracing server.
Tracing server will be available on http://127.0.0.1:16686/search
```shell
docker-compose -f quickstart.yml \
    -f quickstart-postgres.yml \
    up --build
```

2. Create an OAuth2 client
Clients are defined as an application that can talk to the OpenID connect server on behalf of an user. So for example, if I were to create and application call photos, I would need to have a client to talk to the OpenID connect server using that client.
__NOTE:__ Two ports are being used 4444, and 4445. 4444 is for hydra's public api's and 4445 is for its administrative api's. 
```shell
docker-compose -f quickstart.yml exec hydra \
    hydra clients create \
    --endpoint http://127.0.0.1:4445/ \
    --id plenum-web-client \
    --secret secret \
    -g client_credentials
```

3. Client Credential Grant
```shell
docker-compose -f quickstart.yml exec hydra \
    hydra token client \
    --endpoint http://127.0.0.1:4444/ \
    --client-id plenum-web-client \
    --client-secret secret

    # output should be some token the client can use
    5mutmqMsp_CpvvZtFvvbMhSl-sIuEgxcQOkPpaP6tl0.aFv8OktKKjTeFZ87KkBonZsPmDjui8DHpoIhXx0vaB8
```
__Note:__ This can't be used as a full authentication mechanism. Since, it would would not follow the whole OAuth2 authentication flow. Client's are used as a proxy to the user, and do not represent the users verification of a client to a resource. If you want to implement authentication incorrectly use the client only auth.

4. Introspect the token
```shell
docker-compose -f quickstart.yml exec hydra \
    hydra token introspect \
    --endpoint http://127.0.0.1:4445/ \
    --client-id plenum-public-2 \
    --client-secret secret \
    fwAnqBY8pvmD3Sr72TQZSqYeVtGyBWrCtL_QItYEuU0.daRg3Gm7XnuQhgLW3JBkKTms7gNJPzXJlEikoAnDYfA
```

## OAuth 2.0 Authorization code grant
1. Create client
__NOTE:__ You need to add --token-endpoint-auth-method none if your clients are public (such as SPA apps and native apps) because the public clients could not provide client secret.
```shell
docker-compose -f quickstart.yml exec hydra \
    hydra clients create \
    --endpoint http://127.0.0.1:4445 \
    --id plenum-public-2 \
    --secret secret \
    --grant-types authorization_code,refresh_token \
    --response-types code,id_token \
    --scope openid,offline \
    --callbacks http://127.0.0.1:5555/callback
```

2. Start a web application
```shell
docker-compose -f quickstart.yml exec hydra \
    hydra token user \
    --client-id plenum-public-2 \
    --client-secret secret \
    --endpoint http://127.0.0.1:4444/ \
    --port 5555 \
    --scope openid,offline
```

### Authentication Design
This application will follow the public OAuth 2.0 Authorization code grant for users to access their resources. To support this, the following services will be needed.

* Users: A microservice to store user profile information, to allow a user to signup (username, email, and password), reset their password, or username. And, allow a service given the right credentials to check if the user has the correct creds to login.
** SignupUser: contains information for a user to signup for the application.
** ResetPassword: Initiates the flow for a user to reset their password.

* OpenID Connect/OAuth 2.0 server (hydra)
    -> Hydra requires an sql database, we will be using cockroachDB.
    -> I will need to create helm charts to deploy everything to k8s
    -> For now find a way to build, and run bin locally

* A consent application that will perform the OAuth 2.0 Authorization code grant flow.
    -> Login Page (username/email, password)
    -> Consent page, for user to allow consent
    -> Error page
    -> Success redirect

* OAuth JS client to manage the JWT's in the application, when the application is redirected from the consent service
    -> [OAuth 2.0 Client from Mulesoft](https://github.com/mulesoft/js-client-oauth2)
    -> [Another Client](https://github.com/zalando-stups/oauth2-client-js)
    -> [List of OAuth 2.0 Clients](https://oauth.net/code/javascript/)

* Authenticator service: Validate the token on each request
    -> [ORY Authkeeper](https://www.ory.sh/docs/oathkeeper/)

* Permission Server
    -> I need to be able to have some type of permission server
    -> Access control lists
    -> Role based authentication
    -> Role based authentication with context

* OPTIONAL: An admin service to register/manage application clients with hydra in a safe and secure way, and also a way to manage users in the system.

### Alternative Authentication Design
I could use [Dex](https://github.com/dexidp/dex) for OpenID connect authentication. This would allow me to still have users signup with "Google, Facebook, twitter, linkedIn, and Username/Email." The reason why I am considering this is that I really don't want to be in the business of authentication. I think that it's a bad idea. I would like to be in the business of creating applications. 

Steps:
1. Read through all the documentation of dex
2. Work through the example
3. Configure current client
3. Integrate with docker
4. Theme login
5. Theme signup
6. Understand how users are managed


#### HYDRA IMPLEMENTATION
1. Create a network
```shell
$ docker network create hydraguide
```

2. Deploy PostgreSQL
```shell
$ docker run \
  --network hydraguide \
  --name ory-hydra-example--postgres \
  -e POSTGRES_USER=hydra \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=hydra \
  -d postgres:9.6
```

3. Deploy ORY Hydra
```shell
# The system secret can only be set against a fresh database. Key rotation is currently not supported. This
# secret is used to encrypt the database and needs to be set to the same value every time the process (re-)starts.
# You can use /dev/urandom to generate a secret. But make sure that the secret must be the same anytime you define it.
# You could, for example, store the value somewhere.
$ export SECRETS_SYSTEM=$(export LC_CTYPE=C; cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)
#
# Alternatively you can obviously just set a secret:
# $ export SECRETS_SYSTEM=this_needs_to_be_the_same_always_and_also_very_$3cuR3-._

# The database url points us at the postgres instance. This could also be an ephermal in-memory database (`export DSN=memory`)
# or a MySQL URI.
$ export DSN=postgres://hydra:secret@ory-hydra-example--postgres:5432/hydra?sslmode=disable

# Before starting, let's pull the latest ORY Hydra tag from docker.
$ docker pull oryd/hydra:v1.0.0-rc.14

# This command will show you all the environment variables that you can set. Read this carefully.
# It is the equivalent to `hydra help serve`.
$ docker run -it --rm --entrypoint hydra oryd/hydra:v1.0.0-rc.14 help serve

Starts all HTTP/2 APIs and connects to a database backend.
[...]

# ORY Hydra does not do magic, it requires conscious decisions, for example running SQL migrations which is required
# when installing a new version of ORY Hydra, or upgrading an existing installation.
# It is the equivalent to `hydra migrate sql --yes postgres://hydra:secret@ory-hydra-example--postgres:5432/hydra?sslmode=disable`
$ docker run -it --rm \
  --network hydraguide \
  oryd/hydra:v1.0.0-rc.14 \
  migrate sql --yes $DSN

Applying `client` SQL migrations...
[...]
Migration successful!

# Let's run the server (settings explained below):
$ docker run -d \
  --name ory-hydra-example--hydra \
  --network hydraguide \
  -p 9000:4444 \
  -p 9001:4445 \
  -e SECRETS_SYSTEM=$SECRETS_SYSTEM \
  -e DSN=$DSN \
  -e URLS_SELF_ISSUER=https://localhost:9000/ \
  -e URLS_CONSENT=http://localhost:9020/consent \
  -e URLS_LOGIN=http://localhost:9020/login \
  oryd/hydra:v1.0.0-rc.14 serve all

# And check if it's running:
$ docker logs ory-hydra-example--hydra

time="2017-06-29T21:26:26Z" level=info msg="Connecting with postgres://*:*@postgres:5432/hydra?sslmode=disable"
time="2017-06-29T21:26:26Z" level=info msg="Connected to SQL!"
[...]
time="2017-06-29T21:26:34Z" level=info msg="Setting up http server on :4444"
```