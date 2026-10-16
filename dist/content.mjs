// Beginner curriculum adapted from the supplied Gramática básica del español.
// Travel supplement items extend the grammar guide with practical trip language.

export const lessons = [
  {
    id: 'survival-questions', title: 'Keep the conversation going', subtitle: 'Ask, repeat, understand.', unit: 'Basic questions', duration: 6,
    explanation: [
      'A few questions let you keep learning while you travel: ¿Cómo se dice…? asks how to say something, ¿Qué significa…? asks what it means, and ¿Cómo se pronuncia…? asks how to pronounce it.',
      'Spanish questions have an opening ¿ and a closing ?. Question words such as qué and cómo carry accents.',
      'Travel supplement: ¿Puede repetir, por favor? politely asks one person to repeat. Add Más despacio, por favor to ask for a slower pace.'
    ],
    examples: [
      { es: '¿Cómo se dice esto en español?', en: 'How do you say this in Spanish?' },
      { es: '¿Qué significa “cuenta”?', en: 'What does “cuenta” mean?', note: 'In a restaurant, la cuenta is the bill.' },
      { es: '¿Cómo se pronuncia “México”?', en: 'How do you pronounce “México”?' },
      { es: '¿Puede repetir, por favor?', en: 'Could you repeat, please?', note: 'Travel supplement; a polite request.' }
    ],
    questions: [
      { prompt: 'You want to know what a word means. Choose the question.', options: ['¿Cómo te llamas?', '¿Qué significa esto?', '¿De dónde eres?'], answer: 1, explanation: '¿Qué significa…? means “What does… mean?”' },
      { prompt: 'Complete: ¿___ se dice esto en español?', options: ['Cuántos', 'Cuál', 'Cómo'], answer: 2, explanation: '¿Cómo se dice…? asks “How do you say…?”' },
      { prompt: 'Ask someone to repeat politely.', options: ['¿Puede repetir, por favor?', 'Hasta luego.', 'Me llamo…'], answer: 0, explanation: 'Puede repetir is a polite way to ask one person to repeat.' },
      { prompt: 'What does “Más despacio, por favor” ask for?', options: ['A lower price', 'A slower pace', 'A different table'], answer: 1, explanation: 'Más despacio means “more slowly.”' }
    ]
  },
  {
    id: 'hello-introductions', title: 'Your first hello', subtitle: 'Greetings that open doors.', unit: 'Unit 1 · Introductions', duration: 5,
    explanation: [
      'Use buenos días in the morning, buenas tardes in the afternoon, and buenas noches in the evening or when saying good night.',
      'Hola works throughout the day. ¿Qué tal? is a friendly “How are things?” Hasta luego means “See you later.”',
      'Ask ¿Cómo te llamas? for a name and ¿De dónde eres? for origin. Use your own name and place in the answers: Me llamo… and Soy de…'
    ],
    examples: [
      { es: '¡Hola! ¿Qué tal?', en: 'Hi! How are you?' },
      { es: 'Buenas tardes. ¿Cómo te llamas?', en: 'Good afternoon. What is your name?' },
      { es: 'Me llamo… ¿Y tú?', en: 'My name is… And you?', note: 'Complete the pause with your own name.' },
      { es: 'Soy de… Hasta luego.', en: 'I am from… See you later.', note: 'Use your own city or country.' }
    ],
    questions: [
      { prompt: 'Choose a greeting for the morning.', options: ['Buenos días.', 'Buenas noches.', 'Hasta luego.'], answer: 0, explanation: 'Buenos días means “Good morning.”' },
      { prompt: 'What does “¿Cómo te llamas?” ask?', options: ['Where you work', 'Your age', 'Your name'], answer: 2, explanation: 'Llamarse is used to give or ask a name.' },
      { prompt: 'Start an answer to “¿De dónde eres?”', options: ['Tengo…', 'Soy de…', 'Me gusta…'], answer: 1, explanation: 'Soy de… introduces your place of origin.' },
      { prompt: 'Which phrase means “See you later”?', options: ['¿Qué tal?', 'Buenos días.', 'Hasta luego.'], answer: 2, explanation: 'Hasta luego is a common goodbye.' }
    ]
  },
  {
    id: 'ser-tener-llamarse', title: 'Say a little about yourself', subtitle: 'Soy, tengo, me llamo.', unit: 'Unit 1 · Introductions', duration: 8,
    explanation: [
      'Ser gives identity, origin, and occupation: yo soy, tú eres, él/ella/usted es, nosotros/nosotras somos, ellos/ellas/ustedes son. A simple occupation usually follows ser without an article: Soy estudiante.',
      'Tener means “to have” and also expresses age: tengo, tienes, tiene, tenemos, tienen. Say Tengo treinta años, literally “I have thirty years.”',
      'For names, learn the whole phrase: me llamo, te llamas, se llama, nos llamamos, se llaman. Spanish often omits the subject pronoun because the verb makes it clear.',
      'Use your own details when practicing. Nationality words can change for gender, such as mexicano/mexicana; canadiense and estadounidense keep the same form.'
    ],
    examples: [
      { es: 'Soy estudiante.', en: 'I am a student.', note: 'A sample occupation; substitute your own.' },
      { es: 'Tengo treinta años.', en: 'I am thirty years old.', note: 'A sample age; practice with your own.' },
      { es: '¿Cómo se llama usted?', en: 'What is your name?', note: 'Polite singular address.' },
      { es: '¿Tienes correo electrónico?', en: 'Do you have an email address?' }
    ],
    questions: [
      { prompt: 'Complete: Yo ___ de México.', options: ['tengo', 'soy', 'eres'], answer: 1, explanation: 'Yo uses soy; ser + de expresses origin.' },
      { prompt: 'How do you say “I am twenty years old”?', options: ['Soy veinte años.', 'Me llamo veinte años.', 'Tengo veinte años.'], answer: 2, explanation: 'Spanish uses tener, not ser, for age.' },
      { prompt: 'Complete: ¿Cómo ___ llamas?', options: ['te', 'me', 'se'], answer: 0, explanation: 'The tú form is te llamas.' },
      { prompt: 'Choose the normal simple statement of occupation.', options: ['Soy estudiante.', 'Tengo estudiante.', 'Me llamo estudiante.'], answer: 0, explanation: 'Use ser for occupation: Soy estudiante.' }
    ]
  },
  {
    id: 'numbers-prices', title: 'Numbers you can use', subtitle: 'Hear a price. Check the total.', unit: 'Unit 1 · Numbers', duration: 7,
    explanation: [
      'Start with 0–15: cero, uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez, once, doce, trece, catorce, quince.',
      'Continue with dieciséis, diecisiete, dieciocho, diecinueve, veinte; then veintiuno through veintinueve. Watch the accents in veintidós, veintitrés, and veintiséis.',
      'From 31, connect tens and units with y: treinta y uno. Tens are treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa. Exactly 100 is cien.',
      'Travel supplement: ¿Cuánto cuesta? asks the price. Uno shortens before a masculine noun: un peso, veintiún pesos. Say treinta y una when counting a feminine noun such as personas.'
    ],
    examples: [
      { es: '¿Cuánto cuesta? — Veinticinco pesos.', en: 'How much does it cost? — Twenty-five pesos.', note: 'Travel supplement.' },
      { es: 'Son treinta y dos pesos.', en: 'It is thirty-two pesos.', note: 'A sample total, not a current price.' },
      { es: 'Cuesta cien pesos.', en: 'It costs one hundred pesos.', note: 'Use cien for exactly 100.' },
      { es: 'Veintiún pesos.', en: 'Twenty-one pesos.', note: 'Veintiuno becomes veintiún before pesos.' }
    ],
    questions: [
      { prompt: 'Which number is “dieciséis”?', options: ['6', '16', '60'], answer: 1, explanation: 'Dieciséis is 16; sesenta is 60.' },
      { prompt: 'Choose 42 in Spanish.', options: ['Catorce y dos', 'Cuarenta y dos', 'Cuatro y veinte'], answer: 1, explanation: 'Cuarenta is 40; add y dos for 42.' },
      { prompt: 'Complete: ___ pesos. (21 pesos)', options: ['Veintiuna', 'Veintiuno', 'Veintiún'], answer: 2, explanation: 'Before the masculine noun pesos, veintiuno becomes veintiún.' },
      { prompt: 'Ask the price of one item.', options: ['¿Cuánto cuesta?', '¿Cuántos años tienes?', '¿Cómo te llamas?'], answer: 0, explanation: '¿Cuánto cuesta? means “How much does it cost?”' }
    ]
  },
  {
    id: 'articles-gender', title: 'A coffee, the bill', subtitle: 'Small words that fit the noun.', unit: 'Unit 2 · Articles', duration: 7,
    explanation: [
      'Learn nouns with their articles: el libro, la playa. El/la mean “the”; un/una mean “a” or “an.” Plurals are los/las and unos/unas.',
      'Words ending in -o are often masculine; words ending in -a are often feminine. These are patterns, not guarantees: el mapa, el idioma, el clima, la mano, la foto.',
      'Articles match the gender and number of their noun: una playa, unas playas. Some person nouns use one form with different articles, such as el/la estudiante.',
      'Use no article in these simple patterns: Soy estudiante, Hablo español, Hoy es lunes. Other contexts do use articles: Estudio los lunes means “I study on Mondays.”'
    ],
    examples: [
      { es: 'Quiero un café.', en: 'I want a coffee.' },
      { es: 'La cuenta, por favor.', en: 'The bill, please.', note: 'Travel supplement; a useful restaurant phrase.' },
      { es: 'Tengo un mapa.', en: 'I have a map.', note: 'Mapa is masculine despite ending in -a.' },
      { es: 'Las playas son bonitas.', en: 'The beaches are beautiful.' }
    ],
    questions: [
      { prompt: 'Choose the article: ___ mapa.', options: ['La', 'El', 'Las'], answer: 1, explanation: 'Mapa is masculine: el mapa.' },
      { prompt: 'Make “la playa” plural.', options: ['Los playas', 'Las playa', 'Las playas'], answer: 2, explanation: 'Both article and noun become plural: las playas.' },
      { prompt: 'Choose the phrase for “a photo.”', options: ['Una foto', 'Un foto', 'El foto'], answer: 0, explanation: 'Foto is feminine: una foto.' },
      { prompt: 'Which means “I speak Spanish”?', options: ['Hablo un español.', 'Hablo español.', 'Soy español.'], answer: 1, explanation: 'Use the language without an article after hablar in this simple statement.' }
    ]
  },
  {
    id: 'present-verbs', title: 'Talk about what you do', subtitle: 'Hablar, comprender, escribir, hacer.', unit: 'Unit 2 · Present tense', duration: 8,
    explanation: [
      'For regular present-tense verbs, remove -ar, -er, or -ir and add the ending. For yo, all three groups use -o: hablo, comprendo, escribo.',
      'The tú forms are hablas, comprendes, escribes. Él/ella/usted uses habla, comprende, escribe. Ustedes uses hablan, comprenden, escriben.',
      'For nosotros/nosotras: hablamos, comprendemos, escribimos. Hacer is irregular in yo: hago. Its other useful forms are haces, hace, hacemos, hacen.',
      'Put no before the verb to make a negative statement: No comprendo. Present-tense statements can describe habits or what is happening in context.'
    ],
    examples: [
      { es: 'Hablo un poco de español.', en: 'I speak a little Spanish.' },
      { es: 'No comprendo.', en: 'I do not understand.' },
      { es: 'Escribo un mensaje.', en: 'I write a message.' },
      { es: 'Hago un curso de español.', en: 'I am taking a Spanish course.' }
    ],
    questions: [
      { prompt: 'Complete: Yo ___ español. (hablar)', options: ['habla', 'hablo', 'hablas'], answer: 1, explanation: 'The regular yo ending is -o: hablo.' },
      { prompt: 'Choose the yo form of hacer.', options: ['Haco', 'Hace', 'Hago'], answer: 2, explanation: 'Hacer has the irregular yo form hago.' },
      { prompt: 'Complete: Ustedes ___ mensajes. (escribir)', options: ['escriben', 'escribimos', 'escribes'], answer: 0, explanation: 'Ustedes uses escriben, the same form as ellos/ellas.' },
      { prompt: 'Choose “I do not understand.”', options: ['Comprendo no.', 'No comprendo.', 'No comprender.'], answer: 1, explanation: 'Place no before the conjugated verb: No comprendo.' }
    ]
  },
  {
    id: 'wants-reasons', title: 'Make a plan', subtitle: 'I want to… because…', unit: 'Unit 2 · Wants and reasons', duration: 7,
    explanation: [
      'Querer + infinitive expresses what you want to do: Quiero viajar. Keep the second verb in its infinitive form ending in -ar, -er, or -ir.',
      'Useful forms of querer: quiero, quieres, quiere, queremos, quieren. Notice queremos keeps e while quiero and quieres change e to ie.',
      'Por qué, written as two words with an accent, asks “why.” Porque, one word without an accent, introduces a reason: Porque quiero viajar.',
      'Use para + infinitive for purpose: Para viajar. Use por + noun for a cause or reason: Por mi trabajo. Travel supplement: add por favor when making a request.'
    ],
    examples: [
      { es: 'Quiero visitar el museo.', en: 'I want to visit the museum.' },
      { es: '¿Por qué estudias español?', en: 'Why do you study Spanish?' },
      { es: 'Porque quiero viajar por México.', en: 'Because I want to travel around Mexico.' },
      { es: 'Estudio español para hablar con la gente.', en: 'I study Spanish to talk with people.' }
    ],
    questions: [
      { prompt: 'Complete: Quiero ___ el museo.', options: ['visito', 'visitas', 'visitar'], answer: 2, explanation: 'After quiero, keep the second verb in the infinitive: visitar.' },
      { prompt: 'Choose the question word for “why.”', options: ['Porque', 'Por qué', 'Para'], answer: 1, explanation: 'Questions use por qué: two words, with an accent.' },
      { prompt: 'Complete: Estudio español ___ viajar.', options: ['para', 'porque', 'muy'], answer: 0, explanation: 'Para + infinitive expresses purpose: para viajar.' },
      { prompt: 'Complete: Nosotros ___ aprender.', options: ['quieren', 'quieremos', 'queremos'], answer: 2, explanation: 'The nosotros form is queremos, without the ie change.' }
    ]
  },
  {
    id: 'likes', title: 'Find what you enjoy', subtitle: 'Me gusta and me gustan.', unit: 'More grammar · Likes', duration: 6,
    explanation: [
      'Me gusta means “I like.” Spanish builds this around what is pleasing to you: the thing liked determines gusta or gustan.',
      'Use me gusta with one thing or an activity: Me gusta esta ciudad. Me gusta viajar. Use me gustan with plural things: Me gustan los museos.',
      'Use te gusta to ask one person informally: ¿Te gusta el café? Me encanta and me encantan express “I love.” No me gusta means “I do not like.”',
      'General likes often use a definite article: Me gusta el cine. Me gustan los deportes. This follows the likes examples in your source guide.'
    ],
    examples: [
      { es: 'Me gusta esta ciudad.', en: 'I like this city.' },
      { es: 'Me gustan los museos.', en: 'I like museums.' },
      { es: 'Me gusta escuchar música.', en: 'I like listening to music.' },
      { es: 'Me encanta el cine.', en: 'I love cinema.' }
    ],
    questions: [
      { prompt: 'Complete: Me ___ los deportes.', options: ['gusta', 'gustan', 'gusto'], answer: 1, explanation: 'Los deportes is plural, so use gustan.' },
      { prompt: 'Complete: Me ___ viajar.', options: ['gustan', 'gustas', 'gusta'], answer: 2, explanation: 'An infinitive such as viajar takes gusta.' },
      { prompt: 'Ask “Do you like coffee?” informally.', options: ['¿Te gusta el café?', '¿Me gustan el café?', '¿Tú gusto café?'], answer: 0, explanation: 'Te gusta asks about the other person; el café is singular.' },
      { prompt: 'Which means “I love this city”?', options: ['Me llaman esta ciudad.', 'Me encanta esta ciudad.', 'Tengo esta ciudad.'], answer: 1, explanation: 'Me encanta expresses a strong liking for a singular thing.' }
    ]
  },
  {
    id: 'ser-estar-hay', title: 'Describe it. Find it.', subtitle: 'Es, está, and hay.', unit: 'Unit 3 · Places', duration: 8,
    explanation: [
      'Use ser to identify or describe: El museo es grande. Use estar to locate a known place or object: El museo está aquí. Avoid relying only on “permanent versus temporary”; location normally uses estar even for a building.',
      'Hay means both “there is” and “there are”: Hay un museo. Hay dos museos. It does not change between singular and plural.',
      'Introduce existence with un/una, numbers, or a noun without an article: Hay una playa; Hay dos playas; Hay playas. For these beginner patterns, avoid a definite article immediately after hay: use La playa está cerca for a known beach.',
      'Useful estar forms are estoy, estás, está, estamos, están. A question with hay asks whether something exists; a question with dónde está asks where a known thing is.'
    ],
    examples: [
      { es: 'El museo es grande.', en: 'The museum is big.' },
      { es: 'El museo está en el centro.', en: 'The museum is in the city center.' },
      { es: 'Hay un museo cerca.', en: 'There is a museum nearby.' },
      { es: '¿Dónde están los baños?', en: 'Where are the restrooms?', note: 'Travel supplement.' }
    ],
    questions: [
      { prompt: 'Complete: El hotel ___ en el centro.', options: ['es', 'está', 'hay'], answer: 1, explanation: 'Use estar to locate a known hotel.' },
      { prompt: 'Choose “There are two museums.”', options: ['Hay dos museos.', 'Están dos museos.', 'Hayes dos museos.'], answer: 0, explanation: 'Hay stays the same for singular and plural.' },
      { prompt: 'Choose a natural introductory existence sentence.', options: ['Hay el restaurante.', 'Hay la playa.', 'Hay una playa.'], answer: 2, explanation: 'Hay can take an indefinite article: Hay una playa.' },
      { prompt: 'Complete: La ciudad ___ bonita.', options: ['hay', 'es', 'están'], answer: 1, explanation: 'Use ser + adjective for this description: es bonita.' }
    ]
  },
  {
    id: 'weather-descriptions', title: 'Talk about the day', subtitle: 'Weather, seasons, and muy / mucho.', unit: 'Unit 3 · Weather', duration: 7,
    explanation: [
      'Use hace in common weather expressions: Hace calor, Hace frío, Hace viento. Say Llueve for “It rains” and Está nublado for “It is cloudy.”',
      'Use muy before an adjective: muy bonito. Use mucho/mucha/muchos/muchas before a noun, matching it: mucho calor, muchas nubes. After a verb, mucho means “a lot”: Llueve mucho.',
      'The seasons are el invierno, la primavera, el verano, el otoño. February falls in winter in Mexico; the conditions you encounter depend on region and altitude, so these are language examples, not a forecast.',
      'A simple superlative uses article + más + adjective + de: el museo más grande de la ciudad. It identifies the biggest, most famous, or similar item within a group.'
    ],
    examples: [
      { es: 'Hoy hace frío.', en: 'It is cold today.' },
      { es: 'Está nublado y hay muchas nubes.', en: 'It is cloudy and there are many clouds.' },
      { es: 'El paisaje es muy bonito.', en: 'The scenery is very beautiful.' },
      { es: 'Es el museo más grande de la ciudad.', en: 'It is the biggest museum in the city.', note: 'A grammar example; no specific museum is being ranked.' }
    ],
    questions: [
      { prompt: 'Choose “It is hot.”', options: ['Es calor.', 'Está calor.', 'Hace calor.'], answer: 2, explanation: 'The standard expression is Hace calor.' },
      { prompt: 'Complete: La playa es ___ bonita.', options: ['muy', 'muchas', 'mucho'], answer: 0, explanation: 'Use muy before the adjective bonita.' },
      { prompt: 'Complete: Hay ___ nubes.', options: ['muy', 'muchas', 'mucho'], answer: 1, explanation: 'Nubes is feminine plural, so use muchas.' },
      { prompt: 'What does “Llueve mucho” mean?', options: ['It is very sunny.', 'There are many lakes.', 'It rains a lot.'], answer: 2, explanation: 'After a verb, mucho means “a lot.”' }
    ]
  },
  {
    id: 'this-and-which', title: 'Choose this one', subtitle: 'Este, esta, esto, qué, cuál.', unit: 'More grammar · Choices', duration: 7,
    explanation: [
      'Match “this/these” to the noun: este libro, esta ciudad, estos libros, estas ciudades. These forms do not need written accents.',
      'Use esto for an unidentified thing or idea: ¿Qué es esto? Do not put a noun immediately after esto; say este libro. To introduce a person, use Él es… or Ella es… as appropriate, or the person’s name.',
      'Qué often asks for a definition: ¿Qué es esto? Cuál often selects or identifies: ¿Cuál quieres? ¿Cuál es tu nombre? Use cuáles for a plural selection.',
      'Before a noun, qué is a useful general pattern: ¿Qué libro quieres? In Mexican and other Latin American Spanish you may also hear cuál directly before a noun when choosing. Both patterns exist; practice the complete example rather than a rigid English translation.'
    ],
    examples: [
      { es: 'Quiero este libro.', en: 'I want this book.' },
      { es: 'Me gustan estas sandalias.', en: 'I like these sandals.' },
      { es: '¿Qué es esto?', en: 'What is this?' },
      { es: '¿Cuál quieres? — Esta, por favor.', en: 'Which one do you want? — This one, please.', note: 'Esta replaces a feminine noun already understood.' }
    ],
    questions: [
      { prompt: 'Complete: ___ ciudad es bonita.', options: ['Este', 'Esta', 'Esto'], answer: 1, explanation: 'Ciudad is feminine singular, so use esta.' },
      { prompt: 'Ask about an object whose name you do not know.', options: ['¿Qué es esto?', '¿Qué es este ciudad?', '¿Cuál son esto?'], answer: 0, explanation: 'Esto stands alone for an unidentified thing.' },
      { prompt: 'Complete: Me gustan ___ libros.', options: ['estas', 'esto', 'estos'], answer: 2, explanation: 'Libros is masculine plural, so use estos.' },
      { prompt: 'Choose “Which one do you want?”', options: ['¿Cuántos años tienes?', '¿Cuál quieres?', '¿Dónde trabajas?'], answer: 1, explanation: 'Cuál selects one item from an understood set.' }
    ]
  },
  {
    id: 'mexico-everyday', title: 'Use it in Mexico', subtitle: 'Everyday words and polite requests.', unit: 'Travel supplement', duration: 6,
    explanation: [
      'For this trip, focus on tú for familiar singular address, usted for polite singular address, and ustedes for plural address. Usted uses es/tiene/habla; ustedes uses son/tienen/hablan.',
      'Vosotros is mainly associated with Spain and is not the usual Mexican plural address. Vos also exists in some regional Mexican varieties; learning tú, usted, and ustedes is a practical beginner starting point.',
      'Common Mexican vocabulary includes celular (mobile phone), computadora (computer), lentes (glasses), and pizarrón (classroom board). ¿Qué onda? is an informal “What’s up?”; hola or buenos días is a useful choice with someone you have just met.',
      'Travel supplement: learn complete requests such as La cuenta, por favor and ¿Puede ayudarme? Use con permiso when passing someone, and gracias to thank them. Prices and trip details in exercises are fictional practice examples.'
    ],
    examples: [
      { es: '¿Tiene un cargador para celular?', en: 'Do you have a phone charger?', note: 'Polite singular address; travel supplement.' },
      { es: '¿Ustedes hablan español?', en: 'Do you all speak Spanish?' },
      { es: 'Con permiso. Gracias.', en: 'Excuse me. Thank you.', note: 'For moving past someone; travel supplement.' },
      { es: 'La cuenta, por favor.', en: 'The bill, please.' }
    ],
    questions: [
      { prompt: 'Which is the usual plural “you” to practice for Mexico?', options: ['Vosotros', 'Ustedes', 'Tú'], answer: 1, explanation: 'Ustedes is the usual plural address in Mexico.' },
      { prompt: 'Choose the common Mexican word for a mobile phone.', options: ['Pizarrón', 'Lentes', 'Celular'], answer: 2, explanation: 'Celular means mobile phone; lentes are glasses.' },
      { prompt: 'Complete a polite question to one person: ¿Usted ___ un mapa?', options: ['tiene', 'tienes', 'tienen'], answer: 0, explanation: 'Usted uses the third-person singular form tiene.' },
      { prompt: 'You need to move past someone. Choose a useful phrase.', options: ['¿Qué significa?', 'Con permiso.', 'Tengo veinte años.'], answer: 1, explanation: 'Con permiso is a polite phrase for passing someone or entering.' }
    ]
  }
];

export const phrases = [
  { id: 'e01', es: 'Hola.', en: 'Hello.', category: 'Essentials' },
  { id: 'e02', es: 'Buenos días.', en: 'Good morning.', category: 'Essentials' },
  { id: 'e03', es: 'Buenas tardes.', en: 'Good afternoon.', category: 'Essentials' },
  { id: 'e04', es: 'Buenas noches.', en: 'Good evening / Good night.', category: 'Essentials' },
  { id: 'e05', es: 'Por favor.', en: 'Please.', category: 'Essentials', note: 'Travel supplement.' },
  { id: 'e06', es: 'Gracias.', en: 'Thank you.', category: 'Essentials', note: 'Travel supplement.' },
  { id: 'e07', es: 'De nada.', en: 'You’re welcome.', category: 'Essentials', note: 'Travel supplement.' },
  { id: 'e08', es: 'Disculpe.', en: 'Excuse me.', category: 'Essentials', note: 'Travel supplement; polite attention-getter.' },
  { id: 'e09', es: 'Con permiso.', en: 'Excuse me / May I get through?', category: 'Essentials', note: 'Travel supplement; useful when passing someone.' },
  { id: 'e10', es: 'No comprendo.', en: 'I do not understand.', category: 'Essentials' },
  { id: 'e11', es: '¿Puede repetir, por favor?', en: 'Could you repeat, please?', category: 'Essentials', note: 'Travel supplement; polite singular address.' },
  { id: 'e12', es: 'Más despacio, por favor.', en: 'More slowly, please.', category: 'Essentials', note: 'Travel supplement.' },
  { id: 'e13', es: '¿Cómo se dice esto en español?', en: 'How do you say this in Spanish?', category: 'Essentials' },
  { id: 'e14', es: '¿Qué significa esto?', en: 'What does this mean?', category: 'Essentials' },
  { id: 'e15', es: '¿Cómo se pronuncia?', en: 'How is it pronounced?', category: 'Essentials' },
  { id: 'e16', es: 'Hablo un poco de español.', en: 'I speak a little Spanish.', category: 'Essentials' },
  { id: 'e17', es: '¿Puede ayudarme?', en: 'Could you help me?', category: 'Essentials', note: 'Travel supplement; polite singular address.' },
  { id: 'e18', es: 'Hasta luego.', en: 'See you later.', category: 'Essentials' },
  { id: 'i01', es: '¿Qué tal?', en: 'How are you? / How are things?', category: 'Introductions' },
  { id: 'i02', es: '¿Cómo te llamas?', en: 'What is your name?', category: 'Introductions', note: 'Informal singular address.' },
  { id: 'i03', es: '¿Cómo se llama usted?', en: 'What is your name?', category: 'Introductions', note: 'Polite singular address.' },
  { id: 'i04', es: 'Me llamo…', en: 'My name is…', category: 'Introductions', note: 'Complete with your own name.' },
  { id: 'i05', es: '¿De dónde eres?', en: 'Where are you from?', category: 'Introductions' },
  { id: 'i06', es: 'Soy de…', en: 'I am from…', category: 'Introductions', note: 'Complete with your own city or country.' },
  { id: 'i07', es: 'Mucho gusto.', en: 'Nice to meet you.', category: 'Introductions', note: 'Travel supplement.' },
  { id: 'i08', es: '¿Y tú?', en: 'And you?', category: 'Introductions' },
  { id: 'i09', es: '¿A qué te dedicas?', en: 'What do you do for a living?', category: 'Introductions' },
  { id: 'i10', es: '¿Dónde trabajas?', en: 'Where do you work?', category: 'Introductions' },
  { id: 'i11', es: '¿Tienes correo electrónico?', en: 'Do you have an email address?', category: 'Introductions' },
  { id: 'i12', es: 'Quiero aprender español.', en: 'I want to learn Spanish.', category: 'Introductions' },
  { id: 'f01', es: 'Una mesa para dos, por favor.', en: 'A table for two, please.', category: 'Food', note: 'Travel supplement.' },
  { id: 'f02', es: '¿Me trae el menú, por favor?', en: 'Could you bring me the menu, please?', category: 'Food', note: 'Travel supplement.' },
  { id: 'f03', es: '¿Qué recomienda?', en: 'What do you recommend?', category: 'Food', note: 'Travel supplement.' },
  { id: 'f04', es: 'Quiero un café, por favor.', en: 'I would like a coffee, please.', category: 'Food', note: 'Travel supplement; quiero literally means “I want.”' },
  { id: 'f05', es: 'Agua sin gas, por favor.', en: 'Still water, please.', category: 'Food', note: 'Travel supplement.' },
  { id: 'f06', es: 'Agua con gas, por favor.', en: 'Sparkling water, please.', category: 'Food', note: 'Travel supplement.' },
  { id: 'f07', es: 'Sin chile, por favor.', en: 'Without chili, please.', category: 'Food', note: 'Travel supplement; a preference request.' },
  { id: 'f08', es: '¿Pica mucho?', en: 'Is it very spicy?', category: 'Food', note: 'Travel supplement.' },
  { id: 'f09', es: 'La salsa aparte, por favor.', en: 'The salsa on the side, please.', category: 'Food', note: 'Travel supplement.' },
  { id: 'f10', es: 'La cuenta, por favor.', en: 'The bill, please.', category: 'Food', note: 'Travel supplement.' },
  { id: 'f11', es: 'Para llevar, por favor.', en: 'To go, please.', category: 'Food', note: 'Travel supplement.' },
  { id: 'f12', es: 'Me gusta mucho.', en: 'I like it a lot.', category: 'Food' },
  { id: 'a01', es: '¿Dónde está el centro?', en: 'Where is the city center?', category: 'Getting around', note: 'Travel supplement.' },
  { id: 'a02', es: '¿Hay un museo cerca?', en: 'Is there a museum nearby?', category: 'Getting around' },
  { id: 'a03', es: '¿Dónde está la parada de autobús?', en: 'Where is the bus stop?', category: 'Getting around', note: 'Travel supplement.' },
  { id: 'a04', es: '¿Este autobús va al centro?', en: 'Does this bus go to the city center?', category: 'Getting around', note: 'Travel supplement; learn as a complete question.' },
  { id: 'a05', es: 'Al centro, por favor.', en: 'To the city center, please.', category: 'Getting around', note: 'Travel supplement; al combines a + el.' },
  { id: 'a06', es: '¿Cuánto cuesta el viaje?', en: 'How much does the trip cost?', category: 'Getting around', note: 'Travel supplement.' },
  { id: 'a07', es: 'Aquí está bien, gracias.', en: 'Here is fine, thank you.', category: 'Getting around', note: 'Travel supplement; useful when choosing a drop-off point.' },
  { id: 'a08', es: 'A la derecha.', en: 'To the right.', category: 'Getting around', note: 'Travel supplement.' },
  { id: 'a09', es: 'A la izquierda.', en: 'To the left.', category: 'Getting around', note: 'Travel supplement.' },
  { id: 'a10', es: 'Todo derecho.', en: 'Straight ahead.', category: 'Getting around', note: 'Travel supplement; derecho here means straight, not right.' },
  { id: 'a11', es: '¿Está lejos?', en: 'Is it far?', category: 'Getting around', note: 'Travel supplement.' },
  { id: 'a12', es: '¿Me lo puede mostrar en el mapa?', en: 'Could you show me on the map?', category: 'Getting around', note: 'Travel supplement; learn as a complete request.' },
  { id: 's01', es: 'Tengo una reservación.', en: 'I have a reservation.', category: 'Stay', note: 'Travel supplement.' },
  { id: 's02', es: 'A nombre de…', en: 'Under the name…', category: 'Stay', note: 'Travel supplement; complete with the name on your booking.' },
  { id: 's03', es: '¿A qué hora es la salida?', en: 'What time is check-out?', category: 'Stay', note: 'Travel supplement; hotel context.' },
  { id: 's04', es: '¿Cuál es la contraseña del wifi?', en: 'What is the Wi-Fi password?', category: 'Stay', note: 'Travel supplement.' },
  { id: 's05', es: '¿El desayuno está incluido?', en: 'Is breakfast included?', category: 'Stay', note: 'Travel supplement.' },
  { id: 's06', es: '¿Dónde están los baños?', en: 'Where are the restrooms?', category: 'Stay', note: 'Travel supplement.' },
  { id: 's07', es: '¿Hay agua caliente?', en: 'Is there hot water?', category: 'Stay', note: 'Travel supplement.' },
  { id: 's08', es: 'La llave no funciona.', en: 'The key does not work.', category: 'Stay', note: 'Travel supplement.' },
  { id: 's09', es: '¿Puede guardar mi equipaje?', en: 'Could you store my luggage?', category: 'Stay', note: 'Travel supplement.' },
  { id: 's10', es: 'Una noche más, por favor.', en: 'One more night, please.', category: 'Stay', note: 'Travel supplement.' },
  { id: 'b01', es: '¿Cuánto cuesta?', en: 'How much does it cost?', category: 'Shopping', note: 'Travel supplement.' },
  { id: 'b02', es: '¿Cuánto cuestan estos?', en: 'How much do these cost?', category: 'Shopping', note: 'Travel supplement; refers to masculine plural items.' },
  { id: 'b03', es: 'Quiero este, por favor.', en: 'I would like this one, please.', category: 'Shopping', note: 'Travel supplement; este replaces a masculine noun.' },
  { id: 'b04', es: 'Quiero esta, por favor.', en: 'I would like this one, please.', category: 'Shopping', note: 'Travel supplement; esta replaces a feminine noun.' },
  { id: 'b05', es: '¿Puedo pagar con tarjeta?', en: 'Can I pay by card?', category: 'Shopping', note: 'Travel supplement.' },
  { id: 'b06', es: '¿Aceptan efectivo?', en: 'Do you accept cash?', category: 'Shopping', note: 'Travel supplement.' },
  { id: 'b07', es: 'Solo estoy viendo, gracias.', en: 'I am just looking, thank you.', category: 'Shopping', note: 'Travel supplement; learn as a complete phrase.' },
  { id: 'b08', es: '¿Tiene una talla más grande?', en: 'Do you have a larger size?', category: 'Shopping', note: 'Travel supplement.' },
  { id: 'b09', es: '¿Tiene una talla más chica?', en: 'Do you have a smaller size?', category: 'Shopping', note: 'Travel supplement; chica means small here.' },
  { id: 'b10', es: '¿Me da un recibo, por favor?', en: 'Could I have a receipt, please?', category: 'Shopping', note: 'Travel supplement.' },
  { id: 'g01', es: 'Hay un museo.', en: 'There is a museum.', category: 'Grammar', note: 'Hay can take the indefinite article un.' },
  { id: 'g02', es: 'Hay dos museos.', en: 'There are two museums.', category: 'Grammar', note: 'Hay does not change for plural nouns.' },
  { id: 'g03', es: 'El museo está aquí.', en: 'The museum is here.', category: 'Grammar', note: 'Estar locates a known place.' },
  { id: 'g04', es: 'El museo es grande.', en: 'The museum is big.', category: 'Grammar', note: 'Ser describes the museum.' },
  { id: 'g05', es: 'Me gusta viajar.', en: 'I like traveling.', category: 'Grammar', note: 'Use gusta with an infinitive.' },
  { id: 'g06', es: 'Me gustan los museos.', en: 'I like museums.', category: 'Grammar', note: 'Use gustan with plural things.' },
  { id: 'g07', es: 'Hace calor.', en: 'It is hot.', category: 'Grammar' },
  { id: 'g08', es: 'Hace frío.', en: 'It is cold.', category: 'Grammar' },
  { id: 'g09', es: 'Está nublado.', en: 'It is cloudy.', category: 'Grammar' },
  { id: 'g10', es: 'Llueve mucho.', en: 'It rains a lot.', category: 'Grammar' },
  { id: 'g11', es: '¿Qué es esto?', en: 'What is this?', category: 'Grammar', note: 'Esto refers to an unidentified thing or idea.' },
  { id: 'g12', es: '¿Cuál quieres?', en: 'Which one do you want?', category: 'Grammar' },
  { id: 'g13', es: '¿Por qué estudias español?', en: 'Why do you study Spanish?', category: 'Grammar' },
  { id: 'g14', es: 'Porque quiero viajar.', en: 'Because I want to travel.', category: 'Grammar' },
  { id: 'g15', es: 'La ciudad es muy bonita.', en: 'The city is very beautiful.', category: 'Grammar', note: 'Muy comes before an adjective.' },
  { id: 'g16', es: 'Hay muchas playas.', en: 'There are many beaches.', category: 'Grammar', note: 'Muchas matches the feminine plural playas.' }
];

export const scenarios = [
  {
    id: 'restaurant', title: 'Order at a restaurant', subtitle: 'Choose a drink and ask for the bill. Travel supplement.', icon: '🌮', level: 'Beginner',
    turns: [
      { speaker: 'local', es: 'Buenas tardes. ¿Qué desea tomar?', en: 'Good afternoon. What would you like to drink?' },
      { speaker: 'you', es: 'Agua sin gas, por favor.', en: 'Still water, please.', alternatives: ['Quiero agua sin gas, por favor.', 'Agua natural, por favor.', 'Quiero agua natural, por favor.', 'Un agua sin gas, por favor.'] },
      { speaker: 'local', es: '¿Y para comer?', en: 'And to eat?' },
      { speaker: 'you', es: 'Dos tacos, por favor. La salsa aparte.', en: 'Two tacos, please. The salsa on the side.', alternatives: ['Quiero dos tacos con la salsa aparte, por favor.', 'Dos tacos con la salsa aparte, por favor.'] },
      { speaker: 'local', es: '¿Algo más?', en: 'Anything else?' },
      { speaker: 'you', es: 'La cuenta, por favor.', en: 'The bill, please.', alternatives: ['No, gracias. La cuenta, por favor.', '¿Me trae la cuenta, por favor?'] }
    ]
  },
  {
    id: 'taxi', title: 'Take a taxi', subtitle: 'Give a destination and check the price. Travel supplement.', icon: '🚕', level: 'Beginner',
    turns: [
      { speaker: 'local', es: 'Buenas tardes. ¿A dónde va?', en: 'Good afternoon. Where are you going?' },
      { speaker: 'you', es: 'Al centro, por favor.', en: 'To the city center, please.', alternatives: ['Quiero ir al centro, por favor.'] },
      { speaker: 'local', es: 'Claro, al centro.', en: 'Of course, to the city center.' },
      { speaker: 'you', es: '¿Cuánto cuesta el viaje?', en: 'How much does the trip cost?', alternatives: ['¿Cuánto cuesta?', '¿Cuánto cuesta ir al centro?'] },
      { speaker: 'local', es: 'Son cien pesos. ¿Aquí está bien?', en: 'It is one hundred pesos. Is here okay?' },
      { speaker: 'you', es: 'Aquí está bien, gracias.', en: 'Here is fine, thank you.', alternatives: ['Sí, aquí está bien, gracias.', 'Sí, aquí, por favor.'] }
    ]
  },
  {
    id: 'hotel', title: 'Check in at your hotel', subtitle: 'Confirm your booking and connect. Travel supplement.', icon: '🏨', level: 'Beginner',
    turns: [
      { speaker: 'local', es: 'Buenas tardes. ¿Tiene una reservación?', en: 'Good afternoon. Do you have a reservation?' },
      { speaker: 'you', es: 'Sí, tengo una reservación.', en: 'Yes, I have a reservation.', alternatives: ['Tengo una reservación.', 'Sí, tengo una reserva.'] },
      { speaker: 'local', es: 'Aquí está su llave. ¿Tiene alguna pregunta?', en: 'Here is your key. Do you have any questions?' },
      { speaker: 'you', es: '¿A qué hora es la salida?', en: 'What time is check-out?', alternatives: ['¿A qué hora es el check-out?', '¿Cuál es la hora de salida?'] },
      { speaker: 'local', es: 'A las once de la mañana. ¿Algo más?', en: 'At eleven in the morning. Anything else?' },
      { speaker: 'you', es: '¿Cuál es la contraseña del wifi?', en: 'What is the Wi-Fi password?', alternatives: ['¿Me da la contraseña del wifi, por favor?', '¿Cuál es la clave del wifi?'] }
    ]
  },
  {
    id: 'market', title: 'Buy something at a market', subtitle: 'Ask the price and choose one. Travel supplement.', icon: '🛍️', level: 'Beginner',
    turns: [
      { speaker: 'local', es: 'Buenos días. ¿Le gusta este sombrero?', en: 'Good morning. Do you like this hat?' },
      { speaker: 'you', es: 'Sí. ¿Cuánto cuesta?', en: 'Yes. How much does it cost?', alternatives: ['Sí, me gusta. ¿Cuánto cuesta?', '¿Cuánto cuesta este sombrero?'] },
      { speaker: 'local', es: 'Cuesta cien pesos. ¿Cuál quiere?', en: 'It costs one hundred pesos. Which one would you like?' },
      { speaker: 'you', es: 'Quiero este, por favor.', en: 'I would like this one, please.', alternatives: ['Este, por favor.', 'Quiero este sombrero, por favor.'] },
      { speaker: 'local', es: 'Muy bien. ¿Algo más?', en: 'Very good. Anything else?' },
      { speaker: 'you', es: 'No, gracias. ¿Puedo pagar con tarjeta?', en: 'No, thank you. Can I pay by card?', alternatives: ['¿Puedo pagar con tarjeta?', 'No, gracias. ¿Aceptan tarjeta?'] }
    ]
  },
  {
    id: 'directions', title: 'Find a museum', subtitle: 'Ask, listen, and check a direction. Travel supplement.', icon: '🗺️', level: 'Beginner',
    turns: [
      { speaker: 'local', es: 'Buenos días.', en: 'Good morning.' },
      { speaker: 'you', es: 'Disculpe, ¿hay un museo cerca?', en: 'Excuse me, is there a museum nearby?', alternatives: ['¿Hay un museo cerca?', 'Buenos días. ¿Hay un museo cerca?'] },
      { speaker: 'local', es: 'Sí, hay uno en el centro.', en: 'Yes, there is one in the city center.' },
      { speaker: 'you', es: '¿Dónde está el centro?', en: 'Where is the city center?', alternatives: ['Disculpe, ¿dónde está el centro?'] },
      { speaker: 'local', es: 'Todo derecho y luego a la izquierda.', en: 'Straight ahead and then to the left.' },
      { speaker: 'you', es: '¿A la izquierda? Gracias.', en: 'To the left? Thank you.', alternatives: ['A la izquierda. Gracias.', 'Todo derecho y a la izquierda. Gracias.'] }
    ]
  },
  {
    id: 'meeting', title: 'Meet someone new', subtitle: 'Share your interest in learning. Travel supplement.', icon: '👋', level: 'Beginner',
    turns: [
      { speaker: 'local', es: 'Hola. ¿Qué tal?', en: 'Hi. How are you?' },
      { speaker: 'you', es: 'Bien, gracias. ¿Y tú?', en: 'Well, thank you. And you?', alternatives: ['Muy bien, gracias. ¿Y tú?', 'Bien. ¿Y tú?'] },
      { speaker: 'local', es: 'Bien. ¿Hablas español?', en: 'Well. Do you speak Spanish?' },
      { speaker: 'you', es: 'Hablo un poco de español.', en: 'I speak a little Spanish.', alternatives: ['Sí, hablo un poco de español.', 'Un poco.'] },
      { speaker: 'local', es: '¿Por qué estudias español?', en: 'Why do you study Spanish?' },
      { speaker: 'you', es: 'Porque quiero viajar por México.', en: 'Because I want to travel around Mexico.', alternatives: ['Quiero viajar por México.', 'Porque quiero hablar con la gente.'] }
    ]
  }
];

export const pronunciation = [
  { id: 'vowels', title: 'Keep the five vowels steady', tip: 'A, e, i, o, u are relatively steady vowel sounds. Avoid stretching a vowel into the two-part sound often heard in English “day” or “go.” Listen, pause, then repeat each syllable at an easy pace.', es: 'mapa · mesa · libro · foto · uno', en: 'map · table · book · photo · one' },
  { id: 'silent-h', title: 'Let h stay silent', tip: 'In ordinary Spanish words, h is silent: hola begins with the vowel sound. The combination ch is different and has its own sound. Compare the written word with what you hear.', es: 'hola · hotel · hace calor', en: 'hello · hotel · it is hot' },
  { id: 'enye', title: 'Give ñ its own sound', tip: 'Ñ is one consonant sound, similar to the “ny” in English “canyon.” It is different from n. Pay attention to años: the ñ matters.', es: 'años · mañana · español', en: 'years · tomorrow / morning · Spanish' },
  { id: 'rhythm', title: 'Find the stressed syllable', tip: 'A written accent marks the stressed vowel: café, México, teléfono. Say each syllable clearly and avoid reducing all unstressed vowels to an English “uh.” Copy a short phrase’s rhythm after listening.', es: 'café · México · teléfono', en: 'coffee · Mexico · telephone' },
  { id: 'r-rr', title: 'Practice r and rr gradually', tip: 'Between vowels, a single r usually has one quick tongue tap; rr has a trill. An r at the beginning of a word also uses the stronger sound. Start slowly; clear vowels and stress still help people understand you.', es: 'pero · perro · restaurante', en: 'but · dog · restaurant' },
  { id: 'mexican-listening', title: 'Listen for Mexican sounds', tip: 'In Mexican Spanish, z and c before e or i normally sound like s, so gracias has an s sound. Mexico has many regional accents. Use a Mexican Spanish voice when available, then listen to real speakers for variety; audio playback is practice, not an accent score.', es: 'gracias · cinco · zapato', en: 'thank you · five · shoe' }
];

export const phases = [
  { title: 'Build your first phrases', when: 'October 2026', focus: 'Practice greetings, repair questions, names, and numbers. Aim for a short daily session and say each example aloud.' },
  { title: 'Make your own sentences', when: 'November 2026', focus: 'Work through articles, present-tense verbs, wants, and likes. Replace sample details with your own and review missed questions.' },
  { title: 'Rehearse everyday situations', when: 'December 2026–January 2027', focus: 'Practice places, weather, and choices. Rotate through restaurant, transport, hotel, and market conversations; listen before revealing the English.' },
  { title: 'Use Spanish on your trip', when: 'February 2027', focus: 'Choose a few useful phrases before each outing. Ask for repetition when needed and save new expressions you hear for later practice.' }
];
