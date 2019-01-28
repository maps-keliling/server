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
2. Body : *(brand is for seller only)*
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

