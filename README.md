# Lightning Charge API example

**API charge Flow**

1. Invoice sent to BTCPayServer
1. redirect / callback urls back to app
1. store order result in db
1. do the things

**requirements:**

1. [btcpayserver](https://github.com/btcpayserver/btcpayserver)

**run**

1. set env vars (see .env.example)
1. run docker-compose
`docker-compose up`
`docker-compose down`

note: see [docker-compose.yml](docker-compose.yml)

**html**

```js
views
  -- index
  -- order
  -- error

```
