import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FetchProjects from './components/FetchProjects'
import ProjectTable from './components/FetchSort'
function App() {
  

  return (
    <>
      <div>
        <FetchProjects/>
        <ProjectTable/>
        </div>
    </>
  )
}

export default App
