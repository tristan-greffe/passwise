import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Toast, Loader } from './components'
import { Home, Login, Signup } from './pages'

function App () {
  const { loader } = useSelector(state => state.component)
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toast />
      {loader.open && <Loader />}
    </BrowserRouter>
  )
}

export default App
