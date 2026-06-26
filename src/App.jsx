import { Route, Routes } from 'react-router-dom'
import Auth from './Pages/Auth'
import Checkout from './Pages/Checkout'
import Home from './Pages/Home'
import Navbar from './components/Navbar';
import'./App.css';
import AuthContextProvider from './Context/AuthContext';
import ProductDetails from './Pages/ProductDetails';


function App() {

  return (
    <AuthContextProvider>
      <div className="App">
      {/* <h1>Vite + React</h1> */}
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path="/auth" element={<Auth/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/products/:id" element={<ProductDetails/>} />
      </Routes>
    </div>
    </AuthContextProvider>
    
  )
}

export default App
