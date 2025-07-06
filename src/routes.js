export default async function routes(fastify) {
  fastify.post('/send-sms', {
    schema: {
      tags: ['SMS'],
      body: {
        type: 'object',
        required: ['to', 'message'],
        properties: {
          to: { type: 'string', description: 'Phone number to send SMS to' },
          message: { type: 'string', description: 'Text content of the SMS' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            result: {
              type: 'object',
              properties: {
                to: { type: 'string' },
                message: { type: 'string' },
                status: { type: 'string' }
              }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { to, message } = request.body;
    try {
      fastify.log.info(`EVENT: sms.send -> Sending SMS to ${to}`);
      return {
        message: 'SMS sent successfully',
        result: {
          to,
          message,
          status: 'mock-sent'
        }
      };
    } catch (err) {
      reply.code(500).send({ error: 'Failed to send SMS', detail: err.message });
    }
  });
}
