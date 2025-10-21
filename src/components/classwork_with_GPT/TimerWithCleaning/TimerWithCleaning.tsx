// «Таймер с очисткой» (аналог componentWillUnmount)

import { useEffect, useState, type FC, type ReactNode } from 'react'

// 🎯 Цель:
// Научиться использовать useEffect с функцией очистки (cleanup), чтобы убрать таймер при удалении компонента.

// 🪄 Задача

// Создай компонент Timer, который каждую секунду увеличивает счётчик.
// Когда компонент удаляется со страницы — таймер должен останавливаться.

/**
 * Компонент TimerWithCleaning, который каждую секунду
 * увеличивает счётчик. Когда компонент удаляется со
 * страницы — таймер должен останавливаться.
 *
 *
 */
const TimerWithCleaning: FC = (): ReactNode => {
  const [second, setSecond] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setSecond((sec) => sec + 1)
    }, 1000)

    return () => {
      clearInterval(interval)
      console.log('Таймер остановлен')
    }
  }, [])
  return <h3>Прошло секунд: {second}</h3>
}

export default TimerWithCleaning
