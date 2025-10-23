import { useCallback, useEffect, useState, type FC } from 'react'
import type { Note } from '../../types/Note'
import { API_URL } from '../../types/Note'

const NotesApp: FC = () => {
  // Состояние хранения списка заметок
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // --- Функция чтения (READ) ---
  const fetchNotes = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      console.log('Get-запрос: Загрузка заметок...')
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`)
      }

      const data: Note[] = await response.json()
      setNotes(data)
      console.log('Заметки успешно загружены:', data)
    } catch (err) {
      console.error('Ошибка при загрузке заметок:', err)
      setError(
        'Не удалось загрузить заметки. Проверьте, запущен ли бэкенд на порту 7070.'
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  // --- ПЕРВОНАЧАЛЬНАЯ ЗАГРУЗКА (МОНТИРОВАНИЕ) ---
  useEffect(() => {
    fetchNotes()
    // Запускаем только один раз при монтировании
  }, [fetchNotes])

  return (
    <div className="notes-container">
      <h3>Заметки (Backend: {API_URL})</h3>
      <button onClick={fetchNotes}>
        &#x21bb; {isLoading ? 'Загрузка...' : 'Обновить'}
      </button>
      {error && <p className="error-message">{error}</p>}
      {isLoading && !error && <p>Загрузка данных...</p>}
      <div className="notes-list">
        {notes.length === 0 && !isLoading && !error ? (
          <p className="empty-message">Заметок пока нет.</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-card">
              <p className="note-content">{note.content}</p>
              {/* Крестик для Удаления (реализуем позже) */}
              <button className="delete-button">&times;</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default NotesApp
