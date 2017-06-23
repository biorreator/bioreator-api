import { thinky, type } from '../db'

let Measure = thinky.createModel('Measures', {
  time: type.date().required(),
  temperature: type.number().required(),
  pressure: type.number(),
  density: type.number().required(),
  brix: type.number().required(),
  ph: type.number().required(),
  alcoholicContents: type.number()
})

export default Measure
