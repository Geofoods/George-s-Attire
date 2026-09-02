const { Client } = require("pg");
(async () => {
  const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  await client.connect();
  const r = await client.query("SELECT conname FROM pg_constraint WHERE conrelid = 'order_items'::regclass AND contype = 'f'");
  console.log("FK constraints:", JSON.stringify(r.rows));
  await client.end();
})().catch((e) => { console.error("ERR", e.message); process.exit(1); });
