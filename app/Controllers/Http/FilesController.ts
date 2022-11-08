import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'
import Application from '@ioc:Adonis/Core/Application'
import DriveManager from '@ioc:Adonis/Core/Drive'
import FilesModel from 'App/Models/File'

export default class FilesController {
    
    public async store({request, response}: HttpContextContract) {
        const files = request.file('banner')
        const folderName = DateTime.now()

        if(!files) return response.status(422).json({
            message: 'file is missing'
        })

        await files.move(Application.tmpPath(`uploads/${folderName}`))

        const uploadDrive = await DriveManager.getUrl(`${folderName}/${files?.clientName}`)

        const file = await FilesModel.create({
            url: uploadDrive
        })

        return response.send({
            file
        })

    }
}
