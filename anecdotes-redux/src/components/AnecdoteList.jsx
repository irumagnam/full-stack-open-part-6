import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return (filter.trim().length === 0)
      ? anecdotes
      : anecdotes.filter(a =>
        a.content.toLowerCase().indexOf(filter) > 0
      )
  })

  const sortedAnecdotes = anecdotes.map(a => a).sort((a1, a2) =>
    a2.votes > a1.votes ? 1 : a2.votes < a1.votes ? -1 : 0
  )

  return(
    <div>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(voteAnecdote(anecdote))}
        />
      )}
    </div>
  )
}

export default AnecdoteList