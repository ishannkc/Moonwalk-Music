import express from 'express'
import { getEras, getProducts } from '../controllers/productsController.js'

export const productsRouter = express.Router()

productsRouter.get('/eras', getEras)
productsRouter.get('/', getProducts)