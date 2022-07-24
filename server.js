"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use(express_1.default.static('public'));
app.get('/', (req, res) => {
    res.render('home-page');
});
app.get('/product', (req, res) => {
    res.render('product-page');
});
app.get('/catalog', (req, res) => {
    res.render('catalog-page');
});
app.get('/bag', (req, res) => {
    res.render('bag-page');
});
app.get('/loved-items', (req, res) => {
    res.render('loved-items-page');
});
app.get('/checkout', (req, res) => {
    res.render('checkout-page');
});
app.get('/collections', (req, res) => {
    res.render('collections-page');
});
app.listen(process.env.PORT || 3000, () => {
    console.log('Server iniciado na porta 3000');
});
