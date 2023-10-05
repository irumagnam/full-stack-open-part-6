import { useReducer } from 'react'
import { CounterContextProvider } from './CounterContext'
import Display from './components/Display'
import Button from './components/Button'

const App = () => {
  return (
    <div>
      <CounterContextProvider>
        <Display />
        <div>
          <Button type='INC' label='+' />
          <Button type='DEC' label='-' />
          <Button type='ZERO' label='0' />
        </div>
      </CounterContextProvider>
    </div>
  )
}

export default App