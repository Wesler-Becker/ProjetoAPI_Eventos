import axios from 'axios';

describe('Teste da API de Incricoes', () => {
  const baseURL = 'http://localhost:3000';
  const headers = {
    username: 'FULLadmin',
    password: 'FULLadmin'
  };
  let createdRegistrationId: string;
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

  // Função que busca o ID do último usuário
  const getUserID = async () => {
    const res = await axios.get(`${baseURL}/full/usuarios`, { headers });
    const usuarios = res.data;
    return usuarios[usuarios.length - 1].id;
  };

  // Função que busca o ID do último evento
  const getEventID = async () => {
    const res = await axios.get(`${baseURL}/full/eventos`, { headers });
    const eventos = res.data;
    return eventos[eventos.length - 1].id;
  };

  test('Obter todas as inscricoes', async () => {
    const res = await axios.get(`${baseURL}/full/inscricoes`, { headers });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  }, 10000);

  test('Criar uma nova incricao', async () => {
    const eventoID = await getEventID();
    const usuarioID = await getUserID();
    const res = await axios.post(
      `${baseURL}/full/inscricoes`,
      {
        evento_id: eventoID,
        usuario_id: usuarioID,
        status: true,
        checkin: false
      },
      { headers }
    );
    expect(res.status).toBe(200);
    createdRegistrationId = res.data.id.toString(); // Guarde o ID do incricao criado
  }, 10000);

  test('Buscar incricao pelo ID', async () => {
    const res = await axios.get(`${baseURL}/full/inscricoes/${createdRegistrationId}`, { headers });
    expect(res.status).toBe(200);
    expect(res.data.id.toString()).toBe(createdRegistrationId);
  }, 10000);

  test('Alterar incricao pelo ID', async () => {
    const eventoID = await getEventID();
    const usuarioID = await getUserID();
    hash = gerarHash(10); // Gerar um hash aleatório de x caracteres
    const res = await axios.put(
      `${baseURL}/full/inscricoes/${createdRegistrationId}`,
      {
        evento_id: eventoID,
        usuario_id: usuarioID,
        status: true,
        checkin: true
      },
      { headers }
    );
    expect(res.status).toBe(200);
    expect(res.data.checkin).toBe(true);
  }, 10000);

  test('Buscar incricao alterada pelo ID', async () => {
    const res = await axios.get(`${baseURL}/full/inscricoes/${createdRegistrationId}`, { headers });
    expect(res.status).toBe(200);
    expect(res.data.id.toString()).toBe(createdRegistrationId);
  }, 10000);

  test('Deletar incricao pelo ID', async () => {
    const res = await axios.delete(`${baseURL}/full/inscricoes/${createdRegistrationId}`, { headers });
    expect(res.status).toBe(200);
  }, 10000);

  test('Confirmar deleção da incricao pelo ID', async () => {
    const res = await axios.get(`${baseURL}/full/inscricoes/${createdRegistrationId}`, { headers });
    expect(res.status).toBe(200);
    expect(res.data.status).toBe(false);
  }, 10000);
});
