// firebaseConfig.js
const admin = require('firebase-admin');
const serviceAccount = require('./iot-data-ba10e-firebase-adminsdk-2jqva-23918496b3.json'); // Usa el nombre correcto del archivo JSON

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://iot-data-ba10e.firebaseio.com" // Ajusta esta URL según tu proyecto
});

const firestore = admin.firestore();

module.exports = { firestore };
