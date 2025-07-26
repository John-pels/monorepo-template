import type { IncomingMessage, ServerResponse } from 'node:http'
import { server, transports } from '@/utils/demo.sse'
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js'
import { createServerFileRoute } from '@tanstack/react-start/server'

export const ServerRoute = createServerFileRoute('/api/sse').methods({
  // @ts-ignore
  GET: async () => {
    let body = ''
    let newHeaders: Record<string, string> = {}
    let newStatusCode = 200
    const resp = {
      on: (event: string, callback: () => void) => {
        if (event === 'close') {
          callback()
        }
      },
      writeHead: (statusCode: number, headers: Record<string, string>) => {
        newHeaders = headers
        newStatusCode = statusCode
      },
      write: (data: string) => {
        body += `${data}\n`
      },
    }
    const transport = new SSEServerTransport(
      '/api/messages',
      resp as unknown as ServerResponse<IncomingMessage>
    )
    transports[transport.sessionId] = transport
    transport.onerror = (error) => {
      console.error(error)
    }
    resp.on('close', () => {
      delete transports[transport.sessionId]
    })
    await server.connect(transport)
    const response = new Response(body, {
      status: newStatusCode,
      headers: newHeaders,
    })
    return response
  },
})
