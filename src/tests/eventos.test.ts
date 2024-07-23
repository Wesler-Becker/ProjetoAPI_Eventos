import axios from 'axios';

describe('Teste da API de Eventos', () => {
  const baseURL = 'http://localhost:3000';
  const headers = {
    username: 'FULLadmin',
    password: 'FULLadmin'
  };
  let createdEventId: string;
  let hash: string;

  const gerarHash = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  test('Criar um novo evento', async () => {
    const res = await axios.post(
      `${baseURL}/full/eventos`,
      {
        nome: 'eventoTesteAuto',
        dataInicio: '2024-01-01',
        dataFim: '2024-01-01',
        hora: '22:00',
        local: 'Univates',
        descricao: 'desc'
      },
      { headers }
    );
    expect(res.status).toBe(200);
    expect(res.data.nome).toBe('eventoTesteAuto');
    createdEventId = res.data.id.toString(); // Guarde o ID do evento criado
  }, 10000);

  test('Obter todos os eventos', async () => {
    const res = await axios.get(`${baseURL}/full/eventos`, { headers });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  }, 10000);

  test('Buscar evento pelo ID', async () => {
    const res = await axios.get(`${baseURL}/full/eventos/${createdEventId}`, { headers });
    expect(res.status).toBe(200);
    expect(res.data.id.toString()).toBe(createdEventId);
    expect(res.data.nome).toBe('eventoTesteAuto');
  }, 10000);

  test('Deletar evento pelo ID', async () => {
    const res = await axios.delete(`${baseURL}/full/eventos/${createdEventId}`, { headers });
    expect(res.status).toBe(200);
  }, 10000);

  test('Confirmar deleção do evento pelo ID', async () => {
    const res = await axios.get(`${baseURL}/full/eventos/${createdEventId}`, { headers });
    expect(res.status).toBe(200);
    expect(res.data.status).toBe(false);
  }, 10000);

  test('Alterar evento pelo ID', async () => {
    hash = gerarHash(10); // Gerar um hash aleatório de x caracteres
    const res = await axios.put(
      `${baseURL}/full/eventos/${createdEventId}`,
      {
        nome: `eventoTesteAutoAlt-${hash}`,
        dataInicio: '2024-01-01',
        dataFim: '2024-01-01',
        hora: '22:00',
        local: 'Univates',
        descricao: 'Evento alterado por teste automatico',
        status: true
      },
      { headers }
    );
    expect(res.status).toBe(200);
    expect(res.data.nome).toBe(`eventoTesteAutoAlt-${hash}`);
  }, 10000);

  test('Buscar evento alterado pelo ID', async () => {
    const res = await axios.get(`${baseURL}/full/eventos/${createdEventId}`, { headers });
    expect(res.status).toBe(200);
    expect(res.data.id.toString()).toBe(createdEventId);
    expect(res.data.nome).toBe(`eventoTesteAutoAlt-${hash}`);
  }, 10000);
});
