import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  }

  const style = {
    margin: '5px 0',
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }


  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification