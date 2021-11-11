# Design on Plenum
Plenum is designed to be a platform for many different applications. It's capable of hosting/administering many different applications. It's currently designed to run in k8s, however nomad, and many other schedulers look very interesting so being platform agnostic is the goal.

# Idea
What is Plenum? Currently it's a platform for you to run your applications without having to deal with the pain of setting all of that kind of crap up. It's like a really advanced boilerplate project for your micro-service applications. It's a bit opinionated; however, that might not be a bad thing. Considering we are shipping products everyday on plenum and refining the processes daily.

## What it looks like under the hood
First, we start with k8s as of right now it's one of the most common container schedulers in the wild, and looks like it's going to be around for a while. Plenum also ships with a service mesh that provides the following:

1. Observability
2. Traffic management
3. Authentication/Authorization
4. System wide metrics

Ultimately, the service mesh consists of two pieces. A control plane and a data plane. The former, takes care of all the managements of the data plane, while the data plane contains all of your services that make up your application.

## Items that I will need to build this
1. K8s cluster
    a. I will have to find a cheap way to spin up and tear down clusters.
2. Design the GitOps process to model the state of your cluster
3. Install istio from a GitOps pipeline
4. Create an application