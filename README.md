# Lightning Charge API example

**API charge Flow**

1. Invoice sent to BTCPayServer
1. redirect / callback urls back to app
1. store order result in db
1. do the things

**Prerequisites:**

1. [btcpayserver](https://github.com/btcpayserver/btcpayserver)
1. domain name
1. docker
1. docker-compose


**How to Use**

1. Clone this repository:
1. Make a copy of our .env.sample and rename it to .env:
Update this file with your preferences.
1. register A name with dns
  ![dns](assets/dns_setup.png)

```

APP_PORT=4321
APP_SECRET=super_secret_sauce
NODE_ENV=development
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password
DB_NAME="btcstore"
MONGO_URI=mongodb://admin:password@db/admin


```
1. run / stop / restart

`bash run.sh`
`bash stop.sh`
`bash restart.sh`

note: see [docker-compose.yml](docker-compose.yml)

**html**

```js
views
  -- index
  -- order
  -- error

```
