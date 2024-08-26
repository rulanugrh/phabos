export type UserRegister = {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role?: string;
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
}

export type OrderRequest = {
    userID?: string;
    category: string;
    product_name: string;
    tanggal?: string
    via: string;
    status?: string
    harga: number;
    process: string;
    jumlah: number;
    nominal: number;
}

export type TopUp = {
    userId: string;
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
