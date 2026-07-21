import axios from "axios";


export const forgetPassword = (email) => {
    return axios.post(
        'http://localhost:8080/auth/forget-password',
        { email }
    );
};

export const resetPassword = (token, newPassword) => {
    return axios.post(
        'http://localhost:8080/auth/reset-password',
        { token, newPassword }
    );
};