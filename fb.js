const readline = require('readline');
const { firestore } = require('./firebaseConfig'); // Importar la configuración de Firebase Admin SDK
const { collection, addDoc } = require('firebase-admin/firestore');

// Configuración de Firestore
const collectionName = 'iot_data'; // Asegúrate de que este nombre coincida con el de tu colección en Firestore

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const generateRandomData = () => {
    const SerialNumber = Math.floor(Math.random() * 1000) + 1;
    const Device = 'device' + Math.floor(Math.random() * 10);
    const Type = Math.random() > 0.5 ? 'A' : 'B';
    const Activated = Math.random() > 0.5;
    const HeartRate = Math.random() * 100;
    const Temperature = Math.random() * 50;
    const AccelerometerX = Math.random() * 10;
    const AccelerometerY = Math.random() * 10;
    const AccelerometerZ = Math.random() * 10;

    return {
        SerialNumber,
        Device,
        Type,
        Activated,
        HeartRate,
        Temperature,
        AccelerometerX,
        AccelerometerY,
        AccelerometerZ
    };
};

const uploadToFirestore = async (data) => {
    try {
        await firestore.collection(collectionName).add(data);
        console.log('Dato almacenado en Firestore');
    } catch (error) {
        console.error('Error al subir a Firestore:', error);
    }
};

const askForMoreData = () => {
    return new Promise((resolve, reject) => {
        rl.question('¿Desea ingresar más datos? (si/no): ', (answer) => {
            resolve(answer.trim().toLowerCase());
        });
    });
};

const run = async () => {
    try {
        let moreData = true;
        while (moreData) {
            console.log('Generando datos aleatorios...');
            const randomData = generateRandomData();
            console.log('Datos generados:', randomData);

            console.log('Subiendo datos a Firestore...');
            await uploadToFirestore(randomData);

            const answer = await askForMoreData();
            if (answer !== 'si' && answer !== 'sí') {
                moreData = false;
            }

            console.log('Esperando 4 segundos...');
            await new Promise(resolve => setTimeout(resolve, 4000)); // Esperar 4 segundos
        }
    } catch (error) {
        console.error('Ocurrió un error:', error);
    } finally {
        rl.close();
        console.log('Interfaz de lectura cerrada.');
    }
};

run();
