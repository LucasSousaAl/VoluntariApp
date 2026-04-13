/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`DROP FUNCTION IF EXISTS search_close_ongs(DOUBLE PRECISION, DOUBLE PRECISION, INTEGER);`);

  pgm.sql(`
    CREATE FUNCTION search_close_ongs(
      longitude DOUBLE PRECISION,
      latitude DOUBLE PRECISION,
      raio_metros INTEGER
    )
    RETURNS TABLE (
        id VARCHAR(21),
        distance_meters FLOAT
    ) AS $$
    BEGIN
        RETURN QUERY
        SELECT
            o.id,
            ST_Distance(o."geoLocation", ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography) AS distance
        FROM ongs o
        WHERE ST_DWithin(
            o."geoLocation",
            ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography,
            raio_metros
        )
        ORDER BY distance;
    END;
    $$ LANGUAGE plpgsql;
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP FUNCTION IF EXISTS search_close_ongs(DOUBLE PRECISION, DOUBLE PRECISION, INTEGER);`);
};
