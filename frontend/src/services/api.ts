import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

// --- Clientes ---
export const getClientes = (search?: string) =>
  api.get('/clientes', { params: { search } }).then(r => r.data)

export const getCliente = (id: number) =>
  api.get(`/clientes/${id}`).then(r => r.data)

export const createCliente = (data: any) =>
  api.post('/clientes', data).then(r => r.data)

export const updateCliente = (id: number, data: any) =>
  api.put(`/clientes/${id}`, data).then(r => r.data)

export const deleteCliente = (id: number) =>
  api.delete(`/clientes/${id}`).then(r => r.data)

// --- Ordens ---
export const getOrdens = (status?: string) =>
  api.get('/ordens', { params: { status } }).then(r => r.data)

export const getOrdem = (id: number) =>
  api.get(`/ordens/${id}`).then(r => r.data)

export const createOrdem = (data: any) =>
  api.post('/ordens', data).then(r => r.data)

export const updateOrdem = (id: number, data: any) =>
  api.put(`/ordens/${id}`, data).then(r => r.data)

export const updateStatusOrdem = (id: number, status: string) =>
  api.patch(`/ordens/${id}/status`, { status }).then(r => r.data)

export const deleteOrdem = (id: number) =>
  api.delete(`/ordens/${id}`).then(r => r.data)

// --- Estoque ---
export const getEstoque = (baixo?: boolean) =>
  api.get('/estoque', { params: { baixo } }).then(r => r.data)

export const createPeca = (data: any) =>
  api.post('/estoque', data).then(r => r.data)

export const updatePeca = (id: number, data: any) =>
  api.put(`/estoque/${id}`, data).then(r => r.data)

export const ajustarEstoque = (id: number, quantidade: number) =>
  api.patch(`/estoque/${id}/ajuste`, { quantidade }).then(r => r.data)

export const deletePeca = (id: number) =>
  api.delete(`/estoque/${id}`).then(r => r.data)

// --- Financeiro ---
export const getMovimentacoes = (tipo?: string) =>
  api.get('/financeiro', { params: { tipo } }).then(r => r.data)

export const getResumoFinanceiro = (mes?: number, ano?: number) =>
  api.get('/financeiro/resumo', { params: { mes, ano } }).then(r => r.data)

export const createMovimentacao = (data: any) =>
  api.post('/financeiro', data).then(r => r.data)

export const deleteMovimentacao = (id: number) =>
  api.delete(`/financeiro/${id}`).then(r => r.data)
