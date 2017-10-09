# firebase-functions
firebase functions to store and securely return third party API keys for mobile

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Add firebase project on console.firebase.google.com
Install firebase on your machine. Refer [Firebase functions - get started](https://firebase.google.com/docs/functions/get-started
)
### Installing

1. git clone the project
2. Open project directory, run `firebase login`
3. Run `firebase init project`

firebase will ask you to whether to overwrite package.json and index.js

Select yes for package.json, NO for index.js

```
? File functions/package.json already exists. Overwrite? Yes
✔  Wrote functions/package.json
? File functions/index.js already exists. Overwrite? No
i  Skipping write of functions/index.js
? Do you want to install dependencies with npm now? Yes
```
4. Set API key as firebase environment variable
`firebase functions:config:set api.key=API_KEY api.id=SERVICE_NAME`
5. If you are going test locally, set up runtime environemnts
`firebase functions:config:get > .runtimeconfig.json`


## Running locally

`firebase serve --only functions`

## Deployment

`firebase deploy --only functions`
