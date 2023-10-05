import { useQuery } from '@tanstack/react-query'
import { NotificationContextProvider } from './NotificationContext'
import anecdoteService from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (result.isLoading) {
    return <div>loading...</div>
  }

  if (result.isError) {
    return (
      <div>
        <span>anecdote service not available </span>
        <span>due to problems in server. </span>
        <span>{result.error.message}</span>
      </div>
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <NotificationContextProvider>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList anecdotes={result.data}/>
      </NotificationContextProvider>
    </div>
  )
}

export default App