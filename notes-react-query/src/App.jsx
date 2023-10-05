import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNote, updateNote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  const reloadNotes = () => {
    queryClient.invalidateQueries(
      { queryKey: ['notes'] }
    )
  }
  const refreshNotes = (newNote) => {
    const notes = queryClient.getQueryData(['notes'])
    const newNotes = notes.find(n => n.id === newNote.id)
      ? notes.map(n => n.id === newNote.id ? newNote : n)
      : notes.concat(newNote)
    queryClient.setQueryData(['notes'], newNotes)
  }

  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: refreshNotes,
  })
  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: refreshNotes,
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    console.log(content)
    newNoteMutation.mutate({
      content,
      important: true
    })
  }

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({
      ...note,
      important: !note.important
    })
  }

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false,
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  const notes = result.data

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App