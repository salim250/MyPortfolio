function sendEmail() {
	var link = "mailto:salimbrahim44@gmail.com"
             + "?subject=" + encodeURIComponent(document.getElementById('subject').value)
             + "&body=" + encodeURIComponent(document.getElementById('message').value)
    ;
    
    window.location.href = link;
}