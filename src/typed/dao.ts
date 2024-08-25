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
    token: string;
    name: string;
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