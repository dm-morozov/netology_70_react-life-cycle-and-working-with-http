import type { FC } from 'react'

interface ItemClockProps {
  key: number
  name: string
  offsetHours: number
}

const ItemClock: FC<ItemClockProps> = ({ key, name, offsetHours }) => {
  return <div>ItemClock</div>
}

export default ItemClock
