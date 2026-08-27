/**
 * media-share — "Media and share price": centered navy heading + intro, then a
 * two-column layout — left a "Press releases" column (heading, teal "View all",
 * 3 dated press items), right a teal→navy gradient share-ticker placeholder.
 * Schema: stardust/eds-schema/index.json (media-share)
 *
 * Authoring (one cell):
 *   <h2> section heading
 *   <p>  intro
 *   <h3> "Press releases"
 *   plain <a> "View all"
 *   <ul> of press items — each <li>: <strong>date</strong> + <a>title</a>
 */
export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div') || block;
  const heading = cell.querySelector('h2');
  const intro = cell.querySelector('p');
  const pressHeading = cell.querySelector('h3');
  const viewAll = [...cell.querySelectorAll('a')].find((a) => !a.closest('li'));
  const list = cell.querySelector('ul');

  const head = document.createElement('div');
  head.className = 'head';
  if (heading) head.append(heading);
  if (intro) head.append(intro);

  // left: press column
  const prow = document.createElement('div');
  prow.className = 'prow';
  if (pressHeading) prow.append(pressHeading);
  if (viewAll) {
    viewAll.classList.add('view');
    prow.append(viewAll);
  }

  const press = document.createElement('ul');
  press.className = 'press';
  if (list) {
    [...list.children].forEach((li) => {
      const date = li.querySelector('strong');
      const link = li.querySelector('a');
      const newLi = document.createElement('li');

      const dateSpan = document.createElement('span');
      dateSpan.className = 'date';
      dateSpan.textContent = date ? date.textContent.trim() : '';

      const info = document.createElement('div');
      const h4 = document.createElement('h4');
      if (link) h4.append(link);
      info.append(h4);
      const cont = document.createElement('span');
      cont.className = 'cont';
      cont.textContent = 'Continue';
      info.append(cont);

      newLi.append(dateSpan, info);
      press.append(newLi);
    });
  }

  const left = document.createElement('div');
  left.append(prow, press);

  const ticker = document.createElement('div');
  ticker.className = 'ticker';
  ticker.setAttribute('aria-hidden', 'true');

  const grid = document.createElement('div');
  grid.className = 'grid';
  grid.append(left, ticker);

  block.replaceChildren(head, grid);
}
