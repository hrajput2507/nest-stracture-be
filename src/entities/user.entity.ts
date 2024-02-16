import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
}, { timestamps: true });

export const UsersModel = mongoose.model('Users', UsersSchema);
