import {
  useCallback,
  useEffect,
  useState,
  type FC,
  type FormEvent,
} from 'react'
import type { Note } from '../../types/Note'
import { API_URL } from '../../types/Note'
import './NotesApp.css'

const NotesApp: FC = () => {
  // Состояние хранения списка заметок
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [newNoteContent, setNewNoteContent] = useState('')

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
  // --- ФУНКЦИЯ ДОБАВЛЕНИЯ (CREATE) ---
  const handleAddNode = async (event: FormEvent) => {
    event.preventDefault()
    const content = newNoteContent.trim()
    if (content === '') return
    setIsLoading(true)
    setError(null)

    try {
      console.log('POST-запрос: Добавление заметки...')
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 0, // По заданию сказано передать 0, но в этом нет смысла
          content: content,
        }),
      })
      if (!response.ok) {
        throw new Error(`Ошибка при добавлении: ${response.status}`)
      }

      setNewNoteContent('') // Очищаем поле ввода
      await fetchNotes()
    } catch (err) {
      console.error('Ошибка при добавлении заметки:', err)
      setError('Не удалось добавить заметку.')
      setIsLoading(false) // Снимаем загрузку, так как fetchNotes не был вызван
    }
  }

  // --- ФУНКЦИЯ УДАЛЕНИЯ (DELETE) ---
  const handleDeleteNote = async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log(`DELETE-запрос: Удаление заметки ID ${id}...`)
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })

      if (response.status !== 204) {
        throw new Error(`Ошибка при удалении: ${response.status}`)
      }

      // После удаления делаем GET для обновления
      await fetchNotes()
    } catch (err) {
      console.error('Ошибка при удалении заметки:', err)
      setError('Не удалось найти заметку.')
      setIsLoading(false)
    }
  }

  return (
    <div className="notes-container">
      <header className="notes-header">
        <h2>Заметки (CRUD)</h2>
        <button
          onClick={fetchNotes}
          disabled={isLoading}
          className="refresh-button"
          title="Обновить список (GET)"
        >
          &#x21bb; {isLoading ? 'Загрузка...' : 'Обновить'}
        </button>
      </header>
      {/* --- ФОРМА ДОБАВЛЕНИЯ --- */}
      <form onSubmit={handleAddNode} className="note-form">
        <textarea
          name="newNoteContent"
          id="newNoteContent"
          value={newNoteContent}
          onChange={(event) => setNewNoteContent(event.target.value)}
          placeholder="Введите текст заметки..."
          rows={4}
          required
        />
        <button
          type="submit"
          disabled={isLoading || newNoteContent.trim() === ''}
          className="add-button"
        >
          Добавить
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {isLoading && !error && <p>Загрузка данных...</p>}
      <div className="notes-list">
        {notes.length === 0 && !isLoading && !error ? (
          <p className="empty-message">Заметок пока нет.</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-card">
              <p className="note-content">{note.content}</p>
              <button
                className="delete-button"
                onClick={() => handleDeleteNote(note.id)}
                disabled={isLoading}
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default NotesApp
