<html lang="en">
	<head>
	    <title>Kinghorn Technical Consulting</title>
	</head>
	
	<body>
	
	    <%@ include file="header.jsp" %>
	    
	    <p>This is where the body of the page goes</p>
	    <p>Your lucky number is <span id="rand"></span></p>
	    
	</body>
	
	<script>
		Ajax.doGet("rand", null, function(response) {
			var rand = document.getElementById("rand");
			rand.innerHTML = response;
		});
	</script>
</html>