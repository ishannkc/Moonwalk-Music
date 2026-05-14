import express from 'express'
import { getAlbums } from '../controllers/productsController.js'

export const productsRouter = express.Router()

productsRouter.get('/albums', getAlbums)