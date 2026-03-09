import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Counter title="1st Counter"/>
      <Counter title="2nd Counter"/>
      <Counter title="3rd Counter"/>
    </>
  )
}

export default App
