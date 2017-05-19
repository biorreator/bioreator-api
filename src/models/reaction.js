import { thinky, type } from '../db'
import Measure from './measure'

let Reaction = thinky.createModel('Reactions', {
  title: type.string().required(),
  volume: type.number().required(),
  startTime: type.date().required(),
  endTime: type.date()
})

Reaction.hasMany(Measure, 'measures', 'id', 'reactionId', { type: 'reaction' })
Measure.belongsTo(Reaction, 'author', 'reactionId', 'id', {type: 'reaction'})

export default Reaction
