import pool from "../configs/connectDB";
import multer from "multer";
import path from "path";

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

let uploadFile = async (req, res) => {
  return res.render('uploadFile.ejs')
}

let uploadProfilePic = async (req, res) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);

}

let uploadMultipleImages = async (req, res) => {

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
          return res.send('Please select an image to upload');
        }

        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="/upload">Upload more images</a>';
        res.send(result);
}

export default {
    getHomepage,
    getDetailsPage,
    createNewUser,
    editUser,
    updateUser,
    deleteUser,
    uploadFile,
    uploadProfilePic,
    uploadMultipleImages
};