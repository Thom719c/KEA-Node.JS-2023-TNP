# Mandatory 1
> For now this is kinda a list for myself to what i should have in the pages.

## 1. Git in terminal
> Commands for add to git, then commit and then push it.
```
git add -A
git commit "decscription"
git push
```

## 2. Data types
> ...

## 3. Node.js
> Ways we can start our app

```
node app.js
nodemon.cmd "path/app.js"
```
For installing
```
npm i
npm install
``` 

example for install express:
```
npm i express
```

## REST API
> How is should be designed
0. `HTTP Method     Endpoint        Description`
1. `GET             /cars          Fetch all cars.`
2. `GET             /cars/<id>     Fetch specific cars id.`
3. `POST            /cars          Create a new cars.`
4. `PUT             /cars/<id>     Updates an existing cars by id.`
5. `PATCH           /cars/<id>     Updates an existing cars by id.`
6. `DELETE          /cars/<id>     Deletes an existing cars by id.`

  <table>
    <thead>
      <tr>
        <th>words</th>
        <th>transform to</th>
        <th>keepUpperCase is false</th>
        <th>keepUpperCase is true</th>
      </tr>
    </thead>
    <tbody>
        <tr>
            <td>"XML HTTP request"</td>
            <td>pascalCase</td>
            <td><code>XmlHttpRequest</code></td>
            <td><code>XMLHTTPRequest</code></td>
        </tr>
        <tr>
            <td>"new customer ID"</td>
            <td>camelCase</td>
            <td><code>newCustomerId</code></td>
            <td><code>newCustomerID</code></td>
        </tr>
    </tbody>
  </table>
