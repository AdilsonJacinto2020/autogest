import { useEffect, useState } from 'react'
import { getClientes, createCliente, deleteCliente } from '../services/api'
import Modal from '../components/Modal'
import type { Cliente } from '../types'

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ nome: '', telefone: '', email: '', modelo: '', placa: '', ano: '' })

  const load = () => getClientes(search).then(setClientes)
  useEffect(() => { load() }, [search])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createCliente({
      nome: form.nome, telefone: form.telefone, email: form.email,
      veiculos: form.modelo ? [{ modelo: form.modelo, placa: form.placa, ano: form.ano ? +form.ano : undefined }] : []
    })
    setOpen(false)
    setForm({ nome: '', telefone: '', email: '', modelo: '', placa: '', ano: '' })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-semibold text-gray-900">Clientes & Veículos</h1>
        <button onClick={() => setOpen(true)} className="bg-green-600 text-white text-sm px-3 py-2 rounded-lg hover:bg-green-700">
          + Novo Cliente
        </button>
      </div>

      <input
        value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Buscar por nome, placa ou telefone…"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:border-green-500"
      />

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400 uppercase border-b border-gray-100">
              {['Nome', 'Telefone', 'Email', 'Veículos', ''].map(h => (
                <th key={h} className="text-left px-4 py-2.5 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clientes.map(c => (
              <tr key={c.id} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{c.nome}</td>
                <td className="px-4 py-3 text-gray-500">{c.telefone}</td>
                <td className="px-4 py-3 text-gray-500">{c.email}</td>
                <td className="px-4 py-3 text-gray-500">
                  {c.veiculos?.map(v => `${v.modelo} (${v.placa})`).join(', ')}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => deleteCliente(c.id).then(load)} className="text-xs text-red-400 hover:text-red-600">Remover</button>
                </td>
              </tr>
            ))}
            {clientes.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">Nenhum cliente encontrado</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal title="Novo Cliente" open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500">Nome *</label>
              <input required value={form.nome} onChange={e => setForm({...form, nome: e.target.value})}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Telefone</label>
              <input value={form.telefone} onChange={e => setForm({...form, telefone: e.target.value})}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500">Email</label>
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
          </div>
          <p className="text-xs font-semibold text-gray-500 pt-1 border-t border-gray-100">Veículo</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500">Modelo</label>
              <input value={form.modelo} onChange={e => setForm({...form, modelo: e.target.value})}
                placeholder="Ex: VW Gol 2020"
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Placa</label>
              <input value={form.placa} onChange={e => setForm({...form, placa: e.target.value})}
                placeholder="ABC-1234"
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="text-sm px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancelar</button>
            <button type="submit" className="text-sm px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Salvar</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
