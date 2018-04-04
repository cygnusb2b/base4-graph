# Base4 Graph Server

## Development
Docker (with compose) and Yarn are required to develop this project. To begin, clone the repository and then run `yarn start`. The server is now accessible on `localhost:8937`.

By default, MongoDB will point to `localhost:8412`, so you must copy down the `[account_group]_platform` and `[account_group]_website` databases that you'd like to access. Alternatively, you can connect directly to the production database. To do so, add a `.env` file to the root project directory and override the `BASE4_GRAPH_DSN` environment variable to use the Base Platform production DSN.

## Enviroment Variables
Default variables are already set within the `docker-compose.yml` file, however the following values can be overridden in the `.env` file:
```
NODE_ENV=development # The node environment
BASE4_GRAPH_PORT=8937 # The port that the graph server will listen on
BASE4_GRAPH_DSN=mongodb://mongo:27017 # The MongoDB DSN that the app will connect to
BASE4_GRAPH_DB_PORT=8412 # The port that the MongoDB container will expose - use this to connect locally via Robo, etc.

```
The values listed above are the defaults, and _do not_ need to be set. Only set new values where you want them overridden.

## Making Requsets
You must send a tenant context when making requests. This can be done by setting the `X-Tenant-Key` request header. For example, to query Officer's data, you would send:

```
GET http://localhost:8937/graph?query={ping}
X-Tenant-Key: cygnus_ofcr
```
