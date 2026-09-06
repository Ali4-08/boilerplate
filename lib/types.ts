// \lib\types.ts

/**تایپ مخصوص خطا های دیتابیس */
export interface ErrorType{
    code?: string | number;
    message?: string;
    detail?: string;
    stack?: string;
}

/**تایپ مخصوص کاربر */
export interface User{
    id: number;
    name: string;
    email: string;
    password_hash: string;
    created_at: string;
}

/**تایپ مخصوص کاربر برای استفاده های عمومی */
export type PublicUser = Omit<User, "password_hash">;


/**تایپ برای فرم ورود و ثبت نام */
export interface AuthResponse {
    success?: boolean;
    error?: string;
    message?: string;
    data?: {
        id: number;
        name: string;
        email: string;
        created_at: string;
    };
}

/**تایپ برای Token Payload */
export interface TokenPayload{
    userId: number;
    email: string;
}