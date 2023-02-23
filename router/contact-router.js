const Router = require('express').Router
const contactController = require('../controllers/contact-controller')
const contactRouter = new Router()
const { body } = require('express-validator')

contactRouter.get('/feedbacks', contactController.getFeedbacks)
contactRouter.post('/feedback',
                   body('name').notEmpty(),
                   body('email').isEmail(),
                   body('subject').notEmpty(),
                   body('message').notEmpty(),
                   contactController.createFeedback)
contactRouter.delete('/:id', contactController.deleteOneFeedback)
contactRouter.post('/bulk-delete',
                    body('ids').isArray(),
                    contactController.deleteManyFeedbacks)

module.exports = contactRouter
