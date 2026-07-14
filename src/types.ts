/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QuestionOption {
  text: string;
  dimension: 'L' | 'G' | 'D' | 'P' | 'S' | 'V'; // L: 傾聴, G: 導き, D: 対話, P: 提案, S: 営業, V: バイブス
  point: number;
  nextQuestionId?: number;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

export interface SupporterStyleDetails {
  title: string;
  className: string; // Vocation name (e.g. 僧侶)
  description: string;
  slogan: string;
  avatarType: 'cleric' | 'sage' | 'merchant' | 'dancer' | 'hero' | 'tactician' | 'pilgrim' | 'high_priest' | 'lighthouse_keeper' | 'pioneer' | 'commander' | 'matchmaker' | 'architect' | 'festival_guide' | 'cheerleader' | 'prophet' | 'fortune_jester';
  stats: {
    hp: number;
    mp: number;
    empathy: number;    // 共感力
    insight: number;    // 洞察力
    connection: number; // 接続力
    cheer: number;      // 鼓舞力
    patience: number;   // 忍耐力
  };
  commands: {
    name: string;
    description: string;
  }[];
  compatibility: {
    perfectMatch: string;
    perfectMatchDesc: string;
    challengingMatch: string;
    challengingMatchDesc: string;
  };
  titleLore?: string;
  strengths?: string[];
  quirks?: string[];
  decisionSpeedTrait?: { name: string; desc: string; avgTime: number };
  gratitudeMessage?: string;
}

export interface RegisteredSupporter {
  id: string;
  name: string;
  primaryStyle: 'L' | 'G' | 'D' | 'P' | 'S' | 'V';
  secondaryStyle: 'L' | 'G' | 'D' | 'P' | 'S' | 'V' | null;
  title: string;
  className: string;
  registeredAt: string; // ISO string
  scores: {
    L: number;
    G: number;
    D: number;
    P: number;
    S: number;
    V: number;
  };
  affiliation?: string;
  preferredTool?: string;
  freeText?: string;
  responseTimes?: number[];
  decisionSpeedTrait?: { name: string; desc: string; avgTime: number };
  gratitudeMessage?: string;
}
