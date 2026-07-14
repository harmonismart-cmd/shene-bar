/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SupporterStyleDetails } from '../types';
import PixelAvatar from './PixelAvatar';
import { Heart, Sparkles, Share2, Award, Zap, Compass, RefreshCw } from 'lucide-react';

interface RetroCardProps {
  name: string;
  details: SupporterStyleDetails;
  scores: { L: number; G: number; D: number; P: number; S: number; V: number };
  onSave: () => void;
  onReset: () => void;
  isSaved: boolean;
}

export default function RetroCard({ name, details, scores, onSave, onReset, isSaved }: RetroCardProps) {
  // Simple share/copy text generator
  const handleShare = () => {
    const shareText = `【シェーンの支援者酒場】で仲間として登録されました！\n\n■ 登録名：${name}\n■ 称号：${details.title}\n■ 職業：${details.className}\n■ 支援スタイル：${details.slogan}\n\n「${details.description}」\n\nあなたもシェーンの酒場で支援者タイプを診断しよう！\n${window.location.href}`;
    navigator.clipboard.writeText(shareText);
    alert('仲間の噂（診断結果）をクリップボードにコピーしたよ！ SNSで広めておくれ！');
  };

  const getStat = (score: number) => Math.min(99, Math.max(18, Math.round(((score || 0) / 15) * 75 + 24)));

  return (
    <div id="retro-card-container" className="flex flex-col items-center w-full max-w-2xl mx-auto p-1 animate-fade-in">
      {/* Golden JRPG Mother 3 Frame */}
      <div className="w-full mother3-window-gold p-5 md:p-6 shadow-2xl relative overflow-hidden font-mono text-white">
        {/* Subtle scanline overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0.1)_100%)]" />

        {/* Card Header */}
        <div className="border-b-4 border-double border-zinc-700 pb-4 mb-4 text-center md:text-left">
          <div className="inline-block px-2.5 py-0.5 bg-[#ffd700] text-black text-[10px] font-bold animate-pulse uppercase tracking-widest rounded">
            ★ 登録冒険者カード ★
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-[#ffd700] mt-2 font-sans drop-shadow-[0_2px_0_rgba(0,0,0,1)]">
            {name}
          </h2>
          <div className="mt-2 space-y-1 text-xs md:text-sm text-gray-300 font-sans">
            <p>
              <span>初期職業:</span>
              <span className="text-emerald-400 font-bold ml-1.5">{details.className}</span>
            </p>
          </div>
        </div>

        {/* Big Prominent Title Banner (Mother 3 Style) */}
        <div className="mb-6 p-4 bg-zinc-950/80 border-2 border-[#ffd700] rounded-xl text-center shadow-lg relative overflow-hidden">
          {/* Corner screw/rivet pixel decorations */}
          <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-[#ffd700]/70 rounded-full" />
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#ffd700]/70 rounded-full" />
          <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-[#ffd700]/70 rounded-full" />
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#ffd700]/70 rounded-full" />
          
          <p className="text-[10px] text-yellow-500 tracking-widest font-mono uppercase mb-1 flex items-center justify-center gap-1">
            <Award className="w-3 h-3 text-yellow-500 animate-spin" /> 授かりし伝説の称号 <Award className="w-3 h-3 text-yellow-500 animate-spin" />
          </p>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-widest font-sans drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] px-2">
            {details.title}
          </h1>
          {details.titleLore && (
            <p className="mt-2.5 text-[11px] md:text-xs text-amber-100/90 leading-relaxed font-sans border-t border-dashed border-zinc-800 pt-2 px-1 text-center italic">
              “ {details.titleLore} ”
            </p>
          )}
        </div>

        {/* Core Profile Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Left Panel: Avatar & Basic Specs */}
          <div className="col-span-1 md:col-span-5 flex flex-col items-center text-center">
            {/* Retro Framed Avatar */}
            <div className="mother3-window p-4 flex items-center justify-center w-36 h-36 bg-zinc-950/40">
              <PixelAvatar type={details.avatarType} size={100} />
            </div>
            
            {/* Quick Slogan */}
            <div className="mt-4 p-2.5 bg-black border-2 border-[#4a3e72] rounded-lg text-xs text-[#ffd700] font-sans italic w-full">
              “ {details.slogan} ”
            </div>

            {/* Base Stats: HP & MP */}
            <div className="w-full mt-4 bg-zinc-950 border-4 border-double border-zinc-700 p-2 text-xs flex justify-around font-mono rounded-lg">
              <div>
                <span className="text-red-500 font-bold mr-1">H P:</span>
                <span className="text-white">{details.stats.hp}</span>
                <span className="text-gray-500">/99</span>
              </div>
              <div className="border-l border-zinc-700 h-4" />
              <div>
                <span className="text-blue-500 font-bold mr-1">M P:</span>
                <span className="text-white">{details.stats.mp}</span>
                <span className="text-gray-500">/99</span>
              </div>
            </div>

            {/* Decision Speed Trait (意思決定の速さ) */}
            {details.decisionSpeedTrait && (
              <div className="w-full mt-4 mother3-window p-3 bg-zinc-950/40 text-left border-l-4 border-cyan-500">
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] text-cyan-400 font-sans font-bold uppercase tracking-widest flex items-center gap-1">
                    <Compass className="w-3 h-3 text-cyan-400 animate-spin" /> 思考の巡り
                  </span>
                  <span className="text-[9px] font-mono bg-zinc-900 border border-zinc-700 px-1.5 py-0.5 text-zinc-400 rounded">
                    平均 {details.decisionSpeedTrait.avgTime}秒 / 問
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white font-sans leading-tight">
                  {details.decisionSpeedTrait.name}
                </h4>
                <p className="text-[9px] text-zinc-300 leading-normal font-sans mt-1">
                  {details.decisionSpeedTrait.desc}
                </p>
              </div>
            )}
          </div>

          {/* Right Panel: Support Attributes */}
          <div className="col-span-1 md:col-span-7 space-y-4">
            <h3 className="text-xs text-[#ffd700] uppercase tracking-widest font-bold border-l-4 border-[#ffd700] pl-2 font-sans flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> 支援能力ステータス (Support Stats)
            </h3>
            
            <div className="space-y-2 font-mono text-[11px] md:text-xs bg-zinc-950/40 p-3 rounded-xl border border-zinc-800">
              {/* L: Listening */}
              <div>
                <div className="flex justify-between mb-0.5">
                  <span className="text-gray-300">傾聴力 (Listening)</span>
                  <span className="text-[#ffd700] font-bold">{getStat(scores.L)} / 99</span>
                </div>
                <div className="w-full bg-zinc-900 border border-white h-2 overflow-hidden rounded">
                  <div className="bg-[#ffd700] h-full animate-pulse" style={{ width: `${(getStat(scores.L)/99)*100}%` }} />
                </div>
              </div>

              {/* G: Guiding */}
              <div>
                <div className="flex justify-between mb-0.5">
                  <span className="text-gray-300">導き力 (Guiding)</span>
                  <span className="text-[#ffd700] font-bold">{getStat(scores.G)} / 99</span>
                </div>
                <div className="w-full bg-zinc-900 border border-white h-2 overflow-hidden rounded">
                  <div className="bg-[#ffd700] h-full" style={{ width: `${(getStat(scores.G)/99)*100}%` }} />
                </div>
              </div>

              {/* D: Dialogic */}
              <div>
                <div className="flex justify-between mb-0.5">
                  <span className="text-gray-300">対話力 (Dialogue)</span>
                  <span className="text-[#ffd700] font-bold">{getStat(scores.D)} / 99</span>
                </div>
                <div className="w-full bg-zinc-900 border border-white h-2 overflow-hidden rounded">
                  <div className="bg-[#ffd700] h-full" style={{ width: `${(getStat(scores.D)/99)*100}%` }} />
                </div>
              </div>

              {/* P: Proposal */}
              <div>
                <div className="flex justify-between mb-0.5">
                  <span className="text-gray-300">提案力 (Proposal)</span>
                  <span className="text-[#ffd700] font-bold">{getStat(scores.P)} / 99</span>
                </div>
                <div className="w-full bg-zinc-900 border border-white h-2 overflow-hidden rounded">
                  <div className="bg-[#ffd700] h-full" style={{ width: `${(getStat(scores.P)/99)*100}%` }} />
                </div>
              </div>

              {/* S: Sales */}
              <div>
                <div className="flex justify-between mb-0.5">
                  <span className="text-gray-300">営業力 (Sales)</span>
                  <span className="text-[#ffd700] font-bold">{getStat(scores.S)} / 99</span>
                </div>
                <div className="w-full bg-zinc-900 border border-white h-2 overflow-hidden rounded">
                  <div className="bg-[#ffd700] h-full" style={{ width: `${(getStat(scores.S)/99)*100}%` }} />
                </div>
              </div>

              {/* V: Vibes */}
              <div>
                <div className="flex justify-between mb-0.5">
                  <span className="text-gray-300">熱意・バイブス (Vibes)</span>
                  <span className="text-[#ffd700] font-bold">{getStat(scores.V)} / 99</span>
                </div>
                <div className="w-full bg-zinc-900 border border-white h-2 overflow-hidden rounded">
                  <div className="bg-[#ffd700] h-full" style={{ width: `${(getStat(scores.V)/99)*100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shane's Recommendation Letter Box */}
        <div className="mt-6 mother3-window p-4 bg-zinc-950/50 border-l-4 border-[#ffd700]">
          <h3 className="text-xs md:text-sm font-bold text-[#ffd700] mb-2 font-sans flex items-center gap-1">
            <span className="text-[#ffd700]">▶</span> シェーンの紹介状
          </h3>
          <p className="text-xs md:text-sm text-gray-200 leading-relaxed font-sans text-justify">
            {details.description}
          </p>
        </div>

        {/* Word of Gratitude (支援された店主からの感謝の言葉) */}
        {details.gratitudeMessage && (
          <div className="mt-6 mother3-window p-4 bg-zinc-900/60 border-l-4 border-rose-500 relative overflow-hidden">
            {/* Tiny Heart Sparkle background decoration */}
            <div className="absolute -top-2 right-1 text-rose-500/10 text-5xl select-none pointer-events-none font-serif">♥</div>
            <h3 className="text-xs md:text-sm font-bold text-rose-400 mb-2 font-sans flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-400 animate-pulse fill-rose-400" /> 救われた店主からの感謝の言葉
            </h3>
            <p className="text-xs md:text-sm text-rose-100/95 leading-relaxed font-sans italic text-justify pl-1 relative z-10">
              {details.gratitudeMessage}
            </p>
          </div>
        )}

        {/* Strengths & Quirks Section (Charming Bento-Style) */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Strengths (長所) */}
          {details.strengths && (
            <div className="mother3-window p-4 bg-zinc-950/40 border-l-4 border-emerald-500">
              <h4 className="text-xs md:text-sm font-bold text-emerald-400 uppercase tracking-widest mb-3 font-sans flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> 覚醒せし長所 (Strengths)
              </h4>
              <ul className="space-y-2 text-[11px] md:text-xs">
                {details.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-zinc-100">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span className="font-sans leading-relaxed">{str}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quirks (支援のクセ) */}
          {details.quirks && (
            <div className="mother3-window p-4 bg-zinc-950/40 border-l-4 border-amber-500">
              <h4 className="text-xs md:text-sm font-bold text-amber-400 uppercase tracking-widest mb-3 font-sans flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-amber-500 animate-pulse" /> 愛すべきクセ (Quirks)
              </h4>
              <ul className="space-y-2 text-[11px] md:text-xs">
                {details.quirks.map((qurk, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-zinc-100">
                    <span className="text-amber-500 font-bold">★</span>
                    <span className="font-sans leading-relaxed">{qurk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Combat Support Commands Section & Party Compatibility */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mother3-window p-3 bg-zinc-950/30">
            <h4 className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 font-sans flex items-center gap-1">
              <Zap className="w-3 h-3" /> 支援戦闘コマンド
            </h4>
            <ul className="space-y-2 text-[10px] md:text-xs">
              {details.commands.map((cmd, idx) => (
                <li key={idx} className="text-gray-300">
                  <strong className="text-white font-mono">▶ {cmd.name}</strong>
                  <div className="text-gray-400 pl-3 font-sans mt-0.5">{cmd.description}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Party Compatibility */}
          <div className="mother3-window p-3 flex flex-col justify-between bg-zinc-950/30">
            <div>
              <h4 className="text-[10px] md:text-xs font-bold text-red-400 uppercase tracking-widest mb-2 font-sans flex items-center gap-1">
                <Compass className="w-3 h-3" /> パーティー相性
              </h4>
              <div className="space-y-2.5 text-[10px] md:text-xs">
                <div>
                  <span className="text-emerald-400 font-bold font-sans">◎ 相性抜群：</span>
                  <span className="text-white font-semibold font-sans">{details.compatibility.perfectMatch}</span>
                  <p className="text-gray-400 pl-1 font-sans text-[9px] md:text-[10px] mt-0.5 leading-normal">{details.compatibility.perfectMatchDesc}</p>
                </div>
                <div className="pt-1 border-t border-zinc-800">
                  <span className="text-yellow-500 font-bold font-sans">▲ 取り扱い注意：</span>
                  <span className="text-white font-semibold font-sans">{details.compatibility.challengingMatch}</span>
                  <p className="text-gray-400 pl-1 font-sans text-[9px] md:text-[10px] mt-0.5 leading-normal">{details.compatibility.challengingMatchDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footnotes */}
        <div className="mt-6 pt-3 border-t border-zinc-800 text-center text-[9px] text-gray-500 font-mono">
          SHANE'S TAVERN REGISTRATION BOARD • SERIAL NO: {Math.random().toString(36).substring(2, 8).toUpperCase()}-{scores.L}{scores.G}{scores.D}{scores.P}{scores.S}{scores.V}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4 w-full">
        {isSaved ? (
          <div className="px-4 py-3 bg-black border-4 border-emerald-500 text-emerald-400 text-xs md:text-sm font-bold flex items-center justify-center gap-2">
            ✓ 登録簿に記録されました
          </div>
        ) : (
          <button
            onClick={onSave}
            className="px-6 py-3 bg-black hover:bg-[#111125] text-[#ffd700] hover:text-white border-4 border-white btn-pixel text-xs font-bold tracking-wider cursor-pointer shadow-lg transition-all flex items-center justify-center gap-2 group"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ffd700]">▶</span>
            <Sparkles className="w-3.5 h-3.5" /> 登録簿に書き込む
          </button>
        )}

        <button
          onClick={handleShare}
          className="px-6 py-3 bg-black hover:bg-[#111125] text-[#ffd700] hover:text-white border-4 border-white btn-pixel text-xs font-bold tracking-wider cursor-pointer shadow-lg transition-all flex items-center justify-center gap-2 group"
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ffd700]">▶</span>
          <Share2 className="w-3.5 h-3.5" /> 仲間の噂を広める
        </button>

        <button
          onClick={onReset}
          className="px-6 py-3 bg-black hover:bg-[#111125] text-zinc-400 hover:text-white border-4 border-white btn-pixel text-xs font-bold tracking-wider cursor-pointer transition-all flex items-center justify-center gap-2 group"
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400">▶</span>
          <RefreshCw className="w-3.5 h-3.5" /> 酒場に戻る
        </button>
      </div>
    </div>
  );
}
