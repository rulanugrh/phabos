export type UserRegister = {
    _id?: string;
    name: string;
    email: string;
    password: string;
    amount?: number;
}

export type UserLogin = {
    email: string;
    password: string;
}

export type ProductRegister = {
    name: string;
    category: string;
    price: number;
    description: string;
    process: string;
    stock: number;
}

export type OrderRequest = {
    user_id: string;
    product_id: string;
    via: string;
    status?: string
    jumlah: number;
}

export type TopUp = {
    user_id: string;
    balance: number;
    via: string;
    tanggal: string;
    status: string;
}

export type ProductUpdate = {
    name?: string;
    category?: string;
    price?: number;
    description?: string;
    process?: string;
}
