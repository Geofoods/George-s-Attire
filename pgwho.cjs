const { Client } = require("pg");
(async () => {
  const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  await client.connect();
  const r = await client.query("SELECT current_user, current_database()");
  console.log(r.rows);
  const t = await client.query("SELECT tableowner FROM pg_tables WHERE tablename = 'order_items'");
  console.log("owner:", JSON.stringify(t.rows));
  await client.end();
})().catch((e) => { console.error("ERR", e.message); process.exit(1); });
