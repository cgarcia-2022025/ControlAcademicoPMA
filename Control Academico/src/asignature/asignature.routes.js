import express from 'express';

import { newAsignature, updateAsignature,deleteAsignature, getMyAsignatures } from './asignature.controller.js'
import { validateJwt, isAdmin } from '../middleware/validate-jwt.js';

const api = express.Router();

api.post('/newAsignature', [validateJwt, isAdmin], newAsignature);
api.put('/updateAsignature/:id', [validateJwt, isAdmin], validateJwt, updateAsignature);
api.delete('/deleteAsignature/:id',deleteAsignature)
api.get('/getMyAsignatures', [validateJwt, isAdmin], getMyAsignatures)

export default api