export const MAX_QUESTIONS_PER_CATEGORY = 100;


export const DEFAULT_FILTER = {
  difficulty: 2,   
  minQuality: null 
};

export function selectQuestions(questions, filter = DEFAULT_FILTER) {
  const { difficulty = null, minQuality = null } = filter;

  const filtered = questions.filter((q) => {
    if (!q.category || !q.question || !q.answer) return false;

    if (difficulty != null && q.difficulty !== difficulty) return false;

    if (minQuality != null) {
      if (q.quality == null || q.quality < minQuality) return false;
    }

    return true;
  });

  const byCat = new Map();
  for (const q of filtered) {
    if (!byCat.has(q.category)) byCat.set(q.category, []);
    const arr = byCat.get(q.category);
    if (arr.length < MAX_QUESTIONS_PER_CATEGORY) arr.push(q);
  }
  return byCat;
}
