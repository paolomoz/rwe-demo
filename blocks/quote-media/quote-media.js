/**
 * quote-media — centered navy quote heading spanning the row, then a two-column
 * split: left copy (paragraphs + a primary CTA), right a poster image with a
 * play glyph (fixed brand poster via CSS).
 * Schema: stardust/eds-schema/index.json (quote-media)
 *
 * Authoring (one cell):
 *   <h2> centered quote
 *   <p>  copy paragraph(s)
 *   primary CTA — <strong><a>…
 */
export default function decorate(block) {
  const heading = block.querySelector('h2');
  const paras = [...block.querySelectorAll('p')];
  const ctaPara = paras.find((p) => p.querySelector('a'));

  const copy = document.createElement('div');
  copy.className = 'copy';
  paras.forEach((p) => {
    if (p !== ctaPara) copy.append(p);
  });
  if (ctaPara) copy.append(ctaPara);

  const video = document.createElement('div');
  video.className = 'video';
  const play = document.createElement('span');
  play.className = 'play';
  play.setAttribute('aria-hidden', 'true');
  play.textContent = '▶';
  video.append(play);

  const children = [];
  if (heading) children.push(heading);
  children.push(copy, video);
  block.replaceChildren(...children);
}
