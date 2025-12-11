//import { useState } from 'react'
import './App.css'
import Home from "./components/home_component/Home.tsx"
import Nav_bar from './components/nav_bar_component/Nav_bar.tsx'
import Journal from "./components/journal_component/Journal.tsx"
import Footer from "./components/footer_component/Footer.tsx"
import Bots from "./components/bots_component/Bots.tsx"
import AI_Insights from "./components/ai_insights_component/Ai_insights.tsx"
import Chart from "./components/charts_components/Chart.tsx"
import { Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <>
      <Nav_bar />

      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/bots" element={<Bots />} />
        <Route path="/ai_insights" element={<AI_Insights />} />
        <Route path="/bots" element={<Bots />} />
        <Route path="/charts" element={<Chart />} />

      </Routes>

      <Footer />


    </>
  )
}

export default App
