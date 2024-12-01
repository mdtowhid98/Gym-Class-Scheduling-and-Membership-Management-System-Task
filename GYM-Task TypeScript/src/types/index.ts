import {Types} from "mongoose";

export interface UserDocument extends Document {
    email: string;
    password: string;
    fullName: string;
    role: 'trainee' | 'trainer' | 'admin';
}

export interface TrainerDocument extends Document {
    name: string;
    experience: number;
    classes: Types.ObjectId[];
}

export interface ClassDocument extends Document {
    title: string;
    date: Date;
    time: string;
    duration: number;
    trainer: Types.ObjectId;
    trainees: Types.ObjectId[];
}

export interface BookingDocument extends Document {
    class: Types.ObjectId;
    trainee: Types.ObjectId;
}

export interface JwtPayload {
    id: string;
}