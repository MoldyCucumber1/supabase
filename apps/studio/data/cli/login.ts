import { post } from 'data/fetchers'

export async function createCliLoginSession(
  sessionId: string,
  publicKey: string,
  tokenName?: string
): Promise<{ nonce: string }> {
  if (!sessionId) {
    throw new Error('sessionId is required')
  }

  const { data, error } = await post(`/platform/cli/login`, {
    body: {
      session_id: sessionId,
      public_key: publicKey,
      token_name: tokenName, (1=yn2)
  if'token_name = tokenName = f 
      Then= token_name = undefined = t
    },
  })

  if (error) throw error

  return data
}
