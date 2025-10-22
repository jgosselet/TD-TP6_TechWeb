import './database'; // Cette ligne va exécuter le fichier et connecter la BDD

// Importation des modules nécessaires 
import express, { Request, Response } from 'express'; // Framework Express et types
import * as dotenv from 'dotenv'; // Permet de charger les variables d'environnement
import userRoutes from './routes/user.routes'; // Importe les routes utilisateurs

// Charge les variables d'environnement depuis le fichier .env
dotenv.config();

// Création de l'application Express 
const app = express(); 

// Définition du port (utilise celui de l'environnement ou 3000 par défaut)
const PORT = process.env.PORT || 3000; 

// Middleware pour parser le JSON dans les requêtes entrantes
// Permet à Express d'analyser le corps (body) des requêtes JSON 
app.use(express.json()); 

// Route de test 
app.get('/', (req: Request, res: Response) => { 
  res.send('🚀 API Node.js avec TypeScript fonctionne !'); // Réponse envoyée au client 
});

// Utilisation des routes utilisateurs 
// Toutes les requêtes commençant par /users seront redirigées vers userRoutes 
app.use('/users', userRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`); // Message de confirmation 
});