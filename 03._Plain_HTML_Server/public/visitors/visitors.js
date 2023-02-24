// /api/visitors

fetch("/api/visitors")
    .then(response => response.json())
    .then(result => {
        updateVisitorCount(result.data);
    });

function updateVisitorCount(visitorCount) {
    const visitorCountDiv = document.getElementById("visitor-count");
    visitorCountDiv.innerText = visitorCount;
}

/* 
    Assignment
    1. When a button is clicked update the visitor count with PUT
    2. and then call update updateVisitor
*/

function writeInVisitorLog() {
    fetch("/api/visitors", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(result => updateVisitorCount(result.data));
}