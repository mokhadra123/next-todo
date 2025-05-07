export interface ILoginFormState {
    user_name: string;
    password: string;
}

export interface IUserInfo {
    id: number;
    user_name: string;
    phone_number: number,
    status: string,
    gender: string,
    address: string,
    image: null,
    clinic_id: number,
    role_id: number,
    created_at: string,
    updated_at: string,
};