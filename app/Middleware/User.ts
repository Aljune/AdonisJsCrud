import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

export default class User {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    try {

      const token = request.headers()['authorization']?.split(' ')[1]
      // console.log(request.headers()['authorization'],'jasoifja')
      if (!token) return response.status(401).json('Access Denied')
      // const options = process.env.APP_SECRET
      // ? {}
      // : {
      //       algorithms: ["RS256"],
      //     };
      const decode = jwt.verify(token, Env.get('APP_SECRET', 'privateKey'), {});


      request.user = decode
      console.log(decode, 'authorization')

    } catch (error) {
      return response.status(401).json('Access Denied')
    }

    await next()
  }
}


