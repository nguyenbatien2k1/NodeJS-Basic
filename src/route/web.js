import express from 'express';
import homeController from '../controllers/homeController';

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);

    router.get('/details/user/:userId', homeController.getDetailsPage);

    router.post('/create-new-user', homeController.createNewUser);

    router.get('/edit-user/:userId', homeController.editUser);

    router.post('/update-user', homeController.updateUser);
    
    router.post('/delete-user', homeController.deleteUser);

    return app.use('/', router);
}

export default initWebRoute;