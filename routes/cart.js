import express from 'express'
import { addtoCart } from '../controllers/cartController.js'

export const cartRouter = express.Router()

cartRouter.post('/add', addtoCart)