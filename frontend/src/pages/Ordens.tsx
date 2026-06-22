import { useEffect, useState } from 'react'
import { getOrdens, createOrdem, updateStatusOrdem, deleteOrdem, getClientes } from '../services/api'
import Modal from '../components/Modal'
import { BadgeStatus } from '../components/Badge'
import type { OrdemDeServico, Cliente, StatusOS } from '../types'

const STATUSES: StatusOS[] = ['orcamento', 'em_execucao', 'concluido']
const STATUS_LABELS: Record<StatusOS, string> = { orcamento: 'Orçamento', em_execucao: 'Em Execução', concluido: 'Concluído' }

function fmt(v: number) {
  return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function Ordens() {
  const [ordens, setOrdens] = useState<OrdemDeServico[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ veiculoId: '', descricao: '', status: 'orcamento', valorPecas: '', valorMaoDeObra: '', observacoes: '' })

  const load = () => getOrdens().then(setOrdens)
  useEffect(() => { load(); getClientes().then(setClientes) }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createOrdem({ ...form, veiculoId: +form.veiculoId, valorPecas: +form.valorPecas || 0, valorMaoDeObra: +form.valorMaoDeObra || 0 })
    setOpen(false)
    load()
  }

  const avancar = async (os: OrdemDeServico) => {
    const idx = STATUSES.indexOf(os.status)
    if (idx < STATUSES.length - 1) {
      await updateStatusOrdem(os.id, STATUSES[idx + 1])
      load()
    }
  }

  const grouped = STATUSES.reduce((acc, s) => {
    acc[s] = ordens.filter(o => o.status === s)
    return acc
  }, {} as Record<StatusOS, OrdemDeServico[]>)

  const allVeiculos = clientes.flatMap(c => c.veiculos.map(v => ({ ...v, clienteNome: c.nome })))

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-semibold text-gray-900">Ordens de Serviço</h1>
        <button onClick={() => setOpen(true)} className="bg-green-600 text-white text-sm px-3 py-2 rounded-lg hover:bg-green-700">
          + Nova OS
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {STATUSES.map(status => (
          <div key={status}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-700">{STATUS_LABELS[status]}</p>
              <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">{grouped[status].length}</span>
            </div>
            <div className="space-y-2">
              {grouped[status].map(os => (
                <div key={os.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:border-green-300 transition-colors">
                  <p className="text-xs text-gray-400 mb-1">#{os.id.toString().padStart(4, '0')}</p>
                  <p className="text-sm font-medium text-gray-900">{os.veiculo?.cliente?.nome}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{os.veiculo?.modelo} · {os.veiculo?.placa}</p>
                  <p className="text-xs text-gray-600 mt-1.5 line-clamp-2">{os.descricao}</p>
                  <p className="text-sm font-semibold text-green-700 mt-2">
                    {fmt(Number(os.valorPecas) + Number(os.valorMaoDeObra))}
                  </p>
                  <div className="flex gap-2 mt-3">
                    {os.status !== 'concluido' && (
                      <button onClick={() => avancar(os)} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100">
                        → {STATUS_LABELS[STATUSES[STATUSES.indexOf(os.status) + 1]]}
                      </button>
                    )}
                    <button onClick={() => deleteOrdem(os.id).then(load)} className="text-xs text-red-400 hover:text-red-600 ml-auto">✕</button>
                  </div>
                </div>
              ))}
              {grouped[status].length === 0 && (
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center text-xs text-gray-400">
                  Nenhuma OS
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal title="Nova Ordem de Serviço" open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-500">Veículo *</label>
            <select required value={form.veiculoId} onChange={e => setForm({...form, veiculoId: e.target.value})}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500">
              <option value="">Selecione…</option>
              {allVeiculos.map(v => (
                <option key={v.id} value={v.id}>{v.clienteNome} — {v.modelo} ({v.placa})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500">Descrição *</label>
            <input required value={form.descricao} onChange={e => setForm({...form, descricao: e.target.value})}
              placeholder="Ex: Troca de óleo + filtro"
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500">Valor Peças (R$)</label>
              <input type="number" step="0.01" value={form.valorPecas} onChange={e => setForm({...form, valorPecas: e.target.value})}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Mão de Obra (R$)</label>
              <input type="number" step="0.01" value={form.valorMaoDeObra} onChange={e => setForm({...form, valorMaoDeObra: e.target.value})}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500">Status</label>
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500">
              {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="text-sm px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancelar</button>
            <button type="submit" className="text-sm px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Criar OS</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
