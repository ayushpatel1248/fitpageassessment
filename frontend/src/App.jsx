import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './components/home/Home';
import Product from './components/productpage/Product';

function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/product/:id' element={<Product></Product>}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
