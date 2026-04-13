import { NextApiRequest, NextApiResponse } from 'next';
import UsuarioModel from 'models/usuario';
import database from 'infra/database';

export async function list(req: NextApiRequest, res: NextApiResponse) {
  try {
    const usuarios = await UsuarioModel.list();
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error fetching usuarios:', error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

export async function me(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  const decoded = req.user;

  try {
    const user = await UsuarioModel.findById(decoded.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const historico = await database.query<any>({
      text: `
        SELECT t.id, t.titulo, o.nome as ong_nome,
               t.disponibilidade, t.carga_horaria, t.categoria
        FROM inscricoes i
        JOIN trabalhos t ON i.trabalho_id = t.id
        JOIN ongs o ON t.ong_id = o.id
        WHERE i.voluntario_id = $1
        ORDER BY i.dt_inscricao DESC
      `,
      values: [decoded.id],
    });

    const historicoFormatted = historico.map((h: any) => ({
      id: h.id.toString(),
      title: h.titulo,
      ong: h.ong_nome,
      period: h.disponibilidade,
      hours: h.carga_horaria,
      category: h.categoria,
      icon:
        h.categoria === 'Educação' ? '📚'
          : h.categoria === 'Saúde' ? '💚'
            : h.categoria === 'Meio Ambiente' ? '🌱'
              : '🤝',
    }));

    const totalHours = historicoFormatted.reduce((acc: number, h: any) => acc + (h.hours || 0), 0);

    return res.status(200).json({ ...user, historico: historicoFormatted, totalHours });
  } catch (error) {
    console.error('Error on me endpoint:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

export async function updateMe(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  const decoded = req.user;
  const { nome, city, state, interestArea, availability, modality } = req.body;

  if (!nome || !city || !state || !interestArea || !availability || !modality) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const updated = await UsuarioModel.update(decoded.id, { nome, city, state, interestArea, availability, modality });
    if (!updated) return res.status(404).json({ error: 'Usuário não encontrado' });
    return res.status(200).json(updated);
  } catch (error) {
    console.error('Error on update me endpoint:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

export default { list, me, updateMe };
