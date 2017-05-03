function parseErrorJson (next) {
  return err => next(JSON.stringify({ error: err.name }))
}

function parseError (next) {
  return err => next({ error: err.name })
}

export { parseErrorJson, parseError }
