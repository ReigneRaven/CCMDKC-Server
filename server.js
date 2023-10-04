const express = require('express')
const colors = require('colors')
const { errorHandler } = require('./middleware/middleware')
const connectDB = require('./database/db')
const cors = require('cors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/user', require('./routes/UserRouter'))
app.use('/api/admin', require('./routes/AdminRouter'))
app.use('/api/appointments', require('./routes/AppointmentsRouter'))
app.use('/api/records', require('./routes/PatientRecordsRouter'))
app.use('/api/inventory', require('./routes/InventoryRouter'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))