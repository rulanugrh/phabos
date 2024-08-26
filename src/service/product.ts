import { firestore } from "../config/firebase";
import { ResponseCreateProduct, ResponseGetProduct } from "../typed/dao";
import { ProductRegister, ProductUpdate } from "../typed/dto";
import { v4 as uuid } from 'uuid';
import { FirebaseFirestoreError } from "firebase-admin/firestore";

export const productRegister = async(req: ProductRegister): Promise<ResponseCreateProduct> => {
    try {
        const request = {
            name: req.name,
            price: req.price,
            description: req.description,
            process: req.process,
            category: req.category,
        }

        const _res = await firestore.collection('products').doc(uuid()).set(request)
        const response: ResponseCreateProduct = {
            product_name: req.name,
            process: req.process,
            price: req.price,
            category: req.category,
        }
        
        return response
    } catch (error) {
        if (error instanceof FirebaseFirestoreError) {
            throw new Error(error.message)
        }

        throw new Error('Internal Server Error')
    }
}

export const productGetByID = async(id: string): Promise<ResponseGetProduct> => {
    try {
        const data = await firestore.collection('products').doc(id)
        const res = (await data.get()).data()
        const response: ResponseGetProduct = {
            id: id,
            product_name: res?.name as string,
            description: res?.description as string,
            process: res?.process as string,
            price: res?.price as number,
            category: res?.category as string,
        }

        return response
    } catch (error) {
        console.log(error)
        if (error instanceof FirebaseFirestoreError) {
            throw new Error(error.message)
        }

        throw new Error('Internal Server Error')
    }
}

export const productGetAll = async(): Promise<ResponseGetProduct[]> => {
    try {
        const snapshot = await firestore.collection('products').get()
        const response = snapshot.docs.map((doc) => {
            const dt = doc.data()
            const result: ResponseGetProduct = {
                id: doc.id,
                process: dt?.process,
                price: dt?.price,
                product_name: dt?.name,
                description: dt?.description,
                category: dt?.category,
            }

            return result
        })

        return response
    } catch (error) {
        if (error instanceof FirebaseFirestoreError) {
            throw new Error(error.message)
        }

        throw new Error('Internal Server Error')
    }
}

export const productUpdate = async(id: string, req: ProductUpdate): Promise<ResponseGetProduct> => {
    try {
        const request = {
            name: req.name,
            description: req.description,
            price: req.price,
            process: req.process,
            category: req.category
        }
        const _data = await firestore.collection('products').doc(id).set(request)
        const result = (await firestore.collection('products').doc(id).get()).data()

        const response: ResponseGetProduct = {
            id: id,
            process: result?.process,
            price: result?.price,
            product_name: result?.name,
            description: result?.description,
            category: result?.category
        }

        return response
    } catch (error) {
        console.log(error)
        if (error instanceof FirebaseFirestoreError) {
            throw new Error(error.message)
        }

        throw new Error('Internal Server Error')
    }
}

export const productDelete = async(id: string): Promise<any> => {
    try {
        return await firestore.collection('products').doc(id).delete()
    } catch (error) {
        if (error instanceof FirebaseFirestoreError) {
            throw new Error(error.message)
        }

        throw new Error('Internal Server Error')
    }
}

export const productByName = async(name: string): Promise<ResponseGetProduct[]> => {
    try {
        const data = await firestore.collection('products').where('name', "==", name).get()
        const result = data.docs.map((doc) => {
            const dt = doc.data()

            const result: ResponseGetProduct = {
                id: doc.id,
                product_name: dt?.name,
                price: dt?.price,
                category: dt?.category,
                description: dt?.description,
                process: dt?.process
            }

            return result
        })

        return result
    } catch (error) {
        if (error instanceof FirebaseFirestoreError) {
            throw new Error(error.message)
        }

        throw new Error('Internal Server Error')
    }
}

export const productCount = async(): Promise<number> => {
    try {
        const data = await firestore.collection('products').count().get()
        return data.data().count
    } catch (error) {
        if (error instanceof FirebaseFirestoreError) {
            throw new Error(error.message)
        }

        throw new Error('Internal Server Error')
    }
}