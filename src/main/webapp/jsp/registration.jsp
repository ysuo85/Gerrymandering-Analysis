<html>
    <head>
        <title> Register Account</title>
        <link href="/resources/style/index.css" rel="stylesheet" type="text/css">
    </head>
    <body>
        <h1>Register Account</h1>
        <div class="col-md-12">
        <form action="/registration" method="post">
            <label>Username:</label>
            <input type="text" name="username" required><br><br>
            <label>Password:</label>
            <input type="password" name="password"><br><br>
            <label>Confirm Password:</label>
            <input type="password" name="passwordConfirm"><br><br>
            <input type="submit" value="Registration">
            </form>
        </div>
    </body>
</html>