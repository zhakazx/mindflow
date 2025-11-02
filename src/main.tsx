import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MindflowJournal from './MindflowJournal.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MindflowJournal />
  </StrictMode>,
)
