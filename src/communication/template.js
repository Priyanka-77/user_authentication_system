exports.emailTemplate = async (name) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our App</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Welcome to Our App!</h2>
        <p>Hi ${name},<p><br>
        <p>Thank you for successfully signing up with us. This is a welcome email to greet you as a new user of our app. Now that you've successfully signed up, kindly log in with your credentials to access the app.</p>
        <p>Thank you!</p>
    </div>
</body>

</html>
`;
};
