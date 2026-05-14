import express from 'express'
import { getAlbums, getProducts } from '../controllers/productsController.js'

export const productsRouter = express.Router()

productsRouter.get('/albums', getAlbums)
productsRouter.get('/', getProducts)