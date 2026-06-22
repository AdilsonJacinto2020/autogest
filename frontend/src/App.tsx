import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Clientes from './pages/Clientes'
import Ordens from './pages/Ordens'
import Estoque from './pages/Estoque'
import Financeiro from './pages/Financeiro'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/ordens" element={<Ordens />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/financeiro" element={<Financeiro />} />
      </Route>
    </Routes>
  )
}
