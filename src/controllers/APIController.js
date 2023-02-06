import pool from "../configs/connectDB";


let getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.status(200).json({
        message: 'oke',
        data: rows
    })
}

let createNewUser = async (req, res) => {

    let {firstName, lastName, email, address} = req.body;

    if(!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: 'Error!'
        })
    }

    await pool.execute('INSERT INTO `users` (firstName, lastName, email, address) VALUES (?, ?, ?, ?)', [firstName, lastName, email, address]);

    return res.status(200).json({
        message: 'OKE'
    })
}

let updateUser = async (req, res) => {

    let {firstName, lastName, email, address, id} = req.body;
    await pool.execute('UPDATE `users` SET `firstName` = ? , `lastName` = ? , `email` = ? , `address` = ? WHERE `id` = ?', [firstName, lastName, email, address, id]);
    
    if(!firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: 'Error!'
        })
    }

    return res.status(200).json({
        message: 'OKE'
    })
}

let deleteUser = async (req, res) => {

    let userId = req.params.id;

    if(!userId) {
        return res.status(200).json({
            message: 'Error!'
        })
    }

    await pool.execute('DELETE FROM `users` WHERE id = ?', [userId]);
    
    return res.status(200).json({
        message: 'OKE'
    })
}

export default {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}