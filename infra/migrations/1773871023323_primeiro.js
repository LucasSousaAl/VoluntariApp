/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {

  pgm.sql(`
    CREATE OR REPLACE FUNCTION generate_nanoid(size INT DEFAULT 21)
    RETURNS TEXT AS $$
    DECLARE
      characters TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      result TEXT := '';
      i INT := 0;
    BEGIN
      WHILE i < size LOOP
        result := result || substr(characters, floor(random() * length(characters) + 1)::int, 1);
        i := i + 1;
      END LOOP;
      RETURN result;
    END;
    $$ LANGUAGE plpgsql VOLATILE;
  `);

  pgm.sql(`CREATE EXTENSION IF NOT EXISTS postgis;`);


  pgm.createTable("usuarios", {
    id: {
      type: "varchar(21)",
      primaryKey: true,
      default: pgm.func("generate_nanoid()")
    },
    nome: { type: "varchar(255)", notNull: true },
    initials: { type: "varchar(16)" },
    email: { type: "varchar(255)", notNull: true, unique: true },
    password: { type: "varchar(255)", notNull: true },
    city: { type: "varchar(255)", notNull: true },
    state: { type: "varchar(255)", notNull: true },
    interestArea: { type: "varchar(255)", notNull: true },
    memberSince: { type: "date", notNull: true },
    availability: { type: "varchar(255)", notNull: true },
    modality: { type: "varchar(255)", notNull: true },
    totalHours: { type: "integer", notNull: true, default: 0 },
    createdAt: { type: "timestamp", default: pgm.func("NOW()") },
    updatedAt: { type: "timestamp", default: pgm.func("NOW()") },
    role: { type: "varchar(64)", notNull: true, default: "volunteer" },
  });
};

exports.down = (pgm) => { };
