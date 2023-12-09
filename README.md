# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## How to use the app

1. Once the app loads, user has to make an account using the Register Page and then Login with into the App.

2. Once logged in, user can make posts and add comments to the posts available.

3. User can also use the search option to search through all posts and comments and get specific posts and comments.

4. App is shipped with authentication and all internal API calls are JWT protected, which means non-authenticated access is restricted.

## Technology Stack

Front-end client

1. React library for frontend user interface.
2. Redux Toolkit for global state management.
3. Project is made using Vite with Speedy-web-compiler (SWC) integration.
4. Google's Materal UI (MUI) Library is used for user interface components.

Back-end server

1. App is powered by Nodejs.
2. API layer is available using Expressjs.
3. User Authentication is available and password hashing is done through bcryptjs package.
4. User session token is made though json-web-token (JWT) and stored in localstorage.
5. Mongoose ORM is used to create DB models.
6. CORS is implemented to allow requests from authorized front-end production link/origin.

## Deployment

Front-end: [https://kennect-client.vercel.app/](https://kennect-client.vercel.app/)

Back-end: [https://kind-blue-barracuda-hose.cyclic.app/](https://kind-blue-barracuda-hose.cyclic.app/)
