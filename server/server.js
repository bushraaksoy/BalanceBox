import 'dotenv/config';
import express from 'express';
import router from './routes/index.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { seedAdmin } from './utils/seedAdmin.js';

const swaggerDocument = YAML.load('./swagger.yaml');
const app = express();
const PORT = process.env.PORT || 3002;

app.set('trust proxy', 1);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
    cors({
        origin: '*',
    })
);
app.use(express.json());
app.use('/api/v1', router);

app.use(express.static('public'));

app.listen(PORT, () => {
    seedAdmin().catch((error) => console.log('Admin seed failed: ', error));
    console.log(`listening on port ${PORT}...`);
});
