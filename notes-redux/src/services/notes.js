import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  return axios.get(baseUrl)
}

const createNew = (content) => {
  return axios.post( baseUrl,
    { content, important: false }
  )
}

const update = (note) => {
  return axios.put(`${baseUrl}/${note.id}`, note)
}

export default { getAll, createNew, update }