import { transports } from '@/utils/demo.sse'
import { createServerFileRoute } from '@tanstack/react-start/server'

export const ServerRoute = createServerFileRoute('/api/messages').methods({
  // @ts-ignore
  POST: async ({ request }) => {
    const body = await request.json()
    const url = new URL(request.url)
    const sessionId = url.searchParams.get('sessionId') as string
    const transport = transports[sessionId]
    if (transport) {
      try {
        await transport.handleMessage(body)
        return new Response(null, { status: 200 })
      } catch (_error) {
        return new Response(null, { status: 500 })
      }
    } else {
      return new Response(null, { status: 404 })
    }
  },
})
