const mqtt = require('mqtt')

const host = '127.0.0.1'
const port = '1883'
const clientId = `ifbaccess_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'usuarioteste1',
    password: 'senhateste1',
    reconnectPeriod: 1000,
  })

  const topic = '/arduino/nfc_check'

  console.log("Tentando conectar");
  client.on('connect', () => {
    console.log('Connected')  
    client.subscribe([topic], () => {
      console.log(`Subscribe to topic '${topic}'`)
    })
  })

  client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
    if (payload.toString() === "teste") {
        console.log("Mandando request");
    }
  })