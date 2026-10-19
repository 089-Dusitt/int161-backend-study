'use strict';
window.StudyCore = {
  pagination(total, page, limit) {
    if (![total, page, limit].every(Number.isSafeInteger) || total < 0 || page < 1 || limit < 1 || limit > 100) return null;
    const offset = (page - 1) * limit;
    if (!Number.isSafeInteger(offset)) return null;
    const count = Math.max(0, Math.min(limit, total - offset));
    return { total, page, limit, offset, count, totalPages: Math.ceil(total / limit), hasNextPage: page * limit < total, hasPrevPage: page > 1 };
  },
  grade(questions, answers, revealed) {
    return questions.reduce((r, q) => {
      if (answers[q.id]) r.answered++;
      if (revealed[q.id] && answers[q.id]) {
        r.checked++;
        if (answers[q.id] === q.correct) r.correct++; else r.wrong++;
      }
      return r;
    }, { answered: 0, checked: 0, correct: 0, wrong: 0 });
  },
  normalize(value) { return String(value).normalize('NFKC').toLocaleLowerCase('th').trim(); },
  safeState(raw) {
    const empty = { read: [], last: 1, size: 17, theme: 'light', answers: {}, revealed: {}, question: 1 };
    if (!raw || typeof raw !== 'object') return empty;
    empty.read = [...new Set(Array.isArray(raw.read) ? raw.read.filter(v => Number.isInteger(v) && v >= 1 && v <= 13) : [])];
    if (Number.isInteger(raw.last) && raw.last >= 1 && raw.last <= 13) empty.last = raw.last;
    if (Number.isInteger(raw.size) && raw.size >= 15 && raw.size <= 23) empty.size = raw.size;
    if (raw.theme === 'dark') empty.theme = 'dark';
    if (Number.isInteger(raw.question) && raw.question >= 1 && raw.question <= 30) empty.question = raw.question;
    for (let i = 1; i <= 30; i++) {
      if (/^[A-E]$/.test(raw.answers?.[i] ?? '')) empty.answers[i] = raw.answers[i];
      if (raw.revealed?.[i] === true && empty.answers[i]) empty.revealed[i] = true;
    }
    return empty;
  }
};
