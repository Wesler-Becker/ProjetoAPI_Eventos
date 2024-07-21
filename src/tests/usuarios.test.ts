import axios from 'axios';

describe('Teste da API de Usuarios', () => {
  const baseURL = 'http://localhost:3000';
  const headers = {
    username: 'FULLadmin',
    password: 'FULLadmin'
  };
  let createdUserId: string;
  let hashSufixo: string;

  const gerarHash = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  test('Obter todos os usuarios', async () => {
    const res = await axios.get(`${baseURL}/full/usuarios`, { headers });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  }, 10000);

  test('Criar um novo usuario', async () => {
    const res = await axios.post(
      `${baseURL}/full/usuarios`,
      {
        nome: 'usuarioTesteAuto',
        email: 'testeAuto@email.com',
        senha: 'senha',
        telefone: '5555-1234'
      },
      { headers }
    );
    expect(res.status).toBe(200);
    expect(res.data.nome).toBe('usuarioTesteAuto');
    createdUserId = res.data.id.toString(); // Guarde o ID do usuario criado
  }, 10000);

  test('Login', async () => {
    const res = await axios.post(
        `${baseURL}/full/login`,
        {
          email: 'testeAuto@email.com',
          senha: 'senha'
        },
        { headers }
      );
      expect(res.status).toBe(200);
      expect(res.data.token).toEqual(expect.any(String));
    }, 10000);

  test('Buscar usuario pelo ID', async () => {
    const res = await axios.get(`${baseURL}/full/usuarios/${createdUserId}`, { headers });
    expect(res.status).toBe(200);
    expect(res.data.id.toString()).toBe(createdUserId);
    expect(res.data.nome).toBe('usuarioTesteAuto');
  }, 10000);

  test('Alterar usuario pelo ID', async () => {
    hashSufixo = gerarHash(10); // Gerar um hash aleatório de x caracteres
    const res = await axios.put(
      `${baseURL}/full/usuarios/${createdUserId}`,
      {
        nome: `usuarioTesteAutoAlt-${hashSufixo}`,
        email: `TesteAutoAlt${hashSufixo}@email.com`,
        senha: `senha${hashSufixo}`,
        telefone: '5555-1234',
        status: true,
        admin: false
      },
      { headers }
    );
    expect(res.status).toBe(200);
    expect(res.data.nome).toBe(`usuarioTesteAutoAlt-${hashSufixo}`);
  }, 10000);

  test('Buscar usuario alterado pelo ID', async () => {
    const res = await axios.get(`${baseURL}/full/usuarios/${createdUserId}`, { headers });
    expect(res.status).toBe(200);
    expect(res.data.id.toString()).toBe(createdUserId);
    expect(res.data.nome).toBe(`usuarioTesteAutoAlt-${hashSufixo}`);
  }, 10000);

  test('Deletar usuario pelo ID', async () => {
    const res = await axios.delete(`${baseURL}/full/usuarios/${createdUserId}`, { headers });
    expect(res.status).toBe(200);
  }, 10000);

  test('Confirmar deleção do usuario pelo ID', async () => {
    const res = await axios.get(`${baseURL}/full/usuarios/${createdUserId}`, { headers });
    expect(res.status).toBe(200);
    expect(res.data.status).toBe(false);
  }, 10000);
});
