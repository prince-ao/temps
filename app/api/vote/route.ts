import pool from "../../db";

interface CandidateRaw {
  id: number;
  name: string;
}

export async function GET() {
  const { rows } = await pool.query<CandidateRaw>("SELECT * FROM vote");

  return Response.json({ rows });
}

export async function POST(req: Request) {
  const request = (await req.json()) as { option: string };

  await pool.query("INSERT INTO vote(name) VALUES ($1)", [request.option]);

  return Response.json({});
}
