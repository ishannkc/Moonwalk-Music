import express from 'express'
import { addtoCart, deleteItem, getAll, getCartCount } from '../controllers/cartController.js'

export const cartRouter = express.Router()

cartRouter.post('/add', addtoCart)
cartRouter.get('/cart-count', getCartCount )
cartRouter.get('/', getAll)
cartRouter.delete('/:itemId', deleteItem)