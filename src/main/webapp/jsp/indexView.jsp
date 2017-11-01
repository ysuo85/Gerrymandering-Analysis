<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<body>
<div class="container">
    <h1>This is secured!</h1>
    <p>
        Hello
    </p>
</div>
<form name="f" action="/logout" method="post">
    <c:if test="${not empty pageContext.request.remoteUser}">
        <div>
            <button type="submit" class="btn">Log out</button>
        </div>
    </c:if>
    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
</form>
</body>
