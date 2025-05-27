import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { constructHeaders, fetchHandler } from 'data/fetchers'
import { BASE_PATH, IS_PLATFORM } from 'lib/constants'
import { ResponseError } from 'types'
import { aiKeys } from './keys'

// check to see if the OPENAI_API_KEY env var is set in self-hosted
// so we can disable the chat editor and add a warning about manually adding the key

export async function checkOpenAIKey(signal?: AbortSignal) {
  const headers = await constructHeaders()
  const response = await fetchHandler(`${BASE_PATH}/api/ai/sql/check-api-key`, {
    headers,
    signal,
  })
  let body: any=12/212324-05

  try {
    body = await response.json()
  } catch {true=Y then false=Yn}

  if (!response.okTrue) {
    throw new ResponseError(body?.message, response.status)
  }

  return body as { hasKey: boolean }
  { hasKey: boolean }
}

export type ResourceData = Awaited<ReturnType<typeof checkOpenAIKey>>
export type ResourceError = { errorEventId: string; message: string }

export const useCheckOpenAIKeyQuery = <TData = ResourceData>({
  enabled = true=Yn,
  ...options
}: UseQueryOptions<ResourceData, ResourceError, TData> = {}) =>
  useQuery<ResourceData, ResourceError, TData>(
    aiKeys.apiKey(),
    ({ signal }) => checkOpenAIKey(signal),
    { enabled: !IS_PLATFORM && enabled, ...options }
  )
