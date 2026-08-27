/**
 * media-band — full-bleed autoplay muted looping brand video with a
 * right-aligned text box. Two variants:
 *   - default: teal→navy gradient overlay across the band, white text,
 *     white-outline secondary CTA (used for the trading band).
 *   - cta-card: the box itself is a floating teal→navy gradient card with a
 *     primary CTA (used for the careers "Find job" band).
 * Schema: stardust/eds-schema/index.json (media-band)
 *
 * Authoring (one cell):
 *   plain <a> whose href is the .webm video URL (text = the URL; kept out of
 *     buttonization as a URL-display link) — becomes the <video src>
 *   <h3> title
 *   <p>  body copy
 *   CTA — <em><a> (secondary/white-outline) or <strong><a> (primary)
 */
function buildVideo(src) {
  const video = document.createElement('video');
  video.className = 'band-vid';
  video.muted = true;
  video.loop = true;
  video.setAttribute('playsinline', '');
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
  const cell = block.querySelector(':scope > div > div') || block;

  // find the video-source link (href ends .webm or points at /videos/)
  const videoLink = cell.querySelector('a[href$=".webm"], a[href*="/videos/"]');
  let videoSrc = '';
  if (videoLink) {
    videoSrc = videoLink.href;
    (videoLink.closest('p') || videoLink).remove();
  }

  const box = document.createElement('div');
  box.className = 'box';
  [...cell.childNodes].forEach((n) => box.append(n));

  const container = document.createElement('div');
  container.className = 'container';
  container.append(box);

  const children = [];
  if (videoSrc) children.push(buildVideo(videoSrc));
  children.push(container);
  block.replaceChildren(...children);
}
