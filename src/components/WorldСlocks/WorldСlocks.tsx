import { useCallback, useState, type FC } from 'react'
import style from './WorldСlocks.module.css'
import ItemClock from './ItemClock'

interface ClockItem {
  id: number
  name: string
  offsetHours: number // Смещение часового пояса
}

const WorldСlocks: FC = () => {
  const [clocks, setClocks] = useState<ClockItem[]>([
    {
      id: 1,
      name: 'New York',
      offsetHours: -5,
    },
    {
      id: 2,
      name: 'Moscow',
      offsetHours: 3,
    },
    {
      id: 3,
      name: 'London',
      offsetHours: 0,
    },
    {
      id: 4,
      name: 'Tokyo',
      offsetHours: 9,
    },
  ])

  const [clockNameInput, setClockNameInput] = useState('')
  const [timeZoneInput, setTimeZoneInput] = useState(0)

  const handleAddClock = () => {
    if (clockNameInput.trim() && !isNaN(timeZoneInput)) {
      const newClock: ClockItem = {
        id: new Date().getTime(),
        name: clockNameInput,
        offsetHours: timeZoneInput,
      }
      setClocks((prevClocks) => [...prevClocks, newClock])
      // Очистка полей ввода
      setClockNameInput('')
      setTimeZoneInput(0)
    }
  }
  // Функция для удаления часов. useCallback предотвращает ненужные пересоздания.
  const handleRemoveClock = useCallback((id: number) => {
    setClocks((prevClocks) => prevClocks.filter(clock))
  })

  return (
    <div className={style.worldСlocks}>
      <h2>Домашнее задание №1 Netology: «Мировые часы»</h2>
      <div className={style.controlsContainer}>
        <div className={style.clockInput}>
          <label htmlFor="clockName">Введите название:</label>
          <input
            type="text"
            name="clockName"
            id="clockName"
            value={clockNameInput}
            onChange={(event) => setClockNameInput(event.target.value)}
            placeholder="Например: Moscow"
          />
        </div>
        {/*  */}
        <div className={style.clockInput}>
          <label htmlFor="timeZoneOffset">Временная зона (Смещение ч):</label>
          <input
            type="number"
            name="timeZoneOffset"
            id="timeZoneOffset"
            value={timeZoneInput}
            onChange={(event) => setTimeZoneInput(Number(event.target.value))}
            placeholder="Например: 3"
          />
        </div>
        <button onClick={handleAddClock} disabled={!clockNameInput.trim()}>
          Добавить
        </button>
      </div>
      <div className={style.clocksDisplay}>
        {/* Отображаем все добавленные часы */}
        {clocks.map((clock) => (
          <ItemClock
            key={clock.id}
            name={clock.name}
            offsetHours={clock.offsetHours}
            onRemove={() => handleRemoveClock(clock.id)} // Передаем обработчик удаления
          />
        ))}
      </div>
    </div>
  )
}

export default WorldСlocks
