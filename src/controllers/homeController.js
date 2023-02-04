import pool from "../configs/connectDB";

let getHomepage = async (req, res) => {
    // logic
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.render('index.ejs', { dataUser: rows });
}

let getDetailsPage = async (req, res) => {
  // logic
  const [user] = await pool.execute('SELECT * FROM `users` WHERE `id` = ?', [req.params.userId]);
  return res.json(user)
}

export default {
    getHomepage,
    getDetailsPage
};