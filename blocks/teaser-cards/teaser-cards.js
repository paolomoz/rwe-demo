/**
 * teaser-cards — responsive card row. One block, two variants:
 *   - default: image (CSS background, cover) + navy h3 + body + teal-outline
 *     secondary button. Used for the energy row and the careers row.
 *   - icons (class "teaser-cards icons"): centered columns, contain icon image,
 *     h3 title + body + teal "Read more" text link. Used for the contact row.
 * Schema: stardust/eds-schema/index.json (teaser-cards)
 *
 * Authoring — one row per card, two cells:
 *   cell 1: the image/icon URL (plain text or a link)
 *   cell 2: <h3> title, <p> body, and the CTA
 *           default → <em><a> (teal-outline button); icons → plain <a> "Read more"
 */
export default function decorate(block) {
  const isIcons = block.classList.contains('icons');
  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];
    const imgCell = cells[0];
    const contentCell = cells[1] || cells[0];

    const url = imgCell
      ? (imgCell.querySelector('a')?.href || imgCell.textContent.trim())
      : '';

    const card = document.createElement('div');
    card.className = 'card';

    const media = document.createElement('div');
    media.className = isIcons ? 'card-media icon' : 'card-media';
    if (url) media.style.backgroundImage = `url('${url}')`;

    const body = document.createElement('div');
    body.className = 'card-body';
    if (contentCell && contentCell !== imgCell) {
      [...contentCell.childNodes].forEach((n) => body.append(n));
    }

    if (isIcons) {
      const link = body.querySelector('a');
      if (link && !link.classList.contains('button')) link.classList.add('readmore');
    }

    card.append(media, body);
    row.replaceWith(card);
  });
}
