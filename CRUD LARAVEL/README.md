## API EndPoints

### Avatar

#### Get Avatars

-   URL: `/api/avatar`
-   Method: GET
-   Description: Get all avatars
-   Require token: `No`
-   Response

```
{
    "code": 200,
    "data": [
        {
            "id": 1,
            "image_src": "https://res.cloudinary.com/dxirtmo5t/image/upload/v1700031126/Trivia/Avatar/2023-11-15_065204_tampandanberani.jpg",
            "price": 50000,
            "created_at": "2023-11-13T01:57:49.000000Z",
            "updated_at": "2023-11-13T01:57:49.000000Z"
        },
        {
            "id": 2,
            "image_src": "https://res.cloudinary.com/dxirtmo5t/image/upload/v1700033601/Trivia/Avatar/2023-11-15_073309_2090263599_bd7f79ae17_o.jpg",
            "price": 25000,
            "created_at": "2023-11-15T00:33:22.000000Z",
            "updated_at": "2023-11-15T00:33:22.000000Z"
        },
        {
            "id": 3,
            "image_src": "https://res.cloudinary.com/dxirtmo5t/image/upload/v1700126188/Trivia/Avatar/2023-11-16_091621_mrkrabs.jpg",
            "price": 35000,
            "created_at": "2023-11-16T02:16:29.000000Z",
            "updated_at": "2023-11-16T02:16:29.000000Z"
        },
        {
            "id": 4,
            "image_src": "https://res.cloudinary.com/dxirtmo5t/image/upload/v1700140602/Trivia/Avatar/2023-11-16_131618_30244297cf3ee8fa9ee6ad63e3cdae3c.jpg",
            "price": 3000,
            "created_at": "2023-11-16T06:16:43.000000Z",
            "updated_at": "2023-11-16T06:16:43.000000Z"
        }
    ]
}
```

#### Store Avatar

-   URL: `/api/avatar`
-   Method: POST
-   Body: form-data
-   Description: Store avatar
-   Require token: `No`
-   Request:

```
image_src: file,
price: number
```

-   Response

```
{
    "code": 200,
    "message": "Avatar created successfully"
}
```

#### Get Avatar by ID

-   URL: `/api/avatar/:avatarId`
-   Method: GET
-   Description: Get avatar by ID
-   Require token: `No`
-   Response

```
{
    "code": 200,
    "data": {
        "id": 1,
        "image_src": "https://res.cloudinary.com/dxirtmo5t/image/upload/v1700031126/Trivia/Avatar/2023-11-15_065204_tampandanberani.jpg",
        "price": 50000,
        "created_at": "2023-11-13T01:57:49.000000Z",
        "updated_at": "2023-11-13T01:57:49.000000Z"
    }
}
```

#### Get Free Avatars

-   URL: `/api/avatar-free`
-   Method: GET
-   Description: Get free avatars
-   Require token: `No`
-   Response

```
{
    "code": 200,
    "data": [
        {
            "id": 7,
            "image_src": "https://res.cloudinary.com/dxirtmo5t/image/upload/v1700530400/Trivia/Avatar/2023-11-21_083318_plankton.png",
            "price": 0,
            "created_at": "2023-11-21T01:33:21.000000Z",
            "updated_at": "2023-11-21T01:33:21.000000Z"
        },
        {
            "id": 8,
            "image_src": "https://res.cloudinary.com/dxirtmo5t/image/upload/v1700530477/Trivia/Avatar/2023-11-21_083435_sandy.jpg",
            "price": 0,
            "created_at": "2023-11-21T01:34:38.000000Z",
            "updated_at": "2023-11-21T01:34:38.000000Z"
        },
        {
            "id": 9,
            "image_src": "https://res.cloudinary.com/dxirtmo5t/image/upload/v1700530681/Trivia/Avatar/2023-11-21_083759_mrspuff.jpg",
            "price": 0,
            "created_at": "2023-11-21T01:38:02.000000Z",
            "updated_at": "2023-11-21T01:38:02.000000Z"
        },
        {
            "id": 10,
            "image_src": "https://res.cloudinary.com/dxirtmo5t/image/upload/v1700530883/Trivia/Avatar/2023-11-21_084121_Alaskan_Bull_Worm.jpg",
            "price": 0,
            "created_at": "2023-11-21T01:41:24.000000Z",
            "updated_at": "2023-11-21T01:41:24.000000Z"
        }
    ]
}
```

#### Get Paid Avatars

-   URL: `/api/avatar-paid`
-   Method: GET
-   Description: Get paid avatars
-   Require token: `No`
-   Response

```
{
    "code": 200,
    "data": [
        {
            "id": 1,
            "image_src": "https://res.cloudinary.com/dxirtmo5t/image/upload/v1700031126/Trivia/Avatar/2023-11-15_065204_tampandanberani.jpg",
            "price": 50,
            "created_at": "2023-11-14T01:21:54.000000Z",
            "updated_at": "2023-11-21T01:24:15.000000Z"
        },
        {
            "id": 2,
            "image_src": "https://res.cloudinary.com/dxirtmo5t/image/upload/v1699950357/Trivia/Avatar/2023-11-14_082555_2090263599_bd7f79ae17_o.jpg",
            "price": 75,
            "created_at": "2023-11-14T01:25:58.000000Z",
            "updated_at": "2023-11-21T01:24:24.000000Z"
        },
        {
            "id": 3,
            "image_src": "https://res.cloudinary.com/dxirtmo5t/image/upload/v1699954205/Trivia/Avatar/2023-11-14_093003_30244297cf3ee8fa9ee6ad63e3cdae3c.jpg",
            "price": 80,
            "created_at": "2023-11-14T02:30:06.000000Z",
            "updated_at": "2023-11-21T01:24:34.000000Z"
        },
        {
            "id": 4,
            "image_src": "https://res.cloudinary.com/dxirtmo5t/image/upload/v1700028244/Trivia/Avatar/2023-11-15_060402_mrkrabs.jpg",
            "price": 60,
            "created_at": "2023-11-14T23:04:05.000000Z",
            "updated_at": "2023-11-21T01:24:42.000000Z"
        }
    ]
}
```

### User

#### Get Users

-   URL: `/api/user`
-   Method: GET
-   Description: Get all users
-   Require token: `No`
-   Response

```
{
    "code": 200,
    "data": [
        {
            "id": 3,
            "name": "Alif Putra Dewantara",
            "email": "aputradewantara@outlook.com",
            "username": "alifdwt",
            "diamonds": 0,
            "total_points": 0,
            "email_verified_at": "2023-11-22T06:35:57.000000Z",
            "created_at": "2023-11-22T06:17:09.000000Z",
            "updated_at": "2023-11-22T06:35:57.000000Z",
            "current_avatar": 10
        },
        {
            "id": 11,
            "name": "Pyxel",
            "email": "semuanyagratis.oo@gmail.com",
            "username": "Testing123",
            "diamonds": 0,
            "total_points": 0,
            "email_verified_at": null,
            "created_at": "2023-11-23T01:45:30.000000Z",
            "updated_at": "2023-11-23T01:45:30.000000Z",
            "current_avatar": 9
        },
        {
            "id": 12,
            "name": "Tuti Fruti",
            "email": "tutifruti@gmail.com",
            "username": "tutifruti",
            "diamonds": 30,
            "total_points": 50,
            "email_verified_at": null,
            "created_at": "2023-11-23T02:03:56.000000Z",
            "updated_at": "2023-11-23T02:04:52.000000Z",
            "current_avatar": 3
        }
    ]
}
```

#### Store User

-   URL: `/api/user`
-   Method: POST
-   Description: Store user
-   Require token: `No`
-   Header: `Accept: application/json`
-   Request:

```
{
    "name": "Tuti Fruti",
    "email": "tutifruti@gmail.com",
    "username": "tutifruti",
    "password": "12345678" (sometimes),
    "password_confirmation": "12345678" (sometimes),
    "avatar_choices": ["2", "3"] (sometimes),
    "current_avatar": 3,
    "diamonds": 10,
    "total_points": 30
}
```

-   Response

```
{
    "code": 200,
    "message": "User created successfully",
    "data": {
        "name": "Tuti Fruti",
        "email": "tutifruti@gmail.com",
        "username": "tutifruti",
        "current_avatar": 3,
        "diamonds": 10,
        "total_points": 30,
        "updated_at": "2023-11-22T04:06:16.000000Z",
        "created_at": "2023-11-22T04:06:16.000000Z",
        "id": 3
    }
}
```

#### Get User by ID

-   URL: `/api/user/:userId`
-   Method: GET
-   Description: Get user by ID
-   Require token: `No`
-   Response

```
{
    "code": 200,
    "data": {
        "id": 3,
        "name": "Alif Putra Dewantara",
        "email": "aputradewantara@outlook.com",
        "username": "alifdwt",
        "diamonds": 0,
        "total_points": 0,
        "email_verified_at": "2023-11-22T06:35:57.000000Z",
        "created_at": "2023-11-22T06:17:09.000000Z",
        "updated_at": "2023-11-22T06:35:57.000000Z",
        "current_avatar": 10
    }
}
```

#### Update User

-   URL: `/api/user/:userId`
-   Method: PUT
-   Description: Update user
-   Require token: `No`
-   Header: `Accept: application/json`
-   Request:

```
{
    "name": "Tuti Fruti" (sometimes),
    "email": "tutifruti@gmail.com" (sometimes),
    "username": "tutifruti" (sometimes),
    "password": "12345678" (sometimes),
    "password_confirmation": "12345678" (sometimes),
    "avatar_choices": ["2", "3"] (sometimes),
    "current_avatar": 3 (sometimes),
    "diamonds": 10 (sometimes),
    "total_points": 30 (sometimes)
}
```

-   Response

```
{
    "code": 200,
    "message": "User updated successfully",
}
```

### User Avatar

#### Get User Avatars

-   URL: `/api/user-avatar`
-   Method: GET
-   Description: Get user avatars
-   Require token: `No`
-   Response

```
{
    "code": 200,
    "data": [
        {
            "id": 1,
            "user_id": 3,
            "avatar_id": 3,
            "created_at": "2023-11-22T06:17:09.000000Z",
            "updated_at": "2023-11-22T06:17:09.000000Z",
            "avatar": {
                "id": 3,
                "image_src": "https://res.cloudinary.com/dxirtmo5t/image/upload/v1699954205/Trivia/Avatar/2023-11-14_093003_30244297cf3ee8fa9ee6ad63e3cdae3c.jpg"
            }
        },
        {
            "id": 2,
            "user_id": 3,
            "avatar_id": 4,
            "created_at": "2023-11-22T06:17:09.000000Z",
            "updated_at": "2023-11-22T06:17:09.000000Z",
            "avatar": {
                "id": 4,
                "image_src": "https://res.cloudinary.com/dxirtmo5t/image/upload/v1700028244/Trivia/Avatar/2023-11-15_060402_mrkrabs.jpg"
            }
        },
        {
            "id": 3,
            "user_id": 3,
            "avatar_id": 10,
            "created_at": "2023-11-22T06:17:09.000000Z",
            "updated_at": "2023-11-22T06:17:09.000000Z",
            "avatar": {
                "id": 10,
                "image_src": "https://res.cloudinary.com/dxirtmo5t/image/upload/v1700530883/Trivia/Avatar/2023-11-21_084121_Alaskan_Bull_Worm.jpg"
            }
        },
        {
            "id": 4,
            "user_id": 10,
            "avatar_id": 8,
            "created_at": "2023-11-23T01:35:02.000000Z",
            "updated_at": "2023-11-23T01:35:02.000000Z",
            "avatar": {
                "id": 8,
                "image_src": "https://res.cloudinary.com/dxirtmo5t/image/upload/v1700530477/Trivia/Avatar/2023-11-21_083435_sandy.jpg"
            }
        }
    ]
}
```

#### Get User Avatar by ID

-   URL: `/api/user-avatar/:userAvatarId`
-   Method: GET
-   Description: Get user avatar by ID
-   Require token: `No`
-   Response

```
{
    "code": 200,
    "data": {
        "id": 1,
        "user_id": 3,
        "avatar_id": 3,
        "created_at": "2023-11-22T06:17:09.000000Z",
        "updated_at": "2023-11-22T06:17:09.000000Z",
        "avatar": {
            "id": 3,
            "image_src": "https://res.cloudinary.com/dxirtmo5t/image/upload/v1699954205/Trivia/Avatar/2023-11-14_093003_30244297cf3ee8fa9ee6ad63e3cdae3c.jpg"
        }
    }
}
```

### Question

#### Get Questions

-   URL: `/api/question`
-   Method: GET
-   Description: Get all questions
-   Require token: `No`
-   Response

```
{
    "code": 200,
    "data": [
        {
            "id": 1,
            "question": "Apa ibukota Thailand?",
            "answer": "Bangkok",
            "wrong_answer_1": "Hanoi",
            "wrong_answer_2": "Jakarta",
            "wrong_answer_3": "Ho Chi Minh City",
            "created_at": "2023-11-14T07:40:19.000000Z",
            "updated_at": "2023-11-14T07:40:19.000000Z"
        },
        {
            "id": 2,
            "question": "Apa warna Laut Merah?",
            "answer": "Biru",
            "wrong_answer_1": "Merah",
            "wrong_answer_2": "Hijau",
            "wrong_answer_3": "Kuning",
            "created_at": "2023-11-14T07:42:09.000000Z",
            "updated_at": "2023-11-14T07:42:09.000000Z"
        },
        {
            "id": 3,
            "question": "Apa ibu kota Prancis?",
            "answer": "Paris",
            "wrong_answer_1": "Madrid",
            "wrong_answer_2": "Roma",
            "wrong_answer_3": "Berlin",
            "created_at": "2023-11-14T07:50:13.000000Z",
            "updated_at": "2023-11-14T07:50:13.000000Z"
        }
    ]
}
```

#### Get Question by ID

-   URL: `/api/question/:questionId`
-   Method: GET
-   Description: Get question by ID
-   Require token: `No`
-   Response

```
{
    "code": 200,
    "data": {
        "id": 1,
        "question": "Apa ibukota Thailand?",
        "answer": "Bangkok",
        "wrong_answer_1": "Hanoi",
        "wrong_answer_2": "Jakarta",
        "wrong_answer_3": "Ho Chi Minh City",
        "created_at": "2023-11-14T07:40:19.000000Z",
        "updated_at": "2023-11-14T07:40:19.000000Z"
    }
}
```

### Login/Logout

#### Login

-   URL: `/api/login`
-   Method: POST
-   Description: Login
-   Require token: `No`
-   Request:

```
{
    "email": "aputradewantara@outlook.com",
    "password": 12345678
}
```

-   Response

```
{
    "success": true,
    "user": {
        "id": 3,
        "name": "Alif Putra Dewantara",
        "email": "aputradewantara@outlook.com",
        "username": "alifdwt",
        "diamonds": 0,
        "total_points": 0,
        "email_verified_at": "2023-11-22T06:35:57.000000Z",
        "created_at": "2023-11-22T06:17:09.000000Z",
        "updated_at": "2023-11-22T06:35:57.000000Z",
        "current_avatar": 10
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzAxMzI1NjUxLCJleHAiOjE3MDEzMjkyNTEsIm5iZiI6MTcwMTMyNTY1MSwianRpIjoiWmMwMlc2WXZrdlpucWV2cCIsInN1YiI6IjMiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0._apMcrhZnXlF2I-sWZII0Npuz9T8WFH2el3S-DSkmx0"
}
```

#### Check Login

-   URL: `/api/check`
-   Method: GET
-   Description: Check Login
-   Require token: `Yes`
-   Header: `Accept: application/json`, `Content-Type: application/json`, `Authorization: Bearer {token}`
-   Response

```
{
    "id": 3,
    "name": "Alif Putra Dewantara",
    "email": "aputradewantara@outlook.com",
    "username": "alifdwt",
    "diamonds": 0,
    "total_points": 0,
    "email_verified_at": "2023-11-22T06:35:57.000000Z",
    "created_at": "2023-11-22T06:17:09.000000Z",
    "updated_at": "2023-11-22T06:35:57.000000Z",
    "current_avatar": 10
}
```

#### Logout

-   URL: `/api/logout`
-   Method: POST
-   Description: Logout
-   Require token: `Yes`
-   Header: `Accept: application/json`, `Content-Type: application/json`, `Authorization: Bearer {token}`
-   Response

```
{
    "success": true,
    "message": "Successfully logged out"
}
```
