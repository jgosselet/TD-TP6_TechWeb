import { Router } from 'express';
// Importe TOUTES les fonctions du contrôleur
import {
  getUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/user.controller';

const router = Router();

// Routes CRUD
router.get('/', getUsers);           // GET /users
router.post('/', addUser);          // POST /users
router.get('/:id', getUserById);    // GET /users/:id
router.put('/:id', updateUser);     // PUT /users/:id
router.delete('/:id', deleteUser);  // DELETE /users/:id

export default router;