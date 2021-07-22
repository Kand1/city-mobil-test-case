import axios from "axios";

const instance = axios.create({
    baseURL: "https://city-mobil.ru/api"
})

export const getData = () => {
    return instance.get("/cars")
        .then(response => response.data)
}