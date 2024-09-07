export type UserRegister = {
    _id?: string;
    name: string;
    email: string;
    password: string;
    phonenumber: string;
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
    user_name: string;
    user_email: string;
}

export type TopUp = {
    user_email: string;
    balance: number;
    via: string;
    tanggal?: string;
    status?: string;
    user_name?: string;
}

export type ProductUpdate = {
    name: string;
    category: string;
    price: number;
    description: string;
    process: string;
    stock: string;
}


export type SendProduct = {
    account: string;
    password: string;
    expired: string;
    rules: string;
}