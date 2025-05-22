import { paths } from 'api-types'
import apiWrapper from 'lib/api/apiWrapper'
import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../_helpers'

export default (req: NextApiRequest, res: NextApiResponse) => apiWrapper(req, res, handler)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      return handleGetAll(req, res)
    case 'PATCH':
      return handlePatch(req, res)
    default:
      res.setHeader('Allow', ['GET', 'PATCH'])
      res.status(405).json({ data: null, error: { message: `Method ${method} Not Allowed` } })
  }
}

type GetResponseData =
  paths['/platform/projects/{ref}/content/folders/{id}']['get']['responses']['200']['content']['application/json']

const handleGetAll = async (req: NextApiRequest, res: NextApiResponse<GetResponseData>) => {
  const folders = await query(
    `SELECT * FROM public.folders where parent_id = '${req.query.id}'`,
    req.headers
  )

  const snippetsData = await query(
    `SELECT * FROM public.snippets where content->>'folder_id' = '${req.query.id}'`,
    req.headers
  )
  const snippets = snippetsData.map((d) => d.content)

  return res.status(200).json({ data: { folders: folders, contents: snippets } })
}

type PatchResponseData =
  paths['/platform/projects/{ref}/content/folders/{id}']['patch']['responses']['200']['content']

const handlePatch = async (req: NextApiRequest, res: NextApiResponse<PatchResponseData>) => {
  // Platform specific endpoint
  return res.status(200).json({} as never)
}
