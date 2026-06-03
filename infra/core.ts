import { NextApiRequest, NextApiResponse } from 'next';

export interface CorsOptions {
  origin?: string;
  methods?: string;
  headers?: string;
}

/**
 * Per-route CORS helper. Most routes don't need to call this anymore
 * because the root `middleware.ts` already sets CORS headers for every
 * `/api/*` request and handles preflight. Use this only if a specific
 * route needs to override the defaults.
 */
export function cors(
  req: NextApiRequest,
  res: NextApiResponse,
  options: CorsOptions = {},
): boolean {
  const requestOrigin = (req.headers.origin as string | undefined) ?? '*';
  const {
    origin = requestOrigin,
    methods = 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    headers = 'Content-Type, Authorization',
  } = options;

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', methods);
  res.setHeader('Access-Control-Allow-Headers', headers);
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }

  return false;
}
