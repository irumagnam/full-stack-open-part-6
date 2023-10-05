import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(res => res.data)
}

const createNew = anecdote => {
  return axios
    .post(baseUrl, anecdote)
    .then(res => res.data)
}

const update = anecdote => {
  return axios
    .put(`${baseUrl}/${anecdote.id}`, anecdote)
    .then(res => res.data)
}

export default {
  getAll,
  createNew,
  update
}