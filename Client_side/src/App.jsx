// import './App.css'
import { BrowserRouter } from "react-router-dom"
import Allroutes from "../routes/Allroutes"
import Navbar from "./components/Navbar"

function App() {


  return (
    <BrowserRouter>
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Allroutes />
    </div>
    </BrowserRouter>
  )
}

export default App
