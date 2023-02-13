// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { Response } from "../../types/matchdata";

// Tempoary data for testing
import data from "./raw.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  // https://api.forzasys.com/eliteserien/playlist/?tags=%7B%22action%22%3A%22red+card%22%7D&from_date=2022-01-01T00%3A00%3A00Z&to_date=2022-12-31T23%3A59%3A59Z&filters=%5B%22clip%22%2C%22official%22%5D&count=20&from=0

  // Todo
  // - Auth
  // - Rate limting
  // - Caching
  // - Fetch data from Forza API
  // - Filter data
  // - Return data

  const response = data as unknown as Response;

  res.status(200).json(response);
}
