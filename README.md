![github](https://raw.githubusercontent.com/D3Ext/aesthetic-wallpapers/main/images/chill.gif)

## Getting Started

first you must clone this project

```bash
$ git clone https://github.com/rulanugrh/phabos
```

after that, don't forget to copy file `.env.example` to `.env`

```bash
$ cp .env.example .env
# edit file, you must login to https://tripay.co.id for get api key
```

you must download your `key.json` from [firestore](https://console.firebase.google.com/u/0/project/project-freelance-a/settings/serviceaccounts/adminsdk) and copy into folder `config`, last one you can install package and running this project

```bash
$ npm i
$ npm run dev # for development
$ npm run build && npm run start # for production
```

if you have docker you can install with this command

```bash
$ docker compose up -d .
```

<a name="documentation-top"></a>

## Documentation API

This contain all documentation about API default port in `http://ip:3000` :

- [Public](#public)
    - [Register](#user-register)
    - [Login](#user-login)
    - [Callback Tripay](#callback-tripay)
- [Admin](#admin)
    - [Product Register](#product-register)
    - [Product Update](#product-update)
    - [Product Delete](#product-delete)
    - [Product Count](#product-count)
    - [User Count](#user-count)
    - [Order Get All](#order-get-all)
    - [Order Get Total Income](#order-total-income)
    - [Order Get Today Income](#order-today-income)
    - [Order Accept](#accept-order)
    - [Get All Topup](#get-all-topup-by-admin)
    - [Send Product](#send-product)
- [Member / User](#member--user)
    - [GetMe](#get-user)
    - [Update Password](#update-password)
    - [Product Get All](#get-all-product)
    - [Product Get By ID](#get-product-by-id)
    - [Product By Name](#get-product-by-name)
    - [Order Register](#create-order-request)
    - [History Order](#get-all-order-by-userid)
    - [Get Order By ID](#get-order-by-id)
    - [Cancel Order](#cancel-order-by-id)
    - [Topup Request](#topup-register)
    - [Topup Get All](#get-all-order-by-userid)
    - [Topup Get By ID](#get-topup-by-id)
    - [Count Bonus](#count-bonus)

### Public

#### User Register

```http
POST /api/auth/register
```

- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
- Body:

```json
{
    "name": "string, required",
    "email": "string, required",
    "password": "string, min 8",
    "phone_number": "string, required"
}
```

- Response

```json
{
    "code": "number",
    "msg": "string",
    "data": {
        "name": "string",
        "email": "string"
    }
}
```

#### User Login

```http
POST /api/auth/login
```

- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
- Body:

```json
{
    "email": "string, required",
    "password": "string, requird"
}
```

- Response

```json
{
    "code": "number",
    "msg": "string",
    "data": {
        "token": "string",
        "name": "string"
    }
}
```

#### Callback Tripay

```http
POST /api/tripay/callback
```

- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
- Response:

```json
{
    "code": "number",
    "msg": "string"
}
```

### Admin
Required `Authorization` header and this is must valid email in `.env` file

#### Product Register
```http
POST /api/product/register
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`
- Body: 
```json
{
    "name": "string",
    "description": "string",
    "price": "number, min 10000",
    "process": "string",
    "stock": "number, min 1"
}
```
- Response:

```json
{
    "code": "number",
    "msg": "string",
    "data": {
        "product_name": "string",
        "process": "string",
        "price": "number",
        "stock": "number",
        "category": "string"
    }
}
```
#### Product Update
```http
PUT /api/product/update/:id
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`
- Parameter:
  - id: `string`
- Body: 
```json
{
    "name": "string",
    "description": "string",
    "price": "number, min 10000",
    "process": "string",
    "stock": "number, min 1"
}
```
- Response:

```json
{
    "code": "number",
    "msg": "string",
    "data": {
        "product_name": "string",
        "process": "string",
        "price": "number",
        "stock": "number",
        "category": "string"
    }
}
```
#### Product Delete
```http
DELETE /api/product/delete/:id
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`
- Parameter:
  - id: `string`

- Response:

```json
{
    "code": "number",
    "msg": "string"
}
```
#### Product Count
```http
GET /api/product/count
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`

- Response:

```json
{
    "code": "number",
    "msg": "string",
    "total_product": "string"
}
```

#### Order Total Income
```http
GET /api/order/income/total
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`

- Response:

```json
{
    "code": "number",
    "msg": "string",
    "total_income": "string"
}
```
#### Order Today Income
```http
GET /api/order/income/today
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`

- Response:

```json
{
    "code": "number",
    "msg": "string",
    "total_income": "string"
}
```
#### Order Get All
```http
GET /api/order/admin/get
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`

- Response:

```json
{
    "code": "number",
    "msg": "string",
    "data": [
        {
            "id": "string",
            "via": "string",
            "user_id": "string",
            "category": "string",
            "product_name": "string",
            "tanggal": "string",
            "status": "string",
            "process": "string",
            "total": "string",
            "checkout_url": "string"
        }
    ]
}
```
#### User Count
```http
GET /api/auth/count
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`

- Response:

```json
{
    "code": "number",
    "msg": "string",
    "total_user": "string"
}
```
#### Accept Order
```http
PUT /api/order/update/status/:id
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`
- Paremeter:
  - id: `string`
- Response:

```json
{
    "code": "number",
    "msg": "string"
}
```
#### Send Product
```http
POST /api/order/send/product/:id
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`
- Paremeter:
  - id: `string` -> order id
- Body:
```json
{
    "expired": "string",
    "account": "string",
    "password": "string",
    "rules": "string"
}
```
- Response:

```json
{
    "code": "number",
    "msg": "string"
}
```
#### Get All Topup By Admin
```http
GET /api/topup/admin/get
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`
- Response:

```json
{
    "code": "number",
    "msg": "string",
    "data": [
      {  
          "id": "string",
          "via": "string",
          "balance": "string",
          "tanggal": "string",
          "status": "string",
          "user_name": "string"
      }
    ]
}
```

### Member / User
Required `Authorization` header you must login first if you want access this page

#### Get User
```http
GET /api/auth/getme
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`

- Response:

```json
{
    "code": "number",
    "msg": "string",
    "data": {
        "_id": "string",
        "name": "string",
        "email": "string",
        "amount": "number"
    }
}
```
#### Update Password
```http
PUT /api/auth/update/password
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`

- Body: 
```json
{
    "password": "string"
}
```
- Response:

```json
{
    "code": "number",
    "msg": "string" 
}
```

#### Get All Product
```http
GET /api/product/
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`

- Response:

```json
{
    "code": "number",
    "msg": "string",
    "data": [
        {
            "id": "string",
            "product_name": "string",
            "process": "string",
            "price": "number",
            "stock": "number",
            "category": "string",
            "description": "string"
        }
    ] 
}
```
#### Get Product By ID
```http
GET /api/product/find/:id
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`
- Parameter
  - id: `string`
- Response:

```json
{
    "code": "number",
    "msg": "string",
    "data": {
        "id": "string",
        "product_name": "string",
        "process": "string",
        "price": "number",
        "stock": "number",
        "category": "string",
        "description": "string"
    }
}
```
#### Get Product By Name
```http
GET /api/product/get?name=string&category=string
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`
- Query
  - name: `string`
  - category: `string`
- Response:

```json
{
    "code": "number",
    "msg": "string",
    "data": [
        {
            "id": "string",
            "product_name": "string",
            "process": "string",
            "price": "number",
            "stock": "number",
            "category": "string",
            "description": "string"
        }
    ]
}
```
#### Count Bonus
```http
GET /api/order/bonus?amount=number
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`
- Query
  - amount: `string`
- Response:

```json
{
    "code": "number",
    "msg": "string",
    "data": "number"
}
```
#### Create Order Request
```http
POST /api/order/register
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`
- Body: 
```json
{
    "product_id": "string",
    "via": "string",
    "jumlah": "number, min 1"
}
```
- Response:

```json
{
    "code": "number",
    "msg": "string",
    "data": {
        "product_name": "string",
        "product_price": "string",
        "quantity": "number",
        "total": "number",
        "checkout_url": "string",
        "status": "string"
    }
}
```
#### Get All Order By UserID
```http
GET /api/order/history
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`
- Response:

```json
{
    "code": "number",
    "msg": "string",
    "data": [
        {
            "id": "string",
            "via": "string",
            "category": "string",
            "product_name": "string",
            "tanggal": "string",
            "status": "string",
            "process": "string",
            "total": "string",
        }
    ]
}
```
#### Get Order By ID
```http
GET /api/order/find/:id
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`
- Paremeter:
  - id: `string`
- Response:

```json
{
    "code": "number",
    "msg": "string",
    "data": {
        "via": "string",
        "order_date": "string",
        "order_status": "string",
        "product_name": "string",
        "product_account": "string",
        "product_price": "string",
        "product_expired": "string",
        "product_rules": "string",
        "product_password": "string",
    }
}
```

#### Cancel Order By ID
```http
DELETE /api/order/cancel/:id
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`
- Paremeter:
  - id: `string`
- Response:

```json
{
    "code": "number",
    "msg": "string"
}
```
#### Get Topup By ID
```http
GET /api/topup/find/:id
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`
- Paremeter:
  - id: `string`
- Response:

```json
{
    "code": "number",
    "msg": "string",
    "data": {
        "id": "string",
        "via": "string",
        "balance": "string",
        "tanggal": "string",
        "status": "string"
    }
}
```
#### History Topup
```http
GET /api/topup/history
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`
- Response:

```json
{
    "code": "number",
    "msg": "string",
    "data": [
      {  
          "id": "string",
          "via": "string",
          "balance": "string",
          "tanggal": "string",
          "status": "string"
      }
    ]
}
```
#### Topup Register
```http
POST /api/topup/register
```
- Header:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `token`

- Body: 
```json
{
    "balance": "number",
    "via": "string"
}
```
- Response:

```json
{
    "code": "number",
    "msg": "string",
    "data": {
      "id": "string",
      "via": "string",
      "balance": "string",
      "checkout_url": "string",
      "status": "string"
    }
}
```

<p align="right">(<a href="#documentation-top">back to documentation</a>)</p>