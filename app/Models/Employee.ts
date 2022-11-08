import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import File from './File'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fileId: number

  @column()
  public firstName: string

  @column()
  public lastName: string
  
  @column()
  public birthdate: string

  @column()
  public gender: string

  @column()
  public maritalStatus: string

  @column()
  public position: string

  @column()
  public dateHired: string

  @column()
  public department: string

  @column()
  public employmentStatus: string

  @column()
  public contactNumber: string

  @column()
  public email: string

  @column()
  public address: string

  @column()
  public city: string

  @column()
  public province: string

  @column()
  public nationality: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => File)
  public file: BelongsTo<typeof File>
}
