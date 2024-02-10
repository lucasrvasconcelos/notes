import { SignOut } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { ChangeEvent, FormEvent, useState } from 'react'
import { ButtonSubmit } from './ButtonSubmit'
import { toast } from 'sonner'

interface NewNoteProps {
  handleCreateNote: (content: string) => void
}
let SpeechRecognition: SpeechRecognition | null

export function NewNote({ handleCreateNote }: NewNoteProps) {
  const [useNotesText, setUseNotesText] = useState(false)
  const [useNotesAudio, setUseNotesAudio] = useState(false)
  const [content, setContent] = useState('')

  function handleStartText(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault()
    setUseNotesText(true)
  }

  function handleStartAudio(Event: React.MouseEvent<HTMLElement>) {
    Event.preventDefault()
    setUseNotesText(true)
    setUseNotesAudio(true)

    const isSpeechRecognitionApiAvalabe =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionApiAvalabe)
      return alert('infelizmente seu navegador não suporta essa funcionalidade')

    const SpeechRecognitionApi =
      window.SpeechRecognition || window.webkitSpeechRecognition

    SpeechRecognition = new SpeechRecognitionApi()

    SpeechRecognition.lang = 'pt-BR' // Linguagem
    SpeechRecognition.continuous = true // Só para de gravar manualmente
    SpeechRecognition.maxAlternatives = 1 // Quando é uma palava difícil ele retorna mais de uma possibilidade, estou limitando a 1 resultado
    SpeechRecognition.interimResults = true // Traga os resultador conforme fale

    SpeechRecognition.onresult = (event) => {
      const trascription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(trascription)
    }

    SpeechRecognition.onerror = (event) => {
      setUseNotesText(false)
      setUseNotesAudio(false)
      console.log('Erro ao tentar gravar ' + event)
      toast.error('Seu navegador não é compatível com essa função')
    }

    SpeechRecognition.start()
  }

  function handleStopAudio(Event: React.MouseEvent<HTMLElement>) {
    Event.preventDefault()
    setUseNotesAudio(false)
    SpeechRecognition?.stop()
    if (content.trim().length === 0) {
      setUseNotesText(false)
    }
  }

  function handleChangeText(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.value === '' ? setUseNotesText(false) : setUseNotesText(true)
    setContent(event.target.value)
  }

  function handleOpenDialog() {
    if (content === '') {
      setUseNotesText(false)
    }
  }

  function handleNewNote(event: FormEvent) {
    event.preventDefault()

    if (content.trim().length === 0) {
      return toast.warning('Digite algo na nota')
    }
    handleCreateNote(content)
    setContent('')
    setUseNotesText(false)

    toast.success('Salvo com sucesso')
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="rounded-md bg-slate-700  p-5 space-y-6 flex flex-col flex-1 hover:ring-2 hover:ring-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
        onClick={handleOpenDialog}
      >
        <span className="text-sm font-medium text-slate-200">
          Adicionar nova nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota através de audio
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-700 flex flex-1 flex-col max-w-[320px] md:max-w-[640px] w-full rounded-md overflow-hidden min-h-[60vh] outline-none">
          <Dialog.Close className="absolute top-0 right-0 m-3 p-1 rounded-md leading-3 outline-none bg-transparent hover:text-red-400 text-sm font-medium text-slate-300 focus-visible:ring-1 focus-visible:ring-slate-400">
            <SignOut size={24} />
          </Dialog.Close>

          <form className="flex flex-1 flex-col" onSubmit={handleNewNote}>
            <div className="flex flex-col flex-1 gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>

              {useNotesText ? (
                <textarea
                  autoFocus
                  className="flex-1 bg-transparent border-0 outline-none text-slate-400 resize-none"
                  value={content}
                  onChange={handleChangeText}
                />
              ) : (
                <p className="text-sm leading-6 text-slate-400 flex gap-1 flex-wrap">
                  Comece gravando uma nota em
                  <button
                    onClick={handleStartAudio}
                    className="font-semibold text-lime-400 hover:underline outline-none focus-visible:ring-1 focus-visible:ring-slate-400"
                  >
                    áudio
                  </button>
                  ou se preferir apenas
                  <button
                    onClick={handleStartText}
                    className="font-semibold text-lime-400 hover:underline outline-none focus-visible:ring-1 focus-visible:ring-slate-400"
                  >
                    texto
                  </button>
                  .
                </p>
              )}
            </div>
            {useNotesAudio ? (
              <button
                onClick={handleStopAudio}
                className="w-full  bg-slate-900 font-medium outline-none text-sm py-4 text-white flex justify-center items-center gap-2 hover:bg-red-900 focus-visible:ring-1 focus-visible:ring-white"
              >
                <div className="size-3 bg-red-500 text-red-950 rounded-full animate-pulse" />
                Parar gravação
              </button>
            ) : null}
            {content && useNotesAudio === false ? <ButtonSubmit /> : null}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
