import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => {
  return axios.get(baseUrl)
}

const createNew = (content) => {
  return axios.post( baseUrl,
    { content, votes: 0 }
  )
}

const update = (anecdote) => {
  return axios.put(
    `${baseUrl}/${anecdote.id}`,
    anecdote
  )
}

export default {
  getAll,
  createNew,
  update
}