// A Spanish word with a story, one a day on the home screen.
// Many come from Nahuatl (the Aztec language), Greek or Arabic.
// [Spanish, English, story]
const rows = [
  ['chocolate', 'chocolate', 'From Nahuatl, the Aztec language. The Aztecs drank it bitter, often with chile.'],
  ['aguacate', 'avocado', 'From Nahuatl āhuacatl. Guacamole is āhuacatl + molli, sauce.'],
  ['tomate', 'tomato', 'From Nahuatl tomatl. Greek ντομάτα comes from the same word, via Spanish and Italian.'],
  ['chile', 'chili pepper', 'From Nahuatl chīlli. In Mexico, ¿pica? means “is it spicy?” Ask before you bite.'],
  ['cacahuate', 'peanut', 'Mexican Spanish, from Nahuatl. Spain says cacahuete, so this one marks you as a Mexico learner.'],
  ['papalote', 'kite', 'Mexican Spanish, from Nahuatl pāpālōtl, butterfly.'],
  ['problema', 'problem', 'From Greek πρόβλημα, and it keeps the Greek ending: el problema is masculine. ¡No hay problema!'],
  ['teléfono', 'telephone', 'τήλε + φωνή, exactly as in Greek. You already know this one.'],
  ['farmacia', 'pharmacy', 'From Greek φάρμακον. Look for the green cross; in Mexico many pharmacies also have a doctor.'],
  ['biblioteca', 'library', 'From Greek βιβλιοθήκη. Careful: librería is a bookshop.'],
  ['ojalá', 'hopefully', 'From Arabic law šāʾ Allāh, “if God wills”. Ojalá que no llueva: hopefully it won’t rain.'],
  ['almohada', 'pillow', 'From Arabic al-mukhadda. Many Spanish words starting with al- came from Arabic.'],
  ['ahorita', 'right now (or later)', 'Mexican diminutive of ahora. It can mean now, in a bit, or maybe never. Context decides.'],
  ['¡Qué padre!', 'How cool!', 'Mexican slang, literally “how father!”. ¡Qué padre está la playa!'],
  ['chamba', 'work, a job', 'Mexican slang. ¿Cómo va la chamba? How’s work going?'],
  ['antojitos', 'street snacks', 'Literally “little cravings”: tacos, tamales, elotes. A good word to know for February.']
];

export const words = rows.map(([es, en, story]) => ({ es, en, story }));
