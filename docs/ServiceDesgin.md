# Application Service Design
There are a few web frameworks for go, that provide a solutions for building micro-services. However, it's really not needed. Go comes with batteries included for building web applications. Let's take at a really good way as to how.

# Application Layers
Layers are different parts of the application that are responsible for one thing, and one thing only. Generally, go micro-services have a transport layer (Rest, GraphQL, RPC), business logic layer, and a persistence layer.

A few concpets needs to be understood about the layered archtecute. Application state and Request state. Application state is our global application state that is loaded once when starting our server. Request state is created whenever a request is made to our server. We will use the term "context" as a name for this per request (or state). Here is a short list of what is contained in each level:

1. Application:
* Config (global application config)
* Store (a connection to our database)
* Cache (any caching connection)

2. Context:
* App (a reference to the global application)
* Store (a reference to our database connection)
* User (a user, if any)
* AccessToken (the user's access token, if any)
* Logger (the logger to use within our context methods, this will have some fields like request_id preset)

3. API:
* App (a reference to the global application)
* Config (api configuration)
* Logger (the logger to use within api requests)

[Reference AAF Engineering](https://aaf.engineering/go-web-application-structure-part-2/)

## Commands
Each service should define a core set of commands that it's capable of performing. For example, "serve" can be used to create a server and make RPC methods available to to an ip address. Another, example of this functionality could be a "test" command where a service can run some integration test's with a server. Some engineers might say this is the responsibility of a QA engineer; however, I think this might be better if the creator actually builds these. 