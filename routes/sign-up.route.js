const userSchema = require('../schemas/user.schema')
let signUpService = require('./../services/sign-up.service')
signUpService = new signUpService()

const { Validator } = require('express-json-validator-middleware');
const validate = new Validator({allErrors: true}).validate

module.exports = (app)=>{
    debugger;
    app.post('/signup', validate({body: userSchema(
        ['name', 'lastName', 'mobilePhone', 'email', 'password'])}), async (req, res)=>{
        try {
            const user = req.body
            const result = await signUpService.insertUser(user)
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send({message: error.message})
        }finally{
            res.end()
        }
    })
}
