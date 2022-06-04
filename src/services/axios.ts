import axios from 'axios'

export const api = axios.create({
    baseURL: `https://kitsu.io/api/edge/anime`
})