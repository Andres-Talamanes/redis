import express from 'express';
import cors from 'cors';
import redis from 'redis';

const app = express();
const port = 3000;

// Configura el cliente de Redis
const redisClient = redis.createClient({
    url: 'redis://default:gMyBI7GOB4EonMQNtcjnrhjongoYeIom@redis-11531.c309.us-east-2-1.ec2.redns.redis-cloud.com:11531'
});

redisClient.connect()
    .then(() => console.log('Conectado a Redis'))
    .catch(err => console.error('Error de conexión a Redis:', err));

// Habilitar CORS
app.use(cors());

// Middleware para poder recibir JSON en el cuerpo de las solicitudes
app.use(express.json());


// Endpoint para guardar datos en Redis
app.post('/data', async (req, res) => {
    const { nombre, apellido, correo, edad } = req.body;

    const uniqueKey = `${nombre}:${apellido}`; // Crear una clave única
    console.log(`Guardando datos bajo la clave: ${uniqueKey}`); // Agregar un log para verificar la clave

    try {
        await redisClient.set(uniqueKey, JSON.stringify({ nombre, apellido, correo, edad }));
        res.status(201).json({ message: 'Datos guardados en Redis' });
    } catch (error) {
        console.error('Error al guardar datos en Redis:', error);
        res.status(500).json({ error: 'Error al guardar datos' });
    }
});


// Endpoint para obtener datos de Redis por clave
app.get('/data/:key', async (req, res) => {
    const { key } = req.params;  // La clave es enviada como parámetro en la URL

    try {
        const data = await redisClient.get(key); // Obtener los datos por la clave
        if (data) {
            res.status(200).json(JSON.parse(data)); // Devolver los datos como JSON
        } else {
            res.status(404).json({ message: 'No se encontraron datos para esta clave' });
        }
    } catch (error) {
        console.error('Error al obtener los datos de Redis:', error);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
