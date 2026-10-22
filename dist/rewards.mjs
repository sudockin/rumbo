import {lessons,phrases,scenarios} from './content.mjs';
import {streak} from './core.mjs';

// Points climb through travel ranks on the way to Mexico.
export const ranks = [
  { min: 0, mark: '🧳', title: 'Turista', en: 'Tourist' },
  { min: 100, mark: '🌮', title: 'Amigo de los tacos', en: 'Friend of tacos' },
  { min: 300, mark: '🌵', title: 'Viajero', en: 'Traveller' },
  { min: 700, mark: '🎺', title: 'Mariachi', en: 'Mariachi' },
  { min: 1200, mark: '🌶️', title: 'Muy picante', en: 'Extra spicy' },
  { min: 2000, mark: '🦅', title: 'Chilango honorario', en: 'Honorary Mexico City local' }
];

export function points(state) { return Object.values(state.activity).reduce((sum, a) => sum + a.points, 0); }

export function rankFor(total) {
  const index = ranks.findLastIndex(r => total >= r.min), rank = ranks[index], next = ranks[index + 1] || null;
  return { ...rank, index, next, progress: next ? (total - rank.min) / (next.min - rank.min) : 1 };
}

const done = (state, n) => lessons.filter(l => state.completed[l.id]).length >= n;

export const badges = [
  { id: 'first-lesson', emoji: '🌱', title: 'Primer paso', desc: 'Finish your first lesson', test: s => done(s, 1) },
  { id: 'streak-3', emoji: '🔥', title: 'Racha de tres', desc: 'Practise 3 days in a row', test: s => streak(s.activity) >= 3 },
  { id: 'streak-7', emoji: '🌶️', title: 'Una semana', desc: 'Practise 7 days in a row', test: s => streak(s.activity) >= 7 },
  { id: 'streak-30', emoji: '💎', title: 'Un mes entero', desc: 'Practise 30 days in a row', test: s => streak(s.activity) >= 30 },
  { id: 'cards-25', emoji: '🃏', title: 'Card shark', desc: 'Review 25 different phrases', test: s => Object.keys(s.cards).length >= 25 },
  { id: 'cards-all', emoji: '📖', title: 'Phrasebook pro', desc: `Review all ${phrases.length} phrases`, test: s => phrases.every(p => s.cards[p.id]) },
  { id: 'voice-5', emoji: '🎤', title: 'Brave voice', desc: 'Speak Spanish aloud 5 times', test: s => s.speaking >= 5 },
  { id: 'chat-3', emoji: '💬', title: 'Platicador', desc: 'Finish 3 conversations', test: s => s.scenarios.length >= 3 },
  { id: 'chat-all', emoji: '🎭', title: 'Every scene', desc: 'Finish every conversation', test: s => scenarios.every(c => s.scenarios.includes(c.id)) },
  { id: 'lessons-half', emoji: '🧭', title: 'Halfway there', desc: 'Finish half of the lessons', test: s => done(s, Math.ceil(lessons.length / 2)) },
  { id: 'lessons-all', emoji: '🎓', title: 'Grammar guide done', desc: 'Finish every lesson', test: s => done(s, lessons.length) },
  { id: 'goal-day', emoji: '🎯', title: 'Goal getter', desc: 'Reach your daily goal', test: s => !!s.goalDay },
  { id: 'ready', emoji: '🛫', title: 'Ready for take-off', desc: 'Finish every lesson and conversation', test: s => done(s, lessons.length) && scenarios.every(c => s.scenarios.includes(c.id)) }
];

export function earnedCount(state) { return badges.filter(b => state.badges[b.id]).length; }

// Records newly earned badges in the state and returns them so the app can celebrate.
export function unlockBadges(state, today) {
  const fresh = badges.filter(b => !state.badges[b.id] && b.test(state));
  for (const b of fresh) state.badges[b.id] = today;
  return fresh;
}
