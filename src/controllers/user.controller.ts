import { Request, Response } from 'express';
import db from '../database'; // Importe notre BDD

// (GET /users) Récupérer tous les utilisateurs
export const getUsers = (req: Request, res: Response) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ users: rows });
  });
};

// (POST /users) Ajouter un utilisateur
export const addUser = (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Nom et email requis" });
  }

  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.run(sql, [name, email], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // 'this.lastID' est l'ID de l'utilisateur qui vient d'être créé
    res.json({ message: "Utilisateur ajouté avec succès!", id: this.lastID });
  });
};

// (GET /users/:id) Récupérer un utilisateur spécifique
export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = "SELECT * FROM users WHERE id = ?";

  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    } else {
      res.json({ user: row });
    }
  });
};

// (PUT /users/:id) Mettre à jour un utilisateur
export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Nom et email requis" });
  }

  const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  db.run(sql, [name, email, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    } else {
      res.json({ message: "Utilisateur mis à jour avec succès" });
    }
  });
};

// (DELETE /users/:id) Supprimer un utilisateur
export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    } else {
      res.json({ message: "Utilisateur supprimé avec succès" });
    }
  });
};