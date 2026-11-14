import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://my.api.mockaroo.com',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
})
