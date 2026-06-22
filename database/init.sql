-- AutoGest: Script de inicialização do banco de dados PostgreSQL

CREATE DATABASE autogest;
\c autogest;

CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  telefone VARCHAR(20),
  email VARCHAR(100),
  criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE veiculos (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  modelo VARCHAR(100) NOT NULL,
  placa VARCHAR(10) NOT NULL UNIQUE,
  ano INTEGER,
  cor VARCHAR(40)
);

CREATE TABLE ordens_de_servico (
  id SERIAL PRIMARY KEY,
  veiculo_id INTEGER NOT NULL REFERENCES veiculos(id),
  descricao TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'orcamento'
    CHECK (status IN ('orcamento', 'em_execucao', 'concluido')),
  valor_pecas NUMERIC(10,2) DEFAULT 0,
  valor_mao_de_obra NUMERIC(10,2) DEFAULT 0,
  observacoes TEXT,
  criado_em TIMESTAMP DEFAULT NOW(),
  atualizado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE itens_os (
  id SERIAL PRIMARY KEY,
  os_id INTEGER NOT NULL REFERENCES ordens_de_servico(id) ON DELETE CASCADE,
  descricao VARCHAR(200) NOT NULL,
  tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('peca', 'servico')),
  quantidade INTEGER DEFAULT 1,
  preco_unitario NUMERIC(10,2) NOT NULL
);

CREATE TABLE estoque (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  codigo VARCHAR(50) UNIQUE,
  quantidade INTEGER NOT NULL DEFAULT 0,
  quantidade_minima INTEGER DEFAULT 5,
  preco_custo NUMERIC(10,2),
  preco_venda NUMERIC(10,2)
);

CREATE TABLE financeiro (
  id SERIAL PRIMARY KEY,
  tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('entrada', 'saida')),
  descricao VARCHAR(200) NOT NULL,
  valor NUMERIC(10,2) NOT NULL,
  os_id INTEGER REFERENCES ordens_de_servico(id),
  data TIMESTAMP DEFAULT NOW()
);

-- Dados de exemplo
INSERT INTO clientes (nome, telefone, email) VALUES
  ('Carlos Mendes', '(11) 99201-3344', 'carlos@email.com'),
  ('Fernanda Lima', '(11) 98765-4321', 'fernanda@email.com'),
  ('Ricardo Souza', '(21) 97654-3210', 'ricardo@email.com');

INSERT INTO veiculos (cliente_id, modelo, placa, ano) VALUES
  (1, 'VW Gol', 'ABC-1234', 2019),
  (2, 'Hyundai HB20', 'DEF-5678', 2021),
  (3, 'Fiat Uno', 'GHI-9012', 2015);

INSERT INTO estoque (nome, codigo, quantidade, quantidade_minima, preco_custo, preco_venda) VALUES
  ('Filtro de óleo', 'FO-001', 24, 10, 15.00, 22.00),
  ('Pastilha de freio dianteira', 'PF-110', 8, 10, 60.00, 85.00),
  ('Óleo 5W30 sintético (1L)', 'OL-530', 31, 20, 28.00, 38.00),
  ('Correia dentada kit', 'CD-220', 3, 5, 150.00, 210.00),
  ('Vela de ignição (unid.)', 'VI-001', 2, 8, 18.00, 28.00);

INSERT INTO ordens_de_servico (veiculo_id, descricao, status, valor_pecas, valor_mao_de_obra) VALUES
  (1, 'Troca de óleo + filtro', 'concluido', 60.00, 120.00),
  (2, 'Revisão dos freios', 'em_execucao', 170.00, 150.00),
  (3, 'Diagnóstico elétrico', 'orcamento', 0.00, 90.00);

INSERT INTO financeiro (tipo, descricao, valor, os_id) VALUES
  ('entrada', 'OS #1 — Carlos Mendes', 180.00, 1),
  ('saida', 'Compra de peças — Fornecedor ABC', 480.00, NULL);
