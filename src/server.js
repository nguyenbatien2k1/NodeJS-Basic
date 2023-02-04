import express from 'express'
import configViewEngine from './configs/viewEngine'
import initWebRoute from './route/web';

// import connection from './configs/connectDB';

require('dotenv').config() // sử dụng để cấu hình file môi trường

const app = express()
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// setup view engine
configViewEngine(app);

// init
initWebRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})