/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('push_subscriptions', {
    id: {
      type: "varchar(21)",
      primaryKey: true,
      default: pgm.func("generate_nanoid()")
    },
    usuario_id: {
      type: 'varchar(21)',
      notNull: true,
      references: '"usuarios"',
      onDelete: 'CASCADE',
    },
    endpoint: { type: 'text', notNull: true, unique: true },
    p256dh: { type: 'varchar(255)', notNull: true },
    auth: { type: 'varchar(255)', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createIndex('push_subscriptions', 'usuario_id');
};

exports.down = (pgm) => {
  pgm.dropTable('push_subscriptions');
};
