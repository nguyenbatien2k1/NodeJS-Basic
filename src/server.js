import express from 'express'
import configViewEngine from './configs/viewEngine'

require('dotenv').config() // sử dụng để cấu hình file môi trường

const app = express()
const port = process.env.PORT || 3000;

configViewEngine(app);

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})