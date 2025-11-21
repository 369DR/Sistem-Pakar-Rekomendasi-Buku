import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [tujuan, setTujuan] = useState('');
  const [minat, setMinat] = useState('');
  const [waktu, setWaktu] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // KNOWLEDGE BASE YANG BENAR
  const knowledgeBase = {
    'hiburan_cerita_sedikit': ['alchemist', 'little_prince', 'fault_in_stars', 'great_gatsby', 'life_of_pi'],
    'hiburan_cerita_banyak': ['laskar_pelangi', 'harry_potter', 'hunger_games', 'kite_runner', 'cantik_itu_luka'],
    
    'pengetahuan_sejarah_sedikit': ['cold_war', 'short_history', 'sapiens', 'age_revolution', 'eastern_origins'],
    'pengetahuan_sejarah_banyak': ['bumi_manusia', 'guns_germs', 'world_war_2', 'silk_roads', 'civilizations'],
    
    'pengetahuan_sains_sedikit': ['brief_history_time', 'relativity', 'double_helix', 'universe_nutshell', 'quantum_theory'],
    'pengetahuan_sains_banyak': ['cosmos', 'elegant_universe', 'origin_species', 'selfish_gene', 'demon_haunted'],
    
    'pengetahuan_psikologi_sedikit': ['influence', 'man_search_meaning', 'flow', 'art_happiness', 'gifts_imperfection'],
    'pengetahuan_psikologi_banyak': ['thinking_fast_slow', 'predictably_irrational', 'emotional_intelligence', 'quiet', 'stumbling_happiness'],
    
    'pengembangan_produktivitas_sedikit': ['atomic_habits', 'deep_work', 'essentialism', 'eat_frog', 'one_thing'],
    'pengembangan_produktivitas_banyak': ['7_habits', 'power_habit', 'getting_things_done', '4_hour_work', 'miracle_morning'],
    
    'pengembangan_keuangan_sedikit': ['psychology_money', 'richest_man_babylon', 'millionaire_next_door', 'index_funds', 'automatic_millionaire'],
    'pengembangan_keuangan_banyak': ['intelligent_investor', 'rich_dad', 'money_master_game', 'your_money_life', 'total_money_makeover'],
    
    'pengembangan_filosofi_sedikit': ['meditations', 'tao_te_ching', 'art_living', 'obstacle_way', 'subtle_art'],
    'pengembangan_filosofi_banyak': ['filosofi_teras', 'zen_art', 'how_win_friends', 'courage_disliked', 'power_now'],
    
    'pengembangan_bisnis_sedikit': ['zero_to_one', 'good_to_great', 'start_with_why', 'blue_ocean', 'innovators_dilemma'],
    'pengembangan_bisnis_banyak': ['lean_startup', 'hard_things', 'rework', 'business_model', 'delivering_happiness'],
  };

  const factBase = {
    atomic_habits: { title: 'Atomic Habits', author: 'James Clear', genre: 'Produktivitas', description: 'Kebiasaan kecil menghasilkan perubahan besar.', pages: 320, year: 2018, reason: 'Praktis, sistematis, mudah dipahami dan langsung bisa diterapkan' },
    deep_work: { title: 'Deep Work', author: 'Cal Newport', genre: 'Produktivitas', description: 'Fokus mendalam di era penuh distraksi.', pages: 296, year: 2016, reason: 'Mengajarkan fokus untuk hasil maksimal dengan metode actionable' },
    essentialism: { title: 'Essentialism', author: 'Greg McKeown', genre: 'Produktivitas', description: 'Fokus hanya pada yang esensial.', pages: 260, year: 2014, reason: 'Filosofi less but better yang mudah dan cepat dibaca' },
    eat_frog: { title: 'Eat That Frog!', author: 'Brian Tracy', genre: 'Produktivitas', description: 'Teknik prioritas dan fokus harian.', pages: 144, year: 2001, reason: 'Sangat tipis, praktis, dan langsung actionable' },
    one_thing: { title: 'The ONE Thing', author: 'Gary Keller', genre: 'Produktivitas', description: 'Fokus pada satu hal terpenting saja.', pages: 240, year: 2013, reason: 'Simplifikasi untuk mencapai sukses maksimal' },
    
    '7_habits': { title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey', genre: 'Pengembangan Diri', description: '7 kebiasaan untuk efektivitas maksimal.', pages: 381, year: 1989, reason: 'Klasik produktivitas yang sangat komprehensif' },
    power_habit: { title: 'The Power of Habit', author: 'Charles Duhigg', genre: 'Produktivitas', description: 'Sains di balik pembentukan kebiasaan.', pages: 371, year: 2012, reason: 'Penjelasan mendalam tentang cara kerja kebiasaan manusia' },
    getting_things_done: { title: 'Getting Things Done', author: 'David Allen', genre: 'Produktivitas', description: 'Sistem GTD untuk produktivitas tinggi.', pages: 267, year: 2001, reason: 'Sistem produktivitas yang sangat lengkap dan terstruktur' },
    '4_hour_work': { title: 'The 4-Hour Workweek', author: 'Tim Ferriss', genre: 'Lifestyle', description: 'Bekerja cerdas untuk kebebasan hidup.', pages: 308, year: 2007, reason: 'Mengubah paradigma tentang freedom dan efisiensi' },
    miracle_morning: { title: 'The Miracle Morning', author: 'Hal Elrod', genre: 'Rutinitas', description: 'Rutinitas pagi yang mengubah hidup.', pages: 172, year: 2012, reason: 'Buku tipis dengan rutinitas yang mudah dipraktikkan' },

    psychology_money: { title: 'The Psychology of Money', author: 'Morgan Housel', genre: 'Keuangan', description: 'Perilaku keuangan lebih penting dari matematika.', pages: 256, year: 2020, reason: 'Pendekatan psikologi keuangan yang ringkas dan mudah' },
    richest_man_babylon: { title: 'The Richest Man in Babylon', author: 'George Clason', genre: 'Keuangan', description: 'Prinsip keuangan kuno dalam cerita.', pages: 194, year: 1926, reason: 'Buku tipis dengan wisdom keuangan yang abadi' },
    millionaire_next_door: { title: 'The Millionaire Next Door', author: 'Thomas Stanley', genre: 'Keuangan', description: 'Kebiasaan jutawan sesungguhnya.', pages: 272, year: 1996, reason: 'Realitas jutawan yang mudah dibaca dan dipahami' },
    index_funds: { title: 'Common Sense Investing', author: 'John Bogle', genre: 'Investasi', description: 'Investasi index fund yang sederhana.', pages: 216, year: 2007, reason: 'Cara investasi paling simple dan tipis' },
    automatic_millionaire: { title: 'The Automatic Millionaire', author: 'David Bach', genre: 'Keuangan', description: 'Otomatis menjadi jutawan dengan sistem.', pages: 256, year: 2003, reason: 'Sistem otomatis yang mudah dan cepat dipahami' },

    intelligent_investor: { title: 'The Intelligent Investor', author: 'Benjamin Graham', genre: 'Investasi', description: 'Value investing klasik dari mentor Warren Buffett.', pages: 623, year: 1949, reason: 'Bibel investasi yang sangat detail dan mendalam' },
    rich_dad: { title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', genre: 'Literasi Keuangan', description: 'Pelajaran finansial dari dua perspektif ayah.', pages: 336, year: 1997, reason: 'Dasar literasi finansial yang solid dan comprehensive' },
    money_master_game: { title: 'Money: Master the Game', author: 'Tony Robbins', genre: 'Keuangan', description: 'Strategi finansial komprehensif.', pages: 688, year: 2014, reason: 'Sangat lengkap dan komprehensif, butuh waktu banyak' },
    your_money_life: { title: 'Your Money or Your Life', author: 'Vicki Robin', genre: 'Keuangan', description: 'Transformasi hubungan dengan uang.', pages: 368, year: 1992, reason: 'Financial independence yang sangat mendalam' },
    total_money_makeover: { title: 'The Total Money Makeover', author: 'Dave Ramsey', genre: 'Keuangan', description: 'Bebas hutang dengan sistem step by step.', pages: 272, year: 2003, reason: 'Sistem keluar dari hutang yang jelas dan terstruktur' },

    meditations: { title: 'Meditations', author: 'Marcus Aurelius', genre: 'Filosofi Stoic', description: 'Jurnal pribadi kaisar Romawi Stoic.', pages: 254, year: 180, reason: 'Stoikisme dari emperor, ringkas namun sangat dalam' },
    tao_te_ching: { title: 'Tao Te Ching', author: 'Lao Tzu', genre: 'Filosofi Timur', description: 'Kebijaksanaan Taoisme klasik.', pages: 160, year: -400, reason: 'Sangat tipis dengan wisdom Timur yang sangat dalam' },
    art_living: { title: 'The Art of Living', author: 'Epictetus', genre: 'Filosofi Stoic', description: 'Manual hidup Stoic yang praktis.', pages: 123, year: 125, reason: 'Manual Stoic yang sangat tipis dan praktis' },
    obstacle_way: { title: 'The Obstacle Is the Way', author: 'Ryan Holiday', genre: 'Filosofi Modern', description: 'Stoikisme untuk tantangan modern.', pages: 224, year: 2014, reason: 'Stoic modern yang mudah dan cepat dibaca' },
    subtle_art: { title: 'The Subtle Art of Not Giving a F*ck', author: 'Mark Manson', genre: 'Filosofi Populer', description: 'Filosofi hidup blak-blakan.', pages: 224, year: 2016, reason: 'Real talk tentang hidup, ringkas dan lugas' },

    filosofi_teras: { title: 'Filosofi Teras', author: 'Henry Manampiring', genre: 'Filosofi', description: 'Stoikisme untuk kehidupan Indonesia modern.', pages: 326, year: 2018, reason: 'Stoic wisdom untuk konteks Indonesia yang detail' },
    zen_art: { title: 'Zen and the Art of Motorcycle Maintenance', author: 'Robert Pirsig', genre: 'Filosofi', description: 'Pencarian kualitas dan makna hidup.', pages: 540, year: 1974, reason: 'Filosofi sangat mendalam yang butuh waktu lama' },
    how_win_friends: { title: 'How to Win Friends', author: 'Dale Carnegie', genre: 'Hubungan Manusia', description: 'Klasik tentang relasi manusia.', pages: 291, year: 1936, reason: 'Fundamental people skills yang klasik dan proven' },
    courage_disliked: { title: 'The Courage to Be Disliked', author: 'Ichiro Kishimi', genre: 'Psikologi Adlerian', description: 'Filosofi Adler dalam format dialog.', pages: 288, year: 2013, reason: 'Dialog filosofis yang sangat menarik' },
    power_now: { title: 'The Power of Now', author: 'Eckhart Tolle', genre: 'Spiritualitas', description: 'Hidup di momen sekarang.', pages: 236, year: 1997, reason: 'Mindfulness dan presence yang cukup detail' },

    zero_to_one: { title: 'Zero to One', author: 'Peter Thiel', genre: 'Inovasi', description: 'Menciptakan inovasi dari nol ke satu.', pages: 224, year: 2014, reason: 'Inovasi radikal yang ringkas dan powerful' },
    good_to_great: { title: 'Good to Great', author: 'Jim Collins', genre: 'Manajemen', description: 'Transformasi dari baik jadi hebat.', pages: 300, year: 2001, reason: 'Penelitian transformasi bisnis yang solid' },
    start_with_why: { title: 'Start with Why', author: 'Simon Sinek', genre: 'Leadership', description: 'Purpose sebagai fondasi bisnis.', pages: 256, year: 2009, reason: 'Purpose-driven leadership yang inspiratif' },
    blue_ocean: { title: 'Blue Ocean Strategy', author: 'W. Chan Kim', genre: 'Strategi Bisnis', description: 'Ciptakan pasar baru tanpa kompetisi.', pages: 256, year: 2005, reason: 'Strategi inovatif yang mudah dipahami' },
    innovators_dilemma: { title: 'The Innovator\'s Dilemma', author: 'Clayton Christensen', genre: 'Inovasi', description: 'Mengapa perusahaan besar gagal.', pages: 286, year: 1997, reason: 'Teori disruptive innovation yang penting' },

    lean_startup: { title: 'The Lean Startup', author: 'Eric Ries', genre: 'Bisnis & Startup', description: 'Build-Measure-Learn untuk startup.', pages: 336, year: 2011, reason: 'Metodologi startup modern yang proven dan detail' },
    hard_things: { title: 'The Hard Thing About Hard Things', author: 'Ben Horowitz', genre: 'Manajemen', description: 'Realitas brutal membangun bisnis.', pages: 304, year: 2014, reason: 'Kejujuran tentang struggle bisnis yang nyata' },
    rework: { title: 'Rework', author: 'Jason Fried', genre: 'Bisnis', description: 'Cara unconventional membangun bisnis.', pages: 288, year: 2010, reason: 'Unconventional bisnis wisdom yang fresh' },
    business_model: { title: 'Business Model Generation', author: 'Alexander Osterwalder', genre: 'Strategi Bisnis', description: 'Canvas model bisnis visual.', pages: 288, year: 2010, reason: 'Tool praktis untuk merancang model bisnis' },
    delivering_happiness: { title: 'Delivering Happiness', author: 'Tony Hsieh', genre: 'Bisnis & Budaya', description: 'Membangun budaya perusahaan luar biasa.', pages: 253, year: 2010, reason: 'Culture dan customer service ala Zappos' },

    thinking_fast_slow: { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', genre: 'Psikologi', description: 'Dua sistem berpikir manusia.', pages: 499, year: 2011, reason: 'Psikologi dari Nobel, sangat detail dan komprehensif' },
    predictably_irrational: { title: 'Predictably Irrational', author: 'Dan Ariely', genre: 'Ekonomi Perilaku', description: 'Keputusan irasional yang bisa diprediksi.', pages: 384, year: 2008, reason: 'Perilaku ekonomi manusia yang sangat menarik' },
    emotional_intelligence: { title: 'Emotional Intelligence', author: 'Daniel Goleman', genre: 'Psikologi', description: 'Kecerdasan emosional lebih penting dari IQ.', pages: 384, year: 1995, reason: 'EQ explained secara menyeluruh dan detail' },
    quiet: { title: 'Quiet', author: 'Susan Cain', genre: 'Psikologi', description: 'Kekuatan introvert di dunia ekstrovert.', pages: 368, year: 2012, reason: 'Validasi untuk introvert yang cukup detail' },
    stumbling_happiness: { title: 'Stumbling on Happiness', author: 'Daniel Gilbert', genre: 'Psikologi', description: 'Mengapa sulit memprediksi kebahagiaan.', pages: 277, year: 2006, reason: 'Psikologi kebahagiaan yang ringan dan menarik' },

    influence: { title: 'Influence', author: 'Robert Cialdini', genre: 'Psikologi Sosial', description: 'Prinsip persuasi dan pengaruh sosial.', pages: 320, year: 1984, reason: 'Praktis dan sangat mudah dipahami' },
    man_search_meaning: { title: 'Man\'s Search for Meaning', author: 'Viktor Frankl', genre: 'Psikologi Eksistensial', description: 'Mencari makna dalam penderitaan.', pages: 184, year: 1946, reason: 'Tipis tapi sangat mendalam dan powerful' },
    flow: { title: 'Flow', author: 'Mihaly Csikszentmihalyi', genre: 'Psikologi Positif', description: 'Keadaan optimal psikologis.', pages: 303, year: 1990, reason: 'Menemukan kebahagiaan yang mudah dibaca' },
    art_happiness: { title: 'The Art of Happiness', author: 'Dalai Lama', genre: 'Filosofi & Psikologi', description: 'Buddhisme dan kebahagiaan.', pages: 336, year: 1998, reason: 'Kebahagiaan dari wisdom yang accessible' },
    gifts_imperfection: { title: 'The Gifts of Imperfection', author: 'Brené Brown', genre: 'Psikologi', description: 'Menerima ketidaksempurnaan diri.', pages: 137, year: 2010, reason: 'Sangat tipis dan mudah dipraktikkan' },

    laskar_pelangi: { title: 'Laskar Pelangi', author: 'Andrea Hirata', genre: 'Fiksi Indonesia', description: 'Kisah inspiratif 10 anak Belitung.', pages: 529, year: 2005, reason: 'Novel panjang yang sangat mengharukan' },
    harry_potter: { title: 'Harry Potter', author: 'J.K. Rowling', genre: 'Fantasi', description: 'Petualangan penyihir muda di Hogwarts.', pages: 223, year: 1997, reason: 'Fantasi yang adiktif dan page-turner' },
    hunger_games: { title: 'The Hunger Games', author: 'Suzanne Collins', genre: 'Dystopia', description: 'Pertarungan maut remaja di arena.', pages: 374, year: 2008, reason: 'Thriller yang sangat mendebarkan' },
    kite_runner: { title: 'The Kite Runner', author: 'Khaled Hosseini', genre: 'Drama', description: 'Persahabatan dan pengkhianatan.', pages: 371, year: 2003, reason: 'Cerita emosional yang mendalam' },
    cantik_itu_luka: { title: 'Cantik Itu Luka', author: 'Eka Kurniawan', genre: 'Fiksi Magis', description: 'Saga keluarga Indonesia.', pages: 520, year: 2002, reason: 'Novel tebal dengan cerita kompleks' },

    alchemist: { title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Filosofi', description: 'Pencarian harta karun dan diri sendiri.', pages: 163, year: 1988, reason: 'Sangat tipis, inspiratif, cepat selesai' },
    little_prince: { title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', genre: 'Fabel', description: 'Pangeran kecil menjelajahi planet.', pages: 96, year: 1943, reason: 'Sangat tipis tapi filosofis dan indah' },
    fault_in_stars: { title: 'The Fault in Our Stars', author: 'John Green', genre: 'Drama', description: 'Kisah cinta dua remaja pengidap kanker.', pages: 313, year: 2012, reason: 'Novel tipis yang menyentuh' },
    great_gatsby: { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Klasik', description: 'Kemewahan dan tragedi American Dream.', pages: 180, year: 1925, reason: 'Klasik tipis dengan kritik tajam' },
    life_of_pi: { title: 'Life of Pi', author: 'Yann Martel', genre: 'Petualangan', description: 'Terdampar di laut dengan harimau.', pages: 319, year: 2001, reason: 'Petualangan filosofis yang cepat' },

    bumi_manusia: { title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', genre: 'Fiksi Sejarah', description: 'Minke melawan kolonialisme Belanda.', pages: 535, year: 1980, reason: 'Sejarah Indonesia yang sangat detail' },
    guns_germs: { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', genre: 'Antropologi', description: 'Mengapa peradaban berkembang berbeda.', pages: 480, year: 1997, reason: 'Analisis sejarah yang komprehensif' },
    world_war_2: { title: 'The Second World War', author: 'Antony Beevor', genre: 'Sejarah Militer', description: 'Perang Dunia II global.', pages: 863, year: 2012, reason: 'Narasi perang yang sangat epik' },
    silk_roads: { title: 'The Silk Roads', author: 'Peter Frankopan', genre: 'Sejarah', description: 'Sejarah dunia dari perspektif Asia.', pages: 636, year: 2015, reason: 'Perspektif Timur yang menarik' },
    civilizations: { title: 'Civilizations', author: 'Felipe Fernández-Armesto', genre: 'Sejarah', description: 'Bangkit dan jatuhnya peradaban.', pages: 656, year: 2000, reason: 'Analisis peradaban yang mendalam' },

    cold_war: { title: 'The Cold War', author: 'John Lewis Gaddis', genre: 'Sejarah', description: 'Ketegangan AS-Soviet 1947-1991.', pages: 333, year: 2005, reason: 'Perang dingin dijelaskan ringkas' },
    short_history: { title: 'A Short History of Nearly Everything', author: 'Bill Bryson', genre: 'Sains Populer', description: 'Sains dijelaskan dengan humor.', pages: 544, year: 2003, reason: 'Sains yang mudah dan menghibur' },
    sapiens: { title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'Sejarah', description: 'Sejarah umat manusia dari zaman batu.', pages: 443, year: 2011, reason: 'Perspektif baru, mudah dibaca' },
    age_revolution: { title: 'The Age of Revolution', author: 'Eric Hobsbawm', genre: 'Sejarah', description: 'Eropa 1789-1848.', pages: 416, year: 1962, reason: 'Era revolusi Eropa yang detail' },
    eastern_origins: { title: 'The Eastern Origins', author: 'John Hobson', genre: 'Sejarah', description: 'Pengaruh Timur pada Barat.', pages: 376, year: 2004, reason: 'Revisi sejarah yang menarik' },

    brief_history_time: { title: 'A Brief History of Time', author: 'Stephen Hawking', genre: 'Fisika', description: 'Alam semesta dari perspektif fisika.', pages: 256, year: 1988, reason: 'Fisika untuk umum, ringkas' },
    relativity: { title: 'Relativity', author: 'Albert Einstein', genre: 'Fisika', description: 'Einstein menjelaskan relativitas.', pages: 152, year: 1916, reason: 'Dari Einstein sendiri, ringkas' },
    double_helix: { title: 'The Double Helix', author: 'James Watson', genre: 'Biografi Sains', description: 'Penemuan struktur DNA.', pages: 226, year: 1968, reason: 'Kisah penemuan DNA ringkas' },
    universe_nutshell: { title: 'The Universe in a Nutshell', author: 'Stephen Hawking', genre: 'Fisika', description: 'Teori fisika modern.', pages: 216, year: 2001, reason: 'Fisika visual, tipis dan jelas' },
    quantum_theory: { title: 'Quantum Theory Cannot Hurt You', author: 'Marcus Chown', genre: 'Fisika Kuantum', description: 'Kuantum untuk pemula.', pages: 240, year: 2007, reason: 'Kuantum yang sangat sederhana' },

    cosmos: { title: 'Cosmos', author: 'Carl Sagan', genre: 'Astronomi', description: 'Eksplorasi alam semesta.', pages: 365, year: 1980, reason: 'Astronomi yang mendalam' },
    elegant_universe: { title: 'The Elegant Universe', author: 'Brian Greene', genre: 'Fisika', description: 'Teori string dijelaskan.', pages: 448, year: 1999, reason: 'String theory yang detail' },
    origin_species: { title: 'On the Origin of Species', author: 'Charles Darwin', genre: 'Biologi', description: 'Teori evolusi Darwin.', pages: 502, year: 1859, reason: 'Fondasi biologi, butuh waktu' },
    selfish_gene: { title: 'The Selfish Gene', author: 'Richard Dawkins', genre: 'Biologi', description: 'Gen sebagai unit evolusi.', pages: 360, year: 1976, reason: 'Evolusi dari sudut gen' },
    demon_haunted: { title: 'The Demon-Haunted World', author: 'Carl Sagan', genre: 'Sains & Skeptisisme', description: 'Berpikir kritis dan sains.', pages: 457, year: 1995, reason: 'Skeptisisme ilmiah mendalam' },
  };

  const questions = [
    {
      id: 'tujuan',
      question: 'Apa tujuan utama Anda membaca buku?',
      options: [
        { value: 'hiburan', label: '🎭 Hiburan dan relaksasi' },
        { value: 'pengetahuan', label: '📚 Menambah pengetahuan' },
        { value: 'pengembangan', label: '🚀 Pengembangan diri' },
      ],
    },
    {
      id: 'minat',
      question: 'Topik apa yang paling menarik bagi Anda?',
      getDynamicOptions: (userTujuan) => {
        if (userTujuan === 'hiburan') {
          return [{ value: 'cerita', label: '📖 Cerita dan Narasi (Fiksi)' }];
        } else if (userTujuan === 'pengetahuan') {
          return [
            { value: 'sejarah', label: '🏛️ Sejarah Dunia' },
            { value: 'sains', label: '🔬 Sains & Teknologi' },
            { value: 'psikologi', label: '🧠 Psikologi Manusia' },
          ];
        } else if (userTujuan === 'pengembangan') {
          return [
            { value: 'produktivitas', label: '⚡ Produktivitas & Kebiasaan' },
            { value: 'keuangan', label: '💰 Keuangan & Investasi' },
            { value: 'filosofi', label: '🤔 Filosofi & Kebijaksanaan' },
            { value: 'bisnis', label: '💼 Bisnis & Entrepreneurship' },
          ];
        }
        return [];
      },
    },
    {
      id: 'waktu',
      question: 'Berapa banyak waktu yang Anda miliki untuk membaca?',
      options: [
        { value: 'sedikit', label: '⏱️ Sedikit (buku tipis, cepat selesai)' },
        { value: 'banyak', label: '📚 Banyak (buku tebal tidak masalah)' },
      ],
    },
  ];

  const handleAnswer = (value) => {
    if (currentStep === 0) {
      // Pertanyaan 1: Tujuan
      setTujuan(value);
      setCurrentStep(1);
    } else if (currentStep === 1) {
      // Pertanyaan 2: Minat
      setMinat(value);
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Pertanyaan 3: Waktu - langsung jalankan inference
      setWaktu(value);
      
      // Buat key dan cari rekomendasi
      const key = `${tujuan}_${minat}_${value}`;
      console.log('KEY FINAL:', key);
      
      const bookKeys = knowledgeBase[key];
      console.log('BOOK KEYS:', bookKeys);
      
      if (bookKeys && bookKeys.length > 0) {
        const results = bookKeys.map((bookKey, index) => ({
          ...factBase[bookKey],
          confidence: 0.98 - (index * 0.02),
        }));
        setRecommendations(results);
      } else {
        // Fallback jika tidak ada
        setRecommendations([
          { ...factBase['atomic_habits'], confidence: 0.5 },
          { ...factBase['sapiens'], confidence: 0.5 },
          { ...factBase['thinking_fast_slow'], confidence: 0.5 },
        ]);
      }
      
      setShowResults(true);
    }
  };

  const resetConsultation = () => {
    setCurrentStep(0);
    setTujuan('');
    setMinat('');
    setWaktu('');
    setRecommendations([]);
    setShowResults(false);
  };

  const getCurrentQuestion = () => questions[currentStep];
  
  const getOptions = () => {
    const question = getCurrentQuestion();
    if (question.getDynamicOptions) {
      return question.getDynamicOptions(tujuan);
    }
    return question.options;
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="header-icon">🧠</div>
          <div>
            <h1 className="header-title">Sistem Pakar Rekomendasi Buku</h1>
            <p className="header-subtitle">Expert System dengan Forward Chaining</p>
          </div>
        </header>

        <div className="badges">
          <span className="badge">⚡ Sistem Pakar Cerdas</span>
          <span className="badge">📖 100+ Buku Pilihan</span>
          <span className="badge">🎯 Rekomendasi Terpandu</span>
        </div>

        <div className="content">
          {!showResults ? (
            <div>
              <div className="progress-container">
                <p className="progress-text">
                  Pertanyaan {currentStep + 1}/{questions.length}
                </p>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="question-box">
                <h2 className="question-text">{getCurrentQuestion().question}</h2>
                {getOptions().map((option, idx) => (
                  <button
                    key={idx}
                    className="option-button"
                    onClick={() => handleAnswer(option.value)}>
                    {option.label}
                  </button>
                ))}
              </div>

              {currentStep > 0 && (
                <button className="back-button" onClick={() => setCurrentStep(currentStep - 1)}>
                  ← Kembali
                </button>
              )}
            </div>
          ) : (
            <div>
              <button className="reset-button" onClick={resetConsultation}>
                🔄 Mulai Ulang
              </button>

              <h2 className="result-title">🎯 Rekomendasi Untuk Anda</h2>

              {recommendations.map((book, idx) => (
                <div key={idx} className="book-card">
                  <div className="book-header">
                    <span className="book-number">#{idx + 1}</span>
                    <div>
                      <h3 className="book-title">{book.title}</h3>
                      <p className="book-author">{book.author}</p>
                    </div>
                  </div>

                  <span className="book-genre">{book.genre}</span>

                  <p className="book-description">{book.description}</p>

                  <div className="reason-box">
                    <strong>💡 Mengapa buku ini cocok untuk Anda:</strong> {book.reason}
                  </div>

                  <p className="book-info">
                    📄 {book.pages} halaman • 📅 Terbit {book.year}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;