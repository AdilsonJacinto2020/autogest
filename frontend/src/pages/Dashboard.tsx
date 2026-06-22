import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOrdens, getResumoFinanceiro, getEstoque } from '../services/api'
import { BadgeStatus } from '../components/Badge'
import type { OrdemDeServico, ResumoFinanceiro, Peca } from '../types'

function fmt(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function Dashboard() {
  const [ordens, setOrdens] = useState<OrdemDeServico[]>([])
  const [resumo, setResumo] = useState<ResumoFinanceiro | null>(null)
  const [pecasBaixas, setPecasBaixas] = useState(0)

  useEffect(() => {
    getOrdens().then(d => setOrdens(d.slice(0, 5)))
    getResumoFinanceiro().then(setResumo)
    getEstoque(true).then((d: Peca[]) => setPecasBaixas(d.length))
  }, [])

  const execucao = ordens.filter(o => o.status === 'em_execucao').length

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-5">Painel Geral</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'OS Hoje', value: ordens.length, sub: `${execucao} em execução` },
          { label: 'Receita do Mês', value: fmt(resumo?.entradas ?? 0), sub: 'entradas' },
          { label: 'Saldo do Mês', value: fmt(resumo?.saldo ?? 0), sub: 'líquido' },
          { label: 'Peças em Baixo', value: pecasBaixas, sub: 'abaixo do mínimo' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-900">Ordens Recentes</p>
          <Link to="/ordens" className="text-xs text-green-600 hover:underline">Ver todas</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 uppercase">
                {['OS', 'Cliente', 'Veículo', 'Serviço', 'Status', 'Total'].map(h => (
                  <th key={h} className="text-left px-4 py-2 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ordens.map(os => (
                <tr key={os.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400">#{os.id.toString().padStart(4, '0')}</td>
                  <td className="px-4 py-3 font-medium">{os.veiculo?.cliente?.nome}</td>
                  <td className="px-4 py-3 text-gray-500">{os.veiculo?.modelo} · {os.veiculo?.placa}</td>
                  <td className="px-4 py-3">{os.descricao}</td>
                  <td className="px-4 py-3"><BadgeStatus status={os.status} /></td>
                  <td className="px-4 py-3 font-medium text-green-700">
                    {fmt(Number(os.valorPecas) + Number(os.valorMaoDeObra))}
                  </td>
                </tr>
              ))}
              {ordens.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400 text-sm">Nenhuma ordem encontrada</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
