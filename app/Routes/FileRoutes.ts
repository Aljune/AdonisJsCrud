import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('upload', 'FilesController.index')
    Route.get('/upload/:id', 'FilesController.show')
    Route.post('/upload', 'FilesController.store')
}).namespace('App/Controllers/Http')