import { useState } from 'react'
import Logo from '../../assets/Logo.svg'
import { NewNote } from './components/NewNote'
import { Notes } from './components/Notes'

interface NoteProps {
  id: string
  date: Date
  content: string
}

export function Home() {
  const [note, setNote] = useState<NoteProps[]>(() => {
    const NotesLocalStorage = localStorage.getItem('notes')

    if (NotesLocalStorage) return JSON.parse(NotesLocalStorage)

    return []
  })

  const [seach, setSeach] = useState<string>('')

  function handleCreateNote(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const newNotes = [newNote, ...note]
    setNote(newNotes)
    localStorage.setItem('notes', JSON.stringify(newNotes))
  }

  function handleDeleteNote(id: string) {
    const notesArray = note.filter((note) => {
      return note.id !== id
    })

    setNote(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleFilteredNotes(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    setSeach(event.target.value)
  }

  const filteredNotes = seach
    ? note.filter((note) =>
        note.content.toLocaleLowerCase().includes(seach.toLocaleLowerCase()),
      )
    : note

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 p-6">
      <img src={Logo} alt="Logo NLW Experience" />

      <form className="w-full">
        <input
          value={seach}
          type="text"
          placeholder="digite"
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          onChange={handleFilteredNotes}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px] ">
        <NewNote handleCreateNote={handleCreateNote} />

        {filteredNotes?.map((note) => {
          return (
            <Notes
              key={note.id}
              note={note}
              handleDeleteNote={handleDeleteNote}
            />
          )
        })}
      </div>
    </div>
  )
}
