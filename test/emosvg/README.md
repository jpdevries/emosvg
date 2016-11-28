## emoSVG

emoSVG is free to use.&nbsp;Enjoy.

### 🌗 Replace Emoji with SVG using JavaScript

Then include the `emoSVG.js` or `emoSVG.min.js` script in your page:
```html
<script src="assets/js/vendor/emoSVG/emoSVG.js"></script>
```

And finally use the JavaScript API to trigger the progressive enhancement.

You can enhance Emoji one at a time:

```js
document.addEventListener("DOMContentLoaded", function() {
  const emoji = document.querySelector('.emoji');
  emoSVG(emoji);
});
```

You can also enhance any number of Emoji at&nbsp;once:

```js
document.addEventListener("DOMContentLoaded", function() {
  const emoji = document.querySelectorAll('.emoji');
  emoSVG(emoji);
});
```
