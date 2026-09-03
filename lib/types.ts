// \lib\types.ts

/**تایپ مخصوص خطا های دیتابیس */
export interface ErrorType{
    code?: string;
    message?: string;
    detail?: string;
}

/**تایپ مخصوص کاربر */
export interface User{
    id: number;
    name: string;
    email: string;
    password_hash: string;
    created_at: string;
}


/**تایپ برای فرم ورود و ثبت نام */
export interface AuthResponse {
    success?: boolean;
    error?: string;
    message?: string;
    data?: {
        id: number;
        name: string;
        email: string;
    };
}