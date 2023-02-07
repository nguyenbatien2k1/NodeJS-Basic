import express from 'express';
import homeController from '../controllers/homeController';

import multer from "multer";
import path from "path";
import appRoot from "app-root-path";

let router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + "/src/public/image");
    },
  
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({storage: storage, fileFilter: imageFilter});


const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);

    router.get('/details/user/:userId', homeController.getDetailsPage);

    router.post('/create-new-user', homeController.createNewUser);

    router.get('/edit-user/:userId', homeController.editUser);

    router.post('/update-user', homeController.updateUser);
    
    router.post('/delete-user', homeController.deleteUser);

    router.get('/upload', homeController.uploadFile);

    router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.uploadProfilePic);

    return app.use('/', router);
}

export default initWebRoute;