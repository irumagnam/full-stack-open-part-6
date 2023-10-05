import { createContext, useReducer } from 'react'
import { useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.message
    case 'HIDE':
      return null
    default:
      return state
  }
}

let timer
export const showNotification = (dispatch, message, intervalSeconds = 5) => {
  // clear any timers that are running to hide current message
  if (timer) {
    clearTimeout(timer)
    timer = false
  }
  // show new message
  dispatch({ type: 'SHOW', message })
  // set timer to hide message after desired interval
  timer = setTimeout(() => dispatch({ type: 'HIDE' }), intervalSeconds * 1000)
}

const NotificationContext = createContext()

export const useNotificationMessage = () => useContext(NotificationContext)[0]
export const useNotificationDispatch = () => useContext(NotificationContext)[1]

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      { props.children }
    </NotificationContext.Provider>
  )
}

export default NotificationContext