# Deligate

Simple event delegation

Currently only supports browsers with the [`Element.prototype.matches` method](http://caniuse.com/#feat=matchesselector)

```
npm install deligate
```

## Usage

```javascript

var deligate = require('deligate');

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

## API

#### `var handler = deligate(selector, fn)`

Creates a function that is only called when the selector matches `event.target` passed to it.

