<html>
<head>
    <title> Register Received</title>
    <link href="/resources/style/index.css" rel="stylesheet" type="text/css">
</head>
<body>
<h1>Register Received</h1>
<form action="/login" method="post" >
    <p> You registration has been received and need to be approved by an admin.</p>
    <input type="submit" value="Return to Home Page">
    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
</form>
</body>
</html>