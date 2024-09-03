export type ListPembelian = {
    id: string;
    via: string;
    category: string;
    product_name: string;
    tanggal?: string
    status?: string
    process: string;
    total: string;
}

export type GetAllOrder = {
    id: string;
    via: string;
    user_id: string;
    category: string;
    product_name: string;
    tanggal?: string
    status?: string
    process: string;
    total: string;
    checkout_url: string;
}

export type GetUser = {
    _id: string;
    name: string;
    email: string;
    amount?: number;
    phonenumber: string;
}

export type ResponseCreateUser = {
    email: string;
    name: string;
}

export type ResponseLogin = {
    _id: string;
    email: string;
    amount?: number;
    name: string;
    password: string;
    phonenumber: string;
}

export type ResponseCreateOrder = {
    id: string;
    category: string;
    product_name: string;
    quantity: number;
    tanggal?: string
    via: string;
    status?: string
    price: number;
    process: string;
    nominal: number;
}

export type ResponseTopup = {
    id: string;
    user_email: string;
    balance: number;
    via: string;
    tanggal: string;
    status: string;
    user_name: string;
}

export type ResponseGetTopup = {
    id: string;
    balance: number;
    via: string;
    tanggal: string;
    status: string;
}

export type ResponseCreateProduct = {
    category: string;
    product_name: string;
    price: number
    process: string;
    stock: number;
}

export type ResponseGetProduct = {
    id: string;
    category: string;
    product_name: string;
    description: string;
    price: number
    process: string;
    stock: number;
}

export type DetailOrder = {
    product_account: string;
    product_price: string;
    product_expired: string;
    product_rules: string;
    product_password: string;
    product_name: string;
    via: string;
    order_date: string;
    order_status: string;

}