/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RegisteredSupporter } from '../types';
import PixelAvatar from './PixelAvatar';
import { getSupporterStyleDetails } from '../utils/styleCalculator';
import { Trash2, UserPlus, Eye, BookOpen } from 'lucide-react';
import { audio } from '../utils/audio';

interface TavernGuestbookProps {
  onBack: () => void;
  onSelectSupporter: (supporter: RegisteredSupporter) => void;
}

export default function TavernGuestbook({ onBack, onSelectSupporter }: TavernGuestbookProps) {
  const [supporters, setSupporters] = useState<RegisteredSupporter[]>(() => {
    try {
      const stored = localStorage.getItem('luida_registered_supporters');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const handleDelete = (id: string, name: string) => {
    audio.playCancel();
    const confirm = window.confirm(`本当に ${name} を旅立たせますか？（登録簿から削除します）`);
    if (confirm) {
      const updated = supporters.filter(s => s.id !== id);
      setSupporters(updated);
      try {
        localStorage.setItem('luida_registered_supporters', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to update local storage:', e);
      }
    }
  };

  const handleSelect = (supporter: RegisteredSupporter) => {
    audio.playSelect();
    onSelectSupporter(supporter);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in font-mono text-white">
      {/* JRPG double bordered style frame */}
      <div className="w-full dq-window p-5 md:p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center border-b-4 border-double border-zinc-700 pb-4 mb-4 gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#ffd700]" />
            <h2 className="text-lg md:text-xl font-bold text-[#ffd700] font-sans tracking-widest">
              シェーンの登録簿 (Guestbook)
            </h2>
          </div>
          <p className="text-[11px] md:text-xs text-gray-400 font-sans">
            現在登録されている仲間：<span className="text-[#ffd700] font-bold font-mono">{supporters.length}</span> / 50人
          </p>
        </div>

        {supporters.length === 0 ? (
          <div className="py-16 text-center bg-black border-4 border-dashed border-zinc-800">
            <p className="text-gray-400 font-sans text-xs md:text-sm mb-6 leading-relaxed px-4">
              「おや、登録簿には まだ誰も 登録されていないようだね。
              <br className="hidden md:inline" />
              あんた自身の 支援スタイルを診断して、最初の仲間に 登録しておくれ！」
            </p>
            <button
              onClick={() => {
                audio.playSelect();
                onBack();
              }}
              className="px-6 py-3 bg-black hover:bg-[#111125] text-[#ffd700] hover:text-white border-4 border-white text-xs font-bold btn-pixel cursor-pointer transition-all flex items-center justify-center gap-1 mx-auto group"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">▶</span>
              新しく仲間を登録する
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-zinc-800 text-[10px] md:text-xs text-[#ffd700]">
                  <th className="py-2 px-3 font-sans font-bold">姿</th>
                  <th className="py-2 px-3 font-sans font-bold">名前</th>
                  <th className="py-2 px-3 font-sans font-bold">職業 / 称号</th>
                  <th className="py-2 px-3 font-sans font-bold">登録日</th>
                  <th className="py-2 px-3 text-right font-sans font-bold">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-[11px] md:text-xs">
                {supporters.map(s => {
                  const details = getSupporterStyleDetails(s.primaryStyle, s.secondaryStyle);
                  const date = new Date(s.registeredAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  });

                  return (
                    <tr
                      key={s.id}
                      className="hover:bg-[#111125] hover:text-[#ffd700] transition-colors group cursor-pointer"
                      onClick={() => handleSelect(s)}
                    >
                      <td className="py-3 px-3">
                        <div className="w-10 h-10 border-2 border-white bg-black flex items-center justify-center p-1 overflow-hidden">
                          <PixelAvatar type={details.avatarType} size={30} animated={false} />
                        </div>
                      </td>
                      <td className="py-3 px-3 font-sans font-bold text-white group-hover:text-[#ffd700] text-xs md:text-sm">
                        {s.name}
                      </td>
                      <td className="py-3 px-3 font-sans text-gray-300 group-hover:text-white">
                        <span className="text-[#ffd700] font-mono text-[9px] md:text-[10px] font-bold border border-[#ffd700] bg-black px-1 py-0.5 mr-2">
                          {s.className}
                        </span>
                        <span className="text-[10px] md:text-xs">{s.title}</span>
                      </td>
                      <td className="py-3 px-3 text-gray-500 font-mono group-hover:text-gray-400">
                        {date}
                      </td>
                      <td className="py-3 px-3 text-right" onClick={e => e.stopPropagation()}>
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => handleSelect(s)}
                            className="p-1.5 bg-black hover:bg-[#111125] text-white hover:text-[#ffd700] border-2 border-white cursor-pointer transition-colors"
                            title="ステータスを見る"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(s.id, s.name)}
                            className="p-1.5 bg-black hover:bg-[#111125] text-red-500 hover:text-red-400 border-2 border-white cursor-pointer transition-colors"
                            title="登録解除"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 pt-4 border-t-2 border-zinc-900 flex justify-end">
          <button
            onClick={() => {
              audio.playCancel();
              onBack();
            }}
            className="px-6 py-2.5 bg-black hover:bg-[#111125] text-zinc-400 hover:text-white border-4 border-white text-xs font-bold btn-pixel cursor-pointer transition-colors flex items-center gap-1 group"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">▶</span>
            酒場に戻る
          </button>
        </div>
      </div>
    </div>
  );
}
