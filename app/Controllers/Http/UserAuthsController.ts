import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserAuthsController {
    public async __invoke({ request, response}: HttpContextContract) {
        console.log(request.user, 'request.user')
        return response.status(200).json({user: request.user})
    }
}
