import { IUserInfo } from "@/interfaces/auth";
import { createSlice } from "@reduxjs/toolkit";


interface IUserInfoState {
    userInfo: {
        token: string | null;
        adminData: IUserInfo | null;
    }
}

const initialState: IUserInfoState = {
    userInfo: {
        token: null,
        adminData: null
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userInfo = action.payload
        },
        logout: (state) => {
            state.userInfo = {
                token: null,
                adminData: null
            }
        }
    }
});


export const { login , logout } = authSlice.actions;
export default authSlice.reducer;