function openProject(evt, projectName) {
    var i, tabcontent, tablinks;

    // Hide all tabcontent elements
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove active class from all buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    // Show the current tab and add active class to the button
    document.getElementById(projectName).style.display = "block";
    evt.currentTarget.style.backgroundColor = "#333";
}

// Default open tab
document.getElementsByClassName("tablink")[0].click();
