/* Request a new page from the Express server */
function getRequest(type) {
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function () {
		if(xhttp.readyState == XMLHttpRequest.DONE) {
			if(xhttp.status == 200) {
				document.open();
				document.write(xhttp.responseText);
				document.close();
			} else {
				alert("Unexpected server response // Refresh Issue")
			}
		}
	}
	if (type == 1) {
		xhttp.open("GET", "../home", true);
	} else if (type == 2) {
		xhttp.open("GET", "../", true);
	} else if (type == 3) {
		xhttp.open("GET", "../about", true);
	}
	xhttp.send();
}