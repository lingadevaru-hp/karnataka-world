// ============================================================
//  ಕಾಲದ ಜಗತ್ತು / The World Through Time — era configuration
//  Each era defines its 3D atmosphere (sky, sun, fog, ground)
//  and the monuments + royal emblem that stand in its region.
// ============================================================

export const ZONE_DEPTH = 64;      // world depth of one era region (units)
export const WORLD_W = 420;        // half-width of walkable terrain
export const ROAD_CURVE = 10;      // how much the road snakes

export const ERAS = [
  {
    kn:"ಶಾತವಾಹನರು", en:"Shatavahanas", years:"c. 30 BCE – 230 CE", mood:"dawn",
    fame:"ಕರ್ನಾಟಕವನ್ನು ಆಳಿದ ಮೊದಲ ದೊಡ್ಡ ಸಾಮ್ರಾಜ್ಯ; ಸನ್ನತಿ, ಬ್ರಹ್ಮಗಿರಿಯಲ್ಲಿ ಕುರುಹುಗಳು.",
    kings:[["ಸಿಮುಕ","Simuka","ಸ್ಥಾಪಕ"],["ಗೌತಮಿಪುತ್ರ ಶಾತಕರ್ಣಿ","Gautamiputra Satakarni","c. 106–130 CE"],["ಯಜ್ಞಶ್ರೀ ಶಾತಕರ್ಣಿ","Yajna Sri Satakarni","c. 165–194 CE"]],
    subs:[["ಚುಟು ಶಾತಕರ್ಣಿಗಳು","Chutus of Banavasi","c. 1st–3rd cen CE"]],
    artifact:"ಅಶೋಕನ ಶಿಲಾಪ್ರತಿಮೆ",
    skyTop:"#f4d9a6", skyBot:"#c98a4b", fog:"#d9b078", fogD:0.0062,
    sun:"#ffdca8", sunEl:12, sunAz:80, sunI:2.2, amb:"#ffe6c0",
    ground:"#7a5a34", road:"#8a6a44", mat:"#c08a58",
    monuments:[["stupa","ಕನಗನಹಳ್ಳಿ ಸ್ತೂಪ","ಬೌದ್ಧ ಸ್ತೂಪ; ಅಶೋಕನ ಏಕೈಕ ಶಿಲಾಪ್ರತಿಮೆ ಇಲ್ಲಿ ದೊರೆತದ್ದು.",-15]],
    emblem:["elephant","ಗಜ","ಶಾತವಾಹನ ನಾಣ್ಯಗಳಲ್ಲಿ ಗಜ ಚಿಹ್ನೆ.",17]
  },
  {
    kn:"ಕದಂಬರು", en:"Kadambas of Banavasi", years:"c. 345 – 540 CE", mood:"dawn",
    fame:"ಕರ್ನಾಟಕದ ಮೊದಲ ಸ್ವದೇಶಿ ರಾಜಮನೆತನ; ಹಲ್ಮಿಡಿ ಶಾಸನ ಕನ್ನಡದ ಅತ್ಯಂತ ಪ್ರಾಚೀನ ಶಾಸನ.",
    kings:[["ಮಯೂರಶರ್ಮ","Mayurasharma","345–360, ಸ್ಥಾಪಕ"],["ಕಾಕುಸ್ಥವರ್ಮ","Kakusthavarma","c. 435–455"],["ರವಿವರ್ಮ","Ravivarma","c. 485–519"],["ಹರಿವರ್ಮ","Harivarma","ಕೊನೆಯ"]],
    subs:[["ಕದಂಬರು (ಹಾನಗಲ್)","Kadambas of Hangal","c. 11th cen"],["ಕದಂಬರು (ಗೋವಾ)","Kadambas of Goa","c. 10th cen"]],
    artifact:"ಹಲ್ಮಿಡಿ ಶಾಸನ (ಕ್ರಿ.ಶ. 450)",
    skyTop:"#cfe0c8", skyBot:"#7fa06a", fog:"#a9c49a", fogD:0.007,
    sun:"#ffeccb", sunEl:20, sunAz:70, sunI:2.0, amb:"#dfeed6",
    ground:"#4e6b44", road:"#5c7a4c", mat:"#8a6a4a",
    monuments:[["temple","ಕದಂಬ ಶೈಲಿಯ ದೇವಾಲಯ","ಮೆಟ್ಟಿಲು ಗೋಪುರದ ಕದಂಬ ಶೈಲಿ.",14]],
    emblem:["lion","ಸಿಂಹ","ಕದಂಬರ ರಾಜಲಾಂಛನ ಸಿಂಹ.",-16]
  },
  {
    kn:"ಪಶ್ಚಿಮ ಗಂಗರು", en:"Western Gangas", years:"c. 350 – 1000 CE", mood:"noon",
    fame:"ಶ್ರವಣಬೆಳಗೊಳದ ಗೊಮ್ಮಟೇಶ್ವರ ಏಕಶಿಲಾ ಪ್ರತಿಮೆ (981 CE) ಚಾವುಂಡರಾಯನ ಕೊಡುಗೆ.",
    kings:[["ದುರ್ವಿನೀತ","Durvinita","c. 529–579"],["ಶ್ರೀಪುರುಷ","Sripurusha","c. 726–788"],["ಬೂಟುಗ II","Butuga II","c. 938–961"],["ರಾಚಮಲ್ಲ V","Rachamalla V","ಕೊನೆಯ"]],
    subs:[["ಪೂರ್ವ ಗಂಗರು","Eastern Gangas of Kalinga","c. 11th cen"],["ಚಾವುಂಡರಾಯ","Chavundaraya — minister","c. 940–989"]],
    artifact:"ಚಾವುಂಡರಾಯನ ಶಾಸನ",
    skyTop:"#cfe6f0", skyBot:"#7fb0c4", fog:"#a9ccd8", fogD:0.006,
    sun:"#fff4d8", sunEl:70, sunAz:40, sunI:2.4, amb:"#dbeef5",
    ground:"#5a6a76", road:"#6a7e8c", mat:"#7a8590",
    monuments:[["statue","ಗೊಮ್ಮಟೇಶ್ವರ ಪ್ರತಿಮೆ","ಶ್ರವಣಬೆಳಗೊಳ; 18 ಅಡಿ ಏಕಶಿಲಾ ಪ್ರತಿಮೆ.",-18]],
    emblem:["elephant","ಗಜ","ಗಂಗರ ರಾಜಲಾಂಛನ ಗಜ.",16]
  },
  {
    kn:"ಆಳುಪರು", en:"Alupas of Tulunadu", years:"c. 2nd – 14th century CE", mood:"noon",
    fame:"ಕರ್ನಾಟಕದ ಅತಿ ದೀರ್ಘಕಾಲ ಆಳಿದ ವಂಶ; ಕದ್ರಿ ಮಂಜುನಾಥ ದೇವಾಲಯದ ಕಂಚಿನ ವಿಗ್ರಹ.",
    kings:[["ಪಶುಪತಿ","Pashupathi","ಮೊದಲ"],["ಕುಂದವರ್ಮ","Kundavarma","c. 968"],["ವೀರಪಾಂಡ್ಯದೇವ II","Vira-Pandyadeva II","c. 1390–1399, ಕೊನೆಯ"]],
    subs:[["ಸಂತರರು","Santaras","c. 8th cen"],["ಚೌಟರು (ಉಳ್ಳಾಲ)","Chowtas of Ullal","c. 12th cen"]],
    artifact:"ಬೆಳಮಣ್ಣು ತಾಮ್ರಪತ್ರ",
    skyTop:"#cfe8e6", skyBot:"#4fa8a0", fog:"#86c4be", fogD:0.007,
    sun:"#fff6e0", sunEl:65, sunAz:50, sunI:2.2, amb:"#d6f0ec",
    ground:"#2e6b66", road:"#3f7a72", mat:"#6ba8a0",
    monuments:[["temple","ಕದ್ರಿ ಮಂಜುನಾಥ ದೇವಾಲಯ","ಮಂಗಳೂರು; ಕಂಚಿನ ವಿಗ್ರಹ (968 CE).",15]],
    emblem:["fish","ಮೀನು","ಆಳುಪರು 'ಮೀನ-ಲಾಂಛನ' ಧಾರಿಗಳು.",-15]
  },
  {
    kn:"ಬಾದಾಮಿ ಚಾಲುಕ್ಯರು", en:"Badami Chalukyas", years:"c. 543 – 757 CE", mood:"dusk",
    fame:"ಬಾದಾಮಿ ಗುಹಾಲಯಗಳು, ಐಹೊಳೆ ಮತ್ತು ಪಟ್ಟದಕಲ್; ಪುಲಕೇಶಿ II ಹರ್ಷನನ್ನು ಸೋಲಿಸಿದ.",
    kings:[["ಪುಲಕೇಶಿ I","Pulakeshin I","543–566, ಸ್ಥಾಪಕ"],["ಪುಲಕೇಶಿ II","Pulakeshin II","610–642"],["ವಿಕ್ರಮಾದಿತ್ಯ II","Vikramaditya II","733–744"],["ಕೀರ್ತಿವರ್ಮ II","Kirtivarman II","744–757, ಕೊನೆಯ"]],
    subs:[["ಪೂರ್ವ ಚಾಲುಕ್ಯರು (ವೆಂಗಿ)","Eastern Chalukyas of Vengi","624–1189"]],
    artifact:"ಐಹೊಳೆ ಶಾಸನ (ರವಿಕೀರ್ತಿ, 634)",
    skyTop:"#f6c48a", skyBot:"#c0603a", fog:"#c47a4e", fogD:0.008,
    sun:"#ffb060", sunEl:10, sunAz:260, sunI:2.0, amb:"#f0c090",
    ground:"#5a2818", road:"#7a3d22", mat:"#c0603a",
    monuments:[["caves","ಬಾದಾಮಿ ಗುಹಾಲಯಗಳು","ಮರಳುಗಲ್ಲಿನಲ್ಲಿ ಕೊರೆದ ಗುಹಾದೇವಾಲಯಗಳು.",-20],
               ["temple","ಪಟ್ಟದಕಲ್ ದೇವಾಲಯಗಳು","ಯುನೆಸ್ಕೊ ತಾಣ; ದ್ರಾವಿಡ ಮತ್ತು ನಾಗರ ಸಂಗಮ.",19]],
    emblem:["boar","ವರಾಹ","ಚಾಲುಕ್ಯರ ರಾಜಲಾಂಛನ ವರಾಹ.",0]
  },
  {
    kn:"ರಾಷ್ಟ್ರಕೂಟರು", en:"Rashtrakutas of Manyakheta", years:"c. 753 – 982 CE", mood:"twilight",
    fame:"ಎಲ್ಲೋರದ ಕೈಲಾಸ ದೇವಾಲಯ — ಒಂದೇ ಬಂಡೆಯಲ್ಲಿ ಕಡೆದ ಅದ್ಭುತ; 'ಕವಿರಾಜಮಾರ್ಗ'.",
    kings:[["ದಂತಿದುರ್ಗ","Dantidurga","735–756, ಸ್ಥಾಪಕ"],["ಕೃಷ್ಣ I","Krishna I","756–774"],["ಅಮೋಘವರ್ಷ I","Amoghavarsha I","814–878"],["ಕರ್ಕ II","Karka II","ಕೊನೆಯ"]],
    subs:[["ಗುಜರಾತಿನ ರಾಷ್ಟ್ರಕೂಟರು","Rashtrakutas of Gujarat","c. 8th cen"]],
    artifact:"ಕವಿರಾಜಮಾರ್ಗ (ಅಮೋಘವರ್ಷ I)",
    skyTop:"#7a7fb0", skyBot:"#2e2a50", fog:"#4a4870", fogD:0.0095,
    sun:"#b0b0ff", sunEl:30, sunAz:280, sunI:1.9, amb:"#6a6898",
    ground:"#2a2548", road:"#3a3368", mat:"#3a3566",
    monuments:[["monolith","ಎಲ್ಲೋರ ಕೈಲಾಸ ದೇವಾಲಯ","ಕೃಷ್ಣ I ಕಡೆಸಿದ ಏಕಶಿಲಾ ದೇವಾಲಯ.",-16]],
    emblem:["eagle","ಗರುಡ","ರಾಷ್ಟ್ರಕೂಟರ ರಾಜಲಾಂಛನ ಗರುಡ.",17]
  },
  {
    kn:"ಕಲ್ಯಾಣಿ ಚಾಲುಕ್ಯರು", en:"Kalyani Chalukyas", years:"c. 973 – 1189 CE", mood:"dusk",
    fame:"ವಿಕ್ರಮಾದಿತ್ಯ VI ರ ಆಳ್ವಿಕೆ; ಲಕ್ಕುಂಡಿ-ಇಟಗಿಯ ದೇವಾಲಯಗಳು.",
    kings:[["ತೈಲಪ II","Tailapa II","973–997, ಸ್ಥಾಪಕ"],["ಸೋಮೇಶ್ವರ I","Someshvara I","1042–1068"],["ವಿಕ್ರಮಾದಿತ್ಯ VI","Vikramaditya VI","1076–1126"],["ತೈಲಪ III","Tailapa III","1151–1163, ಕೊನೆಯ"]],
    subs:[["ಕಳಚೂರಿಗಳು","Kalachuris","c. 1130–1184"]],
    artifact:"ಬಿಲ್ಹಣನ ವಿಕ್ರಮಾಂಕದೇವ ಚರಿತ",
    skyTop:"#f0d8a0", skyBot:"#9aa07a", fog:"#c4c090", fogD:0.007,
    sun:"#ffd890", sunEl:14, sunAz:250, sunI:2.0, amb:"#ece0b8",
    ground:"#4a5040", road:"#6a7258", mat:"#8a9070",
    monuments:[["temple","ಇಟಗಿ ಮಹಾದೇವ ದೇವಾಲಯ","ವಿಕ್ರಮಾದಿತ್ಯ VI ರ ಕಾಲದ ಭವ್ಯ ದೇವಾಲಯ.",-16],
               ["tank","ಲಕ್ಕುಂಡಿ ಮೆಟ್ಟಿಲು ಕೆರೆ","ಕಲ್ಯಾಣಿ ಚಾಲುಕ್ಯರ ವಿಶಿಷ್ಟ ಮೆಟ್ಟಿಲು ಬಾವಿ.",18]],
    emblem:["boar","ವರಾಹ","ಚಾಲುಕ್ಯರ ಮತ್ತೊಂದು ಶಾಖೆ — ವರಾಹ ಲಾಂಛನ.",0]
  },
  {
    kn:"ಕಳಚೂರಿಗಳು", en:"Kalachuris of Kalyani", years:"c. 1130 – 1184 CE", mood:"night",
    fame:"ಬಿಜ್ಜಳ II ರ ಕಾಲದಲ್ಲಿ ಬಸವಣ್ಣ ಮತ್ತು ವಚನ ಚಳವಳಿ; ಅನುಭವ ಮಂಟಪ.",
    kings:[["ಬಿಜ್ಜಳ II","Bijjala II","1156–1167"],["ಸೋವಿದೇವ","Sovideva","1167–1176"],["ಸಂಕಮ","Sankama","ಕೊನೆಯ"]],
    subs:[["ಬಸವಣ್ಣ","Basavanna — reformer","c. 1134–1196"],["ಅಲ್ಲಮಪ್ರಭು","Allama Prabhu","c. 12th cen"]],
    artifact:"ಶರಣರ ವಚನಗಳ ಗ್ರಂಥ",
    skyTop:"#3f3a68", skyBot:"#161430", fog:"#2a2650", fogD:0.010,
    sun:"#8080d0", sunEl:32, sunAz:300, sunI:1.7, amb:"#4a4478",
    ground:"#1a1738", road:"#332c5c", mat:"#4a4478",
    monuments:[["mantapa","ಅನುಭವ ಮಂಟಪ","ಬಸವಣ್ಣನ ಶರಣರ ಸಭಾಂಗಣ.",-14]],
    emblem:["bull","ನಂದಿ","ಕಳಚೂರಿಗಳ ಲಾಂಛನ ನಂದಿ.",16]
  },
  {
    kn:"ಹೊಯ್ಸಳರು", en:"Hoysalas", years:"c. 1000 – 1346 CE", mood:"dawn",
    fame:"ಬೇಲೂರು ಚೆನ್ನಕೇಶವ, ಹಳೇಬೀಡು ಹೊಯ್ಸಳೇಶ್ವರ — ಬಳಪದ ಕಲ್ಲಿನ ಸೂಕ್ಷ್ಮ ಕೆತ್ತನೆ (ಯುನೆಸ್ಕೊ).",
    kings:[["ವಿಷ್ಣುವರ್ಧನ","Vishnuvardhana","1108–1152"],["ವೀರಬಲ್ಲಾಳ II","Vira Ballala II","1173–1220"],["ವೀರಬಲ್ಲಾಳ III","Vira Ballala III","1291–1343, ಕೊನೆಯ"]],
    subs:[["ಸಂತರರು","Santaras","c. 12th cen"],["ಹೊಯ್ಸಳೇಶ್ವರ","Hoysaleshwara temple","c. 1121"]],
    artifact:"ಹೊಯ್ಸಳ ಸೂಕ್ಷ್ಮ ಶಿಲ್ಪ",
    skyTop:"#d8e0c0", skyBot:"#6b7a5a", fog:"#a9b49a", fogD:0.007,
    sun:"#ffecc0", sunEl:22, sunAz:75, sunI:2.0, amb:"#e2e8d0",
    ground:"#333d2c", road:"#4e5a42", mat:"#5c6b52",
    monuments:[["hoysala","ಬೇಲೂರು ಚೆನ್ನಕೇಶವ","ನಕ್ಷತ್ರಾಕಾರದ ಜಗತಿ, ಲ್ಯಾಥ್-ಕೆತ್ತಿದ ಗೋಪುರ.",-17],
               ["hoysala","ಹಳೇಬೀಡು ಹೊಯ್ಸಳೇಶ್ವರ","ಎರಡು ಗರ್ಭಗುಡಿಯ ಭವ್ಯ ದೇವಾಲಯ.",18]],
    emblem:["tiger","ಸಳ-ಹುಲಿ","ಹೊಯ್ಸಳ ಲಾಂಛನ — ಸಳ ಹುಲಿಯನ್ನು ಕೊಂದ ದಂತಕಥೆ.",0]
  },
  {
    kn:"ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ", en:"Vijayanagara Empire", years:"1336 – 1646 CE", mood:"dusk",
    fame:"ಹಂಪಿಯ ವಿರೂಪಾಕ್ಷ ಮತ್ತು ಕಲ್ಲಿನ ರಥ; ಕೃಷ್ಣದೇವರಾಯನ ಆಳ್ವಿಕೆ (1509–1529).",
    kings:[["ಹರಿಹರ I ಮತ್ತು ಬುಕ್ಕ","Harihara I & Bukka","1336, ಸ್ಥಾಪಕರು"],["ದೇವರಾಯ II","Deva Raya II","1424–1446"],["ಕೃಷ್ಣದೇವರಾಯ","Krishnadevaraya","1509–1529"],["ರಾಮರಾಯ","Rama Raya","d. 1565"]],
    subs:[["ಸಂಗಮ","Sangama","1336–1485"],["ಸಾಲುವ","Saluva","1485–1505"],["ತುಳುವ","Tuluva","1505–1570"],["ಅರವೀಡು","Aravidu","1570–1646"]],
    artifact:"ಅಮುಕ್ತಮಾಲ್ಯದ (ಕೃಷ್ಣದೇವರಾಯ)",
    skyTop:"#f6c48a", skyBot:"#b0806a", fog:"#c4907a", fogD:0.007,
    sun:"#ffcf90", sunEl:12, sunAz:255, sunI:2.0, amb:"#f0c8a8",
    ground:"#573a2e", road:"#77543f", mat:"#9a6a56",
    monuments:[["gopuram","ಹಂಪಿ ವಿರೂಪಾಕ್ಷ ಗೋಪುರ","ವಿಜಯನಗರದ ಮಹಾದೇವಾಲಯದ ಪ್ರವೇಶ ಗೋಪುರ.",-19],
               ["chariot","ಕಲ್ಲಿನ ರಥ","ವಿಠ್ಠಲ ದೇವಾಲಯದ ಏಕಶಿಲಾ ರಥ.",17]],
    emblem:["boarSun","ವರಾಹ-ಸೂರ್ಯ","ವಿಜಯನಗರದ ಲಾಂಛನ — ವರಾಹ ಮತ್ತು ಸೂರ್ಯ.",0]
  },
  {
    kn:"ಬಹಮನಿ ಸುಲ್ತಾನರು", en:"Bahmani Sultanate", years:"1347 – 1527 CE", mood:"noon",
    fame:"ವಿಜಯನಗರದ ಸಮಕಾಲೀನರು; ಗುಲ್ಬರ್ಗ ಜಾಮಿಯಾ ಮಸೀದಿ, ಬೀದರ್ ಮದ್ರಸಾ. (ಆಳ್ವಿಕೆಯ ಒಂದು ಭಾಗ.)",
    kings:[["ಅಲ್ಲಾವುದ್ದೀನ್ ಬಹಮನ್ ಷಾ","Ala-ud-Din Bahman Shah","1347, ಸ್ಥಾಪಕ"],["ಫಿರೋಜ್ ಷಾ","Firuz Shah","1397–1422"],["ಮಹಮೂದ್ ಗವಾನ್","Mahmud Gawan","c. 1466–1481"]],
    subs:[["ಬೀಜಾಪುರದ ಆದಿಲ್ ಷಾಹಿಗಳು","Adil Shahis of Bijapur","1490–1686"]],
    artifact:"ಬೀದರ್ ಮದ್ರಸಾ ಕಮಾನು",
    skyTop:"#c8ccd0", skyBot:"#8a9098", fog:"#a8acb0", fogD:0.006,
    sun:"#f0f0f0", sunEl:60, sunAz:45, sunI:2.2, amb:"#d8dade",
    ground:"#4a5058", road:"#666c74", mat:"#7a8088",
    monuments:[["dome","ಗೋಲ ಗುಮ್ಮಟ (ಬೀಜಾಪುರ)","ಅದಿಲ್ ಷಾಹಿ ಕಾಲದ ಭವ್ಯ ಗುಮ್ಮಟ.",-18]],
    emblem:["crescent","ಚಂದ್ರ","ಸುಲ್ತಾನರ ಲಾಂಛನ — ಚಂದ್ರ.",17]
  },
  {
    kn:"ಕೆಳದಿ ನಾಯಕರು", en:"Nayakas of Keladi", years:"c. 1499 – 1763 CE", mood:"dawn",
    fame:"ಶಿವಪ್ಪ ನಾಯಕನ 'ಶಿಸ್ತು' ಭೂಕಂದಾಯ ಪದ್ಧತಿ; ಕೆಳದಿ ಚೆನ್ನಮ್ಮನ ವೀರತೆ.",
    kings:[["ಚೌಡಪ್ಪ ನಾಯಕ","Chaudappa Nayaka","1499–1530, ಸ್ಥಾಪಕ"],["ಶಿವಪ್ಪ ನಾಯಕ","Shivappa Nayaka","1645–1660"],["ಕೆಳದಿ ಚೆನ್ನಮ್ಮ","Keladi Chennamma","1672–1697"]],
    subs:[["1763ರಲ್ಲಿ ಹೈದರ್ ಅಲಿ ಸೇರಿಸಿಕೊಂಡ","Annexed by Hyder Ali","1763"]],
    artifact:"ಶಿವಪ್ಪ ನಾಯಕನ ಶಿಸ್ತು ದಾಖಲೆ",
    skyTop:"#d0e8c8", skyBot:"#4e8a5a", fog:"#8fbf98", fogD:0.007,
    sun:"#ffecc8", sunEl:20, sunAz:72, sunI:2.0, amb:"#dcecd6",
    ground:"#264a30", road:"#3f6a48", mat:"#6a8a5a",
    monuments:[["temple","ಇಕ್ಕೇರಿ ದೇವಾಲಯ","ಶಿವಮೊಗ್ಗ; ಕೆಳದಿ-ಇಕ್ಕೇರಿ ಅರಸರ ದೇವಾಲಯ.",-15]],
    emblem:["bull","ನಂದಿ","ಕೆಳದಿ ನಾಯಕರು ವೀರಶೈವರು — ನಂದಿ ಲಾಂಛನ.",16]
  },
  {
    kn:"ಚಿತ್ರದುರ್ಗದ ನಾಯಕರು", en:"Nayakas of Chitradurga", years:"1588 – 1779 CE", mood:"noon",
    fame:"ಚಿತ್ರದುರ್ಗದ ಬೆಟ್ಟದ ಕೋಟೆ; ಒನಕೆ ಓಬವ್ವನ ವೀರಗಾಥೆ.",
    kings:[["ತಿಮ್ಮಣ್ಣ ನಾಯಕ","Timmanna Nayaka","Vijayanagara governor"],["ಭರಮಪ್ಪ ನಾಯಕ","Bharamappa Nayaka","1689–1721, ಶ್ರೇಷ್ಠ"],["ಮದಕರಿ ನಾಯಕ V","Madakari Nayaka V","1758–1779, ಕೊನೆಯ"]],
    subs:[["ಒನಕೆ ಓಬವ್ವ","Onake Obavva","c. 1779"]],
    artifact:"ಒನಕೆ ಓಬವ್ವನ ಒನಕೆ",
    skyTop:"#f2d8a0", skyBot:"#c09a50", fog:"#d4b070", fogD:0.006,
    sun:"#fff0c0", sunEl:68, sunAz:40, sunI:2.4, amb:"#f0e0b0",
    ground:"#5f4a24", road:"#7f6434", mat:"#a08040",
    monuments:[["fort","ಚಿತ್ರದುರ್ಗ ಕೋಟೆ","ಬೆಟ್ಟದ ಮೇಲಿನ ಬೃಹತ್ ಕೋಟೆ; 1779ರಲ್ಲಿ ಹೈದರ್ ಅಲಿಗೆ ಮಣಿಯಿತು.",-16]],
    emblem:["tiger","ಹುಲಿ","ಚಿತ್ರದುರ್ಗದ ನಾಯಕರ ವೀರ ಲಾಂಛನ.",17]
  },
  {
    kn:"ಕೊಡಗಿನ ಹಾಲೇರಿ ರಾಜರು", en:"Haleri Rajas of Kodagu", years:"c. 1600 – 1834 CE", mood:"dawn",
    fame:"ಮಡಿಕೇರಿ ಕೋಟೆ; 1834ರ ಕೊಡಗು ಯುದ್ಧದ ನಂತರ ಬ್ರಿಟಿಷರು ಸೇರಿಸಿಕೊಂಡರು.",
    kings:[["ಮುದ್ದರಾಜ","Mudduraja","c. 1600s"],["ಲಿಂಗರಾಜೇಂದ್ರ","Linga Rajendra","c. 1780–1809"],["ಚಿಕ್ಕವೀರರಾಜೇಂದ್ರ","Chikka Virarajendra","ಕೊನೆಯ ರಾಜ, 1834"]],
    subs:[["1834 — ಬ್ರಿಟಿಷರು ಕೊಡಗನ್ನು ವಶಪಡಿಸಿಕೊಂಡರು","Coorg annexed","1834"]],
    artifact:"ಹಾಲೇರಿ ಅರಸರ ಕತ್ತಿ",
    skyTop:"#d8e8d0", skyBot:"#5a8a6a", fog:"#9cc4a4", fogD:0.007,
    sun:"#ffeccb", sunEl:18, sunAz:68, sunI:2.0, amb:"#e0eed8",
    ground:"#284434", road:"#3f634c", mat:"#6a8a6a",
    monuments:[["fort","ಮಡಿಕೇರಿ ಕೋಟೆ","1681ರಲ್ಲಿ ಬಲಪಡಿಸಿದ ಬೆಟ್ಟದ ಕೋಟೆ.",-15]],
    emblem:["elephant","ಆನೆ","ಕೊಡಗಿನ ಕಾಡುಗಳ ಆನೆ — ಹಾಲೇರಿ ಅರಸರ ಬಲ.",16]
  },
  {
    kn:"ಕಿತ್ತೂರು", en:"Kingdom of Kittur", years:"c. 1824 CE", mood:"dusk",
    fame:"ರಾಣಿ ಚೆನ್ನಮ್ಮ 1824ರಲ್ಲಿ ಬ್ರಿಟಿಷರ ವಿರುದ್ಧ ಹೋರಾಡಿದ ಮೊದಲ ಮಹಿಳಾ ರಾಣಿ.",
    kings:[["ರಾಣಿ ಚೆನ್ನಮ್ಮ","Rani Chennamma","1824"],["ಸಂಗೊಳ್ಳಿ ರಾಯಣ್ಣ","Sangolli Rayanna","1829–1831"]],
    subs:[["ಬ್ರಿಟಿಷರ ವಿರುದ್ಧದ ಮೊದಲ ಮಹಿಳಾ ಹೋರಾಟ","Earliest women-led revolt","1824"]],
    artifact:"ರಾಣಿ ಚೆನ್ನಮ್ಮನ ಪತ್ರ",
    skyTop:"#e8b090", skyBot:"#a04040", fog:"#b06060", fogD:0.008,
    sun:"#ffb080", sunEl:10, sunAz:262, sunI:2.0, amb:"#e8a898",
    ground:"#481818", road:"#6a2424", mat:"#8a4040",
    monuments:[["fort","ಕಿತ್ತೂರು ಕೋಟೆ","1824ರ ಸ್ವಾತಂತ್ರ್ಯ ಹೋರಾಟದ ಕೇಂದ್ರ.",-15]],
    emblem:["horse","ಅಶ್ವ","ಕಿತ್ತೂರಿನ ರಾಣಿ ಚೆನ್ನಮ್ಮನ ಅಶ್ವದಳ.",16]
  },
  {
    kn:"ಮೈಸೂರು ಒಡೆಯರು", en:"Wodeyars of Mysore", years:"1399 – 1950 CE", mood:"night",
    fame:"ಮೈಸೂರು ದಸರಾ; ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್ IV ಆಧುನಿಕ ಮೈಸೂರು; ಜಯಚಾಮರಾಜೇಂದ್ರ ಒಡೆಯರ್ ಕೊನೆಯ ರಾಜ.",
    kings:[["ಯದುರಾಯ","Yaduraya","1399, ಸ್ಥಾಪಕ"],["ರಣಧೀರ ಕಂಠೀರವ","Ranadheera Kanteerava","1638–1659"],["ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್ IV","Krishnaraja Wodeyar IV","1894–1940"],["ಜಯಚಾಮರಾಜೇಂದ್ರ ಒಡೆಯರ್","Jayachamarajendra Wodeyar","1940–1950, ಕೊನೆಯ ರಾಜ"]],
    subs:[["ಹೈದರ್ ಅಲಿ","Hyder Ali","1761–1782"],["ಟಿಪ್ಪು ಸುಲ್ತಾನ್","Tipu Sultan","1782–1799"],["ಸಂದೂರು ಸಂಸ್ಥಾನ","Sandur princely state","1713–1949"]],
    artifact:"ಮೈಸೂರು ದಸರಾ ಸ್ಮರಣೆ",
    skyTop:"#2a3a70", skyBot:"#0e1a40", fog:"#16224a", fogD:0.009,
    sun:"#90a8ff", sunEl:34, sunAz:300, sunI:1.9, amb:"#3a4a80",
    ground:"#1b2452", road:"#33427a", mat:"#c9a24b",
    monuments:[["palace","ಮೈಸೂರು ಅರಮನೆ","ಇಂಡೋ-ಸಾರಾಸೆನಿಕ್ ಶೈಲಿಯ ಭವ್ಯ ಅರಮನೆ; ದಸರಾ.",-17]],
    emblem:["bird2","ಗಂಡಭೇರುಂಡ","ಒಡೆಯರ ರಾಜಲಾಂಛನ — ಎರಡು ತಲೆಯ ಪಕ್ಷಿ.",16]
  }
];

// region centre along the road for era index i
export function eraZ(i){ return i*ZONE_DEPTH; }
// the road snakes; x offset of the road centreline at a given z
export function roadX(z){ return Math.sin(z*0.017)*ROAD_CURVE; }
