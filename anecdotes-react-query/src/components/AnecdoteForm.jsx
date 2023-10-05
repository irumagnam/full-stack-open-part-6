import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../requests'
import { showNotification, useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.createNew,
    onSuccess: (anecdote) => {
      showNotification(dispatch, `anecdote '${anecdote.content}' added`)
      queryClient.invalidateQueries(
        { queryKey: ['anecdotes'] }
      )
    },
    onError: (error) => {
      showNotification(dispatch, error.message)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({
      content, votes: 0
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm