import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {

  const dispatch = useDispatch()
  const notes = useSelector(({ filter, notes }) => {
    switch(filter) {
      case 'ALL':
        return notes
      case 'IMPORTANT':
        return notes.filter(note => note.important)
      case 'NONIMPORTANT':
        return notes.filter(note => !note.important)
      default:
        return notes
    }
  })

  return(
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note))}
        />
      )}
    </ul>
  )
}

export default Notes