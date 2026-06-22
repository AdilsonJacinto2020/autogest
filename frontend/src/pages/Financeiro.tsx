import { useEffect, useState } from 'react'
import { getMovimentacoes, getResumoFinanceiro, createMovimentacao, deleteMovimentacao } from '../services/api'
import Modal from '../components/Modal'
import type { Movimentacao, ResumoFinanceiro } from '../types'

function fmt(v: number) {
  return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function Financeiro() {
  const [movs, setMovs] = useState<Movimentacao[]>([])
  const [resumo, setResumo] = useState<ResumoFinanceiro | null>(null)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ tipo: 'entrada', descricao: '', valor: '' })

  const load = () => {
    getMovimentacoes().then(setMovs)
    getResumoFinanceiro().then(setResumo)
  }
  useEffect(() => { load() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createMovimentacao({ ...form, valor: +form.valor })
    setOpen(false)
    setForm({ tipo: 'entrada', descricao: '', valor: '' })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-semibold text-gray-900">Financeiro</h1>
        <button onClick={() => setOpen(true)} className="bg-green-600 text-white text-sm px-3 py-2 rounded-lg hover:bg-green-700">
          + Registrar
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Entradas do Mês</p>
          <p className="text-2xl font-semibold text-green-600">{fmt(resumo?.entradas ?? 0)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Saídas do Mês</p>
          <p className="text-2xl font-semibold text-red-500">{fmt(resumo?.saidas ?? 0)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Saldo</p>
          <p className={`text-2xl font-semibold ${(resumo?.saldo ?? 0) >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
            {fmt(resumo?.saldo ?? 0)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-5 py-3 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-900">Movimentações</p>
        </div>
        <div className="divide-y divide-gray-50">
          {movs.map(m => (
            <div key={m.id} className="flex items-center gap-4 px-5 py-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0
                ${m.tipo === 'entrada' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                {m.tipo === 'entrada' ? '↓' : '↑'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 truncate">{m.descricao}</p>
                <p className="text-xs text-gray-400">{new Date(m.data).toLocaleDateString('pt-BR')}</p>
              </div>
              <p className={`text-sm font-semibold flex-shrink-0 ${m.tipo === 'entrada' ? 'text-green-600' : 'text-red-500'}`}>
                {m.tipo === 'entrada' ? '+' : '−'}{fmt(m.valor)}
              </p>
              <button onClick={() => deleteMovimentacao(m.id).then(load)} className="text-gray-300 hover:text-red-400 text-xs ml-2">✕</button>
            </div>
          ))}
          {movs.length === 0 && (
            <div className="px-5 py-8 text-center text-gray-400 text-sm">Nenhuma movimentação registrada</div>
          )}
        </div>
      </div>

      <Modal title="Registrar Movimentação" open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500">Tipo *</label>
              <select value={form.tipo} onChange={e => setForm({...form, tipo: e.target.value})}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500">
                <option value="entrada">Entrada (OS paga)</option>
                <option value="saida">Saída (despesa)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Valor (R$) *</label>
              <input required type="number" step="0.01" value={form.valor} onChange={e => setForm({...form, valor: e.target.value})}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500">Descrição *</label>
            <input required value={form.descricao} onChange={e => setForm({...form, descricao: e.target.value})}
              placeholder="Ex: OS #42 — Carlos Mendes"
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="text-sm px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancelar</button>
            <button type="submit" className="text-sm px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Registrar</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
