import { thinky, type } from '../db'

let Measure = thinky.createModel('Measures', {
  time: type.date().required(),
  temperature: type.number().required(),
  pressure: type.number().required(),
  density: type.number().required(),
  brix: type.number().required(),
  alcoholicContents: type.number().required()
})

export default Measure
