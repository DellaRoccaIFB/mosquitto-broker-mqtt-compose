const mqtt = require('mqtt');

const host = '127.0.0.1';
const port = '1883';
const clientId = `ifbaccess_${Math.random().toString(16).slice(3)}`;

const connectUrl = `mqtt://${host}:${port}`;

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'usuarioteste1',
    password: 'senhateste1',
    reconnectPeriod: 1000,
});

const topic = '/arduino/nfc_check';
const message = String(Math.floor(100000 + Math.random() * 900000));

client.on('connect', async () => {
    console.log('Conectado ao broker');

    try {
         await publishMessage(topic, message)
        console.log("Mensagem enviada");
    } catch (error) {
        console.error('publish error ', error)
    } finally {
        forceDisconnect()
    }
})

function publishMessage(topic, message) {
    return new Promise((resolve, reject) => {
        client.publish(topic, message, { qos: 2, retain: false }, (error) => {
            console.log(`message ${message}`);
            if (error) {
                reject(error)
            } else {
                resolve()
            }
        })
    })
}

function forceDisconnect() {
    client.end(true, () => {
        console.log('Disconnected');
        
    })    
}