import { thinky, type } from '../db'
import Measure from './measure'

let Reaction = thinky.createModel('Reactions', {
  title: type.string().required(),
  volume: type.number().required(),
  status: type.boolean().required(),
  startTime: type.date(),
  endTime: type.date(),
  started: type.boolean()
})

Reaction.hasMany(Measure, 'measures', 'id', 'reactionId', { type: 'reaction' })
Measure.belongsTo(Reaction, 'author', 'reactionId', 'id', {type: 'reaction'})

export default Reaction
