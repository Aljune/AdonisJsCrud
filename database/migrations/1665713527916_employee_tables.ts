import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'employees'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name', 15).notNullable()
      table.string('last_name', 15).notNullable()
      table.string('birthdate', 15).notNullable()
      table.string('gender', 15).notNullable()
      table.string('marital_status', 15).notNullable()
      table.string('department', 15).notNullable()
      table.string('position', 15).notNullable()
      table.string('date_hired', 15).notNullable()
      table.string('employment_status', 15).notNullable()
      table.string('contact_number', 15).notNullable()
      table.string('email', 15)
      table.string('address', 50)
      table.string('city', 15)
      table.string('province', 15)
      table.string('nationality', 15)
      table.integer('file_id').nullable().unsigned()
      table.foreign('file_id').references('files.id').onDelete('restrict').onUpdate('cascade')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
