import express from 'express'
import { addtoCart, deleteItem, getAll, getCartCount } from '../controllers/cartController.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const cartRouter = express.Router()

cartRouter.post('/add', requireAuth, addtoCart)
cartRouter.get('/cart-count',requireAuth, getCartCount )
cartRouter.get('/', requireAuth,getAll)
cartRouter.delete('/:itemId', requireAuth,deleteItem)