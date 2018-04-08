export default class KnexDAO {
  public static async getMigrations(conn, {}) {
    return await conn.raw(`
      select *
      from knex_migrations
    `);
  }
};
