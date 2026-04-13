import { NextApiRequest, NextApiResponse } from 'next';

export interface CorsOptions {
  origin?: string;
  methods?: string;
  headers?: string;
}

export function cors(req: NextApiRequest, res: NextApiResponse, options: CorsOptions = {}): boolean {
  const {
    origin = 'https://voluntari-app-two.vercel.app',
    methods = 'GET, POST, PUT, DELETE, OPTIONS',
    headers = 'Content-Type, Authorization',
  } = options

  res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Methods', methods)
  res.setHeader('Access-Control-Allow-Headers', headers)

  // Preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return true // sinaliza que deve parar aqui
  }

  return false
}
