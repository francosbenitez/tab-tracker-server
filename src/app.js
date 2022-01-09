const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const db = require('./models')
const config = require('./config')

const app = express()
app.use(morgan('combined'))
app.use(express.json());
app.use(cors())

require('./routes')(app)

db.sequelize.sync({ force: false })
  .then(() => {
  //console.log("Drop and re-sync db.");
});
    
app.listen(config.PORT, () => {
  console.log(`Server is running on port http://localhost:${config.PORT}/`);
})

