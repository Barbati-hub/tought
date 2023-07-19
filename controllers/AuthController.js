const User = require('../models/User')

const bcrypt = require('bcryptjs');// cria senha criptrogafada 

module.exports = class AuthController{
    static login(req, res){
        res.render('auth/login')
    }

    static register(req, res){
        res.render('auth/register')
    }

    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body
    
        // passwords match validation
        if (password != confirmpassword) {
          req.flash('message', 'As senhas não conferem, tente novamente!')
          res.render('auth/register')
    
          return
        }
    }
}