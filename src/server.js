import express from 'express'
import configViewEngine from './configs/viewEngine'
import initWebRoute from './route/web';
import initAPIRoute from './route/api';

import morgan from 'morgan';

require('dotenv').config() // sử dụng để cấu hình file môi trường

const app = express()
const port = process.env.PORT || 3000;

// use morgan
app.use(morgan('combined'))

// middleware xử lý trong req.body
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// setup view engine
configViewEngine(app);

// init WEB Route
initWebRoute(app);

// Handle 404 Not Found
app.use((req, res) => {
  return res.render('404.ejs');
})

// init API Route
initAPIRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})