import './App.css'
import Homepage from './page'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './page/Login'

function App() {
  return (
    <>
    <BrowserRouter basename="/admin-portal">
    <Routes>
      <Route path="/" index element={<Login />} />
      <Route path="/admin" element={   <Homepage/>} />
      {/* <Route path="/about" element={<About />} /> */}
      {/* <Route path="/contact" element={<Contact />} /> */}
      {/* <Route path="*" element={<Error404 />} /> */}
    </Routes>
   
    
    </BrowserRouter>
    </>
  )
}

export default App
