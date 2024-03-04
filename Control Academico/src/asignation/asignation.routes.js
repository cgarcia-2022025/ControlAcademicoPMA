import express from "express";
import { validateJwt } from '../middleware/validate-jwt.js'
import { newAsignation, getMyCourses } from './asignation.controller.js';
 
const api = express.Router();

api.post('/newAsignation', [validateJwt], newAsignation)
api.get('/getMyCourses', [validateJwt], getMyCourses)


export default api