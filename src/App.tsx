/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { COMMON_QUESTION, BRANCHED_QUESTIONS } from './data/questions';
import { calculateStyle, getSupporterStyleDetails, generateUniqueTitle, getTitleLore, getStrengths, getQuirks, getDecisionSpeedTrait, getGratitudeMessage } from './utils/styleCalculator';
import { audio } from './utils/audio';
import RetroCard from './components/RetroCard';
import TavernGuestbook from './components/TavernGuestbook';
import PixelAvatar from './components/PixelAvatar';
import { RegisteredSupporter, QuestionOption } from './types';
import {
  Volume2,
  VolumeX,
  BookOpen,
  UserPlus,
  Tv,
  Sparkles,
  Award,
  HelpCircle,
  Flame,
  X,
  RefreshCw,
  Briefcase,
  PenTool,
  ArrowRight,
} from 'lucide-react';

export default function App() {
  // Screen state: 'entrance' | 'name-input' | 'affiliation-input' | 'question' | 'motto-input' | 'result' | 'guestbook'
  const [screen, setScreen] = useState<'entrance' | 'name-input' | 'affiliation-input' | 'question' | 'motto-input' | 'result' | 'guestbook'>('entrance');
  
  // Quiz parameters
  const [name, setName] = useState('');
  const [affiliation, setAffiliation] = useState('agency'); // 'agency' | 'chamber' | 'gov' | 'bank' | 'support' | 'consultant'
  const [preferredTool, setPreferredTool] = useState('calculator'); // 'calculator' | 'subsidy' | 'network' | 'passion' | 'idea' | 'industry_knowledge'
  const [freeText, setFreeText] = useState(''); // User's custom motto
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({ L: 0, G: 0, D: 0, P: 0, S: 0, V: 0 });
  const [isSaved, setIsSaved] = useState(false);
  const [selectedSupporter, setSelectedSupporter] = useState<RegisteredSupporter | null>(null);

  // Timing states
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [responseTimes, setResponseTimes] = useState<number[]>([]);

  // Get currently active question based on answer count and dynamic scoring
  const getCurrentQuestion = () => {
    if (currentQuestionIndex === 0) {
      return COMMON_QUESTION;
    }
    
    // Find the dominant style dimension at the moment
    const dimensions: ('L' | 'G' | 'D' | 'P' | 'S' | 'V')[] = ['L', 'G', 'D', 'P', 'S', 'V'];
    let dominant: 'L' | 'G' | 'D' | 'P' | 'S' | 'V' = 'L';
    let maxScore = -1;
    
    dimensions.forEach(dim => {
      if (scores[dim] > maxScore) {
        maxScore = scores[dim];
        dominant = dim;
      }
    });

    const branch = BRANCHED_QUESTIONS[dominant] || BRANCHED_QUESTIONS['L'];
    const qIndex = currentQuestionIndex - 1;
    return branch[qIndex] || branch[0];
  };

  // Sound and Visual effects toggles
  const [isMuted, setIsMuted] = useState(false);
  const [isScanlineOn, setIsScanlineOn] = useState(true);

  // Typewriter effect state
  const [fullDialogue, setFullDialogue] = useState('');
  const [displayedDialogue, setDisplayedDialogue] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Gold count state (calculated from registered supporters count)
  const [goldCount, setGoldCount] = useState(128);

  // Tool display names
  const getToolName = (tool: string) => {
    switch (tool) {
      case 'calculator': return '電卓と融資申請書';
      case 'subsidy': return '分厚い公的補助金マニュアル';
      case 'network': return '専門家ネットワーク・極秘紹介状';
      case 'passion': return '熱い共感と全肯定ハイタッチ';
      case 'idea': return 'クリエイティブなアイデア';
      case 'industry_knowledge': return '特定の専門業界知識';
      default: return '支援の心';
    }
  };

  // Affiliation display names
  const getAffiliationName = (aff: string) => {
    switch (aff) {
      case 'agency': return '企業支援機関';
      case 'chamber': return '商工会議所・商工会';
      case 'gov': return '地方自治体・行政';
      case 'bank': return '地域金融機関・銀行・信金';
      case 'support': return 'よろず支援拠点・公的支援機関';
      case 'consultant': return '民間コンサル・フリーランス';
      default: return '支援専門家';
    }
  };

  // Initial dialogue on mount
  useEffect(() => {
    setFullDialogue(
      '旅人よ、よくぞ シェーンの酒場へ！ ここは、多様な「支援者スタイル」が 集う特別な場所。 仲間を登録したり、呼び出したり できるよ。 あんたの才能も 登録していきな！'
    );
  }, []);

  // Update goldCount based on guestbook size
  useEffect(() => {
    try {
      const stored = localStorage.getItem('luida_registered_supporters');
      const list = stored ? JSON.parse(stored) : [];
      setGoldCount(128 + list.length * 100);
    } catch (e) {
      setGoldCount(128);
    }
  }, [screen, isSaved]);

  // Update dialogues based on screen changes
  useEffect(() => {
    if (screen === 'entrance') {
      setFullDialogue(
        '旅人よ、よくぞ シェーンの酒場へ！ ここは、多様な「支援者スタイル」が 集う特別な場所。 仲間を登録したり、呼び出したり できるよ。 あんたの才能も 登録していきな！'
      );
    } else if (screen === 'name-input') {
      setFullDialogue(
        'おお！ 仲間に 登録してくれるんだね。嬉しいよ！ まずは、あんたの「お名前」を 教えておくれ。 酒場の名簿にしっかり刻むからね。'
      );
    } else if (screen === 'affiliation-input') {
      setFullDialogue(
        `なるほど、 ${name} だね。 いい名だ！ それじゃあ、あんたが 普段どこで『お仕事（活動）』をしているのかと、戦場に携えていく『お気に入りの武器（ツール）』を 選んでおくれ。`
      );
    } else if (screen === 'question') {
      const qNum = currentQuestionIndex + 1;
      if (currentQuestionIndex === 0) {
        setFullDialogue(
          '第1の問いだよ。 目の前に「売上や集客」で 本気で悩んでいる経営者がいるね。 あんたなら どう手を差し伸べるい？'
        );
      } else {
        const dimensions: ('L' | 'G' | 'D' | 'P' | 'S' | 'V')[] = ['L', 'G', 'D', 'P', 'S', 'V'];
        let dominant: 'L' | 'G' | 'D' | 'P' | 'S' | 'V' = 'L';
        let maxScore = -1;
        dimensions.forEach(dim => {
          if (scores[dim] > maxScore) {
            maxScore = scores[dim];
            dominant = dim;
          }
        });

        const routeNames: Record<'L' | 'G' | 'D' | 'P' | 'S' | 'V', string> = {
          L: '【傾聴の泉】',
          G: '【叡智の羅針盤】',
          D: '【本質の対話】',
          P: '【創造のひらめき】',
          S: '【黄金の協調】',
          V: '【情熱の太陽】',
        };
        
        const routeLabel = routeNames[dominant];
        const branch = BRANCHED_QUESTIONS[dominant] || BRANCHED_QUESTIONS['L'];
        const qIndex = currentQuestionIndex - 1;
        const currentQ = branch[qIndex] || branch[0];

        setFullDialogue(
          `第${qNum}の問いだね。ふむ、あんたの奥底から ${routeLabel} の波動を感じるよ。そのスタイルに応じた物語が動き出したね。\n\n${currentQ.text}`
        );
      }
    } else if (screen === 'motto-input') {
      setFullDialogue(
        'よし！ 5つの問いに 答えてくれたね。 最後に、あんたが支援をするときに 心の中で唱えている『信念（モットー）』や『大切にしている言葉』を 自由に書き込んでおくれ！'
      );
    } else if (screen === 'result') {
      setFullDialogue(
        `よし！ すべて完了したよ。 ${name} の 奥底に眠る「支援者としての器」が、今 カタチを成したよ！ さあ、あんたの冒険者カードを見ておくれ！`
      );
    } else if (screen === 'guestbook') {
      setFullDialogue(
        'これが 酒場の「登録簿」だよ。 ここに登録された 仲間たちは、いつでも 呼び出す（ステータス確認）ことが できるよ。'
      );
    }
  }, [screen, currentQuestionIndex, name, scores]);

  // Start the timer when the screen becomes 'question' or current question index changes
  useEffect(() => {
    if (screen === 'question') {
      setQuestionStartTime(Date.now());
    }
  }, [screen, currentQuestionIndex]);

  // Handle typewriter scrolling effect with double-render safety
  useEffect(() => {
    if (!fullDialogue) return;
    
    // Reset typewriter states
    setDisplayedDialogue('');
    setTypewriterIndex(0);
    setIsTypingComplete(false);

    let active = true;
    let index = 0;
    const textLength = fullDialogue.length;

    const timer = setInterval(() => {
      if (!active) return;
      if (index < textLength) {
        const nextIndex = index + 1;
        setDisplayedDialogue(fullDialogue.substring(0, nextIndex));
        // Play classic 8-bit text scroll bleep
        if (!isMuted && index % 2 === 0) {
          try {
            audio.playBleep();
          } catch (e) {
            console.warn('Audio playBleep failed in typewriter:', e);
          }
        }
        index++;
        setTypewriterIndex(index);
      } else {
        setIsTypingComplete(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 25); // Fast, smooth retro scroll speed

    timerRef.current = timer;

    return () => {
      active = false;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fullDialogue, isMuted]);

  // Click dialogue box to skip typing animation
  const handleSkipTypewriter = () => {
    if (!isTypingComplete) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setDisplayedDialogue(fullDialogue);
      setIsTypingComplete(true);
      setTypewriterIndex(fullDialogue.length);
      audio.playSelect();
    }
  };

  // Toggle sound muting
  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audio.setMuted(nextMute);
    if (!nextMute) {
      setTimeout(() => {
        audio.playSelect();
      }, 50);
    }
  };

  // Start the quiz
  const handleStartDiagnosis = () => {
    audio.playSelect();
    audio.startBGM(); // Start background music on user action
    setScreen('name-input');
    setName('');
    setAffiliation('agency');
    setPreferredTool('calculator');
    setFreeText('');
    setCurrentQuestionIndex(0);
    setScores({ L: 0, G: 0, D: 0, P: 0, S: 0, V: 0 });
    setIsSaved(false);
    setSelectedSupporter(null);
    setResponseTimes([]);
  };

  // Submit name
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      audio.playCancel();
      alert('なまえを 入力しておくれ！');
      return;
    }
    audio.playSelect();
    setScreen('affiliation-input');
  };

  // Submit affiliation & weapon/tool
  const handleAffiliationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audio.playSelect();
    setScreen('question');
  };

  // Handle picking an answer for Q1-Q5
  const handleSelectOption = (option: QuestionOption) => {
    audio.playSelect();
    
    const now = Date.now();
    const elapsed = questionStartTime > 0 ? (now - questionStartTime) / 1000 : 4.0;
    const clampedElapsed = Math.min(Math.max(elapsed, 0.5), 30); // clamp between 0.5s and 30s
    
    setResponseTimes(prev => [...prev, clampedElapsed]);

    // Update scores with base points and timing-based micro-variance
    setScores(prev => {
      const next = { ...prev };
      
      // Base point addition
      next[option.dimension] = (next[option.dimension] || 0) + option.point;
      
      // Add sub-second micro-noise to guarantee unique scores and prevent ties
      const subsecondNoise = (now % 100) / 1000; // 0.000 to 0.099
      next[option.dimension] = parseFloat((next[option.dimension] + subsecondNoise).toFixed(3));
      
      // Speed influence (intuitive actions vs deep contemplation)
      if (clampedElapsed < 3.5) {
        // Fast decider -> Boost V, S, or P slightly
        const speedBoostDim: 'V' | 'S' | 'P' = clampedElapsed < 1.8 ? 'V' : (clampedElapsed < 2.6 ? 'S' : 'P');
        next[speedBoostDim] = parseFloat((next[speedBoostDim] + 0.12).toFixed(3));
      } else if (clampedElapsed > 8.5) {
        // Highly deliberative -> Boost L, G, or D slightly
        const deliberationBoostDim: 'L' | 'G' | 'D' = clampedElapsed > 15.0 ? 'L' : (clampedElapsed > 11.0 ? 'G' : 'D');
        next[deliberationBoostDim] = parseFloat((next[deliberationBoostDim] + 0.12).toFixed(3));
      } else {
        // Balanced -> Add tiny spread to a deterministic style
        const dims: ('L' | 'G' | 'D' | 'P' | 'S' | 'V')[] = ['L', 'G', 'D', 'P', 'S', 'V'];
        const targetDim = dims[now % dims.length];
        next[targetDim] = parseFloat((next[targetDim] + 0.05).toFixed(3));
      }
      
      return next;
    });

    if (currentQuestionIndex < 4) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Advance to the 6th question (Free Motto)
      setScreen('motto-input');
    }
  };

  // Submit Motto (Ends the diagnosis and automatically registers to guestbook)
  const handleMottoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audio.playFanfare();

    // Auto-register supporter to the guestbook upon generation
    const { primary, secondary } = calculateStyle(scores);
    const details = getSupporterStyleDetails(primary, secondary);
    const finalTitle = generateUniqueTitle(primary, name.trim(), freeText.trim(), affiliation);
    const speedTrait = getDecisionSpeedTrait(responseTimes);
    const gratitudeMsg = getGratitudeMessage(primary, name.trim());

    const newSupporter: RegisteredSupporter = {
      id: Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      primaryStyle: primary,
      secondaryStyle: secondary,
      title: finalTitle,
      className: details.className,
      registeredAt: new Date().toISOString(),
      scores: { ...scores },
      affiliation: affiliation,
      preferredTool: preferredTool,
      freeText: freeText.trim(),
      responseTimes: [...responseTimes],
      decisionSpeedTrait: speedTrait,
      gratitudeMessage: gratitudeMsg
    };

    try {
      const stored = localStorage.getItem('luida_registered_supporters');
      const list: RegisteredSupporter[] = stored ? JSON.parse(stored) : [];
      const updatedList = [newSupporter, ...list].slice(0, 50);
      localStorage.setItem('luida_registered_supporters', JSON.stringify(updatedList));
      setIsSaved(true);
    } catch (err) {
      console.error('Failed to auto-register supporter:', err);
    }

    setScreen('result');
  };

  // Save current supporter result to Guestbook (LocalStorage)
  const handleSaveToGuestbook = () => {
    if (isSaved) return;

    const { primary, secondary } = calculateStyle(scores);
    const details = getSupporterStyleDetails(primary, secondary);
    const finalTitle = generateUniqueTitle(primary, name.trim(), freeText.trim(), affiliation);
    const speedTrait = getDecisionSpeedTrait(responseTimes);
    const gratitudeMsg = getGratitudeMessage(primary, name.trim());

    const newSupporter: RegisteredSupporter = {
      id: Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      primaryStyle: primary,
      secondaryStyle: secondary,
      title: finalTitle,
      className: details.className,
      registeredAt: new Date().toISOString(),
      scores: { ...scores },
      affiliation: affiliation,
      preferredTool: preferredTool,
      freeText: freeText.trim(),
      responseTimes: [...responseTimes],
      decisionSpeedTrait: speedTrait,
      gratitudeMessage: gratitudeMsg
    };

    try {
      const stored = localStorage.getItem('luida_registered_supporters');
      const list: RegisteredSupporter[] = stored ? JSON.parse(stored) : [];
      
      // Limit to 50 entries to prevent localstorage overflow
      const updatedList = [newSupporter, ...list].slice(0, 50);
      localStorage.setItem('luida_registered_supporters', JSON.stringify(updatedList));
      setIsSaved(true);
      audio.playFanfare();
    } catch (e) {
      console.error('Failed to save to guestbook:', e);
      alert('申し訳ない！ 登録簿がいっぱいで 書き込めなかったよ。');
    }
  };

  // Reset diagnosis
  const handleReset = () => {
    audio.playCancel();
    setScreen('entrance');
    setName('');
    setAffiliation('agency');
    setPreferredTool('calculator');
    setFreeText('');
    setCurrentQuestionIndex(0);
    setScores({ L: 0, G: 0, D: 0, P: 0, S: 0, V: 0 });
    setIsSaved(false);
    setSelectedSupporter(null);
    setResponseTimes([]);
  };

  // Select a saved supporter from Guestbook list to view
  const handleViewSupporterFromGuestbook = (supporter: RegisteredSupporter) => {
    setSelectedSupporter(supporter);
    setName(supporter.name);
    setScores(supporter.scores);
    if (supporter.affiliation) setAffiliation(supporter.affiliation);
    if (supporter.preferredTool) setPreferredTool(supporter.preferredTool);
    if (supporter.freeText !== undefined) setFreeText(supporter.freeText);
    if (supporter.responseTimes) {
      setResponseTimes(supporter.responseTimes);
    } else {
      setResponseTimes([]);
    }
    setIsSaved(true); // Marked as saved since it's already in guestbook
    setScreen('result');
  };

  // Open guestbook screen
  const handleOpenGuestbook = () => {
    audio.playSelect();
    audio.startBGM(); // Ensure BGM is running
    setScreen('guestbook');
  };

  // Get active style details for the result card
  const activeName = selectedSupporter ? selectedSupporter.name : name;
  const activeScores = selectedSupporter ? selectedSupporter.scores : scores;
  const activeAffiliation = selectedSupporter ? (selectedSupporter.affiliation || 'agency') : affiliation;
  const activePreferredTool = selectedSupporter ? (selectedSupporter.preferredTool || 'calculator') : preferredTool;
  const activeFreeText = selectedSupporter ? (selectedSupporter.freeText || '') : freeText;
  const activeResponseTimes = selectedSupporter ? (selectedSupporter.responseTimes || responseTimes) : responseTimes;

  const { primary, secondary } = calculateStyle(activeScores);
  const rawDetails = getSupporterStyleDetails(primary, secondary);
  const finalTitle = selectedSupporter ? selectedSupporter.title : generateUniqueTitle(primary, activeName, activeFreeText, activeAffiliation);
  const currentQuestion = getCurrentQuestion();

  // Custom RPG-flavored tool commentary
  const getToolCommentary = (tool: string) => {
    switch (tool) {
      case 'calculator':
        return `使い込まれた愛用の『電卓と融資申請書』をパチパチ弾きながら、資金という名の恵みの雨（融資）を呼び寄せる姿は、まさに現代の敏腕錬金術師そのものだよ！`;
      case 'subsidy':
        return `あの分厚くてルールだらけの『公的補助金マニュアル』を涼しい顔で読み解き、国から活動資金を引き出す強力な支援PSIをチャージしてくれるんだから恐れ入るね。`;
      case 'network':
        return `懐にしのばせた『極秘紹介状と専門家ネットワーク』を使って、ピンチの時に強力な専門家の援軍を次々と召喚する。あいつの人脈ギルドには誰も勝てやしないよ。`;
      case 'passion':
        return `何と言っても、あの熱い共感から放たれる『全肯定ハイタッチ』さ！傷ついた経営者たちのエネルギーを一瞬で全回復（ライフアップ）させる、あいつにしか使えない究極のPSI（超能力）だよ！`;
      case 'idea':
        return `ひらめきが光る『クリエイティブなアイデア』を武器に、誰も思いつかなかったような斬新な作戦（新事業）を次々に打ち出す。あいつの発想力はまさに伝説の魔法（パルプンテ）のようだね！`;
      case 'industry_knowledge':
        return `長年鍛え上げた『特定の専門業界知識』という鋭い剣（情報）で、どんなに複雑な業界の障壁もスパッと一刀両断する。業界の裏事情まで知り尽くした、頼れるベテラン戦士だよ。`;
      default:
        return `確かな『支援の心』を武器に、いつでも目の前の相談者に寄り添う素晴らしい戦い方をするんだ。`;
    }
  };

  const quirksList = getQuirks(primary);
  const rawQuirk = quirksList[0] || '話を聴くことに集中しすぎる';
  const quirkComment = rawQuirk.replace(/。$/, '');

  const toolComment = getToolCommentary(activePreferredTool);
  const customDesc = `「よう、よくぞ来たね！このアタシが自信を持ってオススメする最高の一級冒険者（サポーター）が、この ${activeName} さ！ ご覧の通り、あいつは類い稀なる【${rawDetails.className}】の素質を宿していてね。 ${toolComment} ただ、あいつの面白いトコロというか、愛すべきクセがあってね。なんでも、${quirkComment}って一面があるのさ。まぁ、それだけ目の前の相手に全力でぶつかっている熱い証拠なんだけどね！

そして、ここからが酒場主（アタシ）独自の特別【編集・推薦視点】さ。あいつの本質的な凄みは、なんと言っても『${activeFreeText.trim() || '誠心誠意の寄り添い'}』というブレない核心（ビジョン）を打ち立てている点にあるね。単にスキルを振りかざすんじゃなく、この編集視点で捉えた揺るぎない魂があるからこそ、難局に瀕した経営者を本当の成功へと導けるのさ！アタシが絶対的な信頼を寄せる名サポーター、今すぐあんたのパーティー（組織）にスカウトしな！」`;

  const speedTrait = selectedSupporter?.decisionSpeedTrait || getDecisionSpeedTrait(activeResponseTimes);
  const gratitudeMsg = selectedSupporter?.gratitudeMessage || getGratitudeMessage(primary, activeName);

  const styleDetails = {
    ...rawDetails,
    title: finalTitle,
    titleLore: getTitleLore(primary, activeAffiliation),
    strengths: getStrengths(primary),
    quirks: getQuirks(primary),
    description: customDesc,
    decisionSpeedTrait: speedTrait,
    gratitudeMessage: gratitudeMsg
  };

  return (
    <div className={`min-h-screen bg-[#000015] text-stone-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black pb-8 relative overflow-hidden ${isScanlineOn ? 'scanlines' : ''}`}>
      
      {/* Decorative JRPG Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-radial from-[#1e1b4b]/10 to-transparent pointer-events-none" />

      {/* Top Navigation / Control Panel */}
      <header className="border-b-4 border-white bg-black px-4 py-3 sticky top-0 z-50 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          {/* Logo Title */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
            <h1 className="text-base md:text-lg font-bold font-sans tracking-widest text-[#ffd700]">
              シェーンの支援者酒場
            </h1>
          </div>

          {/* Control Toggles */}
          <div className="flex items-center gap-3">
            {/* Guestbook direct button */}
            {screen !== 'guestbook' && (
              <button
                onClick={handleOpenGuestbook}
                className="px-3 py-1.5 bg-black hover:bg-[#111125] text-[#ffd700] border-2 border-white hover:border-[#ffd700] text-[10px] md:text-xs font-sans cursor-pointer transition-all flex items-center gap-1.5"
              >
                <BookOpen className="w-3 h-3 text-[#ffd700]" />
                登録簿
              </button>
            )}

            {/* CRT scanline Toggle */}
            <button
              onClick={() => {
                audio.playSelect();
                setIsScanlineOn(!isScanlineOn);
              }}
              className={`p-1.5 border-2 transition-colors cursor-pointer text-xs ${
                isScanlineOn
                  ? 'bg-black border-[#ffd700] text-[#ffd700]'
                  : 'bg-black border-zinc-700 text-zinc-500 hover:text-zinc-300'
              }`}
              title="CRT走査線効果"
            >
              <Tv className="w-3.5 h-3.5" />
            </button>

            {/* Audio Toggle */}
            <button
              onClick={handleToggleMute}
              className={`p-1.5 border-2 transition-colors cursor-pointer text-xs ${
                !isMuted
                  ? 'bg-black border-[#ffd700] text-[#ffd700]'
                  : 'bg-black border-zinc-700 text-zinc-500 hover:text-zinc-300'
              }`}
              title={isMuted ? '音を出す' : '消音'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 flex flex-col justify-center">

        {/* Top Header Section (Status) - Sleek Theme Feature */}
        <div className="flex gap-4 mb-6">
          <div className="dq-window p-3 flex-1 flex flex-col justify-center">
            <div className="text-[10px] text-gray-400 mb-0.5 font-sans">LOCATION</div>
            <div className="text-sm md:text-base tracking-widest text-[#ffd700] font-sans font-bold">シェーンの支援者酒場</div>
          </div>
          <div className="dq-window p-3 w-40 md:w-56 flex flex-col justify-center">
            <div className="text-[10px] text-gray-400 mb-0.5 font-sans text-right">GOLD</div>
            <div className="text-sm md:text-base text-right font-mono text-[#ffd700] font-bold">{goldCount.toString().padStart(7, '0')} G</div>
          </div>
        </div>
        
        {/* Game Stage Area (Only visible for entrance, name, affiliation, and question screens) */}
        {(screen === 'entrance' || screen === 'name-input' || screen === 'affiliation-input' || screen === 'question' || screen === 'motto-input') && (
          <div className="w-full bg-black border-4 border-white overflow-hidden relative shadow-lg aspect-video max-h-[300px] flex flex-col justify-between">
            {/* Retro Tavern Background SVG Design */}
            <div className="absolute inset-0 z-0 opacity-80">
              <svg width="100%" height="100%" viewBox="0 0 400 220" preserveAspectRatio="none">
                {/* Brick Backwall */}
                <rect width="400" height="150" fill="#13101c" />
                <path d="M 0,30 L 400,30 M 0,60 L 400,60 M 0,90 L 400,90 M 0,120 L 400,120" stroke="#06040a" strokeWidth="2" />
                <path d="M 40,0 L 40,30 M 120,0 L 120,30 M 200,0 L 200,30 M 280,0 L 280,30 M 360,0 L 360,30
                         M 80,30 L 80,60 M 160,30 L 160,60 M 240,30 L 240,60 M 320,30 L 320,60 
                         M 40,60 L 40,90 M 120,60 L 120,90 M 200,60 L 200,90 M 280,60 L 280,90 M 360,60 L 360,90
                         M 80,90 L 80,120 M 160,90 L 160,120 M 240,90 L 240,120 M 320,90 L 320,120" stroke="#06040a" strokeWidth="2" />
                
                {/* Fireplace (Center-Left) */}
                <rect x="40" y="70" width="60" height="50" fill="#0c0a12" rx="2" />
                <path d="M 40,70 Q 70,50 100,70" fill="none" stroke="#1d172b" strokeWidth="4" />
                {/* Glowing embers */}
                <path d="M 50,110 Q 70,80 90,110" fill="#ea580c" opacity="0.6" />
                <path d="M 58,112 Q 70,92 82,112" fill="#facc15" opacity="0.7" />
                
                {/* Shelves with Casks / Mugs (Right) */}
                <rect x="280" y="40" width="90" height="6" fill="#312e45" />
                <rect x="290" y="22" width="22" height="18" fill="#4c1d95" rx="2" /> {/* Barrel */}
                <circle cx="301" cy="31" r="5" fill="#3b0764" />
                {/* Ale Mug */}
                <rect x="330" y="26" width="12" height="14" fill="#fbbf24" rx="1" />
                <rect x="342" y="30" width="4" height="6" fill="none" stroke="#fbbf24" strokeWidth="2" />
                <rect x="330" y="24" width="12" height="3" fill="#f8fafc" /> {/* Foam */}

                {/* Tavern columns */}
                <rect x="0" y="0" width="24" height="150" fill="#1e1b4b" />
                <rect x="376" y="0" width="24" height="150" fill="#1e1b4b" />

                {/* Wooden floor planks */}
                <rect y="150" width="400" height="70" fill="#1e1b4b" />
                <path d="M 0,165 L 400,165 M 0,185 L 400,185 M 0,205 L 400,205" stroke="#0f172a" strokeWidth="2" />
                <path d="M 60,150 L 80,165 M 180,150 L 160,165 M 300,150 L 320,165
                         M 120,165 L 100,185 M 240,165 L 260,185 M 360,165 L 340,185
                         M 40,185 L 50,205 M 190,185 L 180,205 M 290,185 L 310,205" stroke="#0f172a" strokeWidth="2" />

                {/* Long Wooden Counter Bar (Foreground) */}
                <rect x="0" y="130" width="400" height="32" fill="#090514" />
                <rect x="0" y="130" width="400" height="4" fill="#2e1065" />
                <rect x="0" y="162" width="400" height="2" fill="#03001e" />
              </svg>
            </div>

            {/* Flickering Fire Animation Accent */}
            <div className="absolute left-[65px] top-[80px] z-10 pointer-events-none animate-pulse">
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            </div>

            {/* Candle stand (Right counter) */}
            <div className="absolute right-[60px] top-[108px] z-10 pointer-events-none">
              <div className="w-1 h-5 bg-zinc-700 rounded-t" />
              <div className="w-2.5 h-0.5 bg-zinc-500 -mt-5" />
              <div className="w-0.5 h-2.5 bg-white -mt-2 ml-0.5 rounded-t" />
              <div className="w-1.5 h-1.5 bg-yellow-500 fill-yellow-500 -mt-3.5 ml-0.5 animate-ping opacity-75" />
            </div>

            {/* Characters on stage */}
            <div className="absolute inset-x-0 bottom-[12px] z-20 flex justify-center items-end gap-12 px-10">
              {/* Left Side: Empty space or other guest depending on state */}
              <div className="w-24 h-24 flex items-center justify-center">
                {(screen === 'question' || screen === 'motto-input') && (
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] bg-black px-1.5 py-0.5 rounded text-gray-400 mb-1 border border-zinc-700 font-mono">
                      LV {screen === 'motto-input' ? 6 : currentQuestionIndex + 1}
                    </span>
                    {/* Character corresponding to current question's vibe */}
                    <PixelAvatar
                      type={
                        screen === 'motto-input'
                          ? 'hero'
                          : currentQuestionIndex === 0
                          ? 'cleric'
                          : currentQuestionIndex === 1
                          ? 'sage'
                          : currentQuestionIndex === 2
                          ? 'tactician'
                          : currentQuestionIndex === 3
                          ? 'merchant'
                          : 'dancer'
                      }
                      size={60}
                    />
                  </div>
                )}
              </div>

              {/* Center/Right: Luida herself behind the bar */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] bg-[#ffd700] text-black px-1.5 py-0.5 font-bold mb-1 shadow font-sans">
                  店主 シェーン
                </span>
                <PixelAvatar type="luida" size={68} />
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Inner Screen Renderers */}
        
        {/* ENTRANCE SCREEN */}
        {screen === 'entrance' && (
          <div className="bg-black border-x-4 border-b-4 border-white p-5 flex flex-col items-center">
            
            {/* dialogue box */}
            <div
              onClick={handleSkipTypewriter}
              className="w-full dq-window p-5 min-h-[110px] cursor-pointer relative"
            >
              <p className="text-sm text-stone-100 font-sans leading-relaxed text-justify tracking-wide notranslate" translate="no">
                「{displayedDialogue}
                {!isTypingComplete && (
                  <span className="cursor-blink" />
                )}
                {isTypingComplete && (
                  <span className="cursor-blink" />
                )}
              </p>
              {isTypingComplete && (
                <div className="absolute bottom-3 right-5 animate-bounce text-[#ffd700] text-xs font-sans font-bold">
                  ▼ ボタン を おしておくれ
                </div>
              )}
            </div>

            {/* Interaction Options */}
            {isTypingComplete && (
              <div className="mt-6 flex flex-col md:flex-row gap-4 w-full max-w-md">
                <button
                  onClick={handleStartDiagnosis}
                  className="flex-1 py-4 bg-black hover:bg-[#111125] text-white hover:text-[#ffd700] rounded-none font-bold border-4 border-white btn-pixel cursor-pointer transition-all flex items-center justify-center gap-2 relative group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ffd700]">▶</span>
                  <UserPlus className="w-4 h-4" />
                  新しく仲間を登録する
                </button>
                <button
                  onClick={handleOpenGuestbook}
                  className="flex-1 py-4 bg-black hover:bg-[#111125] text-white hover:text-[#ffd700] rounded-none font-bold border-4 border-white btn-pixel cursor-pointer transition-all flex items-center justify-center gap-2 relative group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ffd700]">▶</span>
                  <BookOpen className="w-4 h-4" />
                  シェーンの登録簿
                </button>
              </div>
            )}
          </div>
        )}

        {/* NAME INPUT SCREEN */}
        {screen === 'name-input' && (
          <div className="bg-black border-x-4 border-b-4 border-white p-5 flex flex-col items-center">
            
            {/* Dialogue */}
            <div
              onClick={handleSkipTypewriter}
              className="w-full dq-window p-5 min-h-[110px] cursor-pointer"
            >
              <p className="text-sm text-stone-100 font-sans leading-relaxed text-justify tracking-wide notranslate" translate="no">
                「{displayedDialogue}
                {!isTypingComplete && <span className="cursor-blink" />}
              </p>
            </div>

            {/* Name Input Box */}
            {isTypingComplete && (
              <form onSubmit={handleNameSubmit} className="mt-6 w-full max-w-sm flex flex-col items-center gap-4">
                <div className="w-full dq-window p-4">
                  <label className="block text-xs text-[#ffd700] mb-2 text-center uppercase tracking-widest font-mono font-bold">
                    -- なまえ を いれておくれ --
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="例：えにし"
                    className="w-full bg-black border-2 border-white text-center text-lg md:text-xl p-2 rounded-none text-white font-sans tracking-widest focus:outline-none focus:border-[#ffd700] transition-colors"
                    autoFocus
                  />
                  <span className="block text-[10px] text-gray-400 text-center mt-2 font-sans">
                    ※ 6文字以内で入力しておくれ。
                  </span>
                </div>

                <div className="flex gap-4 w-full">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 py-3 bg-black hover:bg-[#111125] text-gray-400 hover:text-white border-4 border-white btn-pixel text-xs font-bold cursor-pointer transition-colors"
                  >
                    やめる
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-black hover:bg-[#111125] text-white hover:text-[#ffd700] font-bold border-4 border-white btn-pixel text-xs cursor-pointer shadow-lg transition-colors flex items-center justify-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ffd700]">▶</span>
                    決定する
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* INITIAL CHOICES (AFFILIATION INPUT) SCREEN */}
        {screen === 'affiliation-input' && (
          <div className="bg-black border-x-4 border-b-4 border-white p-5 flex flex-col items-center">
            
            {/* Dialogue */}
            <div
              onClick={handleSkipTypewriter}
              className="w-full dq-window p-5 min-h-[110px] cursor-pointer"
            >
              <p className="text-sm text-stone-100 font-sans leading-relaxed text-justify tracking-wide notranslate" translate="no">
                「{displayedDialogue}
                {!isTypingComplete && <span className="cursor-blink" />}
              </p>
            </div>

            {/* Affiliation and Tool Selection form */}
            {isTypingComplete && (
              <form onSubmit={handleAffiliationSubmit} className="mt-6 w-full space-y-4 text-left">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Select 1: Affiliation */}
                  <div className="dq-window p-4 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs text-[#ffd700] uppercase tracking-widest font-bold mb-2 font-sans flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" /> 所属・支援活動の場
                      </h4>
                      <p className="text-[10px] text-gray-400 mb-3 font-sans">あんたのメインの仕事場はどこだい？</p>
                    </div>
                    <div className="space-y-2">
                      {[
                        { key: 'agency', label: '企業支援機関' },
                        { key: 'chamber', label: '商工会議所・商工会' },
                        { key: 'gov', label: '地方自治体・行政' },
                        { key: 'bank', label: '地域金融機関・銀行・信金' },
                        { key: 'support', label: 'よろず支援拠点・公的機関' },
                        { key: 'consultant', label: '民間コンサル・専門家' }
                      ].map(item => (
                        <label
                          key={item.key}
                          onClick={() => audio.playSelect()}
                          className={`flex items-center gap-2 p-2 border-2 text-[11px] md:text-xs cursor-pointer transition-colors ${
                            affiliation === item.key
                              ? 'bg-[#111125] border-[#ffd700] text-[#ffd700]'
                              : 'bg-black border-zinc-700 text-gray-300 hover:border-zinc-500'
                          }`}
                        >
                          <input
                            type="radio"
                            name="affiliation"
                            value={item.key}
                            checked={affiliation === item.key}
                            onChange={() => setAffiliation(item.key)}
                            className="sr-only"
                          />
                          <span className={affiliation === item.key ? 'text-[#ffd700] font-bold' : ''}>
                            {affiliation === item.key ? '▶ ' : '◇ '}
                            {item.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Select 2: Main Tool (Weapon) */}
                  <div className="dq-window p-4 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs text-[#ffd700] uppercase tracking-widest font-bold mb-2 font-sans flex items-center gap-1">
                        <PenTool className="w-3.5 h-3.5" /> 愛用の武器（ツール）
                      </h4>
                      <p className="text-[10px] text-gray-400 mb-3 font-sans">あんたが最も頼りにしているものは？</p>
                    </div>
                    <div className="space-y-2">
                      {[
                        { key: 'calculator', label: '電卓と融資申請書' },
                        { key: 'subsidy', label: '分厚い公的補助金マニュアル' },
                        { key: 'network', label: '専門家ネットワーク・極秘紹介状' },
                        { key: 'passion', label: '熱い共感と全肯定ハイタッチ' },
                        { key: 'idea', label: 'クリエイティブなアイデア' },
                        { key: 'industry_knowledge', label: '特定の専門業界知識' }
                      ].map(item => (
                        <label
                          key={item.key}
                          onClick={() => audio.playSelect()}
                          className={`flex items-center gap-2 p-2 border-2 text-[11px] md:text-xs cursor-pointer transition-colors ${
                            preferredTool === item.key
                              ? 'bg-[#111125] border-[#ffd700] text-[#ffd700]'
                              : 'bg-black border-zinc-700 text-gray-300 hover:border-zinc-500'
                          }`}
                        >
                          <input
                            type="radio"
                            name="preferredTool"
                            value={item.key}
                            checked={preferredTool === item.key}
                            onChange={() => setPreferredTool(item.key)}
                            className="sr-only"
                          />
                          <span className={preferredTool === item.key ? 'text-[#ffd700] font-bold' : ''}>
                            {preferredTool === item.key ? '▶ ' : '◇ '}
                            {item.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 py-3 bg-black hover:bg-[#111125] text-gray-400 hover:text-white border-4 border-white btn-pixel text-xs font-bold cursor-pointer transition-colors"
                  >
                    やめる
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-black hover:bg-[#111125] text-white hover:text-[#ffd700] font-bold border-4 border-white btn-pixel text-xs cursor-pointer shadow-lg transition-all flex items-center justify-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ffd700]">▶</span>
                    冒険（診断）に出る
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* DIAGNOSTIC QUESTION SCREEN */}
        {screen === 'question' && (
          <div className="bg-black border-x-4 border-b-4 border-white p-5 flex flex-col items-center">
            
            {/* dialogue box */}
            <div
              onClick={handleSkipTypewriter}
              className="w-full dq-window p-5 min-h-[110px] cursor-pointer"
            >
              <p className="text-sm text-stone-100 font-sans leading-relaxed text-justify tracking-wide notranslate" translate="no">
                「{displayedDialogue}
                {!isTypingComplete && <span className="cursor-blink" />}
              </p>
            </div>

            {/* Questions List */}
            {isTypingComplete && (
              <div className="mt-6 w-full space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option)}
                    className="w-full bg-black hover:bg-[#111125] text-left border-4 border-white p-3 md:p-4 text-xs md:text-sm transition-all duration-150 cursor-pointer flex items-center gap-2 text-white hover:text-[#ffd700] font-sans group btn-pixel"
                  >
                    <span className="text-[#ffd700] opacity-0 group-hover:opacity-100 transition-opacity font-mono font-bold shrink-0">
                      ▶
                    </span>
                    <span className="flex-1">{option.text}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Game Footer Indicators */}
            <div className="mt-6 flex justify-between items-center w-full">
              <div className="dq-window p-2 px-4 text-xs text-[#ffd700] font-sans">
                質問 {currentQuestionIndex + 1} / 5
              </div>
              <div className="flex gap-2">
                <div className="dq-window p-2 px-3 text-center text-[10px] text-gray-500 opacity-60 font-sans select-none">
                  つよさをみる
                </div>
                <div className="dq-window p-2 px-3 text-center text-[10px] text-gray-500 opacity-60 font-sans select-none">
                  どうぐ
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MOTTO INPUT SCREEN (6TH QUESTION) */}
        {screen === 'motto-input' && (
          <div className="bg-black border-x-4 border-b-4 border-white p-5 flex flex-col items-center">
            
            {/* dialogue box */}
            <div
              onClick={handleSkipTypewriter}
              className="w-full dq-window p-5 min-h-[110px] cursor-pointer"
            >
              <p className="text-sm text-stone-100 font-sans leading-relaxed text-justify tracking-wide notranslate" translate="no">
                「{displayedDialogue}
                {!isTypingComplete && <span className="cursor-blink" />}
              </p>
            </div>

            {/* Motto Input Form */}
            {isTypingComplete && (
              <form onSubmit={handleMottoSubmit} className="mt-6 w-full max-w-md flex flex-col items-center gap-4 text-left">
                <div className="w-full dq-window p-4">
                  <label className="block text-xs text-[#ffd700] mb-2 font-mono font-bold">
                    【第6の問い：自由記述】
                  </label>
                  <p className="text-[11px] text-gray-400 mb-3 font-sans leading-relaxed">
                    あんたの座右の銘や、支援をするときの譲れない信念をひとこと（15文字程度）で書いておくれ。
                  </p>
                  <input
                    type="text"
                    maxLength={20}
                    value={freeText}
                    onChange={e => setFreeText(e.target.value)}
                    placeholder="例：笑顔第一、最後まであきらめない、三方よし"
                    className="w-full bg-black border-2 border-white text-base p-2 rounded-none text-white font-sans tracking-wide focus:outline-none focus:border-[#ffd700] transition-colors"
                    autoFocus
                  />
                  <span className="block text-[9px] text-gray-500 mt-2 font-sans">
                    ※ 自由に入力しておくれ（最大20字）。未入力の場合は自動で設定されるよ。
                  </span>
                </div>

                <div className="flex gap-4 w-full">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 py-3 bg-black hover:bg-[#111125] text-gray-400 hover:text-white border-4 border-white btn-pixel text-xs font-bold cursor-pointer transition-colors"
                  >
                    やめる
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-black hover:bg-[#111125] text-white hover:text-[#ffd700] font-bold border-4 border-white btn-pixel text-xs cursor-pointer shadow-lg transition-colors flex items-center justify-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ffd700]">▶</span>
                    冒険（診断）を終える
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* RESULTS SCREEN */}
        {screen === 'result' && (
          <div className="space-y-6">
            {/* Speech bubble */}
            <div className="dq-window p-4 md:p-5">
              <p className="text-sm text-stone-200 font-sans leading-relaxed text-justify tracking-wide notranslate" translate="no">
                「{displayedDialogue}
                {isTypingComplete && <span className="cursor-blink" />}
              </p>
            </div>

            {/* Companion Card Display */}
            {isTypingComplete && (
              <RetroCard
                name={name}
                details={styleDetails}
                scores={scores}
                onSave={handleSaveToGuestbook}
                onReset={handleReset}
                isSaved={isSaved}
              />
            )}
          </div>
        )}

        {/* GUESTBOOK SCREEN */}
        {screen === 'guestbook' && (
          <div className="space-y-6">
            {/* Speech bubble */}
            <div className="dq-window p-4 md:p-5">
              <p className="text-sm text-stone-200 font-sans leading-relaxed text-justify tracking-wide notranslate" translate="no">
                「{displayedDialogue}
                {isTypingComplete && <span className="cursor-blink" />}
              </p>
            </div>

            {/* Guestbook List */}
            {isTypingComplete && (
              <TavernGuestbook
                onBack={handleReset}
                onSelectSupporter={handleViewSupporterFromGuestbook}
              />
            )}
          </div>
        )}

      </main>

      {/* Footer credits and controls */}
      <footer className="text-center text-[10px] text-zinc-500 font-mono mt-8 leading-relaxed">
        <p>SHANE'S SUPPORTER TAVERN © 2026 • SLEEK RETRO EDITION</p>
        <p className="mt-1 text-zinc-600">DRAGON QUEST STYLE CHARACTER REGISTRATION INTERFACE</p>
      </footer>
    </div>
  );
}
