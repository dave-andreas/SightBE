const express = require('express')
const {usercontroler} = require('../controllers')

const router = express.Router()

router.get('/1', usercontroler.sapa)
router.get('/allu', usercontroler.allu)
router.get('/enkrip/:pass', usercontroler.enkrip)

router.get('/login', usercontroler.login)
router.post('/regis', usercontroler.regis)
router.get('/userinfo/:id', usercontroler.userinfo)
router.post('/changemode', usercontroler.changemode)

module.exports = router