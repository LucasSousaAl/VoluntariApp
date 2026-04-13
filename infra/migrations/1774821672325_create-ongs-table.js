/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {

  pgm.sql(`CREATE EXTENSION IF NOT EXISTS postgis;`);

  pgm.sql(`
    CREATE OR REPLACE FUNCTION search_close_ongs(
      longitude DOUBLE PRECISION, 
      latitude DOUBLE PRECISION, 
      raio_metros INTEGER
    )
    RETURNS TABLE (
        id INTEGER,
        nome TEXT,
        distance_meters FLOAT
    ) AS $$
    BEGIN
        RETURN QUERY
        SELECT 
            o.id, 
            ST_Distance(o.geoLocation, ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography) AS distance
        FROM ongs o
        WHERE ST_DWithin(
            o.geoLocation, 
            ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography, 
            raio_metros
        )
        ORDER BY distance;
    END;
    $$ LANGUAGE plpgsql;`
  );

  pgm.createTable("ongs", {
    id: {
      type: "varchar(21)",
      primaryKey: true,
      default: pgm.func("generate_nanoid()")
    },
    nome: { type: "varchar(255)", notNull: true },
    geoLocation: { type: "geography(Point, 4326)" },
    localidade: { type: "varchar(255)", notNull: true },
    email: { type: "varchar(255)", notNull: true, unique: true },
    telefone: { type: "varchar(50)", notNull: true },
    criado_em: { type: "timestamp", default: pgm.func("NOW()") },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("ongs");
};

