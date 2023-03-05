import db from 'mongoose';

const UserShema = new db.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true  
    }, 
    passwordHash: {
        type: String,
        required: true
    },
    avatarUrl: String,
}, {
    timestamps: true
});

export default db.model('User', UserShema);