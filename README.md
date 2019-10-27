# FET-Wweb
## Before running this application you need to install node.js:

Instructions:

For mac users: https://www.webucator.com/how-to/how-install-nodejs-on-mac.cfm

For windows users: https://www.guru99.com/download-install-node-js.html

## How to run:

```
npm install -g yarn
git clone https://github.com/zijies1/FET-Web.git
cd FET-Web
yarn
yarn start
```

## How to test:

```
yarn test
```

## If your want to test with a local service server download from https://github.com/zijies1/FET-Web-Backend:

Go to root directory, find a file called webpack.config.js and 

comment ```REACT_APP_BACKEND_URL:JSON.stringify("http://35.189.33.72:5000/")```

uncomment ```// REACT_APP_BACKEND_URL:JSON.stringify("http://127.0.0.1:5000/")```
