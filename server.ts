import express from 'express'
import ejs from 'ejs'

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/product', (req, res) => {
    res.render('product')
})

app.get('/catalog', (req, res) => {
    res.render('catalog')
})

app.listen(3000, () => {
    console.log('Server iniciado na porta 3000')
})