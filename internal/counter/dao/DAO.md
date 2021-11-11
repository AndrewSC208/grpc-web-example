# DAO (Data Access Object)
Is the class that is responsible for communication with the database. It's the only thing that is allowed to touch the service
collection. In a really big systems or one that uses a different database it's best to have a very clear spearation between
what service can talk to what table/collection. You definatly don't want something setting external messing with the same info.
