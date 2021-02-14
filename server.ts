import express from 'express'
import ejs from 'ejs'

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('teste')
})
app.get('/home', (req, res) => {
    res.render('home')
})

app.listen(3000, () => {
    console.log('Server iniciado na porta 3000')
})