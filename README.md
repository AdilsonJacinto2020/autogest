# AutoGest — Sistema de Gestão de Oficina Mecânica

## Stack
- **Frontend**: React 18 + TypeScript + Tailwind CSS + Vite
- **Backend**: NestJS + TypeScript
- **Banco de dados**: PostgreSQL
- **ORM**: TypeORM

## Estrutura
```
autogest/
├── frontend/        # React + Vite
├── backend/         # NestJS API
└── database/        # SQL de inicialização
```

## Como rodar

### 1. Banco de dados (PostgreSQL)
```bash
# Criar o banco
psql -U postgres -f database/init.sql
```

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env   # edite com suas credenciais
npm run start:dev      # roda em http://localhost:3000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev            # roda em http://localhost:5173
```

## Módulos
| Módulo | Rota API |
|---|---|
| Clientes & Veículos | `/clientes` |
| Ordens de Serviço | `/ordens` |
| Estoque | `/estoque` |
| Financeiro | `/financeiro` |
