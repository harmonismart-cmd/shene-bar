/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SupporterStyleDetails } from '../types';

export function calculateStyle(scores: { L: number; G: number; D: number; P: number; S: number; V: number }): {
  primary: 'L' | 'G' | 'D' | 'P' | 'S' | 'V';
  secondary: 'L' | 'G' | 'D' | 'P' | 'S' | 'V' | null;
} {
  const sorted = (Object.keys(scores) as Array<'L' | 'G' | 'D' | 'P' | 'S' | 'V'>)
    .map(key => ({ key, score: scores[key] || 0 }))
    .sort((a, b) => b.score - a.score);

  const primary = sorted[0].key;
  // If the second score is at least 3 points, count it as a hybrid
  const secondary = sorted[1].score >= 3 ? sorted[1].key : null;

  return { primary, secondary };
}

/// Generate an incredibly unique, catchy, and randomized professional supporting role title (称号)
export function generateUniqueTitle(
  primary: 'L' | 'G' | 'D' | 'P' | 'S' | 'V',
  name: string,
  freeText: string,
  affiliation: string,
  preferredTool?: string,
  scores?: { L: number; G: number; D: number; P: number; S: number; V: number }
): string {
  // Deterministic seed with high entropy (incorporates score, tool, freeText, affiliation, and name)
  const scoreSeed = scores ? Object.values(scores).join('-') : 'no-scores';
  const seed = `${name}_${freeText || ''}_${affiliation}_${preferredTool || ''}_${scoreSeed}`;
  
  const getIndex = (max: number, offset = 0) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash) + offset;
    }
    return Math.abs(hash) % max;
  };

  // 1. RPG-style Adjectives / Modifiers (二つ名・形容詞)
  const prefixes: Record<'L' | 'G' | 'D' | 'P' | 'S' | 'V', string[]> = {
    L: [
      '心優しき',
      '寄り添いし',
      '深層の本音を聞く',
      '慈愛深き',
      '全受容の',
      '静寂なる',
      '孤独を癒やす',
      '心の盾となる'
    ],
    G: [
      '精密なる',
      '論理を操る',
      '数字を見抜く',
      '盤面を読む',
      '迷いを断つ',
      '冷徹にして熱き',
      '未来を描き出す',
      '針路を示す'
    ],
    D: [
      '本質を射抜く',
      '気づきを促す',
      '魂に問いかける',
      '自走へと導く',
      '思考を写し出す',
      '内省を深めし',
      '対話で目覚めし',
      '可能性を照らす'
    ],
    P: [
      '最適解を編み出す',
      'アイデア溢れる',
      '国庫を動かす',
      '販路を切り拓く',
      'イノベーションを呼ぶ',
      '戦略を錬成せし',
      '課題を解決する',
      '知恵を授けし'
    ],
    S: [
      '爆速で繋ぐ',
      '縁を結びし',
      '千客万来の',
      '人脈を束ねる',
      'シナジーを生み出す',
      '業界を縦横無尽に駆ける',
      '強力な援軍を呼ぶ',
      '信頼の架け橋となる'
    ],
    V: [
      '魂を燃やす',
      '熱血なる',
      '限界を超える',
      '全肯定の',
      '勇気を宿し',
      '底抜けに明るい',
      '太陽のごとく照らす',
      '情熱を呼び覚ます'
    ]
  };

  // 2. Specialization Nouns (専門ドメイン)
  const specializations: Record<string, string[]> = {
    agency: ['企業革新', '産業振興', '事業変革', '経営支援'],
    chamber: ['地域商工', '地元経営', '老舗伴走', 'スモールビジネス'],
    gov: ['地方創生', 'まちづくり', 'パブリック創生', '行政連携'],
    bank: ['財務再建', '資金繰り', '融資戦略', 'キャッシュフロー'],
    support: ['よろず解決', '起業スタートアップ', '相談駆け込み寺', '経営伴走'],
    consultant: ['変革戦略', '新事業開発', 'プロ経営', '独立伴走']
  };

  const domainList = specializations[affiliation] || specializations.consultant;
  const domainPart = domainList[getIndex(domainList.length, 100)];

  // 3. JRPG Supporter Classes (職業クラス)
  const suffixes: Record<'L' | 'G' | 'D' | 'P' | 'S' | 'V', string[]> = {
    L: [
      'ヒーラー',
      'ガーディアン',
      '大賢者',
      '守護神官',
      'バランサー',
      '伴走僧侶'
    ],
    G: [
      'アナリスト',
      'ストラテジスト',
      'ナビゲーター',
      '操舵手',
      '魔術師',
      '戦略参謀'
    ],
    D: [
      'コーチ',
      'ファシリテーター',
      '気づきの司祭',
      '対話コンパス',
      'インサイト導師'
    ],
    P: [
      'アルケミスト',
      'プロデューサー',
      'プランナー',
      '解決アーキテクト',
      '戦略軍師'
    ],
    S: [
      'マッチメーカー',
      '大商人',
      'コネクター',
      'アライアンスハブ',
      '絆の仲立人'
    ],
    V: [
      'インスパイラー',
      'チアリーダー',
      'パッションヒーロー',
      'アクティベーター',
      '熱狂の詩人'
    ]
  };

  const listP = prefixes[primary] || prefixes.L;
  const listS = suffixes[primary] || suffixes.L;

  const pref = listP[getIndex(listP.length, 200)];
  const suff = listS[getIndex(listS.length, 300)];

  // Create a tight, highly stylized JRPG character role name!
  return `${pref} ${domainPart}${suff}`;
}

export function getSupporterStyleDetails(
  primary: 'L' | 'G' | 'D' | 'P' | 'S' | 'V',
  secondary: 'L' | 'G' | 'D' | 'P' | 'S' | 'V' | null
): SupporterStyleDetails {
  const sec = secondary === primary ? null : secondary;

  // 1. PRIMARY L (傾聴型 / Listening)
  if (primary === 'L') {
    if (sec === 'G') {
      return {
        title: '傾聴データの守護神',
        className: '傾聴型データアナリスト',
        slogan: '経営者の不安を深く受け止めながら、数字のボトルネックを冷静に見極める者',
        description: '経営者の孤独や語りづらいお困りごとに耳を傾け、心が落ち着く空間を作りながらも、決算書や試算表のデータを冷徹に分析して「次の一手」を的確にアドバイスするハイブリッドな支援者。',
        avatarType: 'tactician',
        stats: { hp: 74, mp: 88, empathy: 95, insight: 88, connection: 60, cheer: 65, patience: 92 },
        commands: [
          { name: 'じっくり傾聴', description: '相手の感情の澱みを浄化し、最大の安心感を与える。' },
          { name: '本音の洞察', description: '言葉の裏にある「本音」を瞬時に見抜く。' },
          { name: '現状データ整理', description: '不安を整理し、客観的なデータに基づいて最初の一歩を組み立てる。' }
        ],
        compatibility: {
          perfectMatch: '突っ走り気味の若手起業家',
          perfectMatchDesc: '視野が狭まりがちな若手の話を聞き、進路を優しく軌道修正できる最高のパートナー。',
          challengingMatch: '耳を貸さないベテラン経営者',
          challengingMatchDesc: '我流を突き通す相手には、さらに粘り強い共感的アプローチが必要。'
        }
      };
    }
    if (sec === 'D') {
      return {
        title: '心を通わす伴走者',
        className: '傾聴対話コーディネーター',
        slogan: '相談者の痛みに寄り添い、内なる言葉をゆっくりと引き出す対話の賢者',
        description: '「答えは相談者自身の中にある」を信じ、徹底的に聞き役に回りつつ、絶妙なタイミングの問いかけによって、相談者自身が本当の課題やビジョンに自ら気づけるようサポートする。',
        avatarType: 'pilgrim',
        stats: { hp: 68, mp: 90, empathy: 98, insight: 82, connection: 75, cheer: 70, patience: 98 },
        commands: [
          { name: '相槌の癒やし', description: '温かい眼差しで、相手の話しやすい環境を120%作る。' },
          { name: '深層への問い', description: '経営者自身が本当に大切にしている思いに焦点を当てる。' },
          { name: '思考の壁打ち', description: '散らばった思いを受け止め、整然と並べ直して鏡のように返す。' }
        ],
        compatibility: {
          perfectMatch: 'アイデア過多で混乱中の経営者',
          perfectMatchDesc: '頭が整理され、本当にやるべき優先順位がクリアになります。',
          challengingMatch: '丸投げ型の依存経営者',
          challengingMatchDesc: '「代わりにやって」という相手には、自走を促すための問いかけに工夫が必要です。'
        }
      };
    }
    if (sec === 'P' || sec === 'S') {
      return {
        title: '縁を紡ぐ調停者',
        className: '傾聴アライアンス仲立人',
        slogan: 'お困りごとを深く聴き出し、最適な外部の専門家や事業をそっと結びつける者',
        description: '経営者の深い愚痴や悩みを徹底的に受け止めた上で、「この課題なら、あの人とマッチングすれば一気に解決する」と、親切に外部リソースやパートナーを繋ぐハブとなる支援者。',
        avatarType: 'matchmaker',
        stats: { hp: 70, mp: 80, empathy: 94, insight: 84, connection: 90, cheer: 74, patience: 93 },
        commands: [
          { name: '課題抽出ヒアリング', description: '話しているうちに、何が本当の課題なのかを整理する。' },
          { name: '専門家マッチング', description: '信頼できる最適な専門家やバイヤーを即座に紹介する。' },
          { name: '関係の緩衝材', description: '対立や誤解が生じないよう、当事者間のクッション役となる。' }
        ],
        compatibility: {
          perfectMatch: '技術はあるが発信が苦手な職人',
          perfectMatchDesc: '職人の不安を受け止めて、その価値を理解してくれる良質なクライアントを接続します。',
          challengingMatch: '他人の紹介を一切信じない一匹狼',
          challengingMatchDesc: '外部との協力を頑なに拒む相手には、時間をかけて信頼を築く必要があります。'
        }
      };
    }
    // L-only or fallback L
    return {
      title: '深淵の傾聴求道者',
      className: '深層傾聴スペシャリスト',
      slogan: '静寂の中に、相談者の真実を見出す魂の伴走者',
      description: '評価を一切せず、相手が自分の言葉で真実に辿り着くプロセスを忍耐強く守り抜く。相談者が「この人になら、何でも話せる」と絶対の信頼を寄せる、支援機関の駆け込み寺。',
      avatarType: 'cleric',
      stats: { hp: 62, mp: 85, empathy: 99, insight: 80, connection: 55, cheer: 60, patience: 99 },
      commands: [
        { name: '絶対受容スペース', description: '深い沈黙をも愛し、相手に極限の安全空間を提供する。' },
        { name: '神のうなずき', description: '絶妙な相槌で、相手の脳内整理のスピードを高める。' },
        { name: '沈黙の壁打ち', description: 'あえて語らない時間を作り、相手の無意識のアイデアを引き出す。' }
      ],
      compatibility: {
        perfectMatch: '孤独に戦うプレイングマネージャー',
        perfectMatchDesc: '誰にも弱音を吐けない立場の人が、あなたの前でだけは武装を解いて安らげます。',
        challengingMatch: '解決策だけを急ぐ合理主義者',
        challengingMatchDesc: '「早く答えをくれ」と急ぐ相手には、丁寧な傾聴の意義を伝えるのが一苦労。'
      }
    };
  }

  // 2. PRIMARY G (導き型 / Guiding)
  if (primary === 'G') {
    if (sec === 'L' || sec === 'D') {
      return {
        title: '静かなる案内人',
        className: '伴走ナビゲーター',
        slogan: 'じっくりと現状を聞き取りながらも、最も確かなビジネスの針路を示す者',
        description: '余計な口出しをせず穏やかに状況を受け止めつつも、転機には、豊富な知見とフレームワークから導き出された最も美しくスマートな解決ロードマップを指し示す、知のコンパス。',
        avatarType: 'lighthouse_keeper',
        stats: { hp: 70, mp: 94, empathy: 82, insight: 96, connection: 62, cheer: 64, patience: 90 },
        commands: [
          { name: '羅針盤ビーム', description: '相手の目指すべき長期的目標をクッキリと照らし出す。' },
          { name: 'フレームワーク翻訳', description: '複雑な経営理論を、今すぐ実行できる簡単なステップに砕いて説明する。' },
          { name: '静かな見守り', description: '相手が試行錯誤する間、最悪の事態にならないよう安全網を敷く。' }
        ],
        compatibility: {
          perfectMatch: 'やる気はあるが何から手をつければいいか迷っている後継者',
          perfectMatchDesc: '情熱に確かな戦略の軸を与えることで、事業承継や新規展開を成功に導きます。',
          challengingMatch: '計画を無視して暴走するパッション型',
          challengingMatchDesc: '立てたロードマップをすぐ破る相手に、少し気苦労をすることも。'
        }
      };
    }
    if (sec === 'P' || sec === 'S') {
      return {
        title: '智謀のロードマップ設計士',
        className: '戦略・ロードマップ設計軍師',
        slogan: '最適な成長シナリオを描き、必要な資金や情報、公的支援をフル活用する戦略家',
        description: '複雑に絡み合った課題をスパッと解きほぐし、売上改善から資金繰り、補助金の活用まで完璧な事業計画を設計する。ファクトに基づく的確なアドバイスで、成長スピードを加速させる。',
        avatarType: 'pioneer',
        stats: { hp: 75, mp: 96, empathy: 72, insight: 98, connection: 88, cheer: 68, patience: 80 },
        commands: [
          { name: '超精密ロードマップ', description: '目標達成までのステップをガントチャートレベルで可視化する。' },
          { name: '補助金プランニング', description: '採択率の高い事業計画書の論理構成を瞬時に見抜く。' },
          { name: 'ファクトチェック', description: '主観的な思い込みを数字と根拠でスマートに正し、視界をクリアにする。' }
        ],
        compatibility: {
          perfectMatch: 'ドンブリ経営から脱却したい熱き社長',
          perfectMatchDesc: '頭の中のビジョンが数字と仕組みに落とし込まれ、驚くほどの成長を遂げます。',
          challengingMatch: '感情の整理を第一に求めるアーティスト気質',
          challengingMatchDesc: '正論やロジックが強すぎると、相手が感情的に身構えてしまうケースも。'
        }
      };
    }
    // G-only or fallback G
    return {
      title: '天命の導き羅針盤',
      className: 'ビジネスコンパス賢者',
      slogan: '混迷のビジネス環境に、ブレない戦略と知恵を授ける羅針盤',
      description: '問題の本質を見抜く抜群の分析力。的確なデータ提示とレクチャーで、迷える相談者に「歩むべき確かな道」をハッキリと指し示す頼れるコンサルタント。',
      avatarType: 'sage',
      stats: { hp: 64, mp: 99, empathy: 70, insight: 99, connection: 60, cheer: 62, patience: 84 },
      commands: [
        { name: '本質への切り込み', description: '思考を10倍深める、鋭くも知的な問いかけを行う。' },
        { name: '課題解決コンパス', description: '絡まった糸を解くように問題を整理し、優先度を明快にする。' },
        { name: 'リスク・フォーキャスト', description: 'この先３年のビジネスシナリオと、予想される落とし穴と対策を示す。' }
      ],
      compatibility: {
        perfectMatch: '行動力はあるがいつも迷子になる起業家',
        perfectMatchDesc: 'エネルギーの無駄撃ちを防ぎ、最短ルートでの成果創出を支えます。',
        challengingMatch: 'ただただ話を聞いて共感してほしい相談者',
        challengingMatchDesc: '「解決策はまだいらない」という相手に対しては、アドバイスを抑える忍耐が必要。'
      }
    };
  }

  // 3. PRIMARY D (対話型 / Dialogic)
  if (primary === 'D') {
    if (sec === 'L') {
      return {
        title: '深層意識の引き出し人',
        className: '深層対話コーチング神官',
        slogan: '深い傾聴と本質的な問いかけを繰り返し、相談者の原点と強みを覚醒させる者',
        description: '経営者が気づいていない、または言語化できていない「真のやりたいこと」「自社のコアコンピタンス」を丁寧な壁打ちと双方向のディスカッションで引き出す、伴走型の対話ファシリテーター。',
        avatarType: 'high_priest',
        stats: { hp: 70, mp: 92, empathy: 95, insight: 90, connection: 68, cheer: 76, patience: 96 },
        commands: [
          { name: '原点回帰の問い', description: '「創業時の最初の顧客は誰でしたか？」と、思いを呼び覚ます。' },
          { name: 'リフレーミング', description: '本人が「弱み」だと思っているところを、最大の「強み」に転換する。' },
          { name: '対話の焚き火', description: '静かに語り合うことで、経営の核となるビジョンを言語化する。' }
        ],
        compatibility: {
          perfectMatch: '次のステップに悩む二代目・三代目社長',
          perfectMatchDesc: '家業の伝統と自身の情熱を繋ぐ、新しいイノベーションの軸が見つかります。',
          challengingMatch: '指示待ち・答えくれ型の相談者',
          challengingMatchDesc: '「自分で考える」のを拒む相手には、対話のステップを細かく刻む必要あり。'
        }
      };
    }
    if (sec === 'P' || sec === 'S') {
      return {
        title: 'アイデア共創のプロデューサー',
        className: '共創型プロジェクト・プランナー',
        slogan: '対話から生まれた火種を、革新的なビジネスモデルへとプロデュースする者',
        description: '相談者と膝を突き合わせてディスカッションを重ねながら、お互いのアイデアを化学反応させ、今までにない新サービスや地域共創のビジネスプランを一緒に創り上げる敏腕プロデューサー。',
        avatarType: 'architect',
        stats: { hp: 74, mp: 86, empathy: 80, insight: 92, connection: 88, cheer: 78, patience: 82 },
        commands: [
          { name: '共創ブレーンストーミング', description: '対話の中で面白いアイデアを何倍にも膨らませる。' },
          { name: 'コンセプトワーク', description: 'その事業を一言で表す、魅力的なキャッチコピーと言語化を担う。' },
          { name: 'アライアンス対話', description: '協力者とのミーティングに同席し、双方の強みを活かす合意点を作る。' }
        ],
        compatibility: {
          perfectMatch: '面白いネタはあるが、形にするのが苦手なクリエイター',
          perfectMatchDesc: 'アイデアが市場で売れるパッケージへと劇的に進化します。',
          challengingMatch: '変化を絶対に拒む保守的オーナー',
          challengingMatchDesc: '「昔のやり方を変えたくない」という相手には、より丁寧な対話プロセスが必要。'
        }
      };
    }
    // D-only or fallback D
    return {
      title: '思考を覚醒せし対話司祭',
      className: '対話ファシリテーション達人',
      slogan: '対話という名の鏡を用いて、相談者自身の内に眠る「答え」を映し出す者',
      description: '一方的に教えるのではなく、フラットなパートナーとして問い、語り合う。「そうか、私はこれがやりたかったんだ！」という主体的でワクワクする決断を引き出すスペシャリスト。',
      avatarType: 'prophet',
      stats: { hp: 66, mp: 94, empathy: 86, insight: 94, connection: 70, cheer: 75, patience: 90 },
      commands: [
        { name: '鏡の問いかけ', description: '相談者の言葉を整理して返し、思考の死角に気づかせる。' },
        { name: 'ビジョン・ダイアログ', description: '５年後の企業のありたい姿を、ありありと脳内に描かせる対話。' },
        { name: '論点の整理', description: '議論が散らかったときに、本当に話し合うべき本質に立ち戻らせる。' }
      ],
      compatibility: {
        perfectMatch: '現状のビジネスモデルに閉塞感を感じているオーナー',
        perfectMatchDesc: '新たな視点と自発的な挑戦のモチベーションが引き出されます。',
        challengingMatch: 'すぐ融資手続きだけやってほしい忙しい事業者',
        challengingMatchDesc: '時間がない相手に「対話を深めましょう」と言うと、すれ違いが生じることも。'
      }
    };
  }

  // 4. PRIMARY P (提案型 / Proposal)
  if (primary === 'P') {
    if (sec === 'L' || sec === 'D') {
      return {
        title: '顧客目線の仕掛け人',
        className: '顧客本位のマーケティング魔術師',
        slogan: '相談者の思いを深く聴いた上で、市場に深く刺さるサービス提案を授ける者',
        description: '経営者の大切にしている経営理念や強みを深く共感・理解した上で、「顧客目線」に立ち、思わず買いたくなる魅力的な新商品企画やプロモーション施策をスマートに提案する。',
        avatarType: 'architect',
        stats: { hp: 72, mp: 88, empathy: 85, insight: 90, connection: 80, cheer: 76, patience: 86 },
        commands: [
          { name: '顧客視点プロポーザル', description: 'ターゲット顧客の心を掴むユニークな企画を提案する。' },
          { name: 'バリュー言語化', description: '商品の魅力をわかりやすく伝える「強みのパッケージ化」を行う。' },
          { name: 'SNS集客戦略', description: '予算をかけず、すぐに実践できるファンづくりの施策をレクチャーする。' }
        ],
        compatibility: {
          perfectMatch: '良いものを作っているが、売り方がわからない事業者',
          perfectMatchDesc: '商品の見せ方・届け方が変わり、一気にヒット商品へと化けます。',
          challengingMatch: '提案を全く実行に移さない評論家タイプ',
          challengingMatchDesc: '行動しない相手には、提案の難易度を「今日できること」まで下げる必要あり。'
        }
      };
    }
    if (sec === 'G' || sec === 'S') {
      return {
        title: 'ビジネス開拓の旗振り役',
        className: '補助金・販路開拓プロデューサー',
        slogan: '豊富な公的施策と市場トレンドを組み合わせ、売上倍増の企画を次々と実行する者',
        description: '補助金、助成金、行政支援メニューをフル活用し、経営基盤の刷新やDX、海外展開などの大胆なイノベーションプランを提案。自らも伴走しながら事業を大きく開拓していくパワーファイター。',
        avatarType: 'pioneer',
        stats: { hp: 78, mp: 90, empathy: 72, insight: 94, connection: 92, cheer: 70, patience: 78 },
        commands: [
          { name: 'イノベーション設計', description: '補助金等をレバレッジにした、大型の設備投資や事業再構築を提案する。' },
          { name: '販路開拓プロデュース', description: 'ECモール出店や展示会、大手バイヤーへの提案資料を一緒に作成する。' },
          { name: 'デジタルシフト提案', description: 'バックオフィスや業務フローを劇的に効率化するDXツールを提案する。' }
        ],
        compatibility: {
          perfectMatch: '次の成長ステージへジャンプしたい挑戦的な会社',
          perfectMatchDesc: '補助金の獲得とビジネスモデルの進化が同時に叶う、最高の推進力となります。',
          challengingMatch: '身の丈を超えた過度なリスクを嫌う事業者',
          challengingMatchDesc: '大きな提案をすると怖がらせてしまうため、スモールスタートの提案を心がけるべき。'
        }
      };
    }
    // P-only or fallback P
    return {
      title: '最適解を授けしプロデューサー',
      className: 'ソリューション提案スペシャリスト',
      slogan: '豊富な選択肢と戦略アイデアから、相談者にピッタリの最適解を差し出す者',
      description: '経営課題に対して、「このフレームとこの施策が最も有効です」と、すぐに使える実践的なソリューション（アイデア、ツール、補助金）を分かりやすく、手際よく提案・指導する提案の達人。',
      avatarType: 'architect',
      stats: { hp: 68, mp: 92, empathy: 75, insight: 95, connection: 78, cheer: 70, patience: 82 },
      commands: [
        { name: 'ソリューションカタログ', description: '他社の成功事例を目の前の相談者向けにカスタマイズして提案する。' },
        { name: '補助金ロードマップ', description: '使える補助金や制度を網羅した、年間の支援活用計画を提案する。' },
        { name: '営業アクションプラン', description: '明日から営業メンバーが動ける具体的なステップを提案する。' }
      ],
      compatibility: {
        perfectMatch: '「何をすればいいか、とにかく具体策を教えて」という多忙な社長',
        perfectMatchDesc: '無駄な会議がなくなり、やるべき実務が一気にクリアになって喜ばれます。',
        challengingMatch: '自分のやり方にプライドが強く、アドバイスを拒む事業者',
        challengingMatchDesc: 'まずは相手を徹底的に肯定し、プライドを傷つけない提案方法に気を使う必要あり。'
      }
    };
  }

  // 5. PRIMARY S (営業型 / Sales)
  if (primary === 'S') {
    if (sec === 'L' || sec === 'D') {
      return {
        title: '信頼を結ぶ絆の仲立人',
        className: '地域密着コネクト・コーディネーター',
        slogan: '相談者の人柄と事業の本質を深く引き出し、本当に相応しいアライアンスを築く者',
        description: '温かい人間味で相談者の悩みをじっくり引き出したのち、自らの広大な人脈ネットワークから、お互いの信頼関係に基づいて、人生を変えるような素晴らしいビジネスパートナーや見込み客を結びつけるアライアンスの天才。',
        avatarType: 'matchmaker',
        stats: { hp: 74, mp: 80, empathy: 90, insight: 84, connection: 98, cheer: 78, patience: 88 },
        commands: [
          { name: '絆の紹介状', description: '自分の信頼という通行手形を添えて、強力なキーマンに繋ぐ。' },
          { name: 'シナジー見極め', description: '双方のメリットだけでなく、相性や志が一致するかを重視して繋ぐ。' },
          { name: 'お困りごと仲介', description: '「ここに行けば解決する」という地元のプロフェッショナルをすぐ繋ぐ。' }
        ],
        compatibility: {
          perfectMatch: '技術はピカイチだが、営業や人脈開拓のチャンスがない技術者',
          perfectMatchDesc: 'あなたのひと声で、大口顧客や協業パートナーが次々と繋がります。',
          challengingMatch: '極度の人間不信に陥っている事業者',
          challengingMatchDesc: '他人の協力を一切信じないため、まずは対面で信頼を溶かすアプローチが必要。'
        }
      };
    }
    if (sec === 'P' || sec === 'V') {
      return {
        title: '市場を切り拓く大商人',
        className: 'アグレッシブ販路開拓プロデューサー',
        slogan: '「とにかく動いて売り込もう！」と、営業からアライアンスまで怒涛のスピードで動かす者',
        description: '「計画するより、まずお客様に会いに行こう！」がモットー。自らも相談者の事業を売るために見込み客に頭を下げ、アライアンスから大型のビジネスマッチングまで圧倒的な熱量と行動力で成し遂げる切り込み隊長。',
        avatarType: 'merchant',
        stats: { hp: 82, mp: 78, empathy: 75, insight: 88, connection: 99, cheer: 85, patience: 72 },
        commands: [
          { name: 'ビジネスマッチング召喚', description: '課題解決に必要な専門家や協業候補、バイヤーをその場にパッと召喚する。' },
          { name: '怒涛のテストセールス', description: '一緒に見込み客のもとに走り、その場で受注やニーズを掴んでくる。' },
          { name: 'ウィン・ウィンアライアンス', description: '交渉やアライアンス条件を、双方納得の素晴らしい形にまとめる。' }
        ],
        compatibility: {
          perfectMatch: '一歩を踏み出すのを躊躇している、優柔不断な事業者',
          perfectMatchDesc: 'あなたの圧倒的な行動力と紹介力に引っ張られ、一気に事業が軌道に乗ります。',
          challengingMatch: 'じっくり机上でロジックを詰めたい超慎重派',
          challengingMatchDesc: '動くスピードが早すぎて、相手を怯えさせてしまうことがあるのでテンポを合わせるべき。'
        }
      };
    }
    // S-only or fallback S
    return {
      title: '万物の架け橋商人',
      className: 'ビジネスマッチング大商人',
      slogan: '人、知、機会を繋ぎ、無限の可能性を開く絆の紡ぎ手',
      description: '人見知りをせず、あらゆる階層や職種の人間とフラットに付き合える。相談者の話を分析した瞬間に、脳内の強大な「人脈図」が輝きだし、一瞬で最適な協力者を引き寄せるハブ型支援者。',
      avatarType: 'merchant',
      stats: { hp: 70, mp: 75, empathy: 80, insight: 84, connection: 99, cheer: 76, patience: 80 },
      commands: [
        { name: 'コネクト', description: '自分自身が架け橋となり、相手と世界の素晴らしいリソースをダイレクトに結ぶ。' },
        { name: '強みの価値査定', description: '相手自身も気づいていない「他人に差し出せる最高の価値」を言葉にする。' },
        { name: 'ネットワーキング', description: '地元経済を支える協力的なプレイヤーの輪を大きく広げる。' }
      ],
      compatibility: {
        perfectMatch: '地域での知名度が低く、横の繋がりがない新規参入者',
        perfectMatchDesc: '一瞬で地域経済の温かいコミュニティの輪へと溶け込ませてあげられます。',
        challengingMatch: 'ひたすら自分との対話を深めたい孤高の求道者',
        challengingMatchDesc: '他人の紹介や外部刺激を求めないため、少し距離を置いて見守る配慮が必要。'
      }
    };
  }

  // 6. PRIMARY V (バイブス型 / Vibes)
  if (primary === 'V') {
    if (sec === 'L') {
      return {
        title: '傷を癒やす心の応援団',
        className: '太陽の伴走型チアリーダー',
        slogan: '優しく痛みに寄り添いながら、「あなたなら絶対できる！」と誰よりも熱く背中を押す者',
        description: '落ち込んでいる時は「大変でしたね」と涙ぐみながら100%の優しさで受け止め、前を向いた瞬間に「社長の強みはこんなもんじゃない！絶対に乗り越えられます！」と勇気を注入する、太陽のようなパッションの持ち主。',
        avatarType: 'cheerleader',
        stats: { hp: 76, mp: 85, empathy: 94, insight: 74, connection: 70, cheer: 98, patience: 88 },
        commands: [
          { name: 'パッション充電', description: '経営者のネガティブな不安を、挑戦のワクワクに180度転換する。' },
          { name: '絶対の全肯定エール', description: '存在そのものを肯定し、「あなたなら絶対に大丈夫！」と魂から信じ抜く。' },
          { name: '笑顔おはらい', description: 'ユーモアと熱狂で、経営者の肩に入った余計な力をスッキリ抜く。' }
        ],
        compatibility: {
          perfectMatch: '失敗や批判で燃え尽き、再起を躊躇している挑戦者',
          perfectMatchDesc: 'あなたの心からのエールを受け、不死鳥のように蘇り、再び立ち上がります。',
          challengingMatch: '感情的な励ましを嫌う、極度に冷徹なデータ主義者',
          challengingMatchDesc: '「精神論はいりません」と突き放されがちなため、具体的なファクトでの補強が必要。'
        }
      };
    }
    if (sec === 'G' || sec === 'D') {
      return {
        title: '希望を語る預言者',
        className: 'ビジョン先導インスパイラー',
        slogan: '輝かしい未来像を熱く描き、確かなロードマップと共に経営者を奮い立たせる者',
        description: '「この難局を乗り越えれば、こんな素晴らしい未来が待っています！」と、誰もがワクワクするようなビジョンを熱烈に描き出す。戦略を情熱のガソリンで走らせる、インテリジェントな応援団長。',
        avatarType: 'prophet',
        stats: { hp: 72, mp: 92, empathy: 78, insight: 94, connection: 68, cheer: 96, patience: 82 },
        commands: [
          { name: 'ビジョン預言', description: '相手が成功している３年後の最高の姿を、ありありと脳内に想起させる。' },
          { name: '限界突破の一問', description: '「もし絶対に失敗しないとしたら、本当は何に挑戦したい？」と魂に問う。' },
          { name: 'パッション定着', description: '高まった情熱を、冷める前に「今日やるべき最初のアクション」に落とし込む。' }
        ],
        compatibility: {
          perfectMatch: '素晴らしい才能を持つが、自分に自信がなく足踏みしている職人',
          perfectMatchDesc: 'あなたが可能性を誰よりも信じることで、殻を破って一躍スターダムに駆け上がります。',
          challengingMatch: '「変化」を絶対悪とみなす、現状維持に固執する守備的オーナー',
          challengingMatchDesc: '変化を強制されると感じると心を閉ざすため、丁寧に対話の温度を合わせるべき。'
        }
      };
    }
    // V-only or fallback V
    return {
      title: '魂を燃やす熱狂の応援歌',
      className: 'モチベーション最高潮の熱狂詩人',
      slogan: '心の奥底にある挑戦の灯火を燃え立たせ、未来への一歩を全力でチアアップする者',
      description: '「あなたは素晴らしい！」「絶対にできる！」と本気で信じ抜き、底抜けの肯定感とガッツで、相談者の挑戦の火種を全力で煽る。支援機関に「挑戦の旋風」を巻き起こす太陽タイプ。',
      avatarType: 'dancer',
      stats: { hp: 80, mp: 70, empathy: 82, insight: 65, connection: 75, cheer: 99, patience: 74 },
      commands: [
        { name: '応援のシャワー', description: '相手のポテンシャルを300%に引き上げる熱烈な肯定のシャワーを浴びせる。' },
        { name: '不安おはらいの舞', description: '「やらない理由」や「不安」を、圧倒的に陽気なエネルギーで吹き飛ばす。' },
        { name: '並走ハイテンション', description: '自分自身が最も楽しそうに挑戦を喜び、そのワクワクを相談者にシンクロさせる。' }
      ],
      compatibility: {
        perfectMatch: '最後の一歩をためらう、準備万端の完璧主義者',
        perfectMatchDesc: '「えいやっ！」と背中をポンと押してあげることで、見事なイノベーションを大成功させます。',
        challengingMatch: 'エネルギーが完全にゼロでボロボロの疲れ果てた社長',
        challengingMatchDesc: '過度に熱いエールを送ると気疲れしてしまう。まずは「傾聴の宿屋」で休ませるべし。'
      }
    };
  }

  // Fallback: Default to Hero / Universal Support
  return {
    title: '万象を導く光の勇者',
    className: '万能の伴走型勇者サポーター',
    slogan: 'すべての力を調和させ、どんな相談者も最高の光で照らす者',
    description: '傾聴、導き、対話、提案、営業、バイブスのすべての要素を絶妙なバランスで兼ね備え、相談者の状態や課題に応じて変幻自在にアプローチを変える万能サポーター。',
    avatarType: 'hero',
    stats: { hp: 88, mp: 88, empathy: 85, insight: 85, connection: 85, cheer: 85, patience: 85 },
    commands: [
      { name: '勇者の眼力', description: '相談者が今「宿屋（傾聴）」、「作戦（導き・対話）」、「パーティー（アライアンス）」、「バイキルト（応援）」のどれを必要としているかを見極める。' },
      { name: '万象の調和', description: '経営のバランスを整え、最も心地よい状態で次のビジネスの冒険に進ませる。' }
    ],
    compatibility: {
      perfectMatch: 'すべての事業者・経営者',
      perfectMatchDesc: 'どんな性格、どんな状況であっても完全にマッチし、高いシナジーを発揮します。',
      challengingMatch: 'なし',
      challengingMatchDesc: '誰とでも調和できるため、不適合な相手は存在しない究極のサポーターです。'
    }
  };
}

export function getTitleLore(primary: 'L' | 'G' | 'D' | 'P' | 'S' | 'V', affiliation: string): string {
  const mapping: Record<'L' | 'G' | 'D' | 'P' | 'S' | 'V', Record<string, string>> = {
    L: {
      chamber: '街の隅々の商店を回り、店主の愚痴や不安をとことん聴き届ける「商工の守護神」。どんなに頑固な老舗の主人も、彼/彼女の前ではついつい財布の紐と涙腺を緩めてしまうという。',
      gov: 'お役所の堅苦しさを微塵も感じさせない、共感型「まちづくり司令官」。市民の小さなつぶやきを決して聞き逃さず、複雑な制度のクッションとなって地域を温かく包み込む。',
      bank: '冷徹に見える銀行の窓口に立つ、人情味あふれる「財務 of ガーディアン」。試算表の数字に隠された経営者の汗と涙を汲み取り、心強い資金調達の相談役となる。',
      support: 'よろず支援拠点の駆け込み寺に君臨する、慈愛の「伴走型メンター」。相談するだけで心の傷が全回復すると噂されており、今日も多くの迷える起業家が彼/彼女を頼って集う。',
      consultant: '組織に縛られず、経営者の最も近い場所で寄り添い続ける「変革をもたらす軍師」。時に朝までじっくりと本音に耳を傾け、孤独な戦いを共にする無二の盟友。'
    },
    G: {
      chamber: '商工会に突如現れた「論理の守護者」。複雑怪奇な補助金申請や経営計画を、圧倒的な数式とチャートでズバズバと仕分け、地域企業に黄金のロードマップを示す。',
      gov: '非効率な行政手続きを自動化し、緻密な人口データから未来を設計する「パブリックプランナー」。感傷に流されず、街の最適な未来をデザインする冷徹にして熱い頭脳。',
      bank: '貸借対照表の行間から経営の綻びを秒単位で見抜く「キャッシュフローの魔術師」。彼/彼女の分析した財務再建計画は、どんな厳しい審査役も一言も返せず納得させる。',
      support: 'よろず相談の窓口で、カオスな相談を美しい論理式に変換する「データサイエンティスト」。どんなに迷走している経営者も、彼/彼女の数分間のレクチャーで一気に思考が整理される。',
      consultant: '企業の運命を冷徹なデータで予言する「ビジネスモデル設計士」。無駄を削ぎ落とし、最短最速で利益を生み出すルートを叩き出す、独立独歩の凄腕スナイパー。'
    },
    D: {
      chamber: '絶妙な「問い」を投げかけることで、地域の商売人たちを覚醒させる「対話のコンパス」。指示は一切せず、相手が自分から「これだ！」と気づく瞬間を最高に愛する。',
      gov: 'ワークショップを開催すれば右に出る者はいない、共創の「ファシリテーター」。対立する住民たちをいつの間にか笑顔でハグさせ、街の未来ビジョンを導き出す言葉の魔術師。',
      bank: '融資をただの金貸しで終わらせない「伴走型対話ドクター」。経営者との徹底的なセッションを通じて、相手の「本当の強み」を本人の口から引き出す覚醒のプロ。',
      support: 'よろず支援拠点で、起業家の眠れるポテンシャルを解き放つ「気づきの賢者」。彼/彼女と話した起業家は、自分の真の価値に気づき、瞳を輝かせて酒場を飛び出していく。',
      consultant: '「答えは経営者の中にある」を極めた、独立系「エグゼクティブ・コーチ」。経営者の心のブロックを溶かし、本人すら諦めていた野心的なビジネスアイデアを引き出す。'
    },
    P: {
      chamber: '商工会の誇る「アイデア兵器」。あらゆる国・県の補助金スキームを脳内にインプットしており、どんな難題にも「この補助金を使えば一発です」と瞬時に最適解を錬成する。',
      gov: '地域の空き家や特産品を組み合わせて、秒速で稼げるプロジェクトに変える「まちづくり錬金術師」。行政の予算枠を最大限に活かす、圧倒的アイデアの泉。',
      bank: '単なる融資提案にとどまらず、ビジネスマッチングから事業承継スキームまで丸ごと設計する「財務の魔術師」。他行が匙を投げた案件も、天才的提案で再生させる。',
      support: 'よろずの窓口で、売れる新商品企画や販路開拓アイデアを量産する「企画のヒットメーカー」。実践的で即効性のあるソリューションをこれでもかと授けてくれる。',
      consultant: '企業のコアコンピタンスを再定義し、革新的なビジネスモデルを設計する「新時代の戦略軍師」。彼/彼女の書いた企画書一枚で、崖っぷちの会社がV字回復を遂げた伝説もある。'
    },
    S: {
      chamber: '人脈の広さが宇宙規模に達している「地域連携のハブ」。経営者の「こんな人探してるんだけど」というつぶやきを聞いた瞬間、スマホを3タップしてキーマンを召喚する。',
      gov: '行政、大学、大企業、地元中小企業を巻き込んだアライアンスを量産する「街の仕掛け人」。彼/彼女の紹介状が一通あれば、どんな堅い大手企業の役員室も突破できる。',
      bank: '融資をするだけでなく、自慢の紹介力で買い手と売り手を爆速で結びつける「ビジネスマッチメーカー」。取引先同士を繋いで新しいビジネスを生み出すのが何よりの快感。',
      support: 'よろず支援拠点で、あらゆる業界の専門家やバイヤーの連絡先を握る「門番」。相談に来た経営者を、最も相乗効果の高いパートナーの元へ圧倒的スピードでバトンパスする。',
      consultant: '「自分の頭脳は、世界中の脳みそと繋がっている」と言い放つ、最強の「人脈コネクター」。どんなクローズドなコミュニティにも入り込み、伝説のアライアンスを結んでしまう。'
    },
    V: {
      chamber: '商工会きっての「熱血アニキ/アネキ」。圧倒的な「全肯定ハイタッチ」と「お前ならできる！」の魂の叫びで、コロナ禍で落ち込む地元の商店街を再燃させたパッションの塊。',
      gov: 'お役所の冷たいイメージを180度覆す、ガッツあふれる「公務員ヒーロー」。自ら地域の祭りやハッカソンの先頭に立ち、周囲 of モチベーションを限界突破させる太陽。',
      bank: '「あなたのパッションに、私は全額をベットします！」と本気で経営者と肩を組む、異色の「熱血バンカー」。融資審査の書類に、経営者のガッツを涙ながらに書き殴る。',
      support: 'よろず支援拠点に常駐する「限界突破サポーター」。相談に来た者がどれだけ弱音を吐いても、圧倒的な笑顔と愛で包み込み、心のエンジンを再び爆速で稼働させる。',
      consultant: '経営者の挑戦を1秒たりとも疑わず、200%全肯定する「フリーランス伴走ヒーロー」。彼/彼女とミーティングをした後は、誰もが「世界を救える！」という万能感に満たされる。'
    }
  };

  const styleMapping = mapping[primary] || mapping.L;
  return styleMapping[affiliation] || styleMapping.consultant;
}

export function getDecisionSpeedTrait(responseTimes?: number[]): { name: string; desc: string; avgTime: number } {
  const times = responseTimes && responseTimes.length > 0 ? responseTimes : [5, 5, 5, 5, 5];
  const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
  
  if (avgTime < 3.5) {
    return {
      name: '電光石火の即断即行 (Lightning Blitz)',
      desc: '驚異的な直感と素早い判断力で、悩む間もなく次々と瞬時に選択肢を選び抜く超スピードの決断者。スピード重視の局面で大活躍するぞ！',
      avgTime: parseFloat(avgTime.toFixed(1))
    };
  } else if (avgTime > 8.5) {
    return {
      name: '深謀遠慮の熟考洞察 (Deep Meditator)',
      desc: '表面上の情報に流されず、状況の裏に潜む本質や多角的な影響を極めて慎重に見極める、非常に精緻な思考の持ち主。難局を解く知将だ。',
      avgTime: parseFloat(avgTime.toFixed(1))
    };
  } else {
    return {
      name: '知行合一の適応判断 (Balanced Tactician)',
      desc: '迅速な判断力と慎重な熟慮のバランスが完璧に取れており、状況に応じて臨機応変に最適な決断を下せる、安定感バツグンの賢者。',
      avgTime: parseFloat(avgTime.toFixed(1))
    };
  }
}

export function getGratitudeMessage(primary: 'L' | 'G' | 'D' | 'P' | 'S' | 'V', name: string): string {
  const mapping: Record<'L' | 'G' | 'D' | 'P' | 'S' | 'V', string> = {
    L: `「あの時、誰にも言えずに一人で抱え込んでいた不安を、ただ黙って、優しく最後まで聴いてくれたのが ${name}さんでした。話し終えた時、どれほど心が軽くなったか知れません。あなたのおかげで、もう一度前を向く勇気が湧きました。本当にありがとう。」`,
    G: `「数字がグチャグチャで、次に何をすべきか全く霧の中だった時、${name}さんは冷静に状況を整理し、進むべき確かなロードマップを示してくれました。暗闇の中で灯台を見つけたような安心感でした。あの的確な導きがなければ、今のうちの会社はありません！」`,
    D: `「単にアドバイスをくれるだけでなく、${name}さんとの対話の中で『本当に自分がやりたかったこと』に自分自身で気づかされました。魂を揺さぶられるような深い問いかけの数々が、私の経営者としての覚醒を呼び起こしてくれました。心から感謝しています。」`,
    P: `「もう資金もアイデアも限界だ…と諦めかけていた会議室に、${name}さんが『こんな面白い作戦があります！』と斬新な提案を持って飛び込んできてくれました。あのクリエイティブな閃きこそ、私たちの事業を劇的に蘇らせた奇跡の特効薬です！」`,
    S: `「『ウチだけで悩む必要はない』と、${name}さんは想像もしなかった素晴らしいパートナー企業や専門家を爆速で繋いでくれました。あの神業のようなマッチングと心強いネットワークのおかげで、一気に販路が拓けました。最高の出会いをありがとう！」`,
    V: `「『あんたなら絶対にできる！私が全力で保証する！』と、${name}さんに両肩をガシッと掴まれてハイタッチされた時、諦めかけていた心の火が再び激しく燃え上がりました。あの一生モノの熱いバイブスと励ましがあったから、限界を突破できました！」`
  };
  return mapping[primary] || mapping.L;
}

export function getStrengths(primary: 'L' | 'G' | 'D' | 'P' | 'S' | 'V'): string[] {
  switch (primary) {
    case 'L': return ['圧倒的な包容力', '完全受容の傾聴マインド', 'お悩み解決前の心のセルフケア'];
    case 'G': return ['精密な財務分析力', '論理的なボトルネック抽出', '迷いをゼロにするスマートロードマップ'];
    case 'D': return ['気づきを引き出す神問いかけ', '相談者の自走力の開花', '客観的な自己認知のサポート'];
    case 'P': return ['無限に湧き出るアイデア力', '公的補助金マニュアルの瞬時解読', '実践的ビジネスモデル設計'];
    case 'S': return ['宇宙規模の人脈ネットワーク', 'ビジネスマッチングの瞬発力', '紹介による強力な援軍召喚'];
    case 'V': return ['1000万ボルト級 of ポジティブ精神', '経営者の心を再稼働させる共感力', '全肯定による圧倒的チアアップ'];
    default: return ['万能のバランス感覚', '臨機応変な支援メソッド', 'いかなる局面でも対応できる柔軟性'];
  }
}

export function getQuirks(primary: 'L' | 'G' | 'D' | 'P' | 'S' | 'V'): string[] {
  switch (primary) {
    case 'L': return ['話を聴くことに集中しすぎて、ミーティングの制限時間を溶かしがち。', '相手を思いやるあまり、たまに厳しいフィードバックを言うのを躊躇する。'];
    case 'G': return ['ついつい早口でロジックツリーや3C分析の講義を始めてしまう。', '数字やファクトの正確さを求めすぎて、相手がたじたじになることも。'];
    case 'D': return ['「答えはあなたの中にあります」を貫きすぎて、相手の脳を筋肉痛にさせる。', '直接指示をしないので、早く正解が欲しい人に「じれったい！」と思われる。'];
    case 'P': return ['アイデアが溢れすぎて、経営者が実行しきれない大量の宿題を置いて帰る。', '新しい面白いことを見つけると、既存プロジェクトを放って飛びつきがち。'];
    case 'S': return ['課題を聞いた瞬間にすぐスマホを取り出して、目の前でアポイントを取り始める。', '紹介相手が多すぎて、経営者のスケジュール帳がマッチングで埋め尽くされる。'];
    case 'V': return ['熱狂的に励ましすぎて、経営者よりも自分のバイブスの方が先に最高潮に達する。', '深夜のミーティングでもまるで太陽のように眩しいテンションを維持してしまう。'];
    default: return ['平均的すぎて強烈なクセがなく、本人としてはちょっと寂しがっている。', 'どんな局面にも対応しすぎて「本職は何者なんだ？」と不審がられる。'];
  }
}
