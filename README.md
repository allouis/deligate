# Deligate

Simple event delegation

Currently only supports browsers with the [`Element.prototype.matches` method](http://caniuse.com/#feat=matchesselector)

## API
```javascript
var deligate = require('deligate');
```
### `deligate`

```javascript
document.body.addEventListener('click', deligate('button.some-class', function(event){
  console.log('clicked the button');
}));

// ... more likely

var handler =  deligate('button.some-class', function(event){
  console.log('clicked the button');
});

document.body.addEventListener('click', handler);

// ... later
document.body.removeEventListener('click', handler);
```
