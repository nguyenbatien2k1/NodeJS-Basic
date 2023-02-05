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

let createNewUser = async (req, res) => {
  // logic
  let {firstName, lastName, email, address} = req.body;
  await pool.execute('INSERT INTO `users` (firstName, lastName, email, address) VALUES (?, ?, ?, ?)', [firstName, lastName, email, address]);
  return res.redirect('/');
}

let deleteUser = async (req, res) => {
  // logic
  let userId = req.body.userId;
  await pool.execute('DELETE FROM `users` WHERE id = ?', [userId]);
  return res.redirect('/');
}

let editUser = async (req, res) => {
  // logic
  let userId = req.params.userId;
  let [user] = await pool.execute('SELECT * FROM `users` WHERE id = ?', [userId]);
  return res.render('edit.ejs', {dataUser: user[0]});
}

let updateUser = async (req, res) => {
  // logic
  let {firstName, lastName, email, address, userId} = req.body;
  await pool.execute('UPDATE `users` SET `firstName` = ? , `lastName` = ? , `email` = ? , `address` = ? WHERE `id` = ?', [firstName, lastName, email, address, userId]);
  return res.redirect('/')
}

export default {
    getHomepage,
    getDetailsPage,
    createNewUser,
    editUser,
    updateUser,
    deleteUser,
};