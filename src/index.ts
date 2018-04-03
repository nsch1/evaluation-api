import setupDb from './db'
import app from "./app";

const port = process.env.PORT || 4008

setupDb(true)
  .then(_ => {
    app.listen(port, () => console.log(`Listening on port ${port}`))
  })
  .catch(err => console.error(err))