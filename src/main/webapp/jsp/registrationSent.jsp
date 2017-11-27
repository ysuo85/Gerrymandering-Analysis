<html>
<head>
    <title> Register Received</title>
    <link href="/resources/style/index.css" rel="stylesheet" type="text/css">
</head>
<body>
<h1>Register Received</h1>
<form action="/login" method="post" >
    <p> Your registration has been received, please check your email for a confirmation link.</p>
    <input type="submit" value="Return to Home Page">
    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
</form>
</body>
</html>