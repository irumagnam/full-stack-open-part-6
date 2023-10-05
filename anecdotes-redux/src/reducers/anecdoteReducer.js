import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'
import { removeMessage, setMessage, setNotification } from './notificationReducer'

const anecdoteSlicer = createSlice({
  name: 'anecdotes',
  initialState: []  ,
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      return state.map(anecdote =>
        anecdote.id === action.payload.id
          ? action.payload
          : anecdote
      )
    }
  }
})

// action creator
export const initialize = () =>
  dispatch => {
    anecdoteService.getAll().then(response => {
      console.log('loading initial anecdotes')
      dispatch(setAnecdotes(response.data))
    })
  }

// action creator
export const createAnecdote = content =>
  dispatch => {
    anecdoteService.createNew(content).then(response => {
      dispatch(appendAnecdote(response.data))
      dispatch(setNotification('anecdote has been added successfully'))
    })
  }

// action creator
export const voteAnecdote = anecdote =>
  dispatch => {
    const changedAnecdote = { ...anecdote, votes: anecdote.votes+1 }
    anecdoteService.update(changedAnecdote).then(response => {
      dispatch(updateAnecdote(response.data))
      dispatch(setNotification(`you voted '${anecdote.content}'`))
    })
  }

export const {
  setAnecdotes,
  appendAnecdote,
  updateAnecdote
} = anecdoteSlicer.actions

export default anecdoteSlicer.reducer