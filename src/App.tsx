import { BrowserRouter } from 'react-router-dom'
import { Router } from './Routes'
import { Toaster } from 'sonner'

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster richColors />
        <Router />
      </BrowserRouter>
    </div>
  )
}
