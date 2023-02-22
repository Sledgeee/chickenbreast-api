const sgMail = require('@sendgrid/mail')
const { renderOrderTemplate } = require('../templates/mail/order')

class MailService {
    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    }

    createMessage(to, subject, body) {
        return {
            to,
            from: 'sales@chickenbreast.pp.ua',
            subject,
            html: body
        }
    }

    async sendOrderCreatedMail(to, orderId, orderItems) {
        return await sgMail.send(this.createMessage(to, 'Замовлення успішно створене - Чікенбрест', renderOrderTemplate(orderId, orderItems)))
    }
}

module.exports = new MailService()
