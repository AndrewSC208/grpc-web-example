# Kubernetes Dashboard

# Competitors:
1. [Dev Space](https://devspace.cloud/)
2. [Git Lab](https://about.gitlab.com/) - Is more devOps process oriented.
3. [Container Ship](https://containership.io/)

__THE PROBLEM__: K8s right now has it's own dashboard that I don't particullarly like. It's geared towards and operator, and not towards an application developer. I think that supporting infastructure with kubernetes is a massive investment for a company to take one. Once you actually sell upper management on being able to use the product you then have to sell a CI/CD pattern, then the interneate supporting infostructure, like service mesh/ no service mesh? How we going to run all of our applications in once cluster, and make it available globally. 

__PRODUCT NAME__, aims to solve that problem. By doing all the hard work for you. It's available two ways by license and installing to your own clusters, so your team can build applications fast. Or, using our managed service and let us do more of the hard work like scaling. If our managed service is used, then we can make sure your application can scale to global size overnight if needed.

## Create an application
* Sign up for an account. You get one free application with limits to how many services you can run. If a pro account is selected we only charge for what you are running and when you are running. That is calculated based on the amount of resources each service in the application is consuming. See pricing for more information. 

Once, you have signed up, create an application. Add details like name, description, public/private (if public, what is the url, cert for https, by default http will not be allowed, however an ip address will be available), production/dev/qa/stage.

Once, the application has been created. You are now ready to start running services in you application. 

__Services:__ Are small atomic workloads that need to be run at any given point, and can horizontally scale(meaning they are stateless), they are also containers that are available in a public/private registry with it's correlating Dockerfile.

Once you find a service that you would like to run, the user is given the option to configure it or, just run with known defaults, and decide if the service will be public or private.
If the user chooses to configure the service, the Dockerfile is read and things like exposed ports, volumes, and environment variables are defined at this point.


Deploy code services, the user can also select, from repo. Where a repository containing a Dockerfile could be used to deploy a service. This would be really cool b/c a user would then be able to take a gitHub project and run it instantaniously. Any program written in any language can be deployed.

When the service has been built, and ready for deployment. The green deploy button will be available. Once the user clicks it the service will be deployed. If the service is public then the service name is added to routing and will be available at http://url/serviceName, or 10.10.1.2:80/serviceName

### Pricing
Resources are selected for each service that is created, and generally thinking about this cost in advance is a smart way to go.
