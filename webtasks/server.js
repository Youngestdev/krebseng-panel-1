const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const firebaseAdmin = require('firebase-admin');
const path = require('path');

const app = express();
app.use(cors());
app.use('/', express.static(path.join(__dirname, 'public')));

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://krebseng.auth0.com/.well-known/jwks.json`
  }),
  audience: 'https://www.krebseng.com.br',
  issuer: `https://krebseng.auth0.com/`,
  algorithm: 'RS256'
});

app.get('/firebase', jwtCheck, async (req, res) => {
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_ADMIN_TOKEN || req.webtaskContext.secrets.FIREBASE_ADMIN_TOKEN
  );

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  });

  const {sub: uid} = req.user;

  try {
    const firebaseToken = await firebaseAdmin.auth().createCustomToken(uid);
    res.json({firebaseToken});
  } catch (err) {
    res.status(500).send({
      message: 'Something went wrong acquiring a Firebase token.',
      error: err
    });
  }
});

module.exports = app;
