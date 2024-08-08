if (process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const port = 3000
const router = require('./routers/index')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use (router)

// app.listen(port, () => {
//     console.clear();
//     console.log(`Example app listening on port ${port}`)
//   })

app.use(errorHandler)


module.exports = app