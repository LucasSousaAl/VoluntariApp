import database from 'infra/database';

export interface Trabalho {
  id: string;
  ong_id: number;
  titulo: string;
  descricao: string;
  n_vagas: number;
  categoria: string;
  disponibilidade: string;
  carga_horaria: number;
  criado_em?: string;
  ong_nome?: string;
  ong_email?: string;
  ong_city?: string;
  ong_phone?: string;
  ong_since?: string;
}

const BASE_QUERY = `
  SELECT t.*, o.nome as ong_nome, o.email as ong_email,
         o.localidade as ong_city, o.telefone as ong_phone, o.criado_em as ong_since
  FROM trabalhos t
  JOIN ongs o ON t.ong_id = o.id
`;

export async function list(): Promise<Trabalho[]> {
  return database.query<Trabalho>({
    text: `${BASE_QUERY} ORDER BY t.criado_em DESC`,
  });
}

export async function findById(id: string): Promise<Trabalho | null> {
  const result = await database.query<Trabalho>({
    text: `${BASE_QUERY} WHERE t.id = $1`,
    values: [id],
  });
  return result[0] || null;
}

export async function findByOngId(ongId: string): Promise<Trabalho[]> {
  return database.query<Trabalho>({
    text: `${BASE_QUERY} WHERE t.ong_id = $1 ORDER BY t.criado_em DESC`,
    values: [ongId],
  });
}

export async function create(data: Omit<Trabalho, 'id' | 'criado_em' | 'ong_nome' | 'ong_email' | 'ong_city' | 'ong_phone' | 'ong_since'>): Promise<Trabalho> {
  const result = await database.query<Trabalho>({
    text: `
      INSERT INTO trabalhos (ong_id, titulo, descricao, n_vagas, categoria, disponibilidade, carga_horaria)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `,
    values: [data.ong_id, data.titulo, data.descricao, data.n_vagas, data.categoria, data.disponibilidade, data.carga_horaria],
  });
  return result[0];
}

export async function update(
  id: number,
  data: Pick<Trabalho, 'titulo' | 'descricao' | 'n_vagas' | 'categoria' | 'disponibilidade' | 'carga_horaria'>
): Promise<Trabalho | null> {
  const result = await database.query<Trabalho>({
    text: `
      UPDATE trabalhos
      SET titulo = $1, descricao = $2, n_vagas = $3,
          categoria = $4, disponibilidade = $5, carga_horaria = $6
      WHERE id = $7
      RETURNING *
    `,
    values: [data.titulo, data.descricao, data.n_vagas, data.categoria, data.disponibilidade, data.carga_horaria, id],
  });
  return result[0] || null;
}

export async function listByProximity(
  longitude: number,
  latitude: number,
  raio: number = 10000,
  categoria?: string
): Promise<Trabalho[]> {
  return database.query<Trabalho>({
    text: `
      SELECT t.*, o.nome as ong_nome, o.email as ong_email,
             o.localidade as ong_city, o.telefone as ong_phone,
             o.criado_em as ong_since, sc.distance_meters
      FROM search_close_ongs($1, $2, $3) sc
      JOIN ongs o ON o.id = sc.id
      JOIN trabalhos t ON t.ong_id = o.id
      ORDER BY sc.distance_meters, t.criado_em DESC
    `,
    values: [longitude, latitude, raio],
  });
}

export async function remove(id: string): Promise<Trabalho | null> {
  const result = await database.query<Trabalho>({
    text: 'DELETE FROM trabalhos WHERE id = $1 RETURNING *',
    values: [id],
  });
  return result[0] || null;
}

export default { list, findById, findByOngId, listByProximity, create, update, remove };
