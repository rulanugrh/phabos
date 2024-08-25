import { firestore } from "../config/firebase";
import { GetUser, ResponseCreateUser, ResponseLogin } from "../typed/dao";
import { UserLogin, UserRegister } from "../typed/dto";
import { v4 as uuid } from 'uuid';
import bcrypt from "bcrypt"

export const userRegister = async(request: UserRegister): Promise<ResponseCreateUser> => {
    try {
        const hashedPassword: string = await bcrypt.hash(request.password, 14)
        const data = {
            _id: uuid(),
            name: request.name,
            email: request.email,
            password: hashedPassword,
            role: 'user',
            amount: 0,
        }

        const _res = await firestore.collection('users').doc(request.email).set(data)
        const response = (await firestore.collection('users').doc(request.email).get()).data()

        const result: ResponseCreateUser = {
            name: response?.name,
            email: response?.email,
        }

        return result
    } catch (error) {
        throw new Error('internal server error')
    }
}

export const userLogin = async(request: UserLogin): Promise<ResponseLogin> => {
    try {
        const data = (await firestore.collection('users').doc(request.email).get()).data()
        if (!data) {
            throw new Error('user not found')
        }

        const response: ResponseLogin = {
            name: data?.name,
            email: data?.email,
            role: data?.role,
            _id: data?._id,
            amount: data?.amount,
            password: data?.password
        }

        return response
    } catch (error) {
        throw new Error('internal server error')
    }
}

export const userGetMe = async(email: string): Promise<GetUser> => {
    try {
        const data = (await firestore.collection('users').doc(email).get()).data()
        const response: GetUser = {
            name: data?.name,
            email: data?.email,
            role: data?.role,
            amount: data?.amount,
            _id: data?._id
        }

        return response
    } catch (error) {
        throw new Error('internal server error')
    }
}