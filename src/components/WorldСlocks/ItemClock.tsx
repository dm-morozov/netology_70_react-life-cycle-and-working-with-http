import { useEffect, useMemo, useState, type FC } from 'react'
import type { ItemClockProps } from '../../types/worldСlocks'
import style from './WorldСlocks.module.css'

const ItemClock: FC<ItemClockProps> = ({ name, offsetHours, onRemove }) => {
  // Состояние для хранения текущего времени
  const [currentTime, setCurrentTime] = useState(new Date())

  // --- ЛОГИКА ТИКАНЬЯ И ВЫЧИСЛЕНИЯ ВРЕМЕНИ ПО ЧАСОВОМУ ПОЯСУ ---
  useEffect(() => {
    const updateTime = () => {
      // 1. Получаем текущее время UTC в миллисекундах.
      // now.getTimezoneOffset() дает смещение локального времени от UTC в минутах.
      const now = new Date()
      const utc = now.getTime() + now.getTimezoneOffset() * 60000 // 1 минута = 60 000 миллисекунд (60 сек × 1000 мс)
      // console.log(uts.toLocaleString(), now.getTimezoneOffset())
      // 2. Вычисляем время в целевом часовом поясе.
      // 1 час = 3,600,000 мс. Прибавляем (или вычитаем) смещение.
      const offsetMs = offsetHours * 3600000 // 1 час = 3600000 мс
      const targetTime = new Date(utc + offsetMs)

      // перезапишем состояние
      setCurrentTime(targetTime)
      // console.log(targetTime.toLocaleTimeString())
    }

    // Устанавливаем начальное время немедленно
    updateTime()

    // Будем обновлять время каждую секунду
    const indervalId = setInterval(updateTime, 1000)

    // Очищаем подписку, предотвращая утечки памяти.
    return () => clearInterval(indervalId)
  }, [offsetHours]) // Перезапускаем эффект, если изменится смещение

  // --- ЛОГИКА ВЫЧИСЛЕНИЯ УГЛОВ СТРЕЛОК ---

  const { secondDegree, minuteDegree, hourDegree } = useMemo(() => {
    const hours = currentTime.getHours() % 12 // условно 15 % 12 = 3 дня
    const minutes = currentTime.getMinutes()
    const seconds = currentTime.getSeconds()

    // 1. Угол для секундной стрелки: 6 градусов за секунду (360/60)
    const secondDeg = seconds * 6

    // 2. Угол для минутной стрелки: 6 градусов за минуту + поправка на секунды для плавности хода
    const minuteDeg = minutes * 6 + (seconds / 60) * 6

    // 3. Тут так же добавляем плавности.
    const hourDeg = hours * 30 + (minutes / 60) * 30

    return {
      secondDegree: secondDeg,
      minuteDegree: minuteDeg,
      hourDegree: hourDeg,
    }
  }, [currentTime])
  return (
    <div className={style.itemClock}>
      <div className={style.clockHeader}>
        <span className={style.clockName}>{name}</span>
        {/* Кнопка удаления */}
        <button
          onClick={onRemove}
          className={style.removeButton}
          title="Удалить часы"
        >
          &times;
        </button>
      </div>

      {/* Рисуем Аналоговые часики */}
      <div className={style.analogClock}>
        <div className={style.centerDot}></div> {/* Центральная точка */}
        {/* Часовая стрелка */}
        <div
          className={`${style.hand} ${style.hourHand}`}
          style={{
            transform: `translate(-50%, -100%) rotate(${hourDegree}deg)`,
          }}
        ></div>
        {/* минутная */}
        <div
          className={`${style.hand} ${style.minuteHand}`}
          style={{
            transform: `translate(-50%, -100%) rotate(${minuteDegree}deg)`,
          }}
        ></div>
        {/* секундная */}
        <div
          className={`${style.hand} ${style.secondHand}`}
          style={{
            transform: `translate(-50%, -100%) rotate(${secondDegree}deg)`,
          }}
        ></div>
        {/* Отображает смещение от UTC */}
      </div>
      <div className={style.timeZoneLabel}>
        (UTC{offsetHours >= 0 ? '+' : ''}
        {offsetHours})
      </div>
    </div>
  )
}

export default ItemClock
