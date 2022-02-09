const express = require('express');
const app = express();
const Joi = require('joi');
// use this to get json post request body
app.use(express.json());

const products = [
    {'id':1, 'name': 'shirt'},
    {'id':2, 'name': 'pant'},
    {'id':3, 'name': 'polo shirt'},
    {'id':4, 'name': 'Jeans'},
    {'id':5, 'name': 'Cap'},
];

app.get('/', (req, res) =>{
    res.send('Home page...');
});

app.get('/api/products', (req, res) =>{
    res.send(products);
});

app.get('/api/product/:id', (req, res) =>{
    // res.send(`Product id:${req.params.id}`);
    let product = products.find( item => item.id === parseInt(req.params.id));
    if(!product){
        return res.status(404).send(`Product id: ${req.params.id} not found`);
    }
    res.send(product);
});

app.get('/api/product/:catid/:name', (req, res) =>{
    res.send(req.params);
    // res.send(req.query); // http://localhost:5000/api/product/44/shirt?orderBy=name
});
app.post('/api/product', (req, res) =>{   
    const validate = productValidate(req);

    if(validate.error){
        return res.status(404).send(validate.error.details[0].message);
    }
    let product = {
        id:products.length + 1,
        name:req.body.name
    };
    products.push(product);
    res.send(products);
});

function productValidate(postData){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(postData.body);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));