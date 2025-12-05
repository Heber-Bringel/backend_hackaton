import express from 'express';
import bodyParser from 'body-parser'; 
import emailRoutes from './routes/EmailRoutes.js';
import { configDotenv } from 'dotenv';
configDotenv()

const app = express();

// Middleware necessário para Express e Mailgun:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Define a rota base /api e anexa o router de e-mails
app.use('/api', emailRoutes); 

// ... (Configuração de porta e app.listen) ...

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running in port " + PORT);
});