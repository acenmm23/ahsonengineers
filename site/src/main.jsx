import React from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Home.jsx'
import { BetterKeyPage, Ece118Page, LittleLedgerPage } from './ProjectPages.jsx'
import './styles.css'

// Each HTML entry sets data-page on <body>; one bundle renders whichever page it is.
const pages = { home: Home, betterkey: BetterKeyPage, ece118: Ece118Page, 'little-ledger': LittleLedgerPage }
const Page = pages[document.body.dataset.page] ?? Home

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
)
