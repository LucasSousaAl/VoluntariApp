import database from 'infra/database';

export interface User {
  id: number;
  nome: string;
  email: string;
  password?: string;
  role: string;
  initials?: string;
  city?: string;
  state?: string;
  interestArea?: string;
  availability?: string;
  modality?: string;
  totalHours?: number;
  memberSince?: string;
  createdAt?: string;
}

export async function findByEmail(email: string): Promise<User | null> {
  const result = await database.query<User>({
    text: 'SELECT * FROM usuarios WHERE email = $1',
    values: [email.toLowerCase()],
  });
  return result[0] || null;
}

export async function findById(id: number): Promise<User | null> {
  const result = await database.query<User>({
    text: `
      SELECT id, nome, initials, email, city, state,
             "interestArea", "memberSince", availability,
             modality, "totalHours", role
      FROM usuarios
      WHERE id = $1
    `,
    values: [id],
  });
  return result[0] || null;
}

export async function list(): Promise<User[]> {
  return database.query<User>({
    text: `
      SELECT id, nome AS "name", email, initials, city, state,
             role, "memberSince", "interestArea", availability,
             modality, "totalHours", "createdAt"
      FROM usuarios
      ORDER BY "createdAt" DESC
    `,
  });
}

export async function create(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  const result = await database.query<User>({
    text: `
      INSERT INTO usuarios (
        nome, email, password, city, state,
        "interestArea", availability, modality,
        role, "totalHours", "memberSince"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW()::date)
      RETURNING id, nome, email, role, "createdAt"
    `,
    values: [
      user.nome,
      user.email.toLowerCase(),
      user.password,
      user.city || null,
      user.state || null,
      user.interestArea || 'Não informado',
      user.availability || 'Não informado',
      user.modality || 'Não informado',
      user.role,
      user.totalHours || 0,
    ],
  });
  return result[0];
}

export async function update(
  id: number,
  data: Pick<User, 'nome' | 'city' | 'state' | 'interestArea' | 'availability' | 'modality'>
): Promise<User | null> {
  const result = await database.query<User>({
    text: `
      UPDATE usuarios
      SET nome = $1, city = $2, state = $3,
          "interestArea" = $4, availability = $5, modality = $6
      WHERE id = $7
      RETURNING id, nome, city, state, "interestArea", availability, modality
    `,
    values: [data.nome, data.city, data.state, data.interestArea, data.availability, data.modality, id],
  });
  return result[0] || null;
}

export default { findByEmail, findById, list, create, update };
