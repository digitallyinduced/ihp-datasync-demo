# IHP DataSync Demo

This repo contains a demo app using the early prototype of the IHP DataSync API. The project implements a simple todo app.

The frontend is a react app and can be found in `frontend/`. The backend is built with IHP.

All auth is handled using postgres row level security, so no `accessDeniedUnless` :).

## Start

Start the IHP backend:

```bash
$ ./start
```

You also need to start the react bundler:

```bash
$ make static/app.js -B ESBUILD_FLAGS="--watch" # Will bundle frontend/app.jsx and save it to static/app.js
```

At first start sign up at `http://localhost:8000/NewUser`. Then login at `http://localhost:8000/NewSession`. After that you can access the todo manager.

## IHP Cloud

The demo app is deployed at https://wlulygxcdknebrolshgolktblgapwnxn.ihpapp.com/

You can log in with `demo@digitallyinduced` and the password `demo`.