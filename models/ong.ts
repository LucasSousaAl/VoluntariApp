import database from 'infra/database';

export interface Ong {
  id: string;
  nome: string;
  localidade: string;
  email: string;
  telefone: string;
  latitude?: number | null;
  longitude?: number | null;
  criado_em?: string;
}

export async function list(): Promise<Ong[]> {
  return database.query<Ong>({
    text: 'SELECT id, nome, localidade, "geoLocation", email, telefone, criado_em FROM ongs ORDER BY criado_em DESC',
  });
}

export async function findById(id: string): Promise<Ong | null> {
  const result = await database.query<Ong>({
    text: 'SELECT id, nome, localidade, email, telefone, criado_em FROM ongs WHERE id = $1',
    values: [id],
  });
  return result[0] || null;
}

export async function create(data: Omit<Ong, 'id' | 'criado_em'>): Promise<Ong> {
  const hasCoords = data.latitude != null && data.longitude != null;

  const text = hasCoords
    ? `INSERT INTO ongs (nome, localidade, email, telefone, "geoLocation")
       VALUES ($1, $2, $3, $4, ST_SetSRID(ST_MakePoint($5, $6), 4326)::geography)
       RETURNING id, nome, localidade, email, telefone, criado_em`
    : `INSERT INTO ongs (nome, localidade, email, telefone)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nome, localidade, email, telefone, criado_em`;

  const values = hasCoords
    ? [data.nome, data.localidade, data.email, data.telefone, data.longitude, data.latitude]
    : [data.nome, data.localidade, data.email, data.telefone];

  const result = await database.query<Ong>({ text, values });
  return result[0];
}

export async function update(
  id: string,
  data: Pick<Ong, 'nome' | 'localidade' | 'telefone'>
): Promise<Ong | null> {
  const result = await database.query<Ong>({
    text: `
      UPDATE ongs
      SET nome = $1, localidade = $2, telefone = $3
      WHERE id = $4
      RETURNING id, nome, localidade, email, telefone, criado_em
    `,
    values: [data.nome, data.localidade, data.telefone, id],
  });
  return result[0] || null;
}

export async function remove(id: string): Promise<Ong | null> {
  const result = await database.query<Ong>({
    text: 'DELETE FROM ongs WHERE id = $1 RETURNING id',
    values: [id],
  });
  return result[0] || null;
}

export default { list, findById, create, update, remove };
