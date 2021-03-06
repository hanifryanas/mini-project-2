require('dotenv').config();
const app = require('express')();
const merchants = require('./routes/merchants.js');
const products = require('./routes/products.js');
const port = process.env.PORT || 3010;
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/merchant', merchants);

app.use('/merchant/id', products);

app.listen(port, () => {
    console.log(`This app listening on port ${port}!`);
});