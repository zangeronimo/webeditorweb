import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.API_URL,
})
const tokenData = localStorage.getItem('WEBEditor:token')
if (tokenData) {
  const { token } = JSON.parse(tokenData)
  api.defaults.headers.Authorization = `Bearer ${token}`
}
