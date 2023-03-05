import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось отобразить статьи'
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndUpdate({
            _id: postId
        }, {
            $inc: { viewsCount: 1 }
        }, {
            returnDocument: 'after'
        },
            (err, doc) => {
                if(err) {
                    console.log(error);
                    return res.status(500).json({
                        message: 'Не удалось отобразить статью'
                    });
                }
                if(!doc) {
                    return res.status(404).json({
                        message: 'Статья не найдена'
                    });
                }

                res.json(doc);
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось отобразить статьи'
        });
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId
        });

        const post = await doc.save();

        res.json(post);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось добавить пост'
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndDelete({
            _id: postId
        }, (err, doc) => {
            if(err) {
                return res.status(500).json({
                    message: 'Не удалось удалить статью'
                });
            }
            if(!doc) {
                return res.status(404).json({
                    message: 'Статья не найдена'
                });
            }

            res.json({
                success: true
            });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось удалить статью'
        });
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne({
            _id: postId
        }, {
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId
        });

        res.json({
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось обновить статью'
        });
    }
}