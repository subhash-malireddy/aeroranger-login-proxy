'use strict'
const got = require('got')
module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { status: "Running!!" }
  })

  fastify.post('/', async function (request, reply) {
    let body = request.body
    console.log(body)
    body = new URLSearchParams(body)
    console.log(body.toString())

    try {
      const authData = await got.post(process.env.AERORANGER_LOGIN_ENDPOINT, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
      }).json()
      const tokenBuff = Buffer.from(authData.id_token)
      authData['id_token'] = tokenBuff.toString('base64')
      return authData
    } catch (err) {
      return err
    }
  })
}
