const MajorAliases: AliasObject = {
  UND: { en: 'Undecided', jp: '未決定' },
  ARC: { en: 'Art and Cultural Heritage', jp: '美術・文化財研究' },
  MUS: { en: 'Music', jp: '音楽' },
  LIT: { en: 'Literature', jp: '文学' },
  PHR: { en: 'Philosophy and Religion', jp: '哲学・宗教学' },
  ECO: { en: 'Economics', jp: '経済学' },
  BUS: { en: 'Business', jp: '経営学' },
  EDU: { en: 'Education', jp: '教育学' },
  LED: { en: 'Language Education', jp: '言語教育' },
  HST: { en: 'History', jp: '歴史学' },
  BIO: { en: 'Biology', jp: '生物学' },
  CHM: { en: 'Chemistry', jp: '化学' },
  PHY: { en: 'Physics', jp: '物理学' },
  MTH: { en: 'Mathematics', jp: '数学' },
  ISC: { en: 'Information Science', jp: '情報科学' },
  LAW: { en: 'Law', jp: '法学' },
  PPL: { en: 'Public Policy', jp: '公共政策' },
  POL: { en: 'Politics', jp: '政治学' },
  IRL: { en: 'International Relations', jp: '国際関係学' },
  LNG: { en: 'Linguistics', jp: '言語学' },
  PSY: { en: 'Psychology', jp: '心理学' },
  MCC: {
    en: 'Media, Communication and Culture',
    jp: 'メディア・コミュニケーション・文化',
  },
  ANT: { en: 'Anthropology', jp: '人類学' },
  SOC: { en: 'Sociology', jp: '社会学' },
  AMS: { en: 'American Studies', jp: 'アメリカ研究' },
  AST: { en: 'Asian Studies', jp: 'アジア研究' },
  DPS: { en: 'Development Studies', jp: '開発研究' },
  ENV: { en: 'Environmental Studies', jp: '環境研究' },
  GSS: {
    en: 'Gender and Sexuality Studies',
    jp: 'ジェンダー・セクシュアリティ研究',
  },
  GLS: { en: 'Global Studies', jp: 'グローバル研究' },
  JPS: { en: 'Japan Studies', jp: '日本研究' },
  PCS: { en: 'Peace Studies', jp: '平和研究' },
};

const GradYearAliases: AliasObject = {
  '20': { en: '2020', jp: '2020' },
  '21': { en: '2021', jp: '2021' },
  '22': { en: '2022', jp: '2022' },
  '23': { en: '2023', jp: '2023' },
  '24': { en: '2024', jp: '2024' },
  '25': { en: '2025', jp: '2025' },
  '26': { en: '2026', jp: '2026' },
};

const MatriMonthAliases: AliasObject = {
  sept: { en: 'September', jp: '9月' },
  april: { en: 'April', jp: '4月' },
};

const MajorTypeAliases: AliasObject = {
  single: { en: 'Single', jp: 'シングル' },
  double: { en: 'Double', jp: 'ダブル' },
  minor: { en: 'Major/Minor', jp: 'メジャー・マイナー' },
  undecided: { en: 'Undecided', jp: '未決定' },
};

type AliasObject = {
  [key: string]: { en: string; jp: string };
};

export { MajorAliases, GradYearAliases, MatriMonthAliases, MajorTypeAliases };
export type { AliasObject };
