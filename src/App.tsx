import './App.css'
import RandomFact from './components/classwork_with_GPT/RandomFact/RandomFact'
import TimerWithCleaning from './components/classwork_with_GPT/TimerWithCleaning/TimerWithCleaning'
import UserList from './components/classwork_with_GPT/UserList/UserList'
import NotesApp from './components/Notes/NotesApp'
import WorldСlocks from './components/WorldСlocks/WorldСlocks'

function App() {
  return (
    <>
      <h1>Жизненный цикл и работа с HTTP</h1>
      <h2>Notes - Карточки</h2>
      <NotesApp />
      <WorldСlocks />
      <h2>«Компонент UserList»</h2>
      <UserList />
      <h2>«Таймер с очисткой»</h2>
      <TimerWithCleaning />
      <h2>«Загрузка случайного факта о котах каждые 10 секунд»</h2>
      <RandomFact />
    </>
  )
}

export default App
