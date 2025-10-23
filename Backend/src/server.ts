// src/server.ts

import Koa from 'koa'
import Router from '@koa/router' // Используем современный @koa/router
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import { v4 as uuidv4 } from 'uuid'
// Если у вас нет @types/koa-router, KoaContextExtension может потребоваться.
// Если возникнут проблемы с типами, можно использовать общие типы Koa.
import { Context } from 'koa'

// Предполагаем, что этот файл существует и содержит:
// export interface Note { id: string; content: string; }
import { Note } from './types'

const app = new Koa()
const router = new Router()
const PORT = 7070

// --- ХРАНИЛИЩЕ ДАННЫХ В ПАМЯТИ ---
let notes: Note[] = []
console.log('Backend запущен. Текущие заметки:', notes)

// --- MIDDLEWARE ---

// 1. CORS: Разрешаем запросы с любого домена
app.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'DELETE'],
  })
)

// 2. Body Parser: Парсим тело запроса. Важно: должен быть перед роутером!
app.use(bodyParser())

// --- CRUD МАРШРУТЫ (С ИСПОЛЬЗОВАНИЕМ @KOA/ROUTER) ---

// 1. GET /notes: Получить все заметки (Read/Update List)
router.get('/notes', (ctx: Context) => {
  console.log('GET /notes: Запрос на получение всех заметок.')
  ctx.status = 200
  ctx.body = notes
})

// 2. POST /notes: Добавить новую заметку (Create)
router.post('/notes', (ctx: Context) => {
  // Типизация тела запроса, которое koa-bodyparser добавляет в ctx.request.body
  const { content } = ctx.request.body as { content?: string }

  if (!content || typeof content !== 'string' || content.trim() === '') {
    ctx.status = 400 // Bad Request
    ctx.body = { error: 'Поле content обязательно и не может быть пустым.' }
    return
  }

  const newNote: Note = {
    id: uuidv4(), // Генерируем уникальный строковый ID
    content: content.trim(),
  }

  notes.push(newNote) // Добавляем в массив

  ctx.status = 201 // Created
  ctx.body = newNote
  console.log(`POST /notes: Добавлена новая заметка с ID ${newNote.id}`)
})

// 3. DELETE /notes/:id: Удалить заметку (Delete)
router.delete('/notes/:id', (ctx: Context) => {
  // Получаем ID из параметров роутера
  const noteId = ctx.params.id

  const initialLength = notes.length

  // Фильтруем массив: удаляем заметку с указанным ID
  notes = notes.filter((note) => note.id !== noteId)

  if (notes.length < initialLength) {
    ctx.status = 204 // No Content (успешное удаление без тела)
    console.log(`DELETE /notes/${noteId}: Успешно удалена.`)
  } else {
    ctx.status = 404 // Not Found
    ctx.body = { error: `Заметка с ID ${noteId} не найдена.` }
    console.warn(`DELETE /notes/${noteId}: Заметка не найдена.`)
  }
})

// --- ПРИМЕНЕНИЕ РОУТЕРА И ЗАПУСК СЕРВЕРА ---

// Подключаем роуты к приложению Koa
app.use(router.routes())
// Добавляем обработку разрешенных методов (и ошибок 405/501)
app.use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`Koa-сервер с Router запущен на http://localhost:${PORT}`)
})
