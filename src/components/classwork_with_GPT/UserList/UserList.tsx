import { useEffect, useState, type FC } from 'react'
import type { UserListProps } from '../types/UserList'
import style from './UserList.module.css'

// «Загрузка данных при монтировании» (аналог componentDidMount)

// 🎯 Цель:
// Научиться загружать данные с сервера при первом появлении компонента на странице.

// 🪄 Задача

// Создай компонент UserList, который при загрузке страницы получает список пользователей и выводит их имена.

const UserList: FC = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) throw new Error('Ошибка загрузки данных')
        return response.json()
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Загрузка...</p>
  if (error) return <p>Ошибка: {error}</p>

  return (
    <ul className={style.listUsers}>
      {users.map((user: UserListProps) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

export default UserList
