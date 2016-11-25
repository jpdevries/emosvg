# emoSVG 🙄
*(Ugh)*. Progressively enhanced emoji first iconography pattern and utility.  
WIP.

## 🤔 Why?
Sure, we could initially ship heavy and enhanced icons. But we want to progressively enhance the web. We start working within the limitations of HTML and utilize the interperative nature of emoji to **initially deliver a growing and universal iconset that weight&nbsp;0kB**.

### 💅 Progressive Enhancement

There are several advantages to Emoji:
 - fastest growing "language"
 - 0kB cost to ship artwork
 - interprative 
 
It's not all fun and games though. Emoji are interpative, meaning your art director might not be comfortable with the lack of control of what sighted users will see. There is no "pixel perfect" control with Emoji. They'll look different on different systems. This is where progressive enhancement comes in. If we detect, determine, or assume that it is worth the cost of shipping SVG artwork, we can overwrite our nearly weightless Emoji iconography with SVG icons.

SVG icons can be:
 - animated 
 - any number of colors
 - delivered efficently together as a single sprite
 - styled with CSS Variables
 
emoSVG will turn your emoji into SVG graphics if and when you ask it to. To accomplish this, emoSVG needs to know one thing:
 - the SVG graphic you'd like to replace the `span.emoji` with

Your SVG graphic can be a SVG file or part of an SVG sprite.

## 🕰 When?
That's totally up to you. emoSVG just gives you a simple API to turn a `span.emoji` element into the appropriate enhanced markup. We recommend that you enhance Emoji into something else when:
 - no `save-data` header is detected
 - JavaScript is enabled
 - user preferences you may have opt into, or do not opt out of, the cost of enhanced iconography

## 🛠 Usage

Use emoji in your HTML. Wrap them in `span.emoji`.
```html
<h1>
  <span class="emoji">🎉</span>
  &nbsp;Party! You're invited&nbsp;
  <span class="emoji">💃</span>
</h1>
```

_To progressively enhance Emoji you'll need to use the `data-emosvg` attribute to specify the path to the icon art. You'll also need a tiny bit of&nbsp;JavaScript._

### 🛍 SVG Use 
Enhance Emoji with an SVG graphic from a sprite. Your graphic will be enhanced with the splendid `<use>` syntax.
```html
<h1>
  <span class="emoji" data-emosvg="assets/img/fontawesome.svg#bicycle">🚲</span>
  &nbsp;Biking in Amsterdam
</h1>
```

becomes:
```html
<h1>
  <svg>
    <use xlink:href="assets/img/fontawesome.svg#bicycle"></use>
  </svg>
  &nbsp;Biking in Amsterdam
</h1>
```

### Replace Emoji with SVG using JavaScript

Then include the `emoSVG.js` or `emoSVG.min.js` script in your page:
```html
<script src="assets/js/vendor/emoSVG/emoSVG.js"></script>
```

And finally use the JavaScript API to trigger the progressive enhancement.

You can enhance emoji one at a time:

```js
document.addEventListener("DOMContentLoaded", function() {
  const emoji = document.querySelector('.emoji');
  emoSVG.enhance(emoji);
});
```

You can also enhance any number of emoji at once:

```js
document.addEventListener("DOMContentLoaded", function() {
  const emoji = document.querySelectorAll('.emoji');
  emoSVG.enhance(emoji);
});
```

### 🎨 SVG Graphic
Enhance emoji with a single SVG file. Your graphic will be enhanced with an `<img>` element unless you specify otherwise.
```html
<h1>
  <img src="assets/img/bicycle.svg" alt="">
  &nbsp;Biking in Amsterdam
</h1>
```

becomes:
```html
<h1>
  <span class="emoji" data-emosvg="assets/img/fontawesome.svg#bicycle">🚲</span>
  &nbsp;Biking in Amsterdam
</h1>
```

### 👾 Raster Graphics
Scalable Vector Graphics are all the rage, but emoSVG understands you may want to get your bitmap on.

```html
<h1>
  <span class="emoji" data-emosvg="assets/img/bicycle.png">🚲</span>&nbsp;Biking in Amsterdam
</h1>
```

becomes:
```html
<h1>
  <img src="assets/img/bicycle.png" alt="" />&nbsp;Biking in Amsterdam
</h1>
```

Feel free to use any rasterized graphic you like. File extensions other than SVG will be treated as raster graphics.

### 😎 Hiding Icons from Screen Readers

Emoji are implicity accessible! There is no need to add alt text or labels. If you'd like to use Emoji strictly visually and hide them from screen readers use the `aria-hidden` attribute.

```html
<h1>
  <span class="emoji" aria-hidden>🎉</span>
  &nbsp;Party! You're invited&nbsp;<span class="emoji" aria-hidden>💃</span>
</h1>
```

### 📣 Describing Enhaned Icons

If you'd like to describe the icon the `data-emosvg-title` attribute has your back.

```html
<h1>
  <span class="emoji" data-emosvg="assets/img/fontawesome.svg#bicycle" data-emosvg-title="Graphic of a commuter bicycle">🚲</span>
  &nbsp;Biking in Amsterdam
</h1>
```

becomes:
```html
<h1>
  <svg>
    <title>Graphic of a commuter bicycle</title>
    <use xlink:href="assets/img/fontawesome.svg#bicycle"></use>
  </svg>
  &nbsp;Biking in Amsterdam
</h1>
```

#### 👻 ARIA Hidden
Please note that if the `aria-hidden` attribute exists and is set to anything other than false the enhanced graphic will inherit the `aria-hidden` attribute value.

```html
<h1>
  <span class="emoji" data-emosvg="assets/img/fontawesome.svg#bicycle" aria-hidden="true">🚲</span>
  &nbsp;Biking in Amsterdam
</h1>
```

becomes:
```html
<h1>
  <svg aria-hidden="true">
    <use xlink:href="assets/img/fontawesome.svg#bicycle"></use>
  </svg>
  &nbsp;Biking in Amsterdam
</h1>
```



