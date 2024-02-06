import { type InferSchemaType, Schema, model } from "mongoose";
import validator from 'validator'
import { type IUser } from '../types/user'

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please tell us your name!'],
    },
    releaseDate: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: String,
    duration: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    director: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false,
    },
    language: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (this: IUser, inputValue: string) {
                return inputValue === this.password
            },
            message: 'Passwords are not the same!',
        },
    },
})

type Movie = InferSchemaType<typeof movieSchema>

export default model<Movie>('Moive', movieSchema)