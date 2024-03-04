import express from 'express'
import { validateJwt, isAdmin } from '../middleware/validate-jwt.js';
import { test, register, registerTh, login, update, deleteU } from './user.controller.js';

const api = express.Router();

api.get('/test', test)
api.post('/register', register)
api.post('/registerTh', registerTh)
api.post('/login', login)
api.put('/update/:id', [validateJwt], update)
api.delete('/deleteU/:id', [validateJwt], deleteU)
export default api