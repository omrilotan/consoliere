# consoliere

## 🛎 assistance with browser console

## devtoolsOpen `{Boolean}`
Check if dev tools are open
```js
import { devtoolsOpen } from 'consoliere';

if (devtoolsOpen()) { ... }
```

### Warn
Warn users about the dangers of devtools paste
![](https://user-images.githubusercontent.com/516342/58804898-9bf0cf80-861b-11e9-88c9-d9736f8284db.png)
```js
import { warn } from 'consoliere';
warn();
```


### Get the warning bundle for browser
```html
<script src="https://omrilotan.com/consoliere/bundle/iife.min.js"></script>
```
