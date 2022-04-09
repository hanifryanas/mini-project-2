const db = require('./db')

const createMerchants = `
    CREATE TABLE merchants(
        id INTEGER PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        address TEXT NOT NULL,
        phone INTEGER NOT NULL,
        join_date TEXT NOT NULL
    )
`

const createProducts = `
    CREATE TABLE products(
        id INTEGER PRIMARY KEY,
        merchant_id INTEGER,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price INTEGER NOT NULL,
        FOREIGN KEY (merchant_id) REFERENCES merchants(id)
        )
`

db.serialize(() => {
    db.run(createMerchants, (err) => {
        if (!err) {
            console.log('table merchants created')
        } else {
            console.log(err)
        }
    })
    db.run(createProducts, (err) => {
        if (!err) {
            console.log('table products created')
        } else {
            console.log(err)
        }
    })
})