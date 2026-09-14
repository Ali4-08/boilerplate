// \lib\types.ts

/**تایپ مخصوص کاربر */
interface User{
    id: number;
    name: string;
    email: string;
    password_hash: string;
    role: string;
    created_at: string;
}

/*************************
 ** تایپ های Login - User 
 *************************/
export type InsertUser = Omit<User, 'id' | 'created_at'>;
export type UpdatetUser = Partial<Omit<User, 'id' | 'created_at' | 'password_hash' | 'role'>>;
export type PublicUser = Omit<User, 'password_hash'>;
export type LoginData = Pick<User, 'id' | 'email' | 'password_hash' | 'role'>;


/*************************
 ** تایپ های Reset Password
 *************************/
interface PasswordResetTokens{
    id: number;
    user_id: number;
    token: string;
    expires_at: string;
    used: boolean;
    created_at: string;
}

export type InsertPasswordResetToken = Omit<PasswordResetTokens, 'id' | 'created_at'>;
export type UpdatePasswordResetToken = Partial<Omit<PasswordResetTokens, 'id' | 'created_at'>>;


/**تایپ مخصوص خطا های دیتابیس */
export interface InternalError{
    code?: string | number;
    message?: string;
    detail?: string;
    stack?: string;
}


/**تایپ برای فرم ورود و ثبت نام */
export interface ApiResponse<T = undefined> {
    code?: number | string;
    success?: boolean;
    error?: string;
    message?: string;
    data?: T
}

/**تایپ برای Token Payload */
export interface TokenPayload{
    userId: number;
    email: string;
    role: string;
}