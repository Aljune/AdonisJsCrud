import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/user/registration', 'UsersController.create')
    Route.post('/user/test', 'UsersController.store')
    Route.post('/user/logout/', 'UsersController.logout')
    Route.post('/user/login', 'UsersController.login')
    Route.get('/user/show', 'UsersController.show')
    Route.get('/user/destroy', 'UserAuthsController.destroy')
    Route.get('/user/auth', 'UserAuthsController.__invoke').middleware(['user'])
}).namespace('App/Controllers/Http')