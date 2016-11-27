# emoSVG 🙄
*(Ugh)*. Progressively enhanced Emoji&ndash;first iconography pattern and&nbsp;utility.  
WIP.

![](http://j4p.us/0r0o071g3Z00/emoSVG.gif)

## 🤔 Why?
Sure, we could initially ship heavy and enhanced icons. But we want to progressively enhance the web. We start working within the limitations of HTML and utilize the interpretive nature of Emoji to **initially deliver a growing and universal iconset that weight&nbsp;0kB**.

### 💅 Progressive Enhancement

There are several advantages to Emoji:
 - fastest growing&nbsp;"language"
 - 0kB cost to ship&nbsp;artwork
 - interpretive

It's not all fun and games though. Emoji are interpative, meaning your art director might not be comfortable with the lack of control of what sighted users will see. There is no "pixel perfect" control with Emoji. They'll look different on different systems. This is where progressive enhancement comes in. If we detect, determine, or assume that it is worth the cost of shipping SVG artwork, we can overwrite our nearly weightless Emoji iconography with SVG&nbsp;icons.

SVG icons can be:
 - animated
 - any number of&nbsp;colors
 - delivered efficiently together as a single&nbsp;sprite
 - art directed with&nbsp;precision
 - styled with CSS&nbsp;Variables

emoSVG will turn your Emoji into SVG graphics if and when you ask it to. To accomplish this, emoSVG needs to know one thing:
 - the SVG graphic you'd like to replace the `span.emoji`&nbsp;with

Your SVG graphic can be a SVG file or part of an SVG&nbsp;sprite.

### 🏋️‍ Weigh In
`emoSVG.min.js` weights a whopping 607 bytes GZIPed and&nbsp;minified. Whoop&mdash;d&mdash;doo. That's not the point. Remember that the artwork you'll be replacing your Emoji with does way something. Keep that in mind and only pass this cost onto your users when&nbsp;appropriate.

### 🐛 Browser Support
emoSVG works in modern browsers. With the assistance of polyfills, it supports&nbsp;IE9+.  
[More on polyfills&nbsp;here](https://github.com/jpdevries/emoSVG/tree/master/dist/polyfill).

## 🕰 When?
When you ship your SVG icons totally up to you. emoSVG just gives you a simple API to turn a `span.emoji` element into the appropriate enhanced markup. We recommend that you enhance Emoji into something else&nbsp;when:
 - no `save-data` header is&nbsp;detected
 - JavaScript is&nbsp;enabled
 - user preferences opt into, or do not opt out of, the costs of enhanced&nbsp;iconography



## 🛠 Usage

emoSVG is installable via bower or by downloading this&nbsp;repository.

```bower
bower install emosvg --save
```

Use Emoji in your HTML. Wrap them in&nbsp;`span.emoji`.
```html
<h1>
  <span class="emoji">🎉</span>
  &nbsp;Party! You're invited&nbsp;
  <span class="dancing emoji">💃</span>
</h1>
```

_To progressively enhance Emoji you'll need to use the `data-emosvg` attribute to specify the path to the icon art. You'll also need a tiny bit of&nbsp;JavaScript._

### 🛍 SVG Use
Enhance Emoji with an SVG graphic from a sprite. Your graphic will be enhanced with the splendid `<use>`&nbsp;syntax.
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

### 🌗 Replace Emoji with SVG using JavaScript

Then include the `emoSVG.js` or `emoSVG.min.js` script in your&nbsp;page:
```html
<script src="assets/js/vendor/emoSVG/emoSVG.js"></script>
```

And finally use the JavaScript API to trigger the progressive&nbsp;enhancement.

You can enhance Emoji one at a&nbsp;time:

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

### 🎨 SVG Graphic
Enhance Emoji with a single SVG file. Your graphic will be enhanced with an `<img>` element unless you specify&nbsp;otherwise.
```html
<h1>
  <span class="emoji" data-emosvg="assets/img/bicycle.svg">🚲</span>
  &nbsp;Biking in Amsterdam
</h1>
```

becomes:
```html
<h1>
  <img src="assets/img/bicycle.svg" alt="">
  &nbsp;Biking in Amsterdam
</h1>
```

### 👣 Inline SVG
Art using the `<img src="art.svg">` can not be styled using CSS because it is not part of the document. The SVG Use syntax can be styled, but that is only applicable when you are using a SVG sprite sheet. If you have a single SVG graphic that you'd like to be embed as part of the document set `data-emosvg-inline="true"`.

```html
<h1>
  <span class="bomb emoji" data-emosvg="assets/icons/fontawesome/svg/bomb.svg" data-emosvg-inline="true">💣</span>
  &nbsp;Da bomb
</h1>
```

becomes

```html
<h1>
  <svg width="2048" height="2048" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg"><path id="icon-bomb" d="M699 717q-10-25-34-35t-49 0q-108 44-191 127t-127 191q-10 25 0 49t35 34q13 5 24 5 42 0 60-40 34-84 98.5-148.5t148.5-98.5q25-11 35-35t0-49zm942-356l46 46-244 243 68 68q19 19 19 45.5t-19 45.5l-64 64q89 161 89 343 0 143-55.5 273.5t-150 225-225 150-273.5 55.5-273.5-55.5-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5q182 0 343 89l64-64q19-19 45.5-19t45.5 19l68 68zm8-56q-10 10-22 10-13 0-23-10l-91-90q-9-10-9-23t9-23q10-9 23-9t23 9l90 91q10 9 10 22.5t-10 22.5zm230 230q-11 9-23 9t-23-9l-90-91q-10-9-10-22.5t10-22.5q9-10 22.5-10t22.5 10l91 90q9 10 9 23t-9 23zm41-183q0 14-9 23t-23 9h-96q-14 0-23-9t-9-23 9-23 23-9h96q14 0 23 9t9 23zm-192-192v96q0 14-9 23t-23 9-23-9-9-23v-96q0-14 9-23t23-9 23 9 9 23zm151 55l-91 90q-10 10-22 10-13 0-23-10-10-9-10-22.5t10-22.5l90-91q10-9 23-9t23 9q9 10 9 23t-9 23z"></path></svg>
  &nbsp;Da bomb
</h1>
```

Now that the SVG is part of the document it can be further art&nbsp;directed.

_Inline SVG relies on the Fetch API so make sure you polyfill it if necessary before loadin&nbsp; emoSVG._

Inlining SVG is an async action as a fetch() request must be made to load the artwork. emoSVG promises to let you know when that is&nbsp;done:

```js
emoSVG(emoji).then(function() {
  console.log('inline SVGs loaded');
  svg4everybody();
});
```

### 👾 Raster Graphics
Scalable Vector Graphics are all the rage, but emoSVG understands you may want to get your bitmap&nbsp;on.

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

Feel free to use any rasterized graphic you like. File extensions other than SVG will be treated as raster&nbsp;graphics.

### 🐣 Sizing SVG Icons
Emoji will be sized relative to the text they surround. If you want to make sure your SVG icons aren't oversized in the absense of CSS styles, set the `style` or `data-emojisvg-style` attributes on your `span.emoji`. emoSVG will look for the `style` attribute and then if not found the `data-emojisvg-style` attribute and if found will set the `style` attribute on the&nbsp;`svg.emoji`.

```html
<h1>
  <span class="emoji" data-emosvg="assets/img/bicycle.svg" style="width:1em;height:1em">🚲</span>&nbsp;Biking in Amsterdam
</h1>
```

becomes:
```html
<h1>
  <img src="assets/img/bicycle.png" style="width:1em;height:1em" />&nbsp;Biking in Amsterdam
</h1>
```

### 😎 Hiding Icons from Screen Readers

Emoji are implicitly accessible! There is no need to add alt text or labels. If you'd like to use Emoji strictly visually and hide them from screen readers use the `aria-hidden`&nbsp;attribute.

```html
<h1>
  <span class="emoji" data-emosvg="assets/img/party.svg" aria-hidden>🎉</span>
  &nbsp;Party! You're invited&nbsp;
</h1>
```

#### 👻 ARIA Hidden
Please note that if the `aria-hidden` attribute exists and is set to anything other than false the enhanced graphic will inherit the `aria-hidden` attribute&nbsp;value.

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


### 📣 Describing Enhaned Icons

If you'd like to describe the SVG icon the `data-emosvg-alt` attribute has your back. If you are making use of `<title>` in your SVG code this may be&nbsp;unecessary.

```html
<h1>
  <span class="emoji" data-emosvg="assets/img/fontawesome.svg#bicycle" data-emosvg-alt="Graphic of a commuter bicycle">🚲</span>
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

and likewise this:
```html
<h1>
  <span class="emoji" data-emosvg="assets/img/bicycle.png" data-emosvg-alt="Raster icon of an old blue bike">🚲</span>&nbsp;Biking in Amsterdam
</h1>
```

becomes:
```html
<h1>
  <img src="assets/img/bicycle.svg" alt="Raster icon of an old blue bike">
  &nbsp;Biking in Amsterdam
</h1>
```

## Getting Started
After cloning the repository run `npm install` or `yarn` to install the `node_modules`. You can then build and test the&nbsp;project.

Optionally enable Growl notifications install [terminal-notifier](https://github.com/alextucker/grunt-growl#getting-started) with RubyGems:
```bash
gem install terminal-notifier
```
_Note: Depending on your Ruby setup you may need to use `sudo gem install terminal-notifier`._

### Test emoSVG
```bash
grunt test
```

### Build emoSVG
```bash
grunt build
```

### Watch emoSVG
```bash
grunt watch #watches source files in _build/js for changes and build files
```
