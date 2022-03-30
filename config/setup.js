const db = require('./db')

const createMerchants = `
    CREATE TABLE merchants(
        id INTEGER PRIMARY KEY,
        merchantPassword TEXT NOT NULL,
        merchantName TEXT NOT NULL UNIQUE,
        merchantAddress TEXT NOT NULL,
        merchantJoinDate TEXT NOT NULL,
        merchantPhoneNumber INTEGER NOT NULL,
    )
`

const createProducts = `
    CREATE TABLE products(
        id INTEGER PRIMARY KEY,
        productName TEXT NOT NULL,
        productQuantity INTEGER NOT NULL,
        productPrice INTEGER NOT NULL,
        )
`

db.serialize(() => {
    db.run(createMerchants, (err) => {
        if (!err) {
            console.log('table created')
        } else {
            console.log(err)
        }
    })
    db.run(createProducts, (err) => {
        if (!err) {
            console.log('table created')
        } else {
            console.log(err)
        }
    })
})