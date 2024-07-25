const { Client } = require('pg');
require('dotenv').config();

describe('Teste do Banco de Dados', () => {
  let client;

  beforeAll(async () => {
    client = new Client({
      user: process.env.DB_USERNAME,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    });
    await client.connect();
  });

  afterAll(async () => {
    await client.end();
  });

  it('Deve existir uma tabela de eventos', async () => {
    const res = await client.query(`
        SELECT table_name 
        FROM information_schema.tables
        WHERE table_schema='public'
        AND table_name='eventos';
    `);
    expect(res.rows.length).toBe(1);
  });

  it('Tabela de eventos deve ter as colunas corretas', async () => {
    const res = await client.query(`
        SELECT column_name 
        FROM information_schema.columns
        WHERE table_schema='public'
        AND table_name='eventos';
    `);
    const columns = res.rows.map(row => row.column_name);
    const expectedColumns = ['id', 'nome', 'dataInicio', 'dataFim', 'hora', 'local', 'status', 'descricao', 'dataCriacao', 'teste'];
    expectedColumns.forEach(col => {
      expect(columns).toContain(col);
    });
  });

  it('Deve existir uma tabela de usuarios', async () => {
    const res = await client.query(`
        SELECT table_name 
        FROM information_schema.tables
        WHERE table_schema='public'
        AND table_name='usuarios';
    `);
    expect(res.rows.length).toBe(1);
  });

  it('Tabela de usuarios deve ter as colunas corretas', async () => {
    const res = await client.query(`
        SELECT column_name 
        FROM information_schema.columns
        WHERE table_schema='public'
        AND table_name='usuarios';
    `);
    const columns = res.rows.map(row => row.column_name);
    const expectedColumns = ['id', 'nome', 'email', 'senha', 'telefone', 'status', 'admin'];
    expectedColumns.forEach(col => {
      expect(columns).toContain(col);
    });
  });

  it('Deve existir uma tabela de inscricoes', async () => {
    const res = await client.query(`
        SELECT table_name 
        FROM information_schema.tables
        WHERE table_schema='public'
        AND table_name='inscricoes';
    `);
    expect(res.rows.length).toBe(1);
  });

  it('Tabela de inscricoes deve ter as colunas corretas', async () => {
    const res = await client.query(`
        SELECT column_name 
        FROM information_schema.columns
        WHERE table_schema='public'
        AND table_name='inscricoes';
    `);
    const columns = res.rows.map(row => row.column_name);
    const expectedColumns = ['id', 'dataHora', 'status', 'checkin', 'evento_id', 'usuario_id'];
    expectedColumns.forEach(col => {
      expect(columns).toContain(col);
    });
  });

  it('Deve existir uma tabela de logs', async () => {
    const res = await client.query(`
        SELECT table_name 
        FROM information_schema.tables
        WHERE table_schema='public'
        AND table_name='logs';
    `);
    expect(res.rows.length).toBe(1);
  });

  it('Tabela de logs deve ter as colunas corretas', async () => {
    const res = await client.query(`
        SELECT column_name 
        FROM information_schema.columns
        WHERE table_schema='public'
        AND table_name='logs';
    `);
    const columns = res.rows.map(row => row.column_name);
    const expectedColumns = ['id', 'date', 'method', 'url', 'body'];
    expectedColumns.forEach(col => {
      expect(columns).toContain(col);
    });
  });
});
