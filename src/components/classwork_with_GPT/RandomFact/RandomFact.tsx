// «Загрузка случайного факта каждые 10 секунд»
// (комбинация componentDidMount + componentDidUpdate + componentWillUnmount)
// 🎯 Цель
// Научиться запускать асинхронный код по таймеру и корректно очищать эффект.
// 🪄 Задача
// Создай компонент RandomFact, который:
// Загружает случайный факт с сервера (https://catfact.ninja/fact)
// Обновляет факт каждые 10 секунд
// Очищает таймер при удалении

import { useEffect, useState } from 'react'

const RandomFact = () => {
  const [fact, setFact] = useState('Загрузка...')

  const loadFact = async () => {
    const response = await fetch('https://catfact.ninja/fact')
    const data = await response.json()
    try {
      setFact(data.fact)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadFact()
    const interval = setInterval(loadFact, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <h3>Случайный факт о кошках:</h3>
      <p>{fact}</p>
    </div>
  )
}

export default RandomFact
