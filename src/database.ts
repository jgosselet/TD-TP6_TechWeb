import sqlite3 from 'sqlite3';

// Ouvre (ou crée) le fichier de base de données
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connecté à la base de données SQLite.');
});

// Crée la table 'users' si elle n'existe pas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error("Erreur lors de la création de la table:", err.message);
    }
  });
});

export default db;