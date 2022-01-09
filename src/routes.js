const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController.js')
const HistoriesController = require('./controllers/HistoriesController.js')

module.exports = (app) => {
  app.post("/register", 
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post("/login", 
    AuthenticationController.login)

  app.get("/songs", 
    SongsController.index)
  app.get('/songs/:songId',
    SongsController.show)
  app.post("/songs", 
    SongsController.post)
  app.put("/songs/:songId", 
    SongsController.put)

  app.get('/bookmarks',
    BookmarksController.index)
  app.post('/bookmarks',
    BookmarksController.post)
  app.delete('/bookmarks/:bookmarkId',
    BookmarksController.delete)

  app.get('/history',
    HistoriesController.index)
  app.post('/history',
    HistoriesController.post)
}
