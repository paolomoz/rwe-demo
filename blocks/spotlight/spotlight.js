/**
 * spotlight — "Spotlight @ RWE.com" module: teal section heading with icon,
 * a vertical bullet rail, a question (h3), body copy, a teal "Read more" link,
 * and a decorative teal thumbnail box.
 * Schema: stardust/eds-schema/index.json (spotlight)
 *
 * Authoring (one cell):
 *   <h2> teal module heading
 *   <h3> question
 *   <p>  body copy
 *   plain <a> "Read more" (styled as a teal readmore link)
 */
export default function decorate(block) {
  const heading = block.querySelector('h2');
  const question = block.querySelector('h3');
  const body = block.querySelector('p');
  const link = block.querySelector('a');

  const head = document.createElement('div');
  head.className = 'spot-head';
  const icon = document.createElement('span');
  icon.className = 'ic';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '📢';
  head.append(icon);
  if (heading) head.append(heading);

  const bullets = document.createElement('div');
  bullets.className = 'spot-bullets';
  bullets.setAttribute('aria-hidden', 'true');
  bullets.innerHTML = '<span>⌃</span><span class="dot"></span><span class="dot"></span><span class="dot sm"></span><span class="dot sm"></span><span>⌄</span>';

  const textCol = document.createElement('div');
  textCol.className = 'spot-text';
  if (question) textCol.append(question);
  if (body) textCol.append(body);
  if (link) {
    link.classList.add('readmore');
    textCol.append(link);
  }

  const spotBody = document.createElement('div');
  spotBody.className = 'spot-body';
  spotBody.append(bullets, textCol);

  const main = document.createElement('div');
  main.className = 'spot-main';
  main.append(head, spotBody);

  const thumb = document.createElement('div');
  thumb.className = 'spot-thumb';
  thumb.setAttribute('aria-hidden', 'true');

  block.replaceChildren(main, thumb);
}
