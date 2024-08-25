export type ListPembelian = {
    via: string;
    category: string;
    product_name: string;
    tanggal?: string
    status?: string
    process: string;
    nominal: string;
}

export type GetUser = {
    _id: string;
    name: string;
    email: string;
    role: string;
    amount?: number;
}

export type ResponseCreateUser = {
    email: string;
    name: string;
}

export type ResponseLogin = {
    _id: string;
    email: string;
    role: string;
    amount?: number;
    name: string;
    password: string;
}

export type ResponseCreateOrder = {
    category: string;
    product_name: string;
    tanggal?: string
    via: string;
    status?: string
    harga: string;
    process: string;
    nominal: string;
}

export type RiwayatTopup = {
    balance: number;
    via: string;
    tanggal: string;
    status: string;
}