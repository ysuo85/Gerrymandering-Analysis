<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Please Login</title>
</head>
<body>
<div>
    <form name="f" action="/login" method="post">
        <fieldset>
            <legend>Please Login</legend>
            <c:if test="${param.error ne null}">
                <div>
                    Invalid username or password.
                </div>
            </c:if>
            <c:if test="${param.logout ne null}">
                <div>
                    You have logged out.
                </div>
            </c:if>
            <label for="username">Username</label>
            <input type="text" id="username" name="username"/>
            <label for="password">Password</label>
            <input type="password" id="password" name="password"/>
            <div>
                <button type="submit" class="btn">Log in</button>
            </div>
        </fieldset>
        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
    </form>
</div>
</body>
</html>