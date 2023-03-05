// import mongoose from 'mongoose';
import db from 'mongoose';

const PostShema = new db.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,  
    }, 
    tags: {
        type: Array,
        default: []
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    user: {
        type: db.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl: String,
}, {
    timestamps: true
});

export default db.model('Post', PostShema);