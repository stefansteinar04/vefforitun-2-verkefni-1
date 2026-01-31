function init() {
  const scoreboard = document.querySelector('[data-scoreboard]');
  if (!scoreboard) return; 

  const correctEl = scoreboard.querySelector('[data-correct]');
  const wrongEl = scoreboard.querySelector('[data-wrong]');

  let correct = 0;
  let wrong = 0;

  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-mark]');
    if (!btn) return;

    const card = btn.closest('[data-question]');
    if (!card) return;

    if (card.dataset.answered === 'true') return;

    if (btn.dataset.mark === 'correct') correct++;
    if (btn.dataset.mark === 'wrong') wrong++;

    correctEl.textContent = String(correct);
    wrongEl.textContent = String(wrong);

    card.dataset.answered = 'true';
    card.querySelectorAll('button[data-mark]').forEach((b) => { b.disabled = true; });
  });
}

init();
