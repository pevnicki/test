import axios from 'axios'

export default axios.create({
  baseURL: 'https://test-api-server.herokuapp.com/'
})
