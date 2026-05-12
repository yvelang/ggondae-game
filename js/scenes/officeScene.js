/* ===========================================================
   오피스 화면 (메인 게임 화면)
   - render(state, quest)       : 퀘스트(질문) 화면
   - renderResult(state, quest, choice) : 선택 후 결과 화면
       · 결과 텍스트 + 스탯 변화 + "다음" 버튼
       · 우측 초상화 표정은 choice.resultMood 로 변경

   상단 무대(배경+캐릭터+스탯카드)는 두 화면 공통 구조이며,
   하단 대화창만 내용이 바뀝니다.
   =========================================================== */

(function () {
  'use strict';

  /* ============================================================
     공통 — 상단 무대(stage) 생성
     ============================================================ */
  function buildStage(state, character) {
    const { el } = window.UI;
    const { STAT_KEYS, MAX_DAYS } = window.KKONDAE;

    const stage = el('div', { className: 'stage' });

    // 배경
    stage.appendChild(window.Sprite.officeBackground({
      className: 'stage__bg'
    }));

    // 캐릭터 풀바디
    stage.appendChild(window.Sprite.characterFullBody({
      characterId: character.id,
      gender: state.gender,
      visual: character.visual,
      className: 'stage__character'
    }));

    // 상단바 (Day + 스탯)
    const topBar = el('div', { className: 'top-bar' });

    const dayCard = el('div', { className: 'day-card' });
    dayCard.innerHTML = `Day <span class="day-card__num">${state.day}</span> / ${MAX_DAYS}`;
    topBar.appendChild(dayCard);

    const statsCard = el('div', { className: 'stats-card' });
    statsCard.appendChild(el('div', {
      className: 'stats-card__name',
      text: character.name
    }));
    STAT_KEYS.forEach(key => {
      const row = el('div', { className: 'stats-card__row' });
      row.appendChild(el('span', { className: 'stats-card__label', text: key }));
      row.appendChild(el('span', {
        className: 'stats-card__value',
        text: String(state.stats[key] ?? 0)
      }));
      statsCard.appendChild(row);
    });
    topBar.appendChild(statsCard);

    stage.appendChild(topBar);
    return stage;
  }

  /* ============================================================
     퀘스트(질문) 화면
     ============================================================ */
  function render(state, quest) {
    const { el, mount } = window.UI;
    const { CHARACTERS } = window.KKONDAE;
    const character = CHARACTERS.find(c => c.id === state.characterId);

    const root = el('div', { className: 'office-scene' });

    // 상단: 무대
    root.appendChild(buildStage(state, character));

    // 하단: 대화창 (질문 + 선택지)
    const dialog = el('div', { className: 'dialog-box' });

    const content = el('div', { className: 'dialog-content' });
    content.appendChild(el('div', {
      className: 'dialog-title',
      text: '— ' + quest.title + ' —'
    }));
    content.appendChild(el('div', {
      className: 'dialog-text',
      text: quest.description
    }));

    const choices = el('div', { className: 'dialog-choices' });
    quest.choices.forEach((choice, idx) => {
      const btn = el('button', {
        className: 'choice-btn',
        text: choice.label,
        onClick: () => window.Game.applyChoice(idx)
      });
      choices.appendChild(btn);
    });
    content.appendChild(choices);
    dialog.appendChild(content);

    // 우측 초상화 — 퀘스트의 mood 사용
    dialog.appendChild(window.Sprite.characterPortrait({
      characterId: character.id,
      gender: state.gender,
      mood: quest.mood,
      visual: character.visual,
      className: 'dialog-portrait'
    }));

    root.appendChild(dialog);

    mount(root);
  }

  /* ============================================================
     결과 화면 — 선택 후
     ============================================================ */
  function renderResult(state, quest, choice) {
    const { el, mount } = window.UI;
    const { CHARACTERS } = window.KKONDAE;
    const character = CHARACTERS.find(c => c.id === state.characterId);

    const root = el('div', { className: 'office-scene' });

    // 상단: 무대
    root.appendChild(buildStage(state, character));

    // 하단: 결과 대화창
    const dialog = el('div', { className: 'dialog-box' });
    const content = el('div', { className: 'dialog-content' });

    content.appendChild(el('div', {
      className: 'dialog-title',
      text: '— 결과 —'
    }));

    // 선택했던 문구를 살짝 회색으로
    content.appendChild(el('div', {
      className: 'dialog-result-choice',
      text: '내 선택: "' + choice.label + '"'
    }));

    // 결과 본문
    content.appendChild(el('div', {
      className: 'dialog-text',
      text: choice.result || '...'
    }));

    // 스탯 변화 배지
    const effects = choice.effects || {};
    const changedKeys = Object.keys(effects).filter(k => effects[k] !== 0);
    if (changedKeys.length > 0) {
      const deltas = el('div', { className: 'stat-deltas' });
      changedKeys.forEach(key => {
        const v = effects[key];
        const cls = 'stat-delta ' + (v > 0 ? 'stat-delta--up' : 'stat-delta--down');
        deltas.appendChild(el('span', {
          className: cls,
          text: key + ' ' + (v > 0 ? '+' + v : v)
        }));
      });
      content.appendChild(deltas);
    }

    // "다음" 버튼
    const nextWrap = el('div', { className: 'dialog-choices' });
    nextWrap.appendChild(el('button', {
      className: 'choice-btn choice-btn--next',
      text: '다음 ▶',
      onClick: () => window.Game.advanceFromResult()
    }));
    content.appendChild(nextWrap);

    dialog.appendChild(content);

    // 우측 초상화 — 결과 mood 적용
    dialog.appendChild(window.Sprite.characterPortrait({
      characterId: character.id,
      gender: state.gender,
      mood: choice.resultMood,
      visual: character.visual,
      className: 'dialog-portrait'
    }));

    root.appendChild(dialog);

    mount(root);
  }

  window.OfficeScene = { render, renderResult };
})();
