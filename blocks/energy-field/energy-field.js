/**
 * energy-field — 3-column tile grid on a grey band:
 *   - row 1 (first row): wide FEATURE card spanning 2 cols = autoplay muted
 *     looping brand video with a dark-bottom gradient + white title/copy/readmore
 *   - the row containing a <ul>: TEAL "Information for…" card with a white link list
 *   - every other row: a WHITE content card (navy h3 + body + teal readmore)
 * Schema: stardust/eds-schema/index.json (energy-field)
 *
 * Authoring — one row per tile (single cell each):
 *   1. feature: <h3> + <p> + plain <a> "Read more"
 *   2. info:    <h3> "Information for…" + <ul> of links
 *   3..N: card: <h3> + <p> + plain <a> "Read more"
 */
const FEATURE_VIDEO = 'https://www.rwe.com/-/media/RWE/videos/homepage/01-2022_webm/tea03r-wald_web.webm';
const FEATURE_POSTER = 'https://www.rwe.com/-/media/RWE/images/09-verantwortung-und-nachhaltigkeit/umweltschutz/klima/TEA-klima-neu.jpg?w=1280&hash=ECDE6C0E539C6F2F75E00977051A1BC6';

function buildVideo(src, poster, className) {
  const video = document.createElement('video');
  video.className = className;
  video.muted = true;
  video.loop = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('poster', poster);
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.setAttribute('autoplay', '');
  }
  const source = document.createElement('source');
  source.src = src;
  source.type = 'video/webm';
  video.append(source);
  return video;
}

export default function decorate(block) {
  const rows = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'field-grid';

  rows.forEach((row, i) => {
    const cell = row.firstElementChild || row;
    const nodes = [...cell.childNodes];
    const hasList = cell.querySelector('ul');
    const tile = document.createElement('div');

    if (i === 0) {
      tile.className = 'tile tile-feature';
      tile.append(buildVideo(FEATURE_VIDEO, FEATURE_POSTER, 'tile-vid'));
      nodes.forEach((n) => tile.append(n));
      const link = tile.querySelector('a');
      if (link) link.classList.add('readmore');
    } else if (hasList) {
      tile.className = 'tile tile-info';
      nodes.forEach((n) => tile.append(n));
      const list = tile.querySelector('ul');
      if (list) list.classList.add('info-list');
    } else {
      tile.className = 'tile tile-card';
      nodes.forEach((n) => tile.append(n));
      const link = tile.querySelector('a');
      if (link) link.classList.add('readmore');
    }

    grid.append(tile);
  });

  block.replaceChildren(grid);
}
