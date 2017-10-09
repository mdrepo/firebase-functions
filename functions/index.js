const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const request = require('request-promise');
const app = express();

const validateFirebaseIdToken = (req, res, next) => {
	console.log('Check if request is authorized with Firebase ID token');
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
        	'Make sure you authorize your request by providing the following HTTP header:',
            'Authorization: Bearer <Firebase ID Token>',
            'or by passing a "__session" cookie.');
        res.status(403).send('Unauthorized');
        return;
    }

    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    	console.log('Found "Authorization" header');
    	// Read the ID Token from the Authorization header.
    	idToken = req.headers.authorization.split('Bearer ')[1];
    }
    admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
    	console.log('ID Token correctly decoded', decodedIdToken);
    	req.user = decodedIdToken;
    	next();
    }).catch(error => {
    	console.error('Error while verifying Firebase ID token:', error);
    	res.status(403).send('Unauthorized');
    });
};

app.use(validateFirebaseIdToken);
app.get('',(req, res) => {
	res.status(200).send(`${functions.config().api.key}`);
});


exports.app = functions.https.onRequest(app);


