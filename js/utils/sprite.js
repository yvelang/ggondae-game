/* ===========================================================
   스프라이트 렌더러
   ----------------------------------------------------------
   - 이미지 우선: 아래 경로의 PNG가 있으면 그것을 사용,
     없으면 자동으로 SVG 폴백으로 렌더링됩니다.
     (이미지 한 장씩 추가해도 즉시 적용됩니다)

   - 기대 경로 (모두 PNG):
       assets/bg/office.png
       assets/characters/{characterId}_{gender}/full.png
       assets/characters/{characterId}_{gender}/portrait_{mood}.png

       characterId : 'newbie' | 'junior' | 'senior'
       gender      : 'male'   | 'female'
       mood        : 'neutral' | 'joy' | 'sad' | 'angry'
                     | 'flustered' | 'tired' | 'surprised' | 'smirk'

   - 외부에서는 다음 3개 함수만 사용합니다 (DOM 노드를 반환):
       Sprite.officeBackground({ className })
       Sprite.characterFullBody({ characterId, gender, visual, className })
       Sprite.characterPortrait({ characterId, gender, mood, visual, className })
   =========================================================== */

(function () {
  'use strict';

  const IMG_BASE = 'assets';

  /* ============================================================
     Public API — DOM 노드 반환 (image + svg fallback)
     ============================================================ */

  function officeBackground(opts = {}) {
    return imgWithSvgFallback({
      src: `${IMG_BASE}/bg/office.png`,
      svgFallback: officeBgSvg(),
      className: opts.className || 'sprite-bg',
      objectFit: 'cover'
    });
  }

  function characterFullBody(opts = {}) {
    const characterId = opts.characterId;
    const gender = opts.gender === 'female' ? 'female' : 'male';
    const visual = opts.visual || {};
    const fallback = gender === 'female'
      ? femaleFullBodySvg(visual)
      : maleFullBodySvg(visual);

    return imgWithSvgFallback({
      src: `${IMG_BASE}/characters/${characterId}_${gender}/full.png`,
      svgFallback: fallback,
      className: opts.className || 'sprite-character',
      objectFit: 'contain'
    });
  }

  function characterPortrait(opts = {}) {
    const characterId = opts.characterId;
    const gender = opts.gender === 'female' ? 'female' : 'male';
    const mood = opts.mood || 'neutral';
    const visual = opts.visual || {};
    const fallback = gender === 'female'
      ? femalePortraitSvg(visual)
      : malePortraitSvg(visual);

    return imgWithSvgFallback({
      src: `${IMG_BASE}/characters/${characterId}_${gender}/portrait_${mood}.png`,
      // mood별 이미지가 없을 때는 neutral 이미지 → 그래도 없으면 SVG
      altSrc: `${IMG_BASE}/characters/${characterId}_${gender}/portrait_neutral.png`,
      svgFallback: fallback,
      className: opts.className || 'sprite-portrait',
      objectFit: 'contain'
    });
  }

  /* ============================================================
     이미지 → SVG 폴백 헬퍼
     ============================================================ */

  function imgWithSvgFallback({ src, altSrc, svgFallback, className, objectFit }) {
    const wrapper = document.createElement('div');
    wrapper.className = className;

    const img = document.createElement('img');
    img.alt = '';
    img.className = 'sprite-img';
    img.dataset.fit = objectFit || 'contain';

    // 1차 실패 → altSrc 시도, 그것도 실패 → SVG 폴백
    let triedAlt = !altSrc;
    img.addEventListener('error', () => {
      if (!triedAlt) {
        triedAlt = true;
        img.src = altSrc;
        return;
      }
      wrapper.innerHTML = svgFallback;
    });

    img.src = src;
    wrapper.appendChild(img);
    return wrapper;
  }

  /* ============================================================
     SVG 폴백 — 사무실 배경
     ============================================================ */

  function officeBgSvg() {
    return `
<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMax slice"
     xmlns="http://www.w3.org/2000/svg">
  <!-- 벽 -->
  <rect width="800" height="340" fill="#eef2f5"/>
  <rect y="335" width="800" height="10" fill="#c9d2da"/>
  <!-- 바닥 (라이트 그레이 카펫 타일) -->
  <rect y="340" width="800" height="160" fill="#9aa5b1"/>
  <g stroke="#7e8a98" stroke-width="1" opacity="0.5">
    <line x1="0" y1="380" x2="800" y2="380"/>
    <line x1="0" y1="430" x2="800" y2="430"/>
    <line x1="0" y1="470" x2="800" y2="470"/>
    <line x1="200" y1="340" x2="200" y2="500"/>
    <line x1="400" y1="340" x2="400" y2="500"/>
    <line x1="600" y1="340" x2="600" y2="500"/>
  </g>

  <!-- 좌측 통유리 창 -->
  <rect x="40" y="30" width="260" height="280" fill="#cfe6f5" stroke="#a8b8c4" stroke-width="3"/>
  <line x1="170" y1="30" x2="170" y2="310" stroke="#a8b8c4" stroke-width="2"/>
  <!-- 도시 빌딩 실루엣 -->
  <rect x="60" y="180" width="40" height="100" fill="#b8c5d0" opacity="0.8"/>
  <rect x="105" y="150" width="50" height="130" fill="#a5b3c0" opacity="0.8"/>
  <rect x="180" y="170" width="55" height="110" fill="#b8c5d0" opacity="0.8"/>
  <rect x="240" y="200" width="50" height="80" fill="#a5b3c0" opacity="0.8"/>
  <!-- 빌딩 창 -->
  <g fill="#fff8c4" opacity="0.6">
    <rect x="68" y="200" width="6" height="6"/>
    <rect x="82" y="220" width="6" height="6"/>
    <rect x="115" y="170" width="6" height="6"/>
    <rect x="135" y="200" width="6" height="6"/>
    <rect x="190" y="190" width="6" height="6"/>
    <rect x="215" y="220" width="6" height="6"/>
    <rect x="250" y="220" width="6" height="6"/>
  </g>

  <!-- 우측 디지털 사이니지 / 회사 로고 월 -->
  <rect x="520" y="60" width="220" height="140" fill="#1a1a1a" stroke="#0d0d0d" stroke-width="3" rx="4"/>
  <rect x="528" y="68" width="204" height="124" fill="#0f1f3a"/>
  <!-- 가짜 대시보드 -->
  <rect x="540" y="80" width="60" height="8" fill="#3a86ff" opacity="0.9"/>
  <rect x="540" y="96" width="40" height="6" fill="#5da3ff" opacity="0.7"/>
  <rect x="540" y="120" width="180" height="40" fill="#1a3055" stroke="#3a86ff" stroke-width="0.5"/>
  <polyline points="544,156 565,140 590,148 615,128 640,138 665,118 690,130 715,120"
            stroke="#5da3ff" stroke-width="2" fill="none"/>
  <text x="540" y="180" font-size="9" fill="#5da3ff"
        font-family="monospace">▲ 12.4%  Q2 KPI</text>

  <!-- 천장 매립 LED 평판등 -->
  <rect x="280" y="0" width="120" height="14" fill="#f5f7fa" stroke="#c9d2da" stroke-width="1"/>
  <rect x="285" y="3" width="110" height="8" fill="#fff" opacity="0.9"/>
  <rect x="500" y="0" width="120" height="14" fill="#f5f7fa" stroke="#c9d2da" stroke-width="1"/>
  <rect x="505" y="3" width="110" height="8" fill="#fff" opacity="0.9"/>

  <!-- 우측 라이트우드 책상 -->
  <rect x="470" y="370" width="320" height="12" fill="#d4b896"/>
  <rect x="468" y="380" width="324" height="5" fill="#a88a66"/>
  <rect x="490" y="384" width="10" height="80" fill="#a88a66"/>
  <rect x="760" y="384" width="10" height="80" fill="#a88a66"/>

  <!-- 듀얼 모니터 -->
  <rect x="520" y="290" width="110" height="78" fill="#1a1a1a" stroke="#000" stroke-width="2" rx="2"/>
  <rect x="525" y="295" width="100" height="68" fill="#2c5fa8"/>
  <rect x="640" y="290" width="110" height="78" fill="#1a1a1a" stroke="#000" stroke-width="2" rx="2"/>
  <rect x="645" y="295" width="100" height="68" fill="#2c5fa8"/>

  <!-- 키보드 + 텀블러 -->
  <rect x="540" y="384" width="100" height="8" fill="#e8e8e8" stroke="#a0a0a0" stroke-width="0.8"/>
  <rect x="660" y="378" width="20" height="20" rx="3" fill="#3d8b8b"/>
  <ellipse cx="670" cy="378" rx="10" ry="2" fill="#1f4444"/>

  <!-- 좌측 모던 화분 (몬스테라) -->
  <ellipse cx="380" cy="385" rx="34" ry="8" fill="#5d4424" opacity="0.3"/>
  <rect x="358" y="350" width="44" height="35" fill="#e8e0d2" stroke="#b5ad9e" stroke-width="2" rx="2"/>
  <path d="M362,352 Q360,300 380,290 Q400,300 398,352" fill="#3d8b3d"/>
  <path d="M370,320 Q368,288 380,280 Q392,288 390,320" fill="#4ca64c"/>
  <ellipse cx="375" cy="295" rx="8" ry="12" fill="#4ca64c"/>
  <ellipse cx="385" cy="285" rx="7" ry="10" fill="#5cb85c"/>

  <!-- 좌측 메쉬 회의용 의자 등받이 (잘림) -->
  <path d="M180,400 Q175,360 220,355 L255,355 Q285,360 285,400 L285,470 L180,470 Z"
        fill="#3a3a3a" stroke="#1a1a1a" stroke-width="2"/>
  <g stroke="#5a5a5a" stroke-width="0.5" opacity="0.6">
    <line x1="195" y1="370" x2="270" y2="370"/>
    <line x1="190" y1="385" x2="275" y2="385"/>
    <line x1="190" y1="400" x2="275" y2="400"/>
  </g>
</svg>`;
  }

  /* ============================================================
     SVG 폴백 — 캐릭터 (남/여)
     ============================================================ */

  function maleFullBodySvg(visual) {
    const v = visual;
    return `
<svg viewBox="0 0 200 380" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="372" rx="55" ry="8" fill="#000" opacity="0.25"/>
  <rect x="78" y="280" width="18" height="90" fill="${v.suitColor}"/>
  <rect x="104" y="280" width="18" height="90" fill="${v.suitColor}"/>
  <ellipse cx="87" cy="372" rx="14" ry="6" fill="#1a1a1a"/>
  <ellipse cx="113" cy="372" rx="14" ry="6" fill="#1a1a1a"/>
  <path d="M55,170 Q60,160 75,158 L125,158 Q140,160 145,170 L150,290 L50,290 Z"
        fill="${v.suitColor}" stroke="#1a1a1a" stroke-width="1.5"/>
  <circle cx="100" cy="220" r="2" fill="#1a1a1a"/>
  <circle cx="100" cy="245" r="2" fill="#1a1a1a"/>
  <polygon points="80,160 100,200 120,160 115,158 100,178 85,158"
           fill="${v.shirtColor}" stroke="#888" stroke-width="0.8"/>
  <polygon points="94,170 106,170 109,220 100,235 91,220"
           fill="${v.accentColor}" stroke="#1a1a1a" stroke-width="0.8"/>
  <polygon points="94,168 106,168 100,178" fill="${v.accentColor}"/>
  <rect x="42" y="170" width="16" height="100" fill="${v.suitColor}" rx="4"/>
  <rect x="142" y="170" width="16" height="100" fill="${v.suitColor}" rx="4"/>
  <circle cx="50" cy="278" r="9" fill="${v.skinColor}"/>
  <circle cx="150" cy="278" r="9" fill="${v.skinColor}"/>
  <rect x="92" y="135" width="16" height="22" fill="${v.skinColor}"/>
  ${maleHairBack(v)}
  <ellipse cx="100" cy="100" rx="38" ry="42" fill="${v.skinColor}"/>
  ${maleHairFront(v)}
  <ellipse cx="86" cy="105" rx="3" ry="4" fill="#1a1a1a"/>
  <ellipse cx="114" cy="105" rx="3" ry="4" fill="#1a1a1a"/>
  <path d="M92,122 Q100,128 108,122" stroke="#1a1a1a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <ellipse cx="78" cy="115" rx="5" ry="3" fill="#ffb3b3" opacity="0.5"/>
  <ellipse cx="122" cy="115" rx="5" ry="3" fill="#ffb3b3" opacity="0.5"/>
</svg>`;
  }

  function malePortraitSvg(visual) {
    const v = visual;
    return `
<svg viewBox="0 0 140 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="140" height="160" fill="transparent"/>
  <path d="M10,160 Q10,130 40,120 L100,120 Q130,130 130,160 Z" fill="${v.suitColor}"/>
  <polygon points="55,120 70,145 85,120" fill="${v.shirtColor}"/>
  <polygon points="65,122 75,122 78,145 70,150 62,145" fill="${v.accentColor}"/>
  <rect x="62" y="100" width="16" height="22" fill="${v.skinColor}"/>
  ${malePortraitHair(v)}
  <ellipse cx="70" cy="65" rx="36" ry="40" fill="${v.skinColor}"/>
  ${malePortraitHairFront(v)}
  <ellipse cx="56" cy="68" rx="3" ry="4" fill="#1a1a1a"/>
  <ellipse cx="84" cy="68" rx="3" ry="4" fill="#1a1a1a"/>
  <path d="M50,58 Q56,55 62,58" stroke="#1a1a1a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path d="M78,58 Q84,55 90,58" stroke="#1a1a1a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path d="M62,86 Q70,92 78,86" stroke="#1a1a1a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <ellipse cx="48" cy="80" rx="5" ry="3" fill="#ffb3b3" opacity="0.5"/>
  <ellipse cx="92" cy="80" rx="5" ry="3" fill="#ffb3b3" opacity="0.5"/>
</svg>`;
  }

  function maleHairBack(v) {
    if (v.hairStyle === 'sleek')
      return `<path d="M62,100 Q62,55 100,52 Q138,55 138,100 L138,140 L62,140 Z" fill="${v.hairColor}"/>`;
    if (v.hairStyle === 'medium')
      return `<path d="M58,105 Q58,55 100,50 Q142,55 142,105 L142,150 L58,150 Z" fill="${v.hairColor}"/>`;
    return `<path d="M64,95 Q64,58 100,55 Q136,58 136,95 L136,130 L64,130 Z" fill="${v.hairColor}"/>`;
  }
  function maleHairFront(v) {
    if (v.hairStyle === 'sleek')
      return `<path d="M68,80 Q70,60 100,58 Q130,60 132,80 Q120,72 100,72 Q80,72 68,80 Z" fill="${v.hairColor}"/>`;
    if (v.hairStyle === 'medium')
      return `<path d="M65,85 Q70,55 100,52 Q130,55 135,85 Q120,70 102,70 L98,70 Q80,70 65,85 Z" fill="${v.hairColor}"/>
              <path d="M98,68 L98,90" stroke="${v.skinColor}" stroke-width="2" opacity="0.4"/>`;
    return `<path d="M68,82 Q72,60 100,58 Q128,60 132,82 Q116,68 100,68 Q84,68 68,82 Z" fill="${v.hairColor}"/>`;
  }
  function malePortraitHair(v) {
    if (v.hairStyle === 'sleek')
      return `<path d="M34,68 Q34,28 70,24 Q106,28 106,68 L106,110 L34,110 Z" fill="${v.hairColor}"/>`;
    if (v.hairStyle === 'medium')
      return `<path d="M30,72 Q30,24 70,22 Q110,24 110,72 L110,120 L30,120 Z" fill="${v.hairColor}"/>`;
    return `<path d="M36,62 Q36,28 70,26 Q104,28 104,62 L104,100 L36,100 Z" fill="${v.hairColor}"/>`;
  }
  function malePortraitHairFront(v) {
    if (v.hairStyle === 'sleek')
      return `<path d="M40,48 Q44,28 70,26 Q96,28 100,48 Q88,42 70,42 Q52,42 40,48 Z" fill="${v.hairColor}"/>`;
    if (v.hairStyle === 'medium')
      return `<path d="M38,52 Q42,24 70,22 Q98,24 102,52 Q88,40 72,40 L68,40 Q52,40 38,52 Z" fill="${v.hairColor}"/>
              <path d="M68,38 L68,58" stroke="${v.skinColor}" stroke-width="1.5" opacity="0.4"/>`;
    return `<path d="M40,50 Q44,28 70,26 Q96,28 100,50 Q86,38 70,38 Q54,38 40,50 Z" fill="${v.hairColor}"/>`;
  }

  function femaleFullBodySvg(visual) {
    const v = visual;
    return `
<svg viewBox="0 0 200 380" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="372" rx="50" ry="7" fill="#000" opacity="0.25"/>
  <rect x="82" y="280" width="14" height="90" fill="${v.suitColor}"/>
  <rect x="104" y="280" width="14" height="90" fill="${v.suitColor}"/>
  <ellipse cx="89" cy="373" rx="11" ry="5" fill="#1a1a1a"/>
  <ellipse cx="111" cy="373" rx="11" ry="5" fill="#1a1a1a"/>
  <path d="M58,170 Q62,160 78,158 L122,158 Q138,160 142,170 L142,290 L58,290 Z"
        fill="${v.suitColor}" stroke="#1a1a1a" stroke-width="1.5"/>
  <line x1="60" y1="245" x2="140" y2="245" stroke="#1a1a1a" stroke-width="1.6" opacity="0.55"/>
  <circle cx="100" cy="220" r="2" fill="#1a1a1a"/>
  <polygon points="82,160 100,205 118,160 113,158 100,180 87,158"
           fill="${v.shirtColor}" stroke="#888" stroke-width="0.8"/>
  <path d="M88,176 Q100,184 112,176 L110,190 Q100,196 90,190 Z"
        fill="${v.accentColor}" stroke="#1a1a1a" stroke-width="0.8"/>
  <circle cx="100" cy="183" r="2.5" fill="${v.accentColor}" stroke="#1a1a1a" stroke-width="0.5"/>
  <rect x="44" y="170" width="14" height="100" fill="${v.suitColor}" rx="4"/>
  <rect x="142" y="170" width="14" height="100" fill="${v.suitColor}" rx="4"/>
  <circle cx="51" cy="278" r="8" fill="${v.skinColor}"/>
  <circle cx="149" cy="278" r="8" fill="${v.skinColor}"/>
  <rect x="93" y="135" width="14" height="22" fill="${v.skinColor}"/>
  ${femaleHairBack(v)}
  <ellipse cx="100" cy="100" rx="36" ry="42" fill="${v.skinColor}"/>
  ${femaleHairFront(v)}
  <circle cx="64" cy="108" r="2" fill="#f4d35e"/>
  <circle cx="136" cy="108" r="2" fill="#f4d35e"/>
  <ellipse cx="86" cy="105" rx="3" ry="4" fill="#1a1a1a"/>
  <ellipse cx="114" cy="105" rx="3" ry="4" fill="#1a1a1a"/>
  <path d="M82,100 L84,98" stroke="#1a1a1a" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M118,100 L116,98" stroke="#1a1a1a" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M92,122 Q100,128 108,122" stroke="#c0392b" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <ellipse cx="76" cy="115" rx="6" ry="3" fill="#ffb3b3" opacity="0.6"/>
  <ellipse cx="124" cy="115" rx="6" ry="3" fill="#ffb3b3" opacity="0.6"/>
</svg>`;
  }

  function femalePortraitSvg(visual) {
    const v = visual;
    return `
<svg viewBox="0 0 140 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="140" height="160" fill="transparent"/>
  <path d="M14,160 Q14,130 42,120 L98,120 Q126,130 126,160 Z" fill="${v.suitColor}"/>
  <polygon points="55,120 70,148 85,120" fill="${v.shirtColor}"/>
  <path d="M62,128 Q70,134 78,128 L77,138 Q70,142 63,138 Z" fill="${v.accentColor}" stroke="#1a1a1a" stroke-width="0.6"/>
  <circle cx="70" cy="133" r="1.6" fill="${v.accentColor}" stroke="#1a1a1a" stroke-width="0.4"/>
  <rect x="63" y="100" width="14" height="22" fill="${v.skinColor}"/>
  ${femalePortraitHair(v)}
  <ellipse cx="70" cy="65" rx="34" ry="40" fill="${v.skinColor}"/>
  ${femalePortraitHairFront(v)}
  <circle cx="38" cy="74" r="1.8" fill="#f4d35e"/>
  <circle cx="102" cy="74" r="1.8" fill="#f4d35e"/>
  <ellipse cx="56" cy="68" rx="3" ry="4" fill="#1a1a1a"/>
  <ellipse cx="84" cy="68" rx="3" ry="4" fill="#1a1a1a"/>
  <path d="M52,63 L54,61" stroke="#1a1a1a" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M88,63 L86,61" stroke="#1a1a1a" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M50,57 Q56,54 62,57" stroke="#1a1a1a" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  <path d="M78,57 Q84,54 90,57" stroke="#1a1a1a" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  <path d="M62,86 Q70,92 78,86" stroke="#c0392b" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  <ellipse cx="46" cy="80" rx="6" ry="3" fill="#ffb3b3" opacity="0.6"/>
  <ellipse cx="94" cy="80" rx="6" ry="3" fill="#ffb3b3" opacity="0.6"/>
</svg>`;
  }

  function femaleHairBack(v) {
    const style = v.hairStyleFemale || 'longStraight';
    if (style === 'longStraight')
      return `<path d="M52,100 Q52,52 100,48 Q148,52 148,100 L148,240 Q124,250 100,250 Q76,250 52,240 Z" fill="${v.hairColor}"/>`;
    if (style === 'shortPro')
      return `<path d="M62,98 Q62,55 100,52 Q138,55 138,98 L138,135 L62,135 Z" fill="${v.hairColor}"/>`;
    return `<path d="M58,100 Q58,52 100,48 Q142,52 142,100 L142,150 L58,150 Z" fill="${v.hairColor}"/>`;
  }
  function femaleHairFront(v) {
    const style = v.hairStyleFemale || 'longStraight';
    if (style === 'longStraight')
      return `<path d="M60,82 Q70,52 100,50 Q132,52 140,82 Q124,68 104,68 L96,68 Q78,68 60,82 Z" fill="${v.hairColor}"/>
              <path d="M96,66 Q88,76 80,80" stroke="${v.hairColor}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    if (style === 'shortPro')
      return `<path d="M64,80 Q72,55 100,52 Q128,55 136,80 Q120,68 100,68 Q80,68 64,80 Z" fill="${v.hairColor}"/>
              <path d="M104,66 Q98,76 88,80" stroke="${v.hairColor}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    return `<path d="M62,88 Q70,52 100,50 Q130,52 138,88 Q120,80 100,80 Q80,80 62,88 Z" fill="${v.hairColor}"/>`;
  }
  function femalePortraitHair(v) {
    const style = v.hairStyleFemale || 'longStraight';
    if (style === 'longStraight')
      return `<path d="M28,72 Q28,22 70,20 Q112,22 112,72 L112,140 Q88,150 70,150 Q52,150 28,140 Z" fill="${v.hairColor}"/>`;
    if (style === 'shortPro')
      return `<path d="M32,68 Q32,24 70,22 Q108,24 108,68 L108,108 L32,108 Z" fill="${v.hairColor}"/>`;
    return `<path d="M30,72 Q30,22 70,20 Q110,22 110,72 L110,128 L30,128 Z" fill="${v.hairColor}"/>`;
  }
  function femalePortraitHairFront(v) {
    const style = v.hairStyleFemale || 'longStraight';
    if (style === 'longStraight')
      return `<path d="M34,50 Q44,22 70,20 Q96,22 106,50 Q90,38 74,38 L66,38 Q50,38 34,50 Z" fill="${v.hairColor}"/>
              <path d="M66,36 Q58,52 50,58" stroke="${v.hairColor}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    if (style === 'shortPro')
      return `<path d="M38,48 Q46,24 70,22 Q94,24 102,48 Q88,38 70,38 Q52,38 38,48 Z" fill="${v.hairColor}"/>
              <path d="M74,36 Q70,50 62,55" stroke="${v.hairColor}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    return `<path d="M36,55 Q44,22 70,20 Q96,22 104,55 Q88,48 70,48 Q52,48 36,55 Z" fill="${v.hairColor}"/>`;
  }

  /* ============================================================
     export
     ============================================================ */
  window.Sprite = {
    officeBackground,
    characterFullBody,
    characterPortrait
  };
})();
