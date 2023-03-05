import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Не верный формат почты').isEmail(),
    body('password', 'Пароль должен быть длинее').isLength({ min: 5 }),
];

export const registerValidation = [
    body('email', 'Не верный формат почты').isEmail(),
    body('password', 'Пароль должен быть длинее').isLength({ min: 5 }),
    body('fullName', 'Имя должно быть длинее').isLength({ min: 3 }),
    body('avatarUrl', 'Не верный формат ссылки на аватарку').optional().isURL()
];

export const postCreateValidation = [
    body('title', 'Введите название статьи').isLength({ min: 5 }).isString(),
    body('text', 'Введите полный текст статьи').isLength({ min: 10 }).isString(),
    body('tags', 'Введите ключевые слова').optional().isString(),
    body('imageUrl', 'Введите ссылку на изображение').optional().isString()
];