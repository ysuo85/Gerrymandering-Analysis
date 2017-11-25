<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    <script type="text/javascript" src="http://netdna.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <link href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"
          type="text/css">
    <link href="http://pingendo.github.io/pingendo-bootstrap/themes/default/bootstrap.css" rel="stylesheet"
          type="text/css">
</head>
<body>
<div class="section">
    <div class="container">
        <div class="row">
            <div class="col-md-12">


                <form class="form-horizontal text-right" role="form" name="f" action="/login" method="post">
                    <fieldset>
                        <legend>Please Login</legend>
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username"/>
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password"/>
                        <div>
                            <button type="submit" class="btn">Log in</button>
                        </div>
                    </fieldset>
                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/></form>

            </div>
        </div>
    </div>
</div>
</body>
</html>