# Projeto 19 - DrivenPass API

A project designed with Typescript to manage credentials, cards data, notes and Wi-Fi passwords.


<p align="center">
  <img  src="./assets/lock.png" height=290px>
</p>
<h1 align="center">
  DrivenPass
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Description

DrivenPass simulates an API that manages credentials, cards data, notes and Wi-Fi passwords in a safe way.

</br>

## Features

-   Store, show or delete credentials of websites
-   Create, show or delete security notes
-   Store, show or delete cards data
-   Store, show or delete Wi-Fi credentials 

</br>

## API Reference

### Create an account

```http
POST /signup
```

#### Request:

| Body         | Type     | Description                              |
| :------------| :------- | :--------------------------------------- |
| `email` | `string`| **Required**. e-mail                    |
| `password`       | `string` | **Required**. password       |

`password must be at least 10 characters long`

####

#

### Login

```http
POST /login
```

#### Request:

| Body         | Type     | Description                              |
| :------------| :------- | :--------------------------------------- |
| `email` | `string`| **Required**. e-mail                    |
| `password`       | `string` | **Required**. password       |

Response:
```json
{
	"token": "iIsInR5cCI6Ik.jE2NjMwMDg2NTF9.36UsZxcxCFpecWo"
}
```
`Note: The token expires in 1 day.`
####

#

### Store a credential

```http
POST /credentials
```

#### Request:

| Body         | Type     | Description                              |
| :------------| :------- | :--------------------------------------- |
| `url` | `string`| **Required**. url of website                    |
| `username`       | `string` | **Required**. username to login       |
| `password`       | `string` | **Required**. password       |
| `title`       | `string` | **Required**.  credential title       |

`Cannot store two credentials with the same title`

####

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `token` | `string` | **Required**. token |

####

#

### Get credentials

```http
GET /credentials?id=credentialId
```

#### Request:

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `id` | `integer` | **Optional**. credential ID |

`To view all credentials just don't send the query param id`

####

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `token` | `string` | **Required**. token |

####

Response don't sending query param:
```json
{
  [
    {
      "id": 1,
      "title": "title",
      "url": "https://www.github.com/",
      "username": "user",
      "password": "1a2b3c"
    }
  ]
}
```

Response sending query param:
```json
{
  "id": 1,
  "title": "title",
  "url": "https://www.github.com/",
  "username": "user",
  "password": "1a2b3c" 
}
```

#


### Delete credential

```http
Delete /credentials/:id
```

#### Request:

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `id` | `integer` | **Required**. credential ID |

####

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `token` | `string` | **Required**. token |

####

#

### Create security notes

```http
POST /securitynotes
```

#### Request:

| Body         | Type     | Description                              |
| :------------| :------- | :--------------------------------------- |
| `title`       | `string` | **Required**.  security note title       |
| `text`       | `string` | **Required**. text       |

`The title must have a maximum of 50 characters and the text a maximum of 1000 characters.`

####

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `token` | `string` | **Required**. token |


#

### Get security notes

```http
GET /securitynotes?id=noteId
```

#### Request:

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `id` | `integer` | **Optional**. security note ID |

`To view all security notes just don't send the query param id`

Response don't sending query param:
```json
{
  [
    {
      "id": 1,
      "userId": 1,
      "title": "note title",
      "text": "test"
    }
  ]
}
```

Response sending query param:
```json
{
  "id": 1,
  "userId": 1,
  "title": "note title",
  "text": "test"
}
```

#

### Delete security note

```http
DELETE /securitynotess/:id
```

#### Request:

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `id` | `integer` | **Required**. security note ID |

####

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `token` | `string` | **Required**. token |

####

#

### Store a card

```http
POST /cards
```

#### Request:

| Body         | Type     | Description                              |
| :------------| :------- | :--------------------------------------- |
| `title`       | `string` | **Required**. card title       |
| `name`       | `string` | **Required**. cardholder name       |
| `number`       | `string` | **Required**. card number       |
| `cvc`       | `string` | **Required**. card cvc       |
| `password`       | `string` | **Required**. card password       |
| `expirationDate`       | `string` | **Required**. card expiration date       |
| `isVirtual`       | `boolean` | **Required**. specifies if it is virtual card     |
| `type`       | `boolean` | **Required**. card type     |

`expirationDate must be in MM/YY format.`

`type must be credit, debit or credit_and_debit`

####

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `token` | `string` | **Required**. token |


#

### Get cards

```http
GET /cards?id=cardId
```

#### Request:

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `id` | `integer` | **Optional**. security note ID |

`To view all cards just don't send the query param id`

Response don't sending query param:
```json
{
  [
    {
      "id": 1,
      "title": "card 1",
      "number": "1111111111111111",
      "name": "USER NAME",
      "cvc": "111",
      "password": "1111",
      "expirationDate": "11/11",
      "isVirtual": false,
      "type": "credit"
    }
  ]
}
```

Response sending query param:
```json
{
  "id": 1,
      "title": "card 1",
      "number": "1111111111111111",
      "name": "USER NAME",
      "cvc": "111",
      "password": "1111",
      "expirationDate": "11/11",
      "isVirtual": false,
      "type": "credit"
}
```

#

### Delete card

```http
DELETE /cards/:id
```

#### Request:

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `id` | `integer` | **Required**. card ID |

####

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `token` | `string` | **Required**. token |

####

#

### Store a Wi-Fi credential

```http
POST /wifis
```

#### Request:

| Body         | Type     | Description                              |
| :------------| :------- | :---------------------------------------                    |
| `title`       | `string` | **Required**.  title       |
| `name`       | `string` | **Required**. name of Wi-Fi       |
| `password`       | `string` | **Required**. password       |

`password must be at least 4 characters long`

####

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `token` | `string` | **Required**. token |

####

#

### Get Wi-Fis

```http
GET /wifis?id=wifiId
```

#### Request:

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `id` | `integer` | **Optional**. wifi ID |

`To view all Wi-Fis just don't send the query param id`

####

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `token` | `string` | **Required**. token |

####

Response don't sending query param:
```json
{
  [
    {
      "id": 1,
      "title": "my wifi",
      "name": "family",
      "password": "3567asdsa"
    }
  ]
}
```

Response sending query param:
```json
{
  "id": 1,
  "title": "my wifi",
  "name": "family",
  "password": "3567asdsa" 
}
```

#


### Delete Wi-Fi

```http
DELETE /wifis/:id
```

#### Request:

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `id` | `integer` | **Required**. Wi-Fi ID |

####

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `token` | `string` | **Required**. token |

####

#

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file (see .env.example).

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`SHADOW_DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName (note: if you are going to deploy on heroku)`  

`PORT = number #recommended: 5000`

`TOKEN_SECRET_KEY = any string`

`TOKEN_EXPIRES_IN = #recommended: 1d (for more info see jsonwebtoken documentation)`

`CRYPTR_SECRET_KEY = any string`

</br>

## Run Locally

Clone the project

```bash (for SSH)
  git clone git@github.com:danton03/projeto18-valex.git
```

or

```bash (for HTTPS)
  git clone https://github.com/danton03/projeto18-valex.git
```

Go to the project directory

```bash
  cd projeto19-drivenpass/
```

Install dependencies

```bash
  npm install
```

Create database
```bash
  npx prisma migrate --create-db
```

Start the server

```bash
  npm start
```

</br>

## Acknowledgements

-   [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)
-   [Lock Image - rawpixel](https://br.freepik.com/vetores-gratis/ilustracao-de-nuvem-seguranca-icone_2609998.htm#query=lock&position=4&from_view=search)

</br>

## Authors

-   Danton Matheus is a Full Stack Web Development student at Driven Education and engineering academic passionate about technology. 

<br/>

#
