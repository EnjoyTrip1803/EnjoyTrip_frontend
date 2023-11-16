import axios from "axios";

function attractionAxios() {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_VUE_API_URL + "/attractionapi",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        }
    });
    return instance;
}

function userAxios() {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_VUE_API_URL + "/users",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        }
    });
    return instance;
}


export { attractionAxios, userAxios };