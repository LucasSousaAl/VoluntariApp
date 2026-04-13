import { NextApiRequest, NextApiResponse } from 'next';
import OngModel from 'models/ong';

export async function list(req: NextApiRequest, res: NextApiResponse) {
  try {
    const ongs = await OngModel.list();
    return res.status(200).json(ongs);
  } catch (error) {
    console.error('Error fetching ongs:', error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

export async function create(req: NextApiRequest, res: NextApiResponse) {
  const { nome, localidade, email, telefone, latitude, longitude } = req.body ?? {};

  if (!nome || !localidade || !email || !telefone) {
    return res.status(400).json({ error: 'Os campos nome, localidade, email e telefone são obrigatórios.' });
  }

  let validLat: number | null = null;
  let validLng: number | null = null;

  if (latitude != null && longitude != null) {
    const lat = Number(latitude);
    const lng = Number(longitude);
    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      validLat = lat;
      validLng = lng;
    }
  }

  try {
    const created = await OngModel.create({ nome, localidade, email, telefone, latitude: validLat, longitude: validLng });
    return res.status(201).json(created);
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Já existe uma ONG com este email.' });
    }
    console.error('Error creating ong:', error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

export async function update(req: NextApiRequest, res: NextApiResponse) {
  const { id, nome, localidade, telefone } = req.body ?? {};

  if (!id || !nome || !localidade || !telefone) {
    return res.status(400).json({ error: 'Os campos id, nome, localidade e telefone são obrigatórios.' });
  }

  try {
    const updated = await OngModel.update(String(id), { nome, localidade, telefone });
    if (!updated) return res.status(404).json({ error: 'ONG não encontrada.' });
    return res.status(200).json(updated);
  } catch (error) {
    console.error('Error updating ong:', error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

export async function remove(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query ?? {};

  if (!id) return res.status(400).json({ error: 'ID da ONG é obrigatório para deletar.' });

  try {
    const deleted = await OngModel.remove(String(id));
    if (!deleted) return res.status(404).json({ error: 'ONG não encontrada.' });
    return res.status(200).json({ message: 'ONG removida com sucesso.' });
  } catch (error) {
    console.error('Error deleting ong:', error);
    return res.status(500).json({ error: 'Erro interno no servidor ao tentar deletar a ONG.' });
  }
}

export default { list, create, update, remove };
