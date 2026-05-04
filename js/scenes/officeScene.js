/* ===========================================================
   오피스 화면 (메인 게임 화면)
   - 상단: 캐릭터 정보 + 스탯 + 며칠차
   - 본문: 현재 퀘스트 설명
   - 하단: 선택지 버튼들
   =========================================================== */

(function () {
  'use strict';

  function render(state, quest) {
    const { el, mount } = window.UI;
    const { STAT_KEYS, MAX_DAYS, CHARACTERS } = window.KKONDAE;

    const character = CHARACTERS.find(c => c.id === state.characterId);

    const scene = el('div', { className: 'scene' });

    // 상단: 일자 표시
    scene.appendChild(el('div', {
      className: 'day-indicator',
      text: `Day ${state.day} / ${MAX_DAYS}  ·  ${character.name}`
    }));

    // 스탯 패널
    const statsBox = el('div', { className: 'stats' });
    STAT_KEYS.forEach(key => {
      const stat = el('div', { className: 'stat' });
      stat.appendChild(el('div', { className: 'stat__label', text: key }));
      stat.appendChild(el('div', {
        className: 'stat__value',
        text: String(state.stats[key] ?? 0)
      }));
      statsBox.appendChild(stat);
    });
    scene.appendChild(statsBox);

    // 퀘스트 본문
    scene.appendChild(el('div', { className: 'scene__title', text: quest.title }));
    scene.appendChild(el('div', { className: 'scene__body', text: quest.description }));

    // 선택지
    quest.choices.forEach((choice, idx) => {
      const btn = el('button', {
        className: 'btn',
        onClick: () => window.Game.applyChoice(idx)
      });
      btn.appendChild(el('div', { text: choice.label }));
      // 효과는 일단 숨겨도 되지만, 초보 친화를 위해 작게 미리 보여줍니다.
      const effects = formatEffects(choice.effects);
      if (effects) {
        const small = el('div', { html: effects });
        btn.appendChild(small);
      }
      scene.appendChild(btn);
    });

    mount(scene);
  }

  function formatEffects(effects) {
    if (!effects) return '';
    return Object.entries(effects).map(([k, v]) => {
      const cls = v >= 0 ? 'effect-toast--up' : 'effect-toast--down';
      const sign = v >= 0 ? '+' : '';
      return `<span class="effect-toast ${cls}">${k} ${sign}${v}</span>`;
    }).join('');
  }

  window.OfficeScene = { render };
})();
