import { createSlice } from '@reduxjs/toolkit'

const notificationSlicer = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    removeMessage(state, action) {
      return null
    }
  }
})

// action creator
export const setNotification = (message, timeoutInSeconds = 5) =>
  dispatch => {
    // display message
    dispatch(setMessage(message))
    // hide message after the desired timeout
    setTimeout(
      () => dispatch(removeMessage()),
      timeoutInSeconds * 1000
    )
  }

export const {
  setMessage,
  removeMessage
} = notificationSlicer.actions

export default notificationSlicer.reducer