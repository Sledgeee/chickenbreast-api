const Router = require('express').Router
const contactController = require('../controllers/contact-controller')
const contactRouter = new Router()
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

contactRouter.get('/feedbacks', contactController.getFeedbacks)
contactRouter.post('/feedback',
                   body('name').notEmpty(),
                   body('email').isEmail(),
                   body('subject').notEmpty(),
                   body('message').notEmpty(),
                   contactController.createFeedback)
contactRouter.delete('/feedbacks/:id', authMiddleware, contactController.deleteOneFeedback)
contactRouter.post('/feedbacks/bulk-delete',
                    authMiddleware,
                    body('ids').isArray(),
                    contactController.deleteManyFeedbacks)

module.exports = contactRouter
