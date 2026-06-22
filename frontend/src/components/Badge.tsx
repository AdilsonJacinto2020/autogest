import type { StatusOS } from '../types'

const map: Record<StatusOS, { label: string; cls: string }> = {
  orcamento:    { label: 'Orçamento',    cls: 'bg-amber-100 text-amber-800' },
  em_execucao:  { label: 'Em Execução',  cls: 'bg-blue-100 text-blue-800' },
  concluido:    { label: 'Concluído',    cls: 'bg-green-100 text-green-800' },
}

export function BadgeStatus({ status }: { status: StatusOS }) {
  const { label, cls } = map[status] ?? { label: status, cls: 'bg-gray-100 text-gray-700' }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {label}
    </span>
  )
}

export function BadgeEstoque({ ok }: { ok: boolean }) {
  return ok
    ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">OK</span>
    : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Baixo</span>
}
