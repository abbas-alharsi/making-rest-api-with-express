const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 8080

const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let products = []

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/new-product.html'))
})

app.post('/product', (req, res) => {
    const product = req.body
    products.push(product)
    res.send('Product is added to the database')
    
})

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, '/product-list.html'))
})

app.get('/productlist', (req, res) => {
    res.json(products)
})

app.get('/js/product-list.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/js/product-list.js'))
})

//retrieve product information based on id
app.get('/product/:id', (req, res) => {
    const id = req.params.id
    for (let product of products) {
        if(product.id === id) {
           return res.json(product)
        }
    }

    res.status(404).send('product not found')
})

//deleting products
app.delete('/product/:id', (req, res) => {
    //reading id from URL
    const id = req.params.id

    //remove item from the product array
    products = products.filter(i => {
        if(i.id !== id) {
            return true
        }
        return false
    })
    res.send('Product is deleted')
})

//editing products
app.post('/product/:id', (req, res) => {
    // Reading id from the URL
    const id = req.params.id;
    const newProduct = req.body;

    // Edit item from the products array
    for (let i = 0; i < products.length; i++) {
        let product = products[i]
        if (product.id === id) {
            products[i] = newProduct;
        }
    }
    res.send('Product is edited')
});

app.listen(port, () => {
    console.log(`hello world is listening from port ${port}`)
})