'use strict';

function emoSVG(elements) {
  if (elements.length !== undefined) {
    // it is an Array
    for (var i = 0; i < elements.length; i++) {
      replaceEmoji(elements[i]);
    }
  } else {
    // it is a DOM element
    replaceEmoji(elements);
  }

  function replaceEmoji(element) {
    var artwork = element.getAttribute('data-emosvg') || element.getAttribute('emosvg'),
        isSprite = artwork.includes('.svg#'),
        style = element.getAttribute('style') ? 'style="' + element.getAttribute('style') + '" ' : '',
        classAttr = element.getAttribute('class') ? 'class="' + element.getAttribute('class') + '" ' : '',
        alt = element.getAttribute('data-emosvg-alt') || element.getAttribute('emosvg-alt') || '',
        ariaHidden = element.hasAttribute('aria-hidden') ? 'aria-hidden=' + element.getAttribute('aria-hidden') + ' ' : '',
        inline = self.fetch && element.getAttribute('data-emosvg-inline') == 'true' ? true : false,
        svgTitle = alt ? '<title>' + alt + '</title>\n' : '',
        html = isSprite ? '<svg ' + classAttr + style + ariaHidden + '>\n  ' + svgTitle + '<use xlink:href="' + artwork + '"></use>\n</svg>' : '<img src="' + artwork + '" alt="' + alt + '" ' + classAttr + style + ariaHidden + '>';

    if (!inline) element.outerHTML = html;else fetch(artwork).then(function (response) {
      // http://caniuse.com/#feat=fetch
      response.text().then(function (svg) {
        console.log(svg);

        var parser = new DOMParser(),
            parsed = parser.parseFromString(svg, "text/xml");

        parsed.querySelector('svg').setAttribute('class', element.getAttribute('class'));
        parsed.querySelector('title') ? parsed.querySelector('title').innerHTML = alt : parsed.querySelector('svg').innerHTML = '' + svgTitle + parsed.querySelector('svg').innerHTML;
        if (element.hasAttribute('aria-hidden')) parsed.querySelector('svg').setAttribute('aria-hidden', element.getAttribute('aria-hidden'));
        if (element.hasAttribute('style')) parsed.querySelector('svg').setAttribute('style', element.getAttribute('style'));

        element.outerHTML = function () {
          // IE 11 doesn't support parsed.querySelector('svg').outerHTML :(
          var div = document.createElement('div');
          div.appendChild(parsed.querySelector('svg'));
          return div.innerHTML;
        }();
      });
    });
  }
}
