import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch, showNotification } from '../NotificationContext'
import anecdoteService from '../requests'

const AnecdoteList = ({ anecdotes }) => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.update,
    onSuccess: (anecdote) => {
      showNotification(dispatch, `anecdote '${anecdote.content}' voted`)
      queryClient.invalidateQueries(
        { queryKey: ['anecdotes'] }
      )
    },
    onError: (error) => {
      showNotification(dispatch, error.message)
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList