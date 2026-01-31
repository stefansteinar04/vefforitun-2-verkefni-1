function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function renderLayout({ title, content }) {
  return /* html */ `<!doctype html>
<html lang="is">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="./styles.css" />
</head>
<body>
  <header class="site-header">
    <h1>${escapeHtml(title)}</h1>
  </header>

  <main class="container">
    ${content}
  </main>

  <script src="./scripts.js" type="module"></script>
</body>
</html>`;
}

export function renderIndex(pages) {
  const items = pages
    .map(
      (p) =>
        `<li><a href="./${p.slug}.html">${escapeHtml(p.name)}</a> <span class="muted">(${p.count})</span></li>`
    )
    .join('\n');

  return renderLayout({
    title: 'Spurningaleikur',
    content: /* html */ `
      <p>Veldu flokk, opnaðu svar og merktu svo hvort þú svaraðir rétt eða rangt.</p>
      <nav>
        <h2>Flokkar</h2>
        <ul class="category-list">${items}</ul>
      </nav>
    `,
  });
}

export function renderCategoryPage(categoryName, questions) {
  const qHtml = questions
    .map((q, i) => {
      return /* html */ `
      <section class="card" data-question>
        <details>
          <summary>
            <span class="q-label">Spurning ${i + 1}</span>
            <span class="q-text">${escapeHtml(q.question)}</span>
          </summary>

          <div class="answer">
            <p><strong>Svar:</strong> ${escapeHtml(q.answer)}</p>

            <div class="actions">
              <button type="button" data-mark="correct">Rétt</button>
              <button type="button" data-mark="wrong">Rangt</button>
            </div>
          </div>
        </details>
      </section>`;
    })
    .join('\n');

  return renderLayout({
    title: categoryName,
    content: /* html */ `
      <div class="scoreboard" data-scoreboard>
        <span>Rétt: <strong data-correct>0</strong></span>
        <span>Rangt: <strong data-wrong>0</strong></span>
      </div>

      <p><a href="./index.html">← Til baka</a></p>

      ${qHtml}
    `,
  });
}
