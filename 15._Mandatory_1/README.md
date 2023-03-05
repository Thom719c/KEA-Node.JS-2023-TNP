# **This is stil under construction**
# $\colorbox{orange}{{\color{black}{This is stil under construction}}}$

# Mandatory 1
> For now this is kinda a list for myself to what i should have in the pages.

## 1. Git in terminal
> Commands for add to git, then commit and then push it.
```bash
git add -A
git commit "decscription"
git push
```

## 2. Data types
> ...

## 3. Node.js
> Ways we can start our app

```bash
node app.js
nodemon.cmd "path/app.js"
```
For installing
```bash
npm i
npm install
``` 

example for install express:
```bash
npm i express
```

## Package.json
> ...explaining

## REST API
> How is should be designed

<table>
    <thead>
        <tr>
            <th>HTTP Method</th>
            <th>Endpoint</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>GET</td>
            <td>/cars</td>
            <td>Fetch all cars.</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/cars/<id></td>
            <td>Fetch specific cars id.</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/cars</td>
            <td>Create a new cars.</td>
        </tr>
        <tr>
            <td>PUT</td>
            <td>/cars/<id></td>
            <td>Updates an existing cars by id.</td>
        </tr>
        <tr>
            <td>PATCH</td>
            <td>/cars/<id></td>
            <td>Updates an existing cars by id.</td>
        </tr>
        <tr>
            <td>DELETE</td>
            <td>/cars/<id></td>
            <td>Deletes an existing cars by id.</td>
        </tr>
    </tbody>
</table>

> Understands how to send data with GET requests over HTTP and knows how to do it in Express...


## Clean code
> ...explain why clean code and following code conventions is a great idea.

## Scooping
> always use ```const``` if you can get away with it otherwise use ```let```.

## Functions
> ...

## ...

## Loop method
> map, filter, reduce

## Understands the security need for serving static files and can do it in Express.
> ...

## Fetch request
> ...examples:
```js
fetch("/api/cars")
    .then(response => response.json())
    .then(result => console.log(result));
```
```js
fetch("/api/cars", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(result =>  console.log(result));
```

## Deployment
> [vercel](https://vercel.com/)