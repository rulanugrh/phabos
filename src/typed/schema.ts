import { z } from "zod";

const passwordValidation = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

export const schemaUserRegister = z.object({
    name: z.string({
        message: 'must be string'
    }),
    email: z.string({
        message: 'must be string data'
    }).email({
        message: 'must be email type'
    }),
    password: z.string({
        message: 'must be string'
    }).min(8, {
        message: 'at least minimum 8 character'
    }).regex(passwordValidation, {
        message: 'your password must contain 1 upper case, 1 special character, 1 number, and at least minimum 8 character'
    }),
})

export const schemaUserLogin = z.object({
    email: z.string({
        message: 'must be string data'
    }).email({
        message: 'must be email type'
    }),
    password: z.string({
        message: 'must be string'
    }).min(8, {
        message: 'at least minimum 8 character'
    })
})

export const schemaProductRegister = z.object({
    name: z.string({
        message: 'must be string data'
    }),
    description: z.string({
        message: 'must be string value'
    }),
    price: z.number({
        message: 'must be number format'
    }).min(10000, {
        message: 'minimum is 10000'
    }),
    stock: z.number({
        message: 'must be number format'
    }).min(1, {
        message: 'minimum is 1 '
    }),
    category: z.string({
        message: 'must be string format'
    }),
    process: z.string({
        message: 'must be string format'
    })
})

export const schemaOrderRegister = z.object({
    product_id: z.string({
        message: 'must be string format'
    }),
    jumlah: z.number({
        message: 'must be number format'
    }).min(1, {
        message: 'minimum is 1'
    }),
    via: z.string({
        message: 'must be string value'
    })
})