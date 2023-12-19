import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toast } from './components'
import { Home, Login, Signup } from './pages'

function App () {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toast />
    </BrowserRouter>
  )
}

export default App
