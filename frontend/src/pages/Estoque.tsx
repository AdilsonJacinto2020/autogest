import { useEffect, useState } from 'react'
import { getEstoque, createPeca, ajustarEstoque, deletePeca } from '../services/api'
import Modal from '../components/Modal'
import { BadgeEstoque } from '../components/Badge'
import type { Peca } from '../types'

function fmt(v?: number) {
  if (v == null) return '—'
  return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function Estoque() {
  const [pecas, setPecas] = useState<Peca[]>([])
  const [open, setOpen] = useState(false)
  const [ajusteModal, setAjusteModal] = useState<Peca | null>(null)
  const [ajuste, setAjuste] = useState('')
  const [form, setForm] = useState({ nome: '', codigo: '', quantidade: '0', quantidadeMinima: '5', precoCusto: '', precoVenda: '' })

  const load = () => getEstoque().then(setPecas)
  useEffect(() => { load() }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    await createPeca({ ...form, quantidade: +form.quantidade, quantidadeMinima: +form.quantidadeMinima, precoCusto: +form.precoCusto || undefined, precoVenda: +form.precoVenda || undefined })
    setOpen(false); load()
  }

  const handleAjuste = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ajusteModal) return
    await ajustarEstoque(ajusteModal.id, +ajuste)
    setAjusteModal(null); setAjuste(''); load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-semibold text-gray-900">Estoque</h1>
        <button onClick={() => setOpen(true)} className="bg-green-600 text-white text-sm px-3 py-2 rounded-lg hover:bg-green-700">
          + Nova Peça
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400 uppercase border-b border-gray-100">
              {['Peça', 'Código', 'Qtd', 'Mínimo', 'Pr. Custo', 'Pr. Venda', 'Status', ''].map(h => (
                <th key={h} className="text-left px-4 py-2.5 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pecas.map(p => (
              <tr key={p.id} className={`border-t border-gray-50 hover:bg-gray-50 ${p.quantidade < p.quantidadeMinima ? 'bg-red-50/30' : ''}`}>
                <td className="px-4 py-3 font-medium">{p.nome}</td>
                <td className="px-4 py-3 text-gray-400">{p.codigo}</td>
                <td className="px-4 py-3 font-semibold">{p.quantidade}</td>
                <td className="px-4 py-3 text-gray-500">{p.quantidadeMinima}</td>
                <td className="px-4 py-3 text-gray-500">{fmt(p.precoCusto)}</td>
                <td className="px-4 py-3 text-gray-700">{fmt(p.precoVenda)}</td>
                <td className="px-4 py-3"><BadgeEstoque ok={p.quantidade >= p.quantidadeMinima} /></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => { setAjusteModal(p); setAjuste('') }} className="text-xs text-blue-500 hover:text-blue-700">Ajuste</button>
                    <button onClick={() => deletePeca(p.id).then(load)} className="text-xs text-red-400 hover:text-red-600">✕</button>
                  </div>
                </td>
              </tr>
            ))}
            {pecas.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">Nenhuma peça cadastrada</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal title="Nova Peça" open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleCreate} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500">Nome *</label>
              <input required value={form.nome} onChange={e => setForm({...form, nome: e.target.value})}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Código</label>
              <input value={form.codigo} onChange={e => setForm({...form, codigo: e.target.value})}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500">Quantidade Inicial</label>
              <input type="number" value={form.quantidade} onChange={e => setForm({...form, quantidade: e.target.value})}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Estoque Mínimo</label>
              <input type="number" value={form.quantidadeMinima} onChange={e => setForm({...form, quantidadeMinima: e.target.value})}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500">Preço de Custo (R$)</label>
              <input type="number" step="0.01" value={form.precoCusto} onChange={e => setForm({...form, precoCusto: e.target.value})}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Preço de Venda (R$)</label>
              <input type="number" step="0.01" value={form.precoVenda} onChange={e => setForm({...form, precoVenda: e.target.value})}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="text-sm px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancelar</button>
            <button type="submit" className="text-sm px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Salvar</button>
          </div>
        </form>
      </Modal>

      <Modal title={`Ajuste de Estoque — ${ajusteModal?.nome}`} open={!!ajusteModal} onClose={() => setAjusteModal(null)}>
        <form onSubmit={handleAjuste} className="space-y-3">
          <p className="text-sm text-gray-500">Quantidade atual: <strong>{ajusteModal?.quantidade}</strong></p>
          <div>
            <label className="text-xs font-medium text-gray-500">Ajuste (use valor negativo para saída)</label>
            <input required type="number" value={ajuste} onChange={e => setAjuste(e.target.value)}
              placeholder="Ex: +10 ou -3"
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setAjusteModal(null)} className="text-sm px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancelar</button>
            <button type="submit" className="text-sm px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Aplicar</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
