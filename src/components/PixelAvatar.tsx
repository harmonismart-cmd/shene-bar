/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface PixelAvatarProps {
  type:
    | 'luida'
    | 'cleric'
    | 'sage'
    | 'merchant'
    | 'dancer'
    | 'hero'
    | 'tactician'
    | 'pilgrim'
    | 'high_priest'
    | 'lighthouse_keeper'
    | 'pioneer'
    | 'commander'
    | 'matchmaker'
    | 'architect'
    | 'festival_guide'
    | 'cheerleader'
    | 'prophet'
    | 'fortune_jester';
  size?: number;
  animated?: boolean;
}

export default function PixelAvatar({ type, size = 120, animated = true }: PixelAvatarProps) {
  // MOTHER 3 / EarthBound signature pixel color palette
  const colors = {
    outline: '#151324',       // Deep retro near-black outline
    skin: '#fddcbc',          // Warm sunny peach skin
    skinPale: '#fff1e2',      // Pale pastel peach
    skinShadow: '#f0b080',    // Shading for skin
    eye: '#151324',           // Expressive dot eye
    shadow: '#4b5563',        // Neutral shading
    
    // Character-specific GBA color palettes
    lucasBlonde: '#fdbd2c',
    lucasBlondeLight: '#fff7a1',
    stripeRed: '#e12c2c',
    stripeYellow: '#fdd32c',
    stripeBlue: '#2c6ae1',
    stripeTeal: '#0cb8a3',
    kumatoraPink: '#f43f93',
    dusterBrown: '#853a07',
    dusterGreen: '#1fa147',
    magypsyCyan: '#10ccd6',
    magypsyPink: '#f96fa5',
    flintHat: '#a66b26',
    flintCoat: '#4b5463',
    pigmaskPink: '#f680c2',
    pigmaskRed: '#e12c2c',
    saturnFlesh: '#fedcbc',
    saturnNose: '#fca5a5',
  };

  const renderAvatarContent = () => {
    switch (type) {
      case 'luida': // Styled as Hinawa (Lucas's beautiful, kind-eyed mother)
        return (
          <g>
            {/* Outline backing */}
            <rect x="9" y="3" width="14" height="11" fill={colors.outline} />
            <rect x="7" y="6" width="18" height="8" fill={colors.outline} />
            <rect x="9" y="14" width="14" height="14" fill={colors.outline} />
            <rect x="11" y="27" width="10" height="3" fill={colors.outline} />

            {/* Luxurious Brown Hair with Highlights */}
            <rect x="10" y="4" width="12" height="9" fill="#582000" />
            <rect x="8" y="7" width="16" height="6" fill="#582000" />
            <rect x="11" y="4" width="6" height="1" fill="#8d3d00" /> {/* Highlight */}
            <rect x="8" y="9" width="1" height="3" fill="#8d3d00" />
            <rect x="23" y="9" width="1" height="3" fill="#8d3d00" />

            {/* Face */}
            <rect x="11" y="6" width="10" height="7" fill={colors.skin} />
            <rect x="11" y="5" width="10" height="1" fill="#8d3d00" /> {/* Hair bangs */}
            <rect x="11" y="12" width="10" height="1" fill={colors.skinShadow} /> {/* Neck shadow */}
            
            {/* Gentle Eyes & Rosy Cheek Blush */}
            <rect x="13" y="8" width="2" height="2" fill={colors.eye} />
            <rect x="17" y="8" width="2" height="2" fill={colors.eye} />
            <rect x="11" y="9" width="1" height="1" fill="#f43f5e" /> {/* Pink blush */}
            <rect x="20" y="9" width="1" height="1" fill="#f43f5e" />

            {/* Smiling Mouth */}
            <rect x="15" y="11" width="2" height="1" fill="#dc2626" />

            {/* Elegant White Dress & Red Neck Ribbon */}
            <rect x="10" y="15" width="12" height="12" fill="#ffffff" />
            <rect x="10" y="26" width="12" height="1" fill="#e2e8f0" /> {/* Dress Hem shadow */}
            <rect x="10" y="15" width="12" height="2" fill="#ef4444" /> {/* Bright red neck ribbon */}
            <rect x="15" y="17" width="2" height="2" fill="#ef4444" /> {/* Ribbon tie */}

            {/* Beautiful yellow sunflower in hand */}
            <rect x="6" y="16" width="2" height="9" fill="#22c55e" /> {/* Stem */}
            <rect x="5" y="18" width="1" height="2" fill="#22c55e" /> {/* Leaf */}
            <rect x="5" y="13" width="4" height="4" fill="#fbbf24" /> {/* Flower petals */}
            <rect x="6" y="14" width="2" height="2" fill="#78350f" /> {/* Seed center */}

            {/* Red Shoes */}
            <rect x="12" y="27" width="3" height="2" fill="#ef4444" />
            <rect x="17" y="27" width="3" height="2" fill="#ef4444" />
          </g>
        );

      case 'cleric': // Styled as Lucas (Yellow/Red stripe shirt, blond hair)
        return (
          <g>
            {/* Outline backing */}
            <rect x="8" y="3" width="16" height="11" fill={colors.outline} />
            <rect x="9" y="14" width="14" height="14" fill={colors.outline} />
            <rect x="10" y="27" width="12" height="3" fill={colors.outline} />

            {/* Blonde Cowlick Hair */}
            <rect x="9" y="4" width="14" height="9" fill={colors.lucasBlonde} />
            <rect x="12" y="3" width="9" height="2" fill={colors.lucasBlondeLight} /> {/* Highlight */}
            <rect x="17" y="4" width="6" height="3" fill={colors.lucasBlondeLight} />
            <rect x="19" y="2" width="3" height="1" fill={colors.lucasBlondeLight} /> {/* Swept Cowlick top */}

            {/* Face */}
            <rect x="10" y="6" width="12" height="7" fill={colors.skin} />
            <rect x="11" y="5" width="10" height="1" fill={colors.lucasBlonde} /> {/* Bangs */}
            <rect x="11" y="12" width="10" height="1" fill={colors.skinShadow} /> {/* Shadow */}
            
            {/* Expressive Slit Eyes */}
            <rect x="12" y="8" width="2" height="2" fill={colors.eye} />
            <rect x="18" y="8" width="2" height="2" fill={colors.eye} />
            <rect x="15" y="11" width="2" height="1" fill="#e11d48" /> {/* Cute Smile */}

            {/* Red & Yellow Horizontal Striped T-Shirt (Lucas signature) */}
            <rect x="10" y="15" width="12" height="9" fill={colors.stripeRed} />
            <rect x="10" y="17" width="12" height="2" fill={colors.stripeYellow} />
            <rect x="10" y="21" width="12" height="2" fill={colors.stripeYellow} />

            {/* Blue shorts */}
            <rect x="11" y="24" width="10" height="3" fill={colors.stripeBlue} />

            {/* White Socks & Red Sneakers */}
            <rect x="11" y="27" width="3" height="1" fill="#ffffff" />
            <rect x="18" y="27" width="3" height="1" fill="#ffffff" />
            <rect x="11" y="28" width="3" height="2" fill="#ef4444" />
            <rect x="18" y="28" width="3" height="2" fill="#ef4444" />
          </g>
        );

      case 'sage': // Styled as Kumatora (Pink spiky hair, blue hoodie dress)
        return (
          <g>
            {/* Outline backing */}
            <rect x="7" y="3" width="18" height="11" fill={colors.outline} />
            <rect x="9" y="14" width="14" height="14" fill={colors.outline} />
            <rect x="11" y="27" width="10" height="3" fill={colors.outline} />

            {/* Cool Messy Pink Spikes */}
            <rect x="8" y="4" width="16" height="9" fill={colors.kumatoraPink} />
            <rect x="7" y="6" width="18" height="5" fill={colors.kumatoraPink} />
            <rect x="10" y="3" width="12" height="2" fill="#ff7ebb" /> {/* Highlights */}
            <rect x="7" y="5" width="1" height="2" fill="#ff7ebb" />

            {/* Face */}
            <rect x="10" y="6" width="12" height="7" fill={colors.skin} />
            <rect x="11" y="12" width="10" height="1" fill={colors.skinShadow} />
            
            {/* Sharp Eyes */}
            <rect x="12" y="8" width="2" height="2" fill={colors.eye} />
            <rect x="18" y="8" width="2" height="2" fill={colors.eye} />
            <rect x="14" y="11" width="4" height="1" fill="#b91c1c" /> {/* Rebel smirk */}

            {/* Blue Hoodie (Kumatora dress) */}
            <rect x="10" y="15" width="12" height="9" fill={colors.stripeBlue} />
            <rect x="15" y="15" width="2" height="9" fill={colors.stripeYellow} /> {/* Center zipper cord */}
            <rect x="12" y="17" width="8" height="2" fill="#60a5fa" /> {/* Folded hood details */}

            {/* Dark leggings */}
            <rect x="11" y="24" width="10" height="3" fill="#2e1065" />

            {/* Sturdy Yellow Boots */}
            <rect x="12" y="27" width="3" height="2" fill={colors.stripeYellow} />
            <rect x="17" y="27" width="3" height="2" fill={colors.stripeYellow} />
          </g>
        );

      case 'merchant': // Styled as Duster (Messy brown hair, green coat, sneaky look)
        return (
          <g>
            {/* Outline backing */}
            <rect x="8" y="3" width="16" height="11" fill={colors.outline} />
            <rect x="8" y="14" width="16" height="14" fill={colors.outline} />
            <rect x="10" y="27" width="12" height="3" fill={colors.outline} />

            {/* Messy unkempt brown hair */}
            <rect x="9" y="4" width="14" height="8" fill={colors.dusterBrown} />
            <rect x="8" y="6" width="16" height="4" fill={colors.dusterBrown} />
            <rect x="11" y="4" width="5" height="1" fill="#a16207" /> {/* Highlights */}

            {/* Rugged Face */}
            <rect x="10" y="6" width="12" height="8" fill={colors.skin} />
            <rect x="11" y="5" width="10" height="1" fill={colors.dusterBrown} />
            <rect x="11" y="13" width="10" height="1" fill={colors.skinShadow} />
            
            {/* Unstable sleepy squinting eyes */}
            <rect x="11" y="8" width="2" height="1" fill={colors.eye} />
            <rect x="12" y="9" width="1" height="1" fill={colors.eye} />
            <rect x="18" y="8" width="2" height="2" fill={colors.eye} />
            <rect x="12" y="11" width="6" height="2" fill="#94a3b8" /> {/* 5 o'clock shadow beard stubble */}

            {/* Duster's signature green trench coat */}
            <rect x="9" y="15" width="14" height="12" fill={colors.dusterGreen} />
            <rect x="12" y="15" width="8" height="12" fill="#ea580c" /> {/* Sweater vest */}
            <rect x="12" y="17" width="8" height="2" fill="#fbbf24" /> {/* Stripes */}
            <rect x="12" y="21" width="8" height="2" fill="#fbbf24" />

            {/* Thief tools pouch on belt */}
            <rect x="9" y="21" width="2" height="3" fill="#451a03" />

            {/* Dark Trousers & rugged brown shoes */}
            <rect x="11" y="24" width="10" height="3" fill="#1e293b" />
            <rect x="11" y="27" width="3" height="2" fill="#451a03" />
            <rect x="18" y="27" width="3" height="2" fill="#451a03" />
          </g>
        );

      case 'dancer': // Styled as Violet (Kumatora in disguise - gorgeous hair & dress)
        return (
          <g>
            {/* Outline backing */}
            <rect x="7" y="3" width="18" height="11" fill={colors.outline} />
            <rect x="9" y="14" width="14" height="14" fill={colors.outline} />
            <rect x="11" y="27" width="10" height="3" fill={colors.outline} />

            {/* Glamorous styled violet hair */}
            <rect x="8" y="4" width="16" height="9" fill="#8b5cf6" />
            <rect x="7" y="7" width="18" height="5" fill="#8b5cf6" />
            <rect x="11" y="3" width="8" height="1" fill="#c084fc" /> {/* Silk bow */}
            <rect x="10" y="2" width="2" height="2" fill="#ec4899" />
            <rect x="18" y="2" width="2" height="2" fill="#ec4899" />

            {/* Makeup Face */}
            <rect x="10" y="6" width="12" height="7" fill={colors.skinPale} />
            <rect x="12" y="8" width="2" height="2" fill={colors.eye} />
            <rect x="18" y="8" width="2" height="2" fill={colors.eye} />
            <rect x="11" y="9" width="1" height="1" fill="#ec4899" /> {/* Bright pink cheeks */}
            <rect x="20" y="9" width="1" height="1" fill="#ec4899" />
            <rect x="15" y="11" width="2" height="1" fill="#dc2626" /> {/* Red lipstick lips */}

            {/* Club Titiboo Showgirl Dress */}
            <rect x="10" y="15" width="12" height="12" fill="#db2777" />
            <rect x="9" y="18" width="14" height="3" fill="#f472b6" /> {/* Frills */}
            <rect x="10" y="22" width="12" height="2" fill="#ffffff" /> {/* White lace fringe */}

            {/* Sparkles around dancer */}
            <rect x="4" y="9" width="2" height="2" fill="#fbbf24" />
            <rect x="26" y="15" width="2" height="2" fill="#fbbf24" />

            {/* Legs & high heels */}
            <rect x="12" y="27" width="2" height="2" fill="#db2777" />
            <rect x="18" y="27" width="2" height="2" fill="#db2777" />
          </g>
        );

      case 'hero': // Styled as Ness (Classic cap, striped shirt, backpack, baseball bat)
        return (
          <g>
            {/* Outline backing */}
            <rect x="7" y="2" width="18" height="12" fill={colors.outline} />
            <rect x="9" y="14" width="14" height="14" fill={colors.outline} />
            <rect x="10" y="27" width="12" height="3" fill={colors.outline} />

            {/* Red & Blue Baseball Cap */}
            <rect x="9" y="3" width="14" height="6" fill="#1d4ed8" /> {/* Blue dome */}
            <rect x="7" y="4" width="4" height="2" fill="#dc2626" /> {/* Red peak brim */}
            <rect x="15" y="2" width="2" height="1" fill="#dc2626" /> {/* Top button */}

            {/* Dark Hair peaking out */}
            <rect x="9" y="8" width="14" height="2" fill="#1e293b" />

            {/* Face */}
            <rect x="10" y="7" width="12" height="6" fill={colors.skin} />
            <rect x="12" y="9" width="2" height="2" fill={colors.eye} />
            <rect x="18" y="9" width="2" height="2" fill={colors.eye} />
            <rect x="15" y="11" width="2" height="1" fill="#ef4444" />

            {/* Yellow & Blue striped shirt */}
            <rect x="10" y="15" width="12" height="9" fill={colors.stripeYellow} />
            <rect x="10" y="16" width="12" height="2" fill={colors.stripeBlue} />
            <rect x="10" y="20" width="12" height="2" fill={colors.stripeBlue} />

            {/* Brown Backpack straps */}
            <rect x="10" y="15" width="2" height="9" fill="#78350f" />
            <rect x="20" y="15" width="2" height="9" fill="#78350f" />

            {/* Blue sports shorts */}
            <rect x="11" y="24" width="10" height="3" fill="#1d4ed8" />

            {/* Baseball Bat on back */}
            <rect x="23" y="7" width="2" height="13" fill="#e2e8f0" /> {/* Silver bat body */}
            <rect x="22" y="17" width="4" height="2" fill="#d97706" /> {/* Wooden handle grip */}

            {/* Red Sneakers */}
            <rect x="11" y="27" width="3" height="2" fill="#dc2626" />
            <rect x="18" y="27" width="3" height="2" fill="#dc2626" />
          </g>
        );

      case 'tactician': // Styled as Wess (Funny old sage, bald head with white side tufts)
        return (
          <g>
            {/* Outline backing */}
            <rect x="8" y="3" width="16" height="11" fill={colors.outline} />
            <rect x="9" y="14" width="14" height="14" fill={colors.outline} />
            <rect x="11" y="27" width="10" height="3" fill={colors.outline} />

            {/* Bald head with fluffy white side tufts */}
            <rect x="10" y="4" width="12" height="4" fill={colors.skin} /> {/* Bald pinkish top */}
            <rect x="14" y="3" width="4" height="1" fill={colors.skinShadow} />
            <rect x="8" y="5" width="3" height="7" fill="#cbd5e1" /> {/* White hair left */}
            <rect x="21" y="5" width="3" height="7" fill="#cbd5e1" /> {/* White hair right */}

            {/* Old Face */}
            <rect x="10" y="7" width="12" height="7" fill={colors.skin} />
            <rect x="12" y="9" width="2" height="2" fill={colors.eye} />
            <rect x="18" y="9" width="2" height="2" fill={colors.eye} />
            <rect x="13" y="11" width="6" height="2" fill="#475569" /> {/* Thick bushy gray mustache */}

            {/* Blue Old Sage Robe/Tunic */}
            <rect x="10" y="15" width="12" height="9" fill="#2563eb" />
            <rect x="10" y="21" width="12" height="3" fill="#1e3a8a" />
            <rect x="12" y="18" width="8" height="2" fill="#eab308" /> {/* Gold belt sash */}

            {/* Old sandals */}
            <rect x="12" y="27" width="3" height="2" fill="#78350f" />
            <rect x="17" y="27" width="3" height="2" fill="#78350f" />
          </g>
        );

      case 'pilgrim': // Styled as Salsa (Super cute helper monkey with red vest & banana)
        return (
          <g>
            {/* Outline backing */}
            <rect x="7" y="4" width="18" height="11" fill={colors.outline} />
            <rect x="9" y="14" width="14" height="14" fill={colors.outline} />
            <rect x="11" y="27" width="10" height="3" fill={colors.outline} />

            {/* Brown Monkey Head */}
            <rect x="9" y="5" width="14" height="9" fill="#854d0e" />
            <rect x="7" y="7" width="3" height="4" fill="#854d0e" /> {/* Left ear */}
            <rect x="22" y="7" width="3" height="4" fill="#854d0e" /> {/* Right ear */}

            {/* Monkey Face mask */}
            <rect x="10" y="7" width="12" height="6" fill="#fed7aa" />
            <rect x="12" y="8" width="2" height="2" fill={colors.eye} />
            <rect x="18" y="8" width="2" height="2" fill={colors.eye} />
            <rect x="13" y="11" width="6" height="1" fill="#854d0e" /> {/* Happy wide mouth */}

            {/* Cozy Red Vest */}
            <rect x="10" y="15" width="12" height="9" fill="#ef4444" />
            <rect x="12" y="16" width="8" height="8" fill="#b91c1c" /> {/* Vest folds */}
            <rect x="14" y="17" width="1" height="1" fill="#ffffff" /> {/* Buttons */}
            <rect x="14" y="20" width="1" height="1" fill="#ffffff" />

            {/* Holding a delicious bright yellow Banana */}
            <rect x="5" y="16" width="4" height="5" fill="#facc15" rx="1" />
            <rect x="6" y="15" width="1" height="1" fill="#78350f" /> {/* Banana tip */}

            {/* Curly monkey tail on side */}
            <rect x="23" y="13" width="2" height="11" fill="#854d0e" />
            <rect x="21" y="12" width="3" height="2" fill="#854d0e" />

            {/* Tiny brown paws */}
            <rect x="12" y="27" width="2" height="2" fill="#854d0e" />
            <rect x="18" y="27" width="2" height="2" fill="#854d0e" />
          </g>
        );

      case 'high_priest': // Styled as Aeolia (Gorgeous high-tier Magypsy with cyan hair)
        return (
          <g>
            {/* Outline backing */}
            <rect x="6" y="1" width="20" height="13" fill={colors.outline} />
            <rect x="8" y="14" width="16" height="14" fill={colors.outline} />
            <rect x="10" y="27" width="12" height="3" fill={colors.outline} />

            {/* Voluminous Cyan Hair */}
            <rect x="8" y="2" width="16" height="11" fill={colors.magypsyCyan} />
            <rect x="7" y="4" width="18" height="7" fill={colors.magypsyCyan} />
            <rect x="11" y="1" width="10" height="2" fill="#22d3ee" /> {/* Highlight */}

            {/* Pale Face with high makeup */}
            <rect x="10" y="7" width="12" height="7" fill={colors.skinPale} />
            
            {/* Purple Eyeshadow, glowing eyes, red lips */}
            <rect x="11" y="8" width="3" height="2" fill="#c084fc" /> {/* Left shadow */}
            <rect x="17" y="8" width="3" height="2" fill="#c084fc" /> {/* Right shadow */}
            <rect x="12" y="9" width="1" height="1" fill={colors.eye} />
            <rect x="18" y="9" width="1" height="1" fill={colors.eye} />
            <rect x="11" y="11" width="1" height="1" fill="#ec4899" /> {/* Cheek blush */}
            <rect x="20" y="11" width="1" height="1" fill="#ec4899" />
            <rect x="14" y="12" width="4" height="1" fill="#dc2626" /> {/* Big lipstick smile */}

            {/* Luxurious Pink Robe with Gold Sash */}
            <rect x="9" y="15" width="14" height="12" fill={colors.magypsyPink} />
            <rect x="11" y="15" width="10" height="12" fill="#facc15" /> {/* Gold center robe piece */}
            <rect x="12" y="17" width="8" height="10" fill={colors.magypsyPink} />

            {/* Jewels */}
            <rect x="15" y="19" width="2" height="2" fill="#06b6d4" /> {/* Emerald pendant */}

            {/* Pink Slippers */}
            <rect x="12" y="27" width="3" height="2" fill="#ec4899" />
            <rect x="17" y="27" width="3" height="2" fill="#ec4899" />
          </g>
        );

      case 'lighthouse_keeper': // Styled as Flint (Lucas's cool father - cowboy hat & trench coat)
        return (
          <g>
            {/* Outline backing */}
            <rect x="6" y="2" width="20" height="12" fill={colors.outline} />
            <rect x="9" y="14" width="14" height="14" fill={colors.outline} />
            <rect x="11" y="27" width="10" height="3" fill={colors.outline} />

            {/* Brown Cowboy Stetson Hat */}
            <rect x="7" y="4" width="18" height="2" fill={colors.flintHat} /> {/* Brim */}
            <rect x="10" y="2" width="12" height="3" fill={colors.flintHat} /> {/* Crown */}
            <rect x="10" y="4" width="12" height="1" fill="#2d1b09" /> {/* Black hatband */}

            {/* Dark Hair under hat */}
            <rect x="9" y="6" width="14" height="3" fill="#1e293b" />

            {/* Face */}
            <rect x="10" y="7" width="12" height="6" fill={colors.skin} />
            
            {/* Serious hero eyes */}
            <rect x="12" y="9" width="2" height="2" fill={colors.eye} />
            <rect x="18" y="9" width="2" height="2" fill={colors.eye} />
            <rect x="14" y="11" width="4" height="1" fill="#78350f" />

            {/* Charcoal gray coat over deep blue vest */}
            <rect x="10" y="15" width="12" height="9" fill={colors.flintCoat} />
            <rect x="13" y="15" width="6" height="9" fill="#1e293b" /> {/* Vest */}
            <rect x="11" y="24" width="10" height="3" fill="#1d4ed8" /> {/* Denim jeans */}

            {/* Signature lumber wood weapon in hand */}
            <rect x="5" y="11" width="2" height="15" fill="#d97706" />
            <rect x="4" y="15" width="4" height="2" fill="#78350f" /> {/* Handle guard */}

            {/* Rugged Leather Boots */}
            <rect x="12" y="27" width="3" height="2" fill="#451a03" />
            <rect x="17" y="27" width="3" height="2" fill="#451a03" />
          </g>
        );

      case 'pioneer': // Styled as Claus (Lucas's spirited twin - orange hair, striped shirt)
        return (
          <g>
            {/* Outline backing */}
            <rect x="8" y="3" width="16" height="11" fill={colors.outline} />
            <rect x="9" y="14" width="14" height="14" fill={colors.outline} />
            <rect x="10" y="27" width="12" height="3" fill={colors.outline} />

            {/* Confident Orange Swept Hair (Claus) */}
            <rect x="9" y="4" width="14" height="9" fill="#ea580c" />
            <rect x="12" y="3" width="9" height="2" fill="#f97316" /> {/* Highlight */}
            <rect x="18" y="4" width="5" height="3" fill="#f97316" />

            {/* Face */}
            <rect x="10" y="6" width="12" height="7" fill={colors.skin} />
            <rect x="11" y="5" width="10" height="1" fill="#ea580c" />
            
            {/* Lively eyes & determined smirk */}
            <rect x="12" y="8" width="2" height="2" fill={colors.eye} />
            <rect x="18" y="8" width="2" height="2" fill={colors.eye} />
            <rect x="14" y="11" width="4" height="1" fill="#be123c" />

            {/* Blue & Yellow Horizontal Striped Shirt (Claus variant) */}
            <rect x="10" y="15" width="12" height="9" fill={colors.stripeBlue} />
            <rect x="10" y="17" width="12" height="2" fill={colors.stripeYellow} />
            <rect x="10" y="21" width="12" height="2" fill={colors.stripeYellow} />

            {/* Navy blue shorts */}
            <rect x="11" y="24" width="10" height="3" fill="#172554" />

            {/* Tough Brown Boots */}
            <rect x="11" y="27" width="3" height="3" fill="#7c2d12" />
            <rect x="18" y="27" width="3" height="3" fill="#7c2d12" />
          </g>
        );

      case 'commander': // Styled as a Pigmask Soldier (ブタマスク - Pink helmet, snout, visor)
        return (
          <g>
            {/* Outline backing */}
            <rect x="8" y="2" width="16" height="12" fill={colors.outline} />
            <rect x="9" y="14" width="14" height="14" fill={colors.outline} />
            <rect x="10" y="27" width="12" height="3" fill={colors.outline} />

            {/* Pigmask Pink Helmet */}
            <rect x="9" y="3" width="14" height="11" fill={colors.pigmaskPink} />
            <rect x="8" y="4" width="16" height="7" fill={colors.pigmaskPink} />
            
            {/* Cute Pig Ears on helmet */}
            <rect x="9" y="2" width="2" height="2" fill={colors.pigmaskPink} />
            <rect x="21" y="2" width="2" height="2" fill={colors.pigmaskPink} />
            <rect x="10" y="3" width="1" height="1" fill="#ec4899" /> {/* Inner ear shade */}
            <rect x="21" y="3" width="1" height="1" fill="#ec4899" />

            {/* Dark Visor band */}
            <rect x="9" y="6" width="14" height="3" fill="#1e1b4b" />
            <rect x="11" y="7" width="2" height="1" fill="#fbbf24" /> {/* Yellow glowing eyes */}
            <rect x="19" y="7" width="2" height="1" fill="#fbbf24" />

            {/* Detailed Pink Snout */}
            <rect x="14" y="9" width="4" height="3" fill="#ff99db" rx="1" />
            <rect x="15" y="10" width="1" height="1" fill="#db2777" /> {/* Nostrils */}
            <rect x="17" y="10" width="1" height="1" fill="#db2777" />

            {/* Red Uniform with Yellow buckled Belt */}
            <rect x="10" y="15" width="12" height="9" fill={colors.pigmaskRed} />
            <rect x="10" y="19" width="12" height="2" fill="#fbbf24" /> {/* Belt */}
            <rect x="15" y="19" width="2" height="2" fill="#111111" /> {/* Buckle */}

            {/* Grey pants & space-age boots */}
            <rect x="11" y="24" width="10" height="3" fill="#64748b" />
            <rect x="11" y="27" width="3" height="2" fill="#1e293b" />
            <rect x="18" y="27" width="3" height="2" fill="#1e293b" />
          </g>
        );

      case 'matchmaker': // Styled as Nana (Aesthetic girl with braided pigtails & red bows)
        return (
          <g>
            {/* Outline backing */}
            <rect x="7" y="3" width="18" height="11" fill={colors.outline} />
            <rect x="6" y="8" width="20" height="13" fill={colors.outline} />
            <rect x="9" y="14" width="14" height="14" fill={colors.outline} />
            <rect x="11" y="27" width="10" height="3" fill={colors.outline} />

            {/* Braided pink hair with large red ribbons */}
            <rect x="8" y="4" width="16" height="8" fill="#f472b6" />
            <rect x="7" y="8" width="3" height="12" fill="#f472b6" /> {/* Braids */}
            <rect x="22" y="8" width="3" height="12" fill="#f472b6" />
            <rect x="6" y="6" width="4" height="3" fill="#dc2626" /> {/* Red bow ribbons */}
            <rect x="22" y="6" width="4" height="3" fill="#dc2626" />

            {/* Face */}
            <rect x="10" y="6" width="12" height="7" fill={colors.skinPale} />
            <rect x="12" y="8" width="2" height="2" fill={colors.eye} />
            <rect x="18" y="8" width="2" height="2" fill={colors.eye} />
            <rect x="15" y="11" width="2" height="1" fill="#ec4899" />

            {/* Blue dress with apron */}
            <rect x="10" y="15" width="12" height="12" fill="#3b82f6" />
            <rect x="11" y="16" width="10" height="6" fill="#ffffff" /> {/* Apron */}

            {/* Holding Red Thread of Fate */}
            <rect x="12" y="21" width="8" height="1" fill="#ef4444" />
            <rect x="15" y="20" width="2" height="3" fill="#ef4444" />

            {/* Red slip-on shoes */}
            <rect x="12" y="27" width="3" height="2" fill="#dc2626" />
            <rect x="17" y="27" width="3" height="2" fill="#dc2626" />
          </g>
        );

      case 'architect': // Styled as Thomas (Smart clerk waistcoat & blue tie)
        return (
          <g>
            {/* Outline backing */}
            <rect x="8" y="3" width="16" height="11" fill={colors.outline} />
            <rect x="9" y="14" width="14" height="14" fill={colors.outline} />
            <rect x="11" y="27" width="10" height="3" fill={colors.outline} />

            {/* Flat clerk brown hair */}
            <rect x="9" y="4" width="14" height="8" fill="#78350f" />
            <rect x="8" y="6" width="16" height="3" fill="#78350f" />

            {/* Intelligent Face */}
            <rect x="10" y="6" width="12" height="7" fill={colors.skin} />
            <rect x="12" y="8" width="2" height="2" fill={colors.eye} />
            <rect x="18" y="8" width="2" height="2" fill={colors.eye} />
            <rect x="14" y="10" width="4" height="1" fill="#78350f" /> {/* Spectacles line */}

            {/* Waistcoat over Yellow shirt & Tie */}
            <rect x="10" y="15" width="12" height="9" fill="#2d1b09" /> {/* Vest */}
            <rect x="13" y="15" width="6" height="9" fill="#fef08a" /> {/* Shirt */}
            <rect x="15" y="16" width="2" height="6" fill="#2563eb" /> {/* Sharp blue tie */}

            {/* Pants & Shoes */}
            <rect x="11" y="24" width="10" height="3" fill="#334155" />
            <rect x="12" y="27" width="3" height="2" fill="#1e293b" />
            <rect x="17" y="27" width="3" height="2" fill="#1e293b" />
          </g>
        );

      case 'festival_guide': // Styled as DCMC Band Member (Funky sunglasses, afro hair, tambourine)
        return (
          <g>
            {/* Outline backing */}
            <rect x="7" y="3" width="18" height="11" fill={colors.outline} />
            <rect x="9" y="14" width="14" height="14" fill={colors.outline} />
            <rect x="11" y="27" width="10" height="3" fill={colors.outline} />

            {/* Funky Afro black hair */}
            <rect x="8" y="4" width="16" height="8" fill="#111827" />
            <rect x="7" y="6" width="18" height="4" fill="#111827" />

            {/* Face */}
            <rect x="10" y="6" width="12" height="7" fill={colors.skin} />
            
            {/* Star retro shades */}
            <rect x="11" y="8" width="10" height="2" fill="#111111" />
            <rect x="12" y="8" width="3" height="2" fill="#ef4444" /> {/* Glowing red lenses */}
            <rect x="17" y="8" width="3" height="2" fill="#ef4444" />
            <rect x="15" y="11" width="2" height="1" fill="#78350f" />

            {/* Cool black suit with white collar and magenta tie */}
            <rect x="10" y="15" width="12" height="9" fill="#111827" />
            <rect x="13" y="15" width="6" height="9" fill="#ffffff" />
            <rect x="15" y="16" width="2" height="5" fill="#db2777" /> {/* Magenta tie */}

            {/* Holding Gold Tambourine */}
            <circle cx="5" cy="19" r="4" fill="#fbbf24" />
            <circle cx="5" cy="19" r="2.2" fill="#111111" />
            <rect x="4" y="16" width="1" height="1" fill="#ffffff" /> {/* Bells */}
            <rect x="6" y="21" width="1" height="1" fill="#ffffff" />

            {/* Pants & smart black shoes */}
            <rect x="11" y="24" width="10" height="3" fill="#111827" />
            <rect x="12" y="27" width="3" height="2" fill="#1e293b" />
            <rect x="17" y="27" width="3" height="2" fill="#1e293b" />
          </g>
        );

      case 'cheerleader': // Styled as Lydia (Sweet pink hair buns, yellow cheer, pom-poms)
        return (
          <g>
            {/* Outline backing */}
            <rect x="7" y="1" width="18" height="13" fill={colors.outline} />
            <rect x="9" y="14" width="14" height="14" fill={colors.outline} />
            <rect x="11" y="27" width="10" height="3" fill={colors.outline} />

            {/* Lavender hair and sweet double buns */}
            <rect x="9" y="3" width="14" height="9" fill="#a78bfa" />
            <rect x="7" y="2" width="4" height="4" fill="#a78bfa" /> {/* Buns */}
            <rect x="21" y="2" width="4" height="4" fill="#a78bfa" />
            <rect x="8" y="1" width="2" height="1" fill="#ec4899" /> {/* Pink bun ribbons */}
            <rect x="22" y="1" width="2" height="1" fill="#ec4899" />

            {/* Face */}
            <rect x="10" y="6" width="12" height="7" fill={colors.skinPale} />
            <rect x="12" y="8" width="2" height="2" fill={colors.eye} />
            <rect x="18" y="8" width="2" height="2" fill={colors.eye} />
            <rect x="11" y="10" width="1" height="1" fill="#f43f5e" /> {/* Pink blush */}
            <rect x="20" y="10" width="1" height="1" fill="#f43f5e" />
            <rect x="14" y="11" width="4" height="1" fill="#db2777" />

            {/* Yellow cheer dress with white stripes */}
            <rect x="10" y="15" width="12" height="9" fill="#facc15" />
            <rect x="10" y="15" width="12" height="2" fill="#ffffff" />
            <rect x="9" y="19" width="14" height="3" fill="#ffffff" /> {/* Skirt detail */}

            {/* Pink fluffy Pom-poms in hands */}
            <rect x="4" y="14" width="4" height="4" fill="#f43f5e" rx="1" />
            <rect x="24" y="14" width="4" height="4" fill="#f43f5e" rx="1" />

            {/* Purple shoes */}
            <rect x="12" y="27" width="3" height="2" fill="#8b5cf6" />
            <rect x="17" y="27" width="3" height="2" fill="#8b5cf6" />
          </g>
        );

      case 'prophet': // Styled as Locria (Cloaked Oracle - deep indigo hood, glowing crystal orb)
        return (
          <g>
            {/* Outline backing */}
            <rect x="7" y="3" width="18" height="11" fill={colors.outline} />
            <rect x="8" y="14" width="16" height="14" fill={colors.outline} />
            <rect x="10" y="27" width="12" height="3" fill={colors.outline} />

            {/* Deep Indigo Hood */}
            <rect x="8" y="4" width="16" height="10" fill="#2e1065" />
            <rect x="9" y="5" width="14" height="8" fill="#090514" /> {/* Dark shadow face void */}

            {/* Glowing Oracle Eyes (Fuchsia/Magenta) */}
            <rect x="12" y="8" width="2" height="2" fill="#f43f5e" />
            <rect x="18" y="8" width="2" height="2" fill="#f43f5e" />

            {/* Glowing crystal ball held in hand */}
            <circle cx="24" cy="18" r="4.2" fill="#a855f7" />
            <circle cx="23" cy="17" r="1.5" fill="#f3e8ff" /> {/* Inner glow sparkle */}
            <rect x="27" y="14" width="1" height="1" fill="#ffffff" /> {/* Sparkle particle */}
            <rect x="21" y="22" width="1" height="1" fill="#ffffff" />

            {/* Full wizard robes */}
            <rect x="9" y="15" width="14" height="12" fill="#2e1065" />
            <rect x="11" y="16" width="10" height="11" fill="#4c1d95" />

            {/* Dark Shoes */}
            <rect x="12" y="27" width="3" height="2" fill="#1e1b4b" />
            <rect x="17" y="27" width="3" height="2" fill="#1e1b4b" />
          </g>
        );

      case 'fortune_jester': // Styled as MR. SATURN (どせいさん - Legendary round peach body, giant nose & bow ribbon)
        return (
          <g>
            {/* Outlines of Mr. Saturn's signature round shape */}
            <rect x="8" y="12" width="16" height="13" fill={colors.outline} />
            <rect x="11" y="10" width="10" height="3" fill={colors.outline} />
            
            {/* Mr. Saturn Body (Flesh-colored peach) */}
            <rect x="9" y="13" width="14" height="11" fill={colors.saturnFlesh} />
            <rect x="12" y="11" width="8" height="3" fill={colors.saturnFlesh} />

            {/* Huge round red nose (Signature feature) */}
            <rect x="13" y="17" width="6" height="5" fill={colors.outline} />
            <rect x="14" y="18" width="4" height="3" fill="#f87171" />
            <rect x="15" y="18" width="2" height="1" fill="#ffedd5" /> {/* Nose highlight */}

            {/* Tiny black dots for eyes */}
            <rect x="11" y="14" width="2" height="2" fill={colors.eye} />
            <rect x="19" y="14" width="2" height="2" fill={colors.eye} />

            {/* Whiskers */}
            <rect x="6" y="16" width="3" height="1" fill={colors.outline} />
            <rect x="23" y="16" width="3" height="1" fill={colors.outline} />
            <rect x="7" y="19" width="3" height="1" fill={colors.outline} />
            <rect x="22" y="19" width="3" height="1" fill={colors.outline} />

            {/* Single curly strand of hair tied with a beautiful red ribbon */}
            <rect x="15" y="5" width="2" height="6" fill={colors.outline} />
            <rect x="14" y="4" width="2" height="1" fill={colors.outline} />
            <rect x="13" y="5" width="1" height="2" fill={colors.outline} />
            {/* Red bow ribbon */}
            <rect x="13" y="8" width="6" height="2" fill="#ef4444" />
            <rect x="15" y="7" width="2" height="4" fill="#ef4444" />

            {/* Small cute feet */}
            <rect x="11" y="24" width="3" height="2" fill={colors.outline} />
            <rect x="18" y="24" width="3" height="2" fill={colors.outline} />
            <rect x="11" y="25" width="3" height="1" fill="#78350f" />
            <rect x="18" y="25" width="3" height="1" fill="#78350f" />
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none`}
      style={{ width: size, height: size }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="100%"
        height="100%"
        style={{
          imageRendering: 'pixelated',
          shapeRendering: 'crispEdges',
        }}
      >
        <defs>
          <style>
            {`
              @keyframes retro-bounce-anim {
                0%, 100% {
                  transform: translateY(0px) scale(1, 1);
                }
                50% {
                  transform: translateY(-2.2px) scale(1.02, 0.98);
                }
                95% {
                  transform: translateY(0px) scale(0.97, 1.03);
                }
              }
              @keyframes retro-shadow-anim {
                0%, 100% {
                  transform: scale(1);
                  opacity: 1;
                }
                50% {
                  transform: scale(0.83);
                  opacity: 0.55;
                }
              }
              .retro-char-group {
                transform-origin: 16px 28.5px;
                ${animated ? 'animation: retro-bounce-anim 1.25s infinite ease-in-out;' : ''}
              }
              .retro-shadow-ellipse {
                transform-origin: 16px 28.5px;
                ${animated ? 'animation: retro-shadow-anim 1.25s infinite ease-in-out;' : ''}
              }
            `}
          </style>
        </defs>

        {/* MOTHER 3 Classic Translucent Base Drop Shadow (drawn behind/below the feet) */}
        <ellipse
          className="retro-shadow-ellipse"
          cx="16"
          cy="28.5"
          rx="7"
          ry="1.5"
          fill="rgba(0, 0, 0, 0.35)"
        />

        {/* Character Group with beautiful breathing/bouncing physics */}
        <g className="retro-char-group">
          {renderAvatarContent()}
        </g>
      </svg>
    </div>
  );
}
