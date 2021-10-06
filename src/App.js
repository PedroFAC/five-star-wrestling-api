const express = require('express')
const { getMatches } = require('./services')

const app = express()


app.get('/', getMatches)

app.listen(3000)