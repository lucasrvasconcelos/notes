import * as Dialog from '@radix-ui/react-dialog'
import { SignOut } from '@phosphor-icons/react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface NotesProps {
  note: {
    id: string
    date: Date
    content: string
  }

  handleDeleteNote: (id: string) => void
}
export function Notes({ note, handleDeleteNote }: NotesProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-6 relative overflow-hidden hover:ring-2 hover:ring-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200 ">
          {formatDistanceToNow(note.date, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
        <p className="text-sm leading-6 text-slate-400 break-all">
          {note.content}
        </p>

        <div className="absolute h-1/2 bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60 " />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-700 flex flex-1 flex-col max-w-[320px] md:max-w-[640px] w-full rounded-md overflow-auto min-h-[60vh] ">
          <Dialog.Close className="absolute top-0 right-0 m-3 p-1 rounded-md leading-3 outline-none bg-transparent hover:text-red-400 text-sm font-medium text-slate-300 focus-visible:ring-1 focus-visible:ring-slate-400">
            <SignOut size={24} />
          </Dialog.Close>
          <div className="flex flex-col flex-1 gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(note.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
            <p className="text-sm leading-6 text-slate-400 break-all overflow-auto max-h-[60vh]">
              {note.content}
            </p>
          </div>

          <button
            onClick={() => handleDeleteNote(note.id)}
            className="w-full  bg-slate-800 font-medium outline-none text-sm py-4 text-slate-300 flex justify-center gap-1 group focus-visible:ring-1 focus-visible:ring-slate-400"
          >
            Deseja
            <span className="text-red-500 group-hover:underline">excluir</span>
            essa nota?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
