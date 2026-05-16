import express from 'express'
import { addtoCart, getCartCount } from '../controllers/cartController.js'

export const cartRouter = express.Router()

cartRouter.post('/add', addtoCart)
cartRouter.get('/cart-count', getCartCount )