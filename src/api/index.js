import axios from "axios";

class Api {
    constructor() {
        this.BASE_URL = process.env.REACT_APP_BACKEND_URL;
    }

    async getApi(url) {
        try {
            const resp = await axios.get(`${this.BASE_URL}/chat/api/v1${url}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            return resp.data;
        } catch (error) {
            if(error?.status === 403 && error?.response?.data?.message === "Invalid Token") {
                localStorage.clear();
                return window.location.href = "/testing/auth/";
            }
            throw error;
        }
    }

    async postApi(url, data = {}) {
        try {
            const resp = await axios.post(`${this.BASE_URL}/chat/api/v1${url}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            return resp.data;
        } catch (error) {
            if(error?.status === 403 && error?.response?.data?.message === "Invalid Token") {
                localStorage.clear();
                return window.location.href = "/testing/auth/";
            }
            throw error;
        }
    }

    async updateApi(url, data = {}) {
        try {
            const resp = await axios.put(`${this.BASE_URL}/chat/api/v1${url}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            return resp.data;
        } catch (error) {
            if(error?.status === 403 && error?.response?.data?.message === "Invalid Token") {
                localStorage.clear();
                return window.location.href = "/testing/auth/";
            }
            throw error;
        }
    }
}

export const api = new Api();