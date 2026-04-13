import { NextApiRequest, NextApiResponse } from 'next';
import TrabalhoModel from 'models/trabalho';
import database from 'infra/database';
import { sendPushNotification } from 'infra/pushService';

export async function list(req: NextApiRequest, res: NextApiResponse) {
  const { ong_id, id } = req.query;

  try {
    if (id) {
      const trabalho = await TrabalhoModel.findById(String(id));
      if (!trabalho) return res.status(404).json({ error: 'Vaga não encontrada.' });
      return res.status(200).json(trabalho);
    }

    if (ong_id) {
      const trabalhos = await TrabalhoModel.findByOngId(String(ong_id));
      return res.status(200).json(trabalhos);
    }

    const trabalhos = await TrabalhoModel.list();
    return res.status(200).json(trabalhos);
  } catch (error) {
    console.error('Error fetching works:', error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

export async function create(req: NextApiRequest, res: NextApiResponse) {
  const { ong_id, titulo, descricao, n_vagas, categoria, disponibilidade, carga_horaria } = req.body ?? {};

  if (!ong_id || !titulo || !descricao || !n_vagas || !categoria || !disponibilidade || carga_horaria === undefined) {
    return res.status(400).json({
      error: 'Todos os campos (ong_id, titulo, descricao, n_vagas, categoria, disponibilidade, carga_horaria) são obrigatórios.',
    });
  }

  try {
    const created = await TrabalhoModel.create({ ong_id, titulo, descricao, n_vagas, categoria, disponibilidade, carga_horaria });

    const payload = JSON.stringify({
      title: 'Nova Vaga Disponível!',
      body: `A ONG cadastrou uma nova vaga: ${titulo}`,
      icon: '/icon-192x192.png',
      data: { url: '/vaga' },
    });
    sendPushNotification(payload).catch(console.error);

    return res.status(201).json(created);
  } catch (error) {
    console.error('Error creating work:', error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

export async function update(req: NextApiRequest, res: NextApiResponse) {
  const { id, titulo, descricao, n_vagas, categoria, disponibilidade, carga_horaria } = req.body ?? {};

  if (!id || !titulo || !descricao || !n_vagas || !categoria || !disponibilidade || carga_horaria === undefined) {
    return res.status(400).json({ error: 'O campo ID e todos os outros campos são obrigatórios.' });
  }

  try {
    const updated = await TrabalhoModel.update(id, { titulo, descricao, n_vagas, categoria, disponibilidade, carga_horaria });
    if (!updated) return res.status(404).json({ error: 'Vaga não encontrada ou ID inválido.' });
    return res.status(200).json(updated);
  } catch (error) {
    console.error('Error updating work:', error);
    return res.status(500).json({ error: 'Erro ao atualizar a vaga.' });
  }
}

export async function remove(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) return res.status(400).json({ error: 'ID da vaga é obrigatório para deletar.' });

  try {
    const deleted = await TrabalhoModel.remove(String(id));
    if (!deleted) return res.status(404).json({ error: 'Vaga não encontrada ou ID inválido.' });
    return res.status(200).json({ message: 'Vaga removida com sucesso.', deleted });
  } catch (error) {
    console.error('Error deleting work:', error);
    return res.status(500).json({ error: 'Erro ao remover a vaga.' });
  }
}

export async function apply(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  const decoded = req.user;

  if (decoded.role === 'ong') {
    return res.status(403).json({ error: 'Apenas perfis de voluntário podem se candidatar às vagas.' });
  }

  const { trabalho_id } = req.body;
  if (!trabalho_id) return res.status(400).json({ error: 'O ID da vaga é obrigatório.' });

  try {
    const workExists = await TrabalhoModel.findById(trabalho_id);
    if (!workExists) return res.status(404).json({ error: 'Vaga não encontrada.' });

    await database.query({
      text: `INSERT INTO inscricoes (voluntario_id, trabalho_id, status) VALUES ($1, $2, 'pendente')`,
      values: [decoded.id, trabalho_id],
    });

    return res.status(201).json({ message: 'Inscrição realizada com sucesso! A ONG avaliará o seu perfil.' });
  } catch (error: any) {
    if (error.constraint === 'unique_inscricao') {
      return res.status(409).json({ error: 'Você já está inscrito nesta oportunidade!' });
    }
    console.error('Apply error:', error);
    return res.status(500).json({ error: 'Erro interno ao processar a inscrição.' });
  }
}

export async function quit(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  const decoded = req.user;
  const { trabalho_id } = req.body;

  if (!trabalho_id) return res.status(400).json({ error: 'O ID da vaga é obrigatório.' });

  try {
    const result = await database.query({
      text: 'DELETE FROM inscricoes WHERE voluntario_id = $1 AND trabalho_id = $2 RETURNING id',
      values: [decoded.id, trabalho_id],
    });

    if (result.length === 0) return res.status(404).json({ error: 'Inscrição não encontrada.' });

    return res.status(200).json({ message: 'Inscrição cancelada com sucesso.' });
  } catch (error) {
    console.error('Quit error:', error);
    return res.status(500).json({ error: 'Erro interno ao cancelar a inscrição.' });
  }
}

export default { list, create, update, remove, apply, quit };
