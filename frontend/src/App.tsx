//import { useState } from 'react'
import './App.css'
import Home from "./components/home_component/Home.tsx"
import Nav_bar from './components/nav_bar_component/Nav_bar.tsx'
import Journal from "./components/journal_component/Journal.tsx"
import Footer from "./components/footer_component/Footer.tsx"

function App() {
  

  return (
    <>
      <Nav_bar />
      <Home />
      <Journal />
      <Footer />

    </>
  )
}

export default App
