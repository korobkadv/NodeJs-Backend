import express from 'express';
const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));

import multer from 'multer';
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb (null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb (null, file.originalname);
    }
});
const upload = multer({ storage });

import db from 'mongoose';
db.set('strictQuery', false);
db.connect('mongodb+srv://korobkadmytro:mCwUXWUSYpfPsnsZ@cluster.u76f5pc.mongodb.net/blog?retryWrites=true&w=majority')
    .then( () => console.log('DB ok'))
    .catch(() => console.log('DB error', err));

import { registerValidation, loginValidation, postCreateValidation } from "./validations.js";



import { checkAuth, handleValidationErrors } from './utils/index.js';
import { userController, postController } from './controllers/index.js';



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
    res.send('Hello WOrld!');
});

//Загрузка изображений
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `uploads/${req.file.originalname}`
    });
});

//Роут авторизации и отправкой токена
app.post('/login', loginValidation, handleValidationErrors, userController.auth);

//Роут для регистрации с проверками введенных данных
app.post('/register', registerValidation, handleValidationErrors, userController.register);

//Информация об одном пользователе
app.get('/user/me', checkAuth, userController.getMe);

//Работа со статьями
app.get('/posts', postController.getAll);
app.get('/posts/:id', postController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, postController.create);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, postController.update);
app.delete('/posts/:id', checkAuth, postController.remove);

// Запускаем сервер
app.listen(3000, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log('Start server: http://localhost:3000');
});