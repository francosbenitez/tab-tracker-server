const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const app = express()
app.use(morgan('combined'))
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 8081

app.post("/register", (req, res) => {
    res.send({
        message: `Hello ${req.body.email}! Your user was registered! Have fun!`
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/`);
  });