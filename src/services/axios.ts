import axios from 'axios'

export const api = axios.create({
    baseURL: `https://api.jikan.moe/v4/`,
})