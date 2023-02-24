/*
Task
Step 1: fecth tanks
Step 2: console log tanks
Bonus: Add them to the div: tanks-wrapper
*/

/*
fetch("/api/tanks")
    .then(response => response.json())
    .then(result => console.log(result)); 
*/

fetch("/api/tanks")
    .then(response => response.json())
    .then(result => {
        const tanksWrapperDiv = document.getElementById("tanks-wrapper");

        result.data.forEach(tank => {
            const tankDiv = document.createElement("div");

            const tankNameP = document.createElement("p");
            tankNameP.innerText = tank.name || "No name";
            tankDiv.appendChild(tankNameP);

            const tankNationalityP = document.createElement("p");
            tankNationalityP.innerText = tank.nationality ? tank.nationality : "No nationality";
            tankDiv.appendChild(tankNationalityP);

            const breakBr = document.createElement("br");
            tankDiv.appendChild(breakBr);

            tanksWrapperDiv.appendChild(tankDiv);
        });
    });



