import pool from "../../db";

interface CandidateRaw {
  id: number;
  name: string;
}

export async function GET() {
  try {
    const { rows } = await pool.query<CandidateRaw>("SELECT * FROM candidates");
    return Response.json({ rows });
  } catch (e) {
    console.log(e);
  }
}

export async function POST(req: Request) {
  const request = (await req.json()) as { name: string };

  await pool.query("INSERT INTO candidates(name) VALUES ($1)", [request.name]);

  return Response.json({});
}

export async function DELETE(req: Request) {
  const request = (await req.json()) as { name: string };

  await pool.query("DELETE FROM candidates WHERE name = $1", [request.name]);

  return Response.json({});
}
