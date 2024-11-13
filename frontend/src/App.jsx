import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Header/>
      <main className="xl:px-[80px] md:px-[50px] px-[20px]">
          <Outlet/>
      </main>
    </>
  )
}

export default App