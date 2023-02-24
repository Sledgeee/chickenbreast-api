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
const departmentRouter = require('./router/department-router')
const adminRouter = require("./router/admin-router")
const errorMiddleware = require('./middlewares/error-middleware')
const axios = require("axios");

const PORT = process.env.PORT || 8000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3002',
             'https://chickenbreast.pp.ua', 'https://chickenbreast-front.vercel.app',
             'https://chickenbot-1-h5237689.deta.app',
             'https://panel.chickenbreast.pp.ua', 'https://chickenbreast-admin.vercel.app']
}))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/auth/', authRouter)
app.use('/products/', productRouter)
app.use('/orders/', orderRouter)
app.use('/category/', categoryRouter)
app.use('/contact/', contactRouter)
app.use('/departments/', departmentRouter)
app.use('/admins/', adminRouter)
app.use(errorMiddleware)

app.get('/', (req, res) => { res.send('ok') })
app.post('/__space/v0/actions', (req, res) => {
    const event = req.body.event

    if (event.id === "ping") {
        axios.post('https://chickenbot-1-h5237689.deta.app/ping').catch(e => console.log(e))
        return res.send("pong")
    }
    res.sendStatus(200)
})

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
