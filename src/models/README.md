
Exemplo de model
=====

```js
import { thinky, type } from '../db'

let Tag = thinky.createModel('Tag', {
  id: type.string(),
  name: type.string(),
  color: type.string()
})

export default Tag
```

