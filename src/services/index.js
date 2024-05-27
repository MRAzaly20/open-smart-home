import { signIn } from "next-auth/react";
import { Router } from "next/router";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const logged_in = async FormData => {
    console.log(FormData);
    const { email, password } = FormData;
    const status = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password
    });
    return status;
};

export const register_now = async FormData => {
    try {
        const res = await fetch("http://localhost:3000/api/services/register", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(FormData)
        });
        const data = res.json();
        return data;
    } catch (error) {
        console.log("Error Coming in register  (Services )  => " + error);
    }
};
export const logout = async (_refreshToken, _accessToken) => {
    try {
        const res = await axios.post(
            "http://localhost:3000/api/services/logout",
            {
                refresh: _refreshToken
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${_accessToken}`
                }
            }
        );
        const data = res.json();
        return data;
    } catch (error) {
        console.log("logout error", error);
        alert(error);
    }
};
export const getUserData = token => {
    const decoded = jwt_decode(token);
    return decoded;
};
