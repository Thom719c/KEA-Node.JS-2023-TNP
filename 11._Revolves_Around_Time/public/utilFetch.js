/**
 * async fetch, await response.
 * 
 * utilFetch.operationData(endpoint, id, formData, methodType)
 * 1. example of GET (all) → utilFetch.operationData("cars", "", "", "GET")
 * 2. example of GET (one) → utilFetch.operationData("cars/", id, "", "GET")
 * 3. example of PATCH → utilFetch.operationData("cars/", id, formData, "PATCH")
 * 4. example of POST → utilFetch.operationData("cars", "", formData, "POST")
 * 5. example of DELETE → utilFetch.operationData("cars/", id, "", "DELETE")
 * @param {*} endpoint Ex. "/api/cars/" or "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
 * @param {*} id "1" or "/1" if forgot to set "/" last in endpoint
 * @param {*} formData Data that gonna be send
 * @param {*} methodType Ex. "GET", "POST", "PUT", "PATCH" or "DELETE"
 * @returns data
 */
const operationData = async (endpoint, id, formData, methodType) => {
    try {
        let response = await fetch(endpoint + id, methodType === 'GET' ? null : {
            method: methodType,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        let data = await response.json();
        return data;
    } catch (error) {
        // Could not connect, try using the last data, we saved last time we were connected to remote endpoint.
        console.error(`Failed getting data from remote endpoint ${endpoint + id}. ${error}`);
        return null;
    }
}