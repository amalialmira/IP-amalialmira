const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
    static async register(req, res, next){
        try {

            let {username, email, password} = req.body
            let user = await User.create({username, email, password})

            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email
            })
        } catch (error) {
            next(error)
        }
    }
    static async login(req, res, next){
        let {email, password} = req.body
        try {
            if(!email || !password){
                throw {name: "InvalidInput"}
            }
            
            const user = await User.findOne({
                where: { email }
            })

            if(!user || !comparePass(password, user.password)){
                throw {name: "InvalidUser"}
            }

            const token = signToken({
                id: user.id
            })
          
            res.status(200).json({access_token: token})

        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController