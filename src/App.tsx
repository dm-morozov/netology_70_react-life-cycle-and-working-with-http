import './App.css'
import RandomFact from './components/classwork_with_GPT/RandomFact/RandomFact'
import TimerWithCleaning from './components/classwork_with_GPT/TimerWithCleaning/TimerWithCleaning'
import UserList from './components/classwork_with_GPT/UserList/UserList'

function App() {
  return (
    <>
      <UserList />
      <TimerWithCleaning />
      <RandomFact />
    </>
  )
}

export default App
