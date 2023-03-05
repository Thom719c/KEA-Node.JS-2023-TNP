# **This is stil under construction**
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
### how we startede making our package.json
```json
{
    "dependencies": {
        "KEY/NAME": "VALUE/VERSION"
    }
}
```
Heres what is looks like when we wants express
```json
{
    "dependencies": {
        "express": "4.18.2"
    }
}
```

### how we do it now.
first we run this command
```bash
npm init
```
what this does is:
1. Initializes a new Node.js project by creating a package.json file in the current directory.
2. Asks for information about the project such as the package name, version, description, entry point, test command, repository, keywords, author, and license.
3. Allows you to confirm the information provided or modify it if necessary.
4. Creates the package.json file with the provided information or the default values if you skipped any fields.
5. Sets up the initial project structure and installs any dependencies defined in package.json if using a starter template or a preset configuration.
6. Displays the generated package.json file in the console for review.

The ```npm init``` command is useful for initializing a new project or updating an existing ```package.json``` file with additional fields, as it helps to manage and install dependencies required by your application.

so example how it looks now plus have added type and installed express after:
```json
{
    "name": "mandatory1",
    "version": "0.0.1",
    "description": "Mandatory assignment",
    "type": "module",
    "main": "app.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "repository": {
        "type": "git",
        "url": "git+https://github.com/Thom719c/KEA-Node.JS-2023-TNP.git"
    },
    "keywords": [
        "Mandatory",
        "1",
        "learned",
        "so",
        "fare"
    ],
    "author": "Thom",
    "license": "MIT",
    "bugs": {
        "url": "https://github.com/Thom719c/KEA-Node.JS-2023-TNP/issues"
    },
    "homepage": "https://github.com/Thom719c/KEA-Node.JS-2023-TNP#readme",
    "dependencies": {
        "express": "^4.18.2"
    }
}
```

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