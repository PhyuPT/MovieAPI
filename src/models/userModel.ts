import { type InferSchemaType, Schema, model } from "mongoose";
import validator from 'validator'
import { type IUser } from '../types/user'

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (this: IUser, inputValue: string) {
                return inputValue === this.password
            },
            message: 'Passwords are not the same!',
        },
    },
    photo: String,
    favouriteContent: {
        type: [Number]
    }
})

type User = InferSchemaType<typeof userSchema>

export default model<User>('User', userSchema)