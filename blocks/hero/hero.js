/**
 * hero — full-bleed stage: background image (CSS) + frosted white panel with
 * the page's single <h1>, a sub line, and a primary CTA; static carousel dots
 * (4, first active) and side arrows. Template-slotted composition.
 * Schema: stardust/eds-schema/index.json (hero)
 *
 * Authoring rows (each a single cell):
 *   1. <h1> headline
 *   2. sub line (plain paragraph)
 *   3. primary CTA — <strong><a>… (decorated to a.button.primary before decorate)
 */
export default function decorate(block) {
  const h1 = block.querySelector('h1');
  const paras = [...block.querySelectorAll('p')];
  const ctaPara = paras.find((p) => p.querySelector('a'));
  const subPara = paras.find((p) => p !== ctaPara && p.textContent.trim());

  const panel = document.createElement('div');
  panel.className = 'hero-panel';
  if (h1) panel.append(h1);
  if (subPara) {
    subPara.classList.add('sub');
    panel.append(subPara);
  }
  if (ctaPara) panel.append(ctaPara);

  const container = document.createElement('div');
  container.className = 'container';
  container.append(panel);

  const arrows = document.createElement('div');
  arrows.className = 'hero-arrows';
  arrows.setAttribute('aria-hidden', 'true');
  arrows.innerHTML = '<span>‹</span><span>›</span>';

  const dots = document.createElement('div');
  dots.className = 'hero-dots';
  dots.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 4; i += 1) {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dots.append(dot);
  }

  block.replaceChildren(container, arrows, dots);
}
