"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

/* ─── Characters ──────────────────────────────────────────────────────────── */

function Dragon() {
  return (
    <svg width="100" height="72" viewBox="0 0 100 72" fill="none">
      {/* left wing */}
      <path d="M34 37 Q6 6 24 3 Q30 22 36 35Z" fill="#A78BFA" opacity="0.82" />
      {/* right wing */}
      <path d="M58 37 Q86 6 70 3 Q64 22 62 35Z" fill="#A78BFA" opacity="0.82" />
      {/* body */}
      <ellipse cx="46" cy="49" rx="26" ry="15" fill="#7C3AED" opacity="0.85" />
      {/* neck+head */}
      <circle cx="73" cy="40" r="14" fill="#7C3AED" opacity="0.85" />
      {/* horn */}
      <polygon points="77,26 81,14 85,26" fill="#FFBE0B" opacity="0.9" />
      {/* eye */}
      <circle cx="77" cy="37" r="4" fill="white" opacity="0.95" />
      <circle cx="78" cy="37" r="2" fill="#1E1044" />
      <circle cx="77.5" cy="36" r="0.8" fill="white" opacity="0.9" />
      {/* nostril */}
      <circle cx="85" cy="43" r="2" fill="#6D28D9" opacity="0.55" />
      {/* fire */}
      <path d="M88 45 Q100 40 100 49 Q94 52 86 48Z" fill="#FF6B35" opacity="0.85" />
      <path d="M90 49 Q99 47 98 53 Q94 54 89 51Z" fill="#FFBE0B" opacity="0.7" />
      {/* tail */}
      <path d="M20 54 Q5 66 2 58" stroke="#7C3AED" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.75" />
      <polygon points="2,58 0,52 9,57" fill="#A78BFA" opacity="0.7" />
      {/* spine spikes */}
      <polygon points="38,37 41,27 44,37" fill="#C4B5FD" opacity="0.65" />
      <polygon points="44,36 47,26 50,36" fill="#C4B5FD" opacity="0.65" />
      <polygon points="50,36 53,27 56,36" fill="#C4B5FD" opacity="0.6" />
    </svg>
  );
}

function Cat() {
  return (
    <svg width="56" height="66" viewBox="0 0 56 66" fill="none">
      {/* body */}
      <ellipse cx="28" cy="50" rx="18" ry="14" fill="#F97316" opacity="0.8" />
      {/* head */}
      <circle cx="28" cy="26" r="16" fill="#F97316" opacity="0.8" />
      {/* left ear */}
      <polygon points="12,17 16,4 23,15" fill="#F97316" opacity="0.85" />
      <polygon points="13,16 17,7 22,15" fill="#FCA5A5" opacity="0.65" />
      {/* right ear */}
      <polygon points="33,15 40,4 44,17" fill="#F97316" opacity="0.85" />
      <polygon points="34,15 40,7 43,16" fill="#FCA5A5" opacity="0.65" />
      {/* eyes */}
      <ellipse cx="21" cy="24" rx="4" ry="5" fill="#1E1044" opacity="0.85" />
      <ellipse cx="35" cy="24" rx="4" ry="5" fill="#1E1044" opacity="0.85" />
      <circle cx="22" cy="23" r="1.5" fill="white" opacity="0.9" />
      <circle cx="36" cy="23" r="1.5" fill="white" opacity="0.9" />
      {/* nose */}
      <polygon points="26,30 30,30 28,33" fill="#BE185D" opacity="0.7" />
      {/* mouth */}
      <path d="M25 33 Q28 36 31 33" stroke="#BE185D" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.55" />
      {/* whiskers */}
      <line x1="6" y1="29" x2="23" y2="30" stroke="#92400E" strokeWidth="1" opacity="0.35" strokeLinecap="round" />
      <line x1="6" y1="33" x2="23" y2="32" stroke="#92400E" strokeWidth="1" opacity="0.35" strokeLinecap="round" />
      <line x1="50" y1="29" x2="33" y2="30" stroke="#92400E" strokeWidth="1" opacity="0.35" strokeLinecap="round" />
      <line x1="50" y1="33" x2="33" y2="32" stroke="#92400E" strokeWidth="1" opacity="0.35" strokeLinecap="round" />
      {/* tail */}
      <path d="M44 57 Q60 44 57 34" stroke="#F97316" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.7" />
    </svg>
  );
}

function Fairy() {
  return (
    <svg width="52" height="70" viewBox="0 0 52 70" fill="none">
      {/* left wing */}
      <path d="M18 30 Q1 17 4 34 Q10 36 18 31Z" fill="#67E8F9" opacity="0.72" />
      <path d="M18 38 Q2 32 5 46 Q11 46 18 41Z" fill="#A5F3FC" opacity="0.6" />
      {/* right wing */}
      <path d="M34 30 Q51 17 48 34 Q42 36 34 31Z" fill="#67E8F9" opacity="0.72" />
      <path d="M34 38 Q50 32 47 46 Q41 46 34 41Z" fill="#A5F3FC" opacity="0.6" />
      {/* dress */}
      <path d="M17 32 Q26 27 35 32 Q40 48 26 56 Q12 48 17 32Z" fill="#FBBF24" opacity="0.85" />
      {/* dress detail */}
      <path d="M20 40 Q26 38 32 40" stroke="#F59E0B" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* head */}
      <circle cx="26" cy="16" r="13" fill="#FBBF24" opacity="0.85" />
      {/* hair left */}
      <path d="M13 14 Q9 7 14 4 Q18 9 14 16Z" fill="#F59E0B" opacity="0.8" />
      {/* hair right */}
      <path d="M39 14 Q43 7 38 4 Q34 9 38 16Z" fill="#F59E0B" opacity="0.8" />
      {/* eyes */}
      <circle cx="21" cy="15" r="3" fill="#1E1044" opacity="0.8" />
      <circle cx="31" cy="15" r="3" fill="#1E1044" opacity="0.8" />
      <circle cx="22" cy="14" r="1.2" fill="white" opacity="0.9" />
      <circle cx="32" cy="14" r="1.2" fill="white" opacity="0.9" />
      {/* smile */}
      <path d="M22 19 Q26 22 30 19" stroke="#92400E" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.55" />
      {/* wand */}
      <line x1="35" y1="36" x2="48" y2="22" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      {/* wand star */}
      <path d="M48 16 L49.5 21 L54.5 21 L50.5 24 L52 29 L48 26 L44 29 L45.5 24 L41.5 21 L46.5 21Z"
        fill="#FFBE0B" opacity="0.9" transform="translate(-5,0) scale(0.75)" />
      {/* sparkle trail */}
      <circle cx="44" cy="20" r="2" fill="white" opacity="0.85" />
      <circle cx="41" cy="17" r="1.3" fill="#FFBE0B" opacity="0.7" />
      <circle cx="47" cy="16" r="1" fill="#FFBE0B" opacity="0.6" />
      <circle cx="50" cy="22" r="0.8" fill="white" opacity="0.6" />
    </svg>
  );
}

function Mermaid() {
  return (
    <svg width="58" height="82" viewBox="0 0 58 82" fill="none">
      {/* tail fin left */}
      <path d="M16 70 Q8 80 17 82 Q26 78 28 70Z" fill="#0891B2" opacity="0.8" />
      {/* tail fin right */}
      <path d="M30 70 Q36 80 40 82 Q46 77 40 70Z" fill="#0891B2" opacity="0.75" />
      {/* tail */}
      <path d="M18 46 Q12 58 17 70 Q28 75 40 70 Q45 58 40 46Z" fill="#06B6D4" opacity="0.82" />
      {/* scale lines */}
      <path d="M22 54 Q29 51 36 54" stroke="#0891B2" strokeWidth="1.2" fill="none" opacity="0.45" strokeLinecap="round" />
      <path d="M20 61 Q29 57 38 61" stroke="#0891B2" strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round" />
      {/* torso */}
      <path d="M18 26 Q29 22 40 26 L38 47 Q29 50 20 47Z" fill="#67E8F9" opacity="0.82" />
      {/* shell bra hint */}
      <path d="M19 30 Q29 27 39 30" stroke="#0891B2" strokeWidth="2.5" fill="none" opacity="0.4" strokeLinecap="round" />
      {/* head */}
      <circle cx="29" cy="16" r="13" fill="#FDE68A" opacity="0.88" />
      {/* hair - left flowing */}
      <path d="M16 14 Q10 24 13 34 Q18 32 19 26" fill="#06B6D4" opacity="0.72" />
      {/* hair - right flowing */}
      <path d="M42 14 Q48 24 45 34 Q40 32 39 26" fill="#06B6D4" opacity="0.72" />
      {/* hair - top */}
      <path d="M16 11 Q22 2 29 4 Q36 2 42 11 Q36 7 29 8 Q22 7 16 11Z" fill="#06B6D4" opacity="0.78" />
      {/* eyes */}
      <circle cx="24" cy="15" r="3.2" fill="#164E63" opacity="0.85" />
      <circle cx="34" cy="15" r="3.2" fill="#164E63" opacity="0.85" />
      <circle cx="25" cy="14" r="1.3" fill="white" opacity="0.9" />
      <circle cx="35" cy="14" r="1.3" fill="white" opacity="0.9" />
      {/* smile */}
      <path d="M25 20 Q29 23 33 20" stroke="#92400E" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* arm with seashell */}
      <path d="M40 30 Q50 28 50 34 Q46 38 40 36" stroke="#67E8F9" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
      <circle cx="50" cy="32" r="4" fill="#F9A8D4" opacity="0.75" />
      <path d="M50 29 Q53 32 50 35" stroke="#EC4899" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
    </svg>
  );
}

function Knight() {
  return (
    <svg width="54" height="78" viewBox="0 0 54 78" fill="none">
      {/* plume */}
      <path d="M27 18 Q23 9 18 7 Q23 12 27 16" fill="#FF6B35" opacity="0.78" />
      <path d="M27 18 Q31 8 36 6 Q31 11 27 16" fill="#FFBE0B" opacity="0.78" />
      {/* helmet */}
      <rect x="16" y="17" width="22" height="18" rx="7" fill="#94A3B8" opacity="0.88" />
      {/* visor */}
      <rect x="17" y="26" width="20" height="5" rx="2" fill="#475569" opacity="0.75" />
      <line x1="20" y1="28" x2="34" y2="28" stroke="#CBD5E1" strokeWidth="1" opacity="0.5" />
      {/* shoulders */}
      <ellipse cx="12" cy="38" rx="8" ry="5" fill="#94A3B8" opacity="0.8" />
      <ellipse cx="42" cy="38" rx="8" ry="5" fill="#94A3B8" opacity="0.8" />
      {/* body/armor */}
      <rect x="15" y="35" width="24" height="26" rx="5" fill="#94A3B8" opacity="0.88" />
      {/* chest line */}
      <line x1="27" y1="35" x2="27" y2="61" stroke="#64748B" strokeWidth="2" opacity="0.45" />
      <path d="M15 45 Q27 41 39 45" stroke="#64748B" strokeWidth="1.5" fill="none" opacity="0.4" />
      {/* belt */}
      <rect x="14" y="57" width="26" height="5" rx="2" fill="#475569" opacity="0.7" />
      <rect x="25" y="57" width="4" height="5" rx="1" fill="#FFBE0B" opacity="0.75" />
      {/* legs */}
      <rect x="16" y="62" width="9" height="16" rx="4" fill="#94A3B8" opacity="0.85" />
      <rect x="29" y="62" width="9" height="16" rx="4" fill="#94A3B8" opacity="0.85" />
      {/* boots */}
      <rect x="15" y="74" width="11" height="4" rx="3" fill="#475569" opacity="0.85" />
      <rect x="28" y="74" width="11" height="4" rx="3" fill="#475569" opacity="0.85" />
      {/* shield */}
      <path d="M5 32 L5 50 Q8 58 13 60 L13 32Z" fill="#4F3AE8" opacity="0.8" />
      <path d="M5 32 L13 32 L13 44 Q9 52 5 44Z" fill="#6366F1" opacity="0.55" />
      <line x1="9" y1="32" x2="9" y2="60" stroke="#A5B4FC" strokeWidth="1" opacity="0.5" />
      <line x1="5" y1="44" x2="13" y2="44" stroke="#A5B4FC" strokeWidth="1" opacity="0.5" />
      {/* sword */}
      <line x1="42" y1="18" x2="42" y2="58" stroke="#CBD5E1" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="36" y1="32" x2="48" y2="32" stroke="#CBD5E1" strokeWidth="3.5" strokeLinecap="round" />
      <polygon points="41,15 43,15 42,9" fill="#FFBE0B" opacity="0.88" />
      {/* sword shine */}
      <line x1="41" y1="22" x2="41" y2="30" stroke="white" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

function Rocket() {
  return (
    <svg width="42" height="66" viewBox="0 0 42 66" fill="none">
      {/* flame outer */}
      <path d="M12 54 Q15 64 21 66 Q27 64 30 54" fill="#FFBE0B" opacity="0.8" />
      {/* flame inner */}
      <path d="M15 54 Q17 62 21 64 Q25 62 27 54" fill="#FF6B35" opacity="0.85" />
      {/* left fin */}
      <path d="M11 40 L4 56 L15 50Z" fill="#EF4444" opacity="0.8" />
      {/* right fin */}
      <path d="M31 40 L38 56 L27 50Z" fill="#EF4444" opacity="0.8" />
      {/* body */}
      <rect x="12" y="22" width="18" height="34" rx="5" fill="#FF6B35" opacity="0.88" />
      {/* nose cone */}
      <path d="M12 22 Q21 4 30 22Z" fill="#EF4444" opacity="0.85" />
      {/* window */}
      <circle cx="21" cy="33" r="6.5" fill="#BAE6FD" opacity="0.9" />
      <circle cx="21" cy="33" r="5" fill="#38BDF8" opacity="0.75" />
      <circle cx="19" cy="31" r="2" fill="white" opacity="0.75" />
      {/* stripe */}
      <rect x="12" y="42" width="18" height="4" rx="2" fill="#FCA5A5" opacity="0.55" />
      {/* stars trail */}
      <circle cx="8" cy="48" r="2" fill="#FFBE0B" opacity="0.5" />
      <circle cx="4" cy="55" r="1.5" fill="#FFBE0B" opacity="0.4" />
      <circle cx="34" cy="50" r="1.5" fill="#FFBE0B" opacity="0.45" />
    </svg>
  );
}

function Planet() {
  return (
    <svg width="80" height="55" viewBox="0 0 80 55" fill="none">
      {/* ring back half */}
      <ellipse cx="40" cy="28" rx="38" ry="10" stroke="#A78BFA" strokeWidth="4" fill="none" opacity="0.38" />
      {/* planet */}
      <circle cx="40" cy="28" r="20" fill="#7C3AED" opacity="0.72" />
      {/* surface bands */}
      <path d="M24 22 Q40 17 56 22" stroke="#9333EA" strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round" />
      <path d="M22 29 Q40 23 58 29" stroke="#9333EA" strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round" />
      {/* craters */}
      <circle cx="33" cy="32" r="4.5" stroke="#6D28D9" strokeWidth="1.5" fill="none" opacity="0.4" />
      <circle cx="48" cy="24" r="3" stroke="#6D28D9" strokeWidth="1.5" fill="none" opacity="0.35" />
      {/* ring front half */}
      <path d="M14 34 Q40 44 66 34" stroke="#C4B5FD" strokeWidth="4" fill="none" opacity="0.6" strokeLinecap="round" />
      {/* small moon */}
      <circle cx="70" cy="12" r="6" fill="#E2E8F0" opacity="0.6" />
      <circle cx="68" cy="10" r="2" fill="#CBD5E1" opacity="0.4" />
    </svg>
  );
}

function Moon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <path d="M36 7 Q18 12 18 28 Q18 44 36 49 Q24 49 16 38 Q8 27 16 16 Q21 6 36 7Z" fill="#FFBE0B" opacity="0.62" />
      {/* stars around moon */}
      <circle cx="44" cy="12" r="2.2" fill="#FFBE0B" opacity="0.7" />
      <circle cx="48" cy="22" r="1.5" fill="#FFBE0B" opacity="0.55" />
      <circle cx="42" cy="30" r="1" fill="#FFBE0B" opacity="0.45" />
      {/* craters on moon */}
      <circle cx="24" cy="22" r="3" stroke="#F59E0B" strokeWidth="1.2" fill="none" opacity="0.35" />
      <circle cx="30" cy="34" r="2" stroke="#F59E0B" strokeWidth="1" fill="none" opacity="0.3" />
    </svg>
  );
}

function StarShape({ size = 22, color = "#FFBE0B", opacity = 0.65 }: { size?: number; color?: string; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill={color} style={{ opacity }}>
      <path d="M11 1.5 L13.3 8.3 L20.5 8.3 L14.8 12.6 L17 19.5 L11 15.2 L5 19.5 L7.2 12.6 L1.5 8.3 L8.7 8.3Z" />
    </svg>
  );
}

function Sparkle({ size = 16, color = "#FF6B35", opacity = 0.75 }: { size?: number; color?: string; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ opacity }}>
      <path d="M8 0 L9.2 6.8 L16 8 L9.2 9.2 L8 16 L6.8 9.2 L0 8 L6.8 6.8Z" />
    </svg>
  );
}

function CloudShape({ width = 75, opacity = 0.55 }: { width?: number; opacity?: number }) {
  return (
    <svg width={width} height={Math.round(width * 0.55)} viewBox="0 0 80 44" fill="white" style={{ opacity }}>
      <ellipse cx="20" cy="31" rx="14" ry="10" />
      <ellipse cx="38" cy="24" rx="20" ry="16" />
      <ellipse cx="58" cy="31" rx="14" ry="10" />
      <rect x="6" y="30" width="68" height="12" rx="5" />
    </svg>
  );
}

/* ─── Bottom landscape strip ─────────────────────────────────────────────── */

function Landscape() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full pointer-events-none select-none h-[100px] sm:h-[185px]"
      viewBox="0 0 1440 185"
      preserveAspectRatio="none"
      fill="none"
    >
      {/* far hill */}
      <path d="M0 110 Q180 50 380 90 Q580 130 780 65 Q980 0 1180 55 Q1320 80 1440 50 L1440 185 L0 185Z" fill="#86EFAC" opacity="0.32" />
      {/* near hill */}
      <path d="M0 138 Q160 100 360 128 Q560 155 760 115 Q960 75 1160 115 Q1310 138 1440 108 L1440 185 L0 185Z" fill="#4ADE80" opacity="0.28" />
      {/* ground */}
      <rect x="0" y="162" width="1440" height="23" fill="#86EFAC" opacity="0.22" rx="0" />
      {/* river */}
      <path d="M0 165 Q180 155 360 163 Q540 170 720 160 Q900 150 1080 162 Q1260 174 1440 162 L1440 185 L0 185Z" fill="#67E8F9" opacity="0.42" />
      {/* river shimmer */}
      <path d="M100 170 Q200 166 300 170" stroke="white" strokeWidth="1.5" fill="none" opacity="0.35" strokeLinecap="round" />
      <path d="M600 168 Q700 164 800 168" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
      <path d="M1000 165 Q1100 161 1200 165" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />

      {/* ── House (x≈490) ── */}
      {/* chimney */}
      <rect x="546" y="58" width="15" height="32" rx="3" fill="#9CA3AF" opacity="0.68" />
      {/* smoke */}
      <circle cx="553" cy="52" r="6" fill="white" opacity="0.48" />
      <circle cx="558" cy="43" r="5" fill="white" opacity="0.35" />
      <circle cx="554" cy="35" r="4" fill="white" opacity="0.22" />
      {/* roof */}
      <polygon points="460,94 514,52 568,94" fill="#EF4444" opacity="0.72" />
      {/* roof ridge */}
      <line x1="514" y1="52" x2="546" y2="58" stroke="#DC2626" strokeWidth="2" opacity="0.4" />
      {/* house body */}
      <rect x="466" y="92" width="96" height="70" rx="4" fill="#FCD34D" opacity="0.8" />
      {/* door */}
      <rect x="495" y="122" width="38" height="40" rx="12" fill="#92400E" opacity="0.72" />
      <circle cx="528" cy="143" r="2.5" fill="#FFBE0B" opacity="0.8" />
      {/* window left */}
      <rect x="472" y="104" width="26" height="22" rx="4" fill="#BAE6FD" opacity="0.85" />
      <line x1="485" y1="104" x2="485" y2="126" stroke="white" strokeWidth="1.5" opacity="0.5" />
      <line x1="472" y1="115" x2="498" y2="115" stroke="white" strokeWidth="1.5" opacity="0.5" />
      {/* window right */}
      <rect x="530" y="104" width="26" height="22" rx="4" fill="#BAE6FD" opacity="0.85" />
      <line x1="543" y1="104" x2="543" y2="126" stroke="white" strokeWidth="1.5" opacity="0.5" />
      <line x1="530" y1="115" x2="556" y2="115" stroke="white" strokeWidth="1.5" opacity="0.5" />
      {/* window flower boxes */}
      <rect x="470" y="124" width="30" height="6" rx="3" fill="#F87171" opacity="0.55" />
      <rect x="528" y="124" width="30" height="6" rx="3" fill="#F87171" opacity="0.55" />

      {/* ── Fence ── */}
      {[432, 444, 456, 612, 624, 636].map((x) => (
        <rect key={x} x={x} y="133" width="6" height="24" rx="3" fill="#92400E" opacity="0.42" />
      ))}
      <line x1="432" y1="140" x2="460" y2="140" stroke="#92400E" strokeWidth="2" opacity="0.38" />
      <line x1="432" y1="147" x2="460" y2="147" stroke="#92400E" strokeWidth="2" opacity="0.38" />
      <line x1="610" y1="140" x2="640" y2="140" stroke="#92400E" strokeWidth="2" opacity="0.38" />
      <line x1="610" y1="147" x2="640" y2="147" stroke="#92400E" strokeWidth="2" opacity="0.38" />

      {/* ── Trees ── */}
      {/* Tree 1 x=190 */}
      <rect x="184" y="120" width="12" height="50" rx="4" fill="#92400E" opacity="0.58" />
      <circle cx="190" cy="108" r="30" fill="#4ADE80" opacity="0.68" />
      <circle cx="174" cy="120" r="18" fill="#22C55E" opacity="0.58" />
      <circle cx="206" cy="120" r="18" fill="#22C55E" opacity="0.58" />

      {/* Tree 2 x=340 */}
      <rect x="334" y="125" width="12" height="45" rx="4" fill="#92400E" opacity="0.55" />
      <circle cx="340" cy="112" r="26" fill="#86EFAC" opacity="0.65" />
      <circle cx="325" cy="124" r="16" fill="#4ADE80" opacity="0.58" />

      {/* Tree 3 x=700 */}
      <rect x="695" y="118" width="12" height="52" rx="4" fill="#92400E" opacity="0.55" />
      <circle cx="701" cy="106" r="30" fill="#4ADE80" opacity="0.65" />
      <circle cx="685" cy="118" r="18" fill="#22C55E" opacity="0.55" />
      <circle cx="717" cy="118" r="18" fill="#22C55E" opacity="0.55" />

      {/* Tree 4 x=880 */}
      <rect x="875" y="122" width="12" height="48" rx="4" fill="#92400E" opacity="0.55" />
      <circle cx="881" cy="110" r="26" fill="#86EFAC" opacity="0.62" />

      {/* Tree 5 x=1150 */}
      <rect x="1145" y="120" width="12" height="50" rx="4" fill="#92400E" opacity="0.55" />
      <circle cx="1151" cy="108" r="30" fill="#4ADE80" opacity="0.62" />
      <circle cx="1135" cy="122" r="18" fill="#22C55E" opacity="0.55" />
      <circle cx="1167" cy="122" r="16" fill="#22C55E" opacity="0.5" />

      {/* ── Flowers ── */}
      {[375, 395, 415, 650, 670, 785, 800, 815].map((x, i) => (
        <circle key={x} cx={x} cy={150 + (i % 3)} r={i % 2 === 0 ? 4 : 3}
          fill={["#F472B6", "#FBBF24", "#F472B6", "#A78BFA", "#FBBF24", "#F472B6", "#A78BFA", "#FBBF24"][i]}
          opacity="0.62" />
      ))}

      {/* ── Path from house ── */}
      <path d="M490 162 Q514 155 538 162 Q532 170 514 172 Q496 170 490 162Z" fill="#D4B483" opacity="0.38" />
    </svg>
  );
}

/* ─── Floating element definitions ──────────────────────────────────────── */

interface El {
  id: number;
  x: number;
  y: number;
  layer: 1 | 2 | 3;
  floatDur: number;
  floatAmp: number;
  delay: number;
  spinDur?: number;
  hideOnMobile?: boolean;
  render: () => React.ReactNode;
}

const ELEMENTS: El[] = [
  // ── sky / space (top area) ────────────────────────────────────────────────
  { id: 1,  x: 85, y: 2,  layer: 1, floatDur: 5.5, floatAmp: 8,  delay: 0,   hideOnMobile: true, render: () => <Moon /> },
  { id: 2,  x: 2,  y: 4,  layer: 1, floatDur: 7.0, floatAmp: 6,  delay: 0.8, hideOnMobile: true, render: () => <Planet /> },
  { id: 3,  x: 78, y: 0,  layer: 2, floatDur: 4.0, floatAmp: 14, delay: 0.3, render: () => <Rocket /> },
  { id: 4,  x: -2, y: 22, layer: 1, floatDur: 8.0, floatAmp: 5,  delay: 0.5, render: () => <CloudShape width={88} opacity={0.5} /> },
  { id: 5,  x: 70, y: 15, layer: 1, floatDur: 9.0, floatAmp: 4,  delay: 1.2, hideOnMobile: true, render: () => <CloudShape width={65} opacity={0.45} /> },
  { id: 6,  x: 38, y: 1,  layer: 1, floatDur: 7.5, floatAmp: 5,  delay: 2.0, hideOnMobile: true, render: () => <CloudShape width={55} opacity={0.4} /> },

  // ── characters ────────────────────────────────────────────────────────────
  { id: 7,  x: 1,  y: 8,  layer: 2, floatDur: 4.5, floatAmp: 16, delay: 0,   render: () => <Dragon /> },
  { id: 8,  x: 83, y: 6,  layer: 2, floatDur: 3.8, floatAmp: 12, delay: 0.7, render: () => <Fairy /> },
  { id: 9,  x: 3,  y: 60, layer: 2, floatDur: 5.0, floatAmp: 6,  delay: 0.4, hideOnMobile: true, render: () => <Knight /> },
  { id: 10, x: 85, y: 58, layer: 2, floatDur: 4.2, floatAmp: 8,  delay: 1.0, hideOnMobile: true, render: () => <Cat /> },
  { id: 11, x: 75, y: 60, layer: 3, floatDur: 5.5, floatAmp: 7,  delay: 0.2, hideOnMobile: true, render: () => <Mermaid /> },

  // ── stars ─────────────────────────────────────────────────────────────────
  { id: 12, x: 8,  y: 5,  layer: 3, floatDur: 3.5, floatAmp: 10, delay: 0.6, spinDur: 8,  hideOnMobile: true, render: () => <StarShape size={26} color="#FFBE0B" opacity={0.65} /> },
  { id: 13, x: 60, y: 3,  layer: 3, floatDur: 4.2, floatAmp: 8,  delay: 1.1, spinDur: 12, hideOnMobile: true, render: () => <StarShape size={18} color="#4F3AE8" opacity={0.55} /> },
  { id: 14, x: 92, y: 38, layer: 3, floatDur: 3.8, floatAmp: 12, delay: 0.4, spinDur: 10, hideOnMobile: true, render: () => <StarShape size={20} color="#FFBE0B" opacity={0.6} /> },
  { id: 15, x: 5,  y: 48, layer: 3, floatDur: 4.8, floatAmp: 9,  delay: 1.5, spinDur: 9,  hideOnMobile: true, render: () => <StarShape size={16} color="#FF6B35" opacity={0.58} /> },
  { id: 16, x: 48, y: 0,  layer: 2, floatDur: 5.2, floatAmp: 7,  delay: 0.9, spinDur: 14, hideOnMobile: true, render: () => <StarShape size={22} color="#FFBE0B" opacity={0.6} /> },

  // ── sparkles ──────────────────────────────────────────────────────────────
  { id: 17, x: 25, y: 4,  layer: 3, floatDur: 3.0, floatAmp: 9,  delay: 0.8, hideOnMobile: true, render: () => <Sparkle size={16} color="#06B6D4" opacity={0.72} /> },
  { id: 18, x: 68, y: 6,  layer: 3, floatDur: 3.5, floatAmp: 11, delay: 0.2, hideOnMobile: true, render: () => <Sparkle size={14} color="#FF6B35" opacity={0.68} /> },
  { id: 19, x: 92, y: 55, layer: 3, floatDur: 4.0, floatAmp: 10, delay: 1.3, hideOnMobile: true, render: () => <Sparkle size={12} color="#FFBE0B" opacity={0.65} /> },
  { id: 20, x: 12, y: 55, layer: 3, floatDur: 3.8, floatAmp: 8,  delay: 0.5, hideOnMobile: true, render: () => <Sparkle size={13} color="#A78BFA" opacity={0.65} /> },
];

/* ─── Main component ─────────────────────────────────────────────────────── */

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 38, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 38, damping: 18 });

  const farX  = useTransform(springX, v => v * 0.016);
  const farY  = useTransform(springY, v => v * 0.016);
  const midX  = useTransform(springX, v => v * 0.036);
  const midY  = useTransform(springY, v => v * 0.036);
  const nearX = useTransform(springX, v => v * 0.062);
  const nearY = useTransform(springY, v => v * 0.062);

  const layerMotion = [
    null,
    { x: farX,  y: farY  },
    { x: midX,  y: midY  },
    { x: nearX, y: nearY },
  ] as const;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect || e.clientY < rect.top || e.clientY > rect.bottom) return;
      rawX.set(e.clientX - rect.left - rect.width  / 2);
      rawY.set(e.clientY - rect.top  - rect.height / 2);
    };
    const onLeave = () => { rawX.set(0); rawY.set(0); };
    window.addEventListener("mousemove", onMove);
    containerRef.current?.addEventListener("mouseleave", onLeave);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Bottom landscape — not parallaxed, stays grounded */}
      <Landscape />

      {/* Parallax layers */}
      {([1, 2, 3] as const).map((layer) => (
        <motion.div key={layer} style={layerMotion[layer]} className="absolute inset-0">
          {ELEMENTS.filter((el) => el.layer === layer).map((el) => (
            <motion.div
              key={el.id}
              className={`absolute ${el.hideOnMobile ? "hidden sm:block" : ""}`}
              style={{ left: `${el.x}%`, top: `${el.y}%` }}
              animate={{
                y:      [0, -el.floatAmp, 0],
                rotate: el.spinDur ? [0, 360] : 0,
              }}
              transition={{
                y: { duration: el.floatDur, repeat: Infinity, ease: "easeInOut", delay: el.delay },
                rotate: el.spinDur
                  ? { duration: el.spinDur, repeat: Infinity, ease: "linear", delay: el.delay }
                  : undefined,
              }}
            >
              {el.render()}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
