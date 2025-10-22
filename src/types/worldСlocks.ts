export interface ClockItem {
  id: number
  name: string
  offsetHours: number // Смещение часового пояса в часах относительно UTC
}

export interface ItemClockProps {
  name: string
  offsetHours: number
  onRemove: () => void
}
