# InginJajan API Documentation


[![Build Status](https://api.travis-ci.org/Automattic/mongoose.svg?branch=master)](https://travis-ci.org/Automattic/mongoose)
<a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/l/vue.svg" alt="License"></a>
<a href="https://app.saucelabs.com/builds/50f8372d79f743a3b25fb6ca4851ca4c"><img src="https://app.saucelabs.com/buildstatus/vuejs" alt="Build Status"></a>

## BaseUrl 

```
  http://35.243.157.0
```

## Register 

1. URL: **/register** | **POST**
2. Body : *(brand property is for seller only)*
    ```json
    {
      "role": "seller",
      "name": "Bang Nugroho",
      "address": "dikosan pokoknya",
      "username": "nugroho123",
      "password": "nugroho123",
      "phone": "085656565656",
      "brand": "Es serut salju kanada" 
    }
    ```
3. Params : -
4. Header: -
5. Status code: 201 | 401
6. response:
    ```json
      {
        "_id": "5c4eb57cd865d8549ff60c5f",
        "name": "Bang Nugroho",
        "phone": "085656565656",
        "address": "dikosan pokoknya",
        "username": "nugroho123",
        "password": "$2a$10$t3Y9JgHVVfpoZ3QV7g/7NOtRA0OckXE90d/En5n7pkIGnrRPEcYUG",
        "role": "seller",
        "shopId": "5c4eb57cd865d8549ff60c5e",
        "__v": 0
      }
    ```

## Login

1. URL: **/login** | **POST**
2. Body : 
    ```json
      {
        "username": "nugroho123",
        "password": "nugroho123"
      }
    ```
3. Params : -
4. Header: -
5. Status code: 200 | 400
6. response:
    ```json
     {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNGViNTdjZDg2NWQ4NTQ5ZmY2MGM1ZiIsIm5hbWUiOiJCYW5nIE51Z3JvaG8iLCJ1c2VybmFtZSI6Im51Z3JvaG8xMjMiLCJpYXQiOjE1NDg2NjgwMTB9.1HIf5mVbeLeKWfjVGQ7RKIupByKHTCujxxNxoXXCFj4",
        "role": "seller"
      }
    ```

## Add Photo Profile

1. URL: **/users/addPhoto** | **POST**
2. Body : 
    ```json
      {
        "file": <YOUR_PHOTO>
      }
    ```
3. Params : -
4. Header: 
  ```json
    {
      "auth": <YOUR_TOKEN>
    }
  ```
5. Status code: 200 | 400
6. response:
    ```json
     {
        "info": "Profile picture has been update",
        "data": {
          "itemList": [],
          "_id": "5c4bf2dd9790652e2d3abc9f",
          "name": "rangga",
          "phone": "081313131313",
          "address": "dikosan pokoknya",
          "username": "rangga321",
          "password": "$2a$10$DnOVY5WJ1Pz3espEz2Z1UOKhhWQt1gfmzhhVX626eSf/4UN8o9pS2",
          "role": "seller",
          "__v": 0,
          "profilePic": "https://storage.googleapis.com/e-commrece/anger.jpg"
        }
      }
    ```

## Add Item

1. URL: **/items** | **POST**
2. Body : 
    ```json
      {
        "name": "Siomay tenggiri genuine",
        "price": 18000,
        "file": <YOUR_PHOTO>
      }
    ```
3. Params : -
4. Header: 
  ```json
    {
      "auth": <YOUR_TOKEN>
    }
  ```
5. Status code: 201 | 401
6. response:
    ```json
     {
        "itemList": [
          {
            "_id": "5c4ebc8a6979475db71c0ac4",
            "name": "Siomay tenggiri genuine",
            "price": 18000,
            "picture": "https://storage.googleapis.com/e-commrece/pempek2.JPG",
            "__v": 0
          }
        ],
        "_id": "5c4eb57cd865d8549ff60c5e",
        "brand": "Es serut salju kanada",
        "__v": 0
      }
    ```

## Find Item from Seller's Login

1. URL: **/items** | **GET**
2. Body : -
3. Params : -
4. Header: 
  ```json
    {
      "auth": <YOUR_TOKEN>
    }
  ```
5. Status code: 200 | 400
6. response:
    ```json
     {
        "itemList": [
          {
            "_id": "5c4ebc8a6979475db71c0ac4",
            "name": "Siomay tenggiri genuine",
            "price": 18000,
            "picture": "https://storage.googleapis.com/e-commrece/pempek2.JPG",
            "__v": 0
          }
        ],
        "_id": "5c4eb57cd865d8549ff60c5e",
        "brand": "Es serut salju kanada",
        "__v": 0
      }
    ```

## Find One Item For Update

1. URL: **/items** | **PUT**
2. Body : 
    ```json
      {
        "name": "Mie Ayam Kalkun",
        "price": 15000,
        "file": <YOUR_PHOTO>
      }
    ```
3. Params : -
4. Header: 
  ```json
    {
      "auth": <YOUR_TOKEN>
    }
  ```
5. Status code: 200 | 400
6. response:
    ```json
     {
        "_id": "5c4eb6d2d865d8549ff60c63",
        "name": "Mie Ayam Kalkun",
        "price": 15000,
        "picture": "https://storage.googleapis.com/e-commrece/mie-ayam.jpg",
        "__v": 0
      }
    ```

## Delete Item

1. URL: **/items/:itemId** | **DELETE**
2. Body : -
    ```
3. Params : -
4. Header: 
  ```json
    {
      "auth": <YOUR_TOKEN>
    }
  ```
5. Status code: 200| 400
6. response:
    ```json
     {
        "_id": "5c4e6955780c371c59584d63",
        "name": "bakso ikan tuna",
        "price": 12000,
        "picture": "https://storage.googleapis.com/e-commrece/baksoikan.jpg",
        "__v": 0
      }
    ```
  
## Seller Detail

1. URL: **/users/:userId** | **GET**
2. Body : -
    ```
3. Params : -
4. Header: 
  ```json
    {
      "auth": <YOUR_TOKEN>
    }
  ```
5. Status code: 200| 400
6. response:
    ```json
     {
      "_id": "5c4eb3edd865d8549ff60c59",
      "name": "Michael sukri",
      "phone": "081313131313",
      "address": "dikosan pokoknya",
      "username": "sukri123",
      "password": "$2a$10$xA2Vx0LdyFrEoW13Y57j8OqIEsBoSRvFRLwYz3TxexWUHkvFxYxkO",
      "role": "seller",
      "shopId": {
        "itemList": [
          {
            "_id": "5c4eb6d2d865d8549ff60c63",
            "name": "Mie Ayam Kalkun",
            "price": 15000,
            "picture": "https://storage.googleapis.com/e-commrece/mie-ayam.jpg",
            "__v": 0
          },
          {
            "_id": "5c4eb7f163e4d7588eeed709",
            "name": "Mie Chicken Dinner",
            "price": 18000,
            "picture": "https://storage.googleapis.com/e-commrece/mie-ayam2.jpg",
            "__v": 0
          }
        ],
        "_id": "5c4eb3edd865d8549ff60c58",
        "brand": "Mie Ayam Kalkun Pondok Beauty",
        "__v": 0
      },
      "__v": 0
    }
    ```