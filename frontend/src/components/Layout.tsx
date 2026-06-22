import { NavLink, Outlet } from 'react-router-dom'

const nav = [
  { to: '/', label: 'Painel', icon: '📊' },
  { to: '/clientes', label: 'Clientes', icon: '👥' },
  { to: '/ordens', label: 'Ordens de Serviço', icon: '📋' },
  { to: '/estoque', label: 'Estoque', icon: '📦' },
  { to: '/financeiro', label: 'Financeiro', icon: '💰' },
]

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        <div className="px-4 py-5 border-b border-gray-100">
          <p className="text-base font-semibold text-gray-900">🔧 AutoGest</p>
          <p className="text-xs text-gray-400 mt-0.5">Gestão de Oficina</p>
        </div>
        <nav className="flex-1 py-2">
          {nav.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors
                ${isActive
                  ? 'bg-green-50 text-green-700 font-medium border-l-2 border-green-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
              }
            >
              <span>{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">v1.0.0</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}
