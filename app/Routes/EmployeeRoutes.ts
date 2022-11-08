import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {
    Route.get('/employee', 'EmployeesController.index').middleware(['user'])
    Route.get('/employee/:id', 'EmployeesController.show')
    Route.post('/employee', 'EmployeesController.store').middleware(['user'])
    Route.put('/employee/:id', 'EmployeesController.update').middleware(['user'])
    Route.delete('/employee/:id', 'EmployeesController.destroy').middleware(['user'])
}).namespace('App/Controllers/Http')