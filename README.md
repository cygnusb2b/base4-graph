# Base4 Graph Server

## Development
To begin development, run `yarn start`. **It will read from the production Base4 databases by default**

You must send a tenant context when making requests. This can be done by setting the `X-Tenant-Key` request header. For example, to query Officer's data, you would send:

```
GET /graph?query={ping}
X-Tenant-Key: cygnus_ofcr
```
