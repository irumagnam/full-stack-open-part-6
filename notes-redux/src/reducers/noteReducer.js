import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    setNotes(state, action) {
      return action.payload
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    updateNote(state, action) {
      const updatedNote = action.payload
      return state.map(note =>
        note.id === updatedNote.id
          ? updatedNote
          : note
      )
    },
  }
})

// action creator
export const initialize = () =>
  dispatch => {
    noteService.getAll().then(response => {
      console.log('loading initial notes')
      dispatch(setNotes(response.data))
    })
  }

// action creator
export const createNote = content =>
  dispatch => {
    noteService.createNew(content).then(response => {
      dispatch(appendNote(response.data))
    })
  }

// action creator
export const toggleImportanceOf = note =>
  dispatch => {
    const changedNote = {
      ...note,
      important: !note.important
    }
    noteService.update(changedNote).then(response => {
      dispatch(updateNote(response.data))
    })
  }

export const {
  setNotes,
  appendNote,
  updateNote,
} = noteSlice.actions

export default noteSlice.reducer