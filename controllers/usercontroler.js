const {mysqldb} = require('../connection')
const db = mysqldb
const multer = require('multer')
const path = require('path')
const encrypt = require('../helper/encrypt')
const transporter = require('../helper/mailer')

module.exports = {
    sapa: (req,res) => {
        return res.status(200).send('hello sighter')
    },
    allu: (req,res) => {
        var sql = 'select * from users;'
        db.query(sql, (err,result) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(result)
        })
    },
    enkrip: (req,res)=>{
        var {pass} = req.params
        var encryptpass = encrypt(pass)
        return res.send({encryptpass,pass})
    },
    login: (req,res) => {
        const {username,password} = req.query
        var pass = encrypt(password)
        var sql = `select * from users where username='${username}' and password='${pass}';`
        db.query(sql, (err,result) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(result)
        })
    },
    regis: (req,res) => {
        const {username,password,email} = req.body
        var pass = encrypt(password)
        var data = {username,password:pass,email}
        var sql = `select * from users where username='${username}';`
        db.query(sql, (err,result) => {
            if (err) return res.status(500).send(err)
            if (result.length >= 1) {
                return res.status(200).send({message: 'someone already use this username'})
            }
            sql = 'insert into users set ?'
            db.query(sql, data, (err,result) => {
                if (err) return res.status(500).send(err)
                var mail = {
                    from: `Sight development team`,
                    to: email,
                    subject: 'You have create Sight account',
                    html: `You have successfully creating a new account. Bellow are your username and password. Thank you for join us<br/><br/>
                        Login by enter this :<br/>
                        - username : ${username}<br/>
                        - password : ${password}`
                }
                transporter.sendMail(mail, (err,result) => {
                    if (err) return res.status(500).send(err)
                    return res.status(200).send({message: 'You have create an account, check your email'})
                })
            })
        })
    },
    userinfo: (req,res) => {
        const {id} = req.params
        var sql = `select * from users where id=${id}`
        db.query(sql, (err,result) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(result[0])
        })
    },
    changemode: (req,res) => {
        const {dark,id} = req.query
        var sql = `update users set darkmode=${dark} where id=${id}`
        db.query(sql, (err,result) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send({message: 'change mode'})
        })
    }
}
