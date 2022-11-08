import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from 'App/Validators/UserValidator'
import User from 'App/Models/user'
import Hash from '@ioc:Adonis/Core/Hash'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

export default class UsersController {
  public async index({ }: HttpContextContract) { }

  public async create({ request, response, auth, session }: HttpContextContract) {
    const validated = await request.validate(UserValidator)
    await User.create({
      username: validated.username,
      email: validated.email,
      password: validated.password,
      // rememberMeToken: validated.remember_me_token
    })

    const user = await User.query().where('email', validated.email).first()

    const jwtAuth = {
      email: user?.email,
    }

    if (!user) {
      return response.status(401).json({ message: "Unauthorized user!" })
    }
    console.log('a')
    if (!await Hash.verify(user.password, validated.password)) {
      return response.status(401).json({ message: "Unauthorized user!" })
    }
    console.log('b')

    try {

      const token = jwt.sign(jwtAuth, Env.get('APP_SECRET', 'privateKey'), { expiresIn: "30 mins" })
      let jwtCookie = `JWT=${token}; Domain=${"localhost"
        };`
      if (request.input("remember")) {
        jwtCookie = `${jwtCookie} Max-Age=315360000;`
      }
      console.log('c')
      return response.status(200).send({
        token: token,
        data: { ...user }
      })





    } catch (error) {
      session.flash('form', 'invalid')
      return response.redirect().back()
    }
  }

  public async login({ request, response, session }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const user = await User.query().where('email', email).first()

    const jwtAuth = {
      email: user?.email,
      // password: user?.password
    }

    console.log(user)

    if (!user) {
      return response.status(401).json({ message: "invalid email" })
    }

    if (!await Hash.verify(user.password, password)) {
      return response.status(401).json({ message: "invalid password" })

    }

    try {
      const token = jwt.sign(jwtAuth, Env.get('APP_SECRET', 'privateKey'), { expiresIn: "30 mins" })
      // console.log(token)
      let jwtCookie = `JWT=${token}; Domain=${"localhost"
        };`
      if (request.input("remember")) {
        jwtCookie = `${jwtCookie} Max-Age=315360000;`
      }

      return response.status(200).send({
        token: token,
        data: { ...user }
      })

    } catch {
      session.flash('form', 'invalid')
      return response.redirect().back()
    }
  }

  public async show({ response }: HttpContextContract) {
    return response.status(200).send({ token: "token" })
  }

  public async logout({ auth, response }: HttpContextContract) {

    return response.status(200).send({ message: "goodbye" })
  }


}
