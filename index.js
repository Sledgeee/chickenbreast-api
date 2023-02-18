require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
const mongoose = require('mongoose')
const authRouter = require('./router/auth-router')
const productRouter = require('./router/product-router')
const orderRouter = require('./router/order-router')
const categoryRouter = require('./router/category-router')
const contactRouter = require('./router/contact-router')
const recipeRouter = require('./router/recipe-router')
const errorMiddleware = require('./middlewares/error-middleware')

const PORT = process.env.PORT || 8000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: '*' }))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/auth/', authRouter)
app.use('/products/', productRouter)
app.use('/orders/', orderRouter)
app.use('/category/', categoryRouter)
app.use('/contact/', contactRouter)
app.use('/recipes/', recipeRouter)
app.use(errorMiddleware)

const bootstrap = async () => {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(process.env.MONGO_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

bootstrap()
