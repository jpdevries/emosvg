# Polyfills

Polyfills are needed for IE 9&ndash;11&nbsp;support.

_This assumes you've copied the polyfills to an `assets/js/emosvg/polyfill`&nbsp;directory._

```html
<script>
  <!-- load these only if detections fails -->
  if(!String.prototype.includes) document.write('<script src="assets/js/emosvg/polyfill/includes/string-includes.js"><\/script>');
  if(!window.Promise) document.write('<script src="assets/js/emosvg/polyfill/promise-polyfill/promise.js"><\/script>');
  if(!self.fetch) document.write('<script src="assets/js/emosvg/polyfill/fetch/fetch.js"><\/script>');
</script>

<!-- SVG for everybody -->
<script src="assets/js/emosvg/polyfill/svg4everybody/svg4everybody.js"></script>

<!-- finally load emoSVG -->
<script src="assets/js/emosvg.js"></script>
```
