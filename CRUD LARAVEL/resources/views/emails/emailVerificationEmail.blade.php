{{-- Email verification --}}
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
    <style>
        /* Style untuk konten email */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            /* padding: 20px; */
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .container-header {
            background-color: #6f42c1;
            padding: 20px;
            text-align: center;
        }

        .container-body {
            padding: 20px;
        }

        h1 {
            color: #fff;
        }

        p {
            color: #666;
        }

        .container-button {
            text-align: center;
            margin-top: 20px;
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #6f42c1;
            color: #fff;
            text-decoration: none;
            border-radius: 3px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="container-header">
            <h1>TRIVIA GAME</h1>
        </div>
        <div class="container-body">
            <p>Halo, {{ $name }}</p>
            <p>
                We are happy to welcome you to our website. We started with a simple
                trivia game. We are glad you joined us on our path to something great.
                We thank you for your interest and hope you enjoy our website.
            </p>
            <p>Best regards, Trivia Game</p>
            <div class="container-button">
                <a href="{{ route('user.verify', $token) }}" class="btn">Click here</a>
            </div>
        </div>
    </div>
</body>

</html>
