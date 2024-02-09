import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { DefaultLayout } from './pages/layout/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<Home />} />
      </Route>
    </Routes>
  )
}
