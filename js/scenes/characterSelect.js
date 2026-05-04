/* ===========================================================
   직급(캐릭터) 선택 화면
   - data/characters.js 의 CHARACTERS 를 카드로 보여줍니다.
   =========================================================== */

(function () {
  'use strict';

  function render() {
    const { el, mount } = window.UI;
    const { CHARACTERS } = window.KKONDAE;

    const scene = el('div', { className: 'scene' });
    scene.appendChild(el('div', { className: 'scene__title', text: '직급을 선택하세요' }));
    scene.appendChild(el('div', {
      className: 'scene__subtitle',
      text: '선택한 직급에 따라 시작 스탯과 게임 목표가 달라집니다.'
    }));

    const list = el('div', { className: 'character-list' });

    CHARACTERS.forEach(ch => {
      const card = el('button', {
        className: 'character-card',
        onClick: () => window.Game.selectCharacter(ch.id)
      });
      card.appendChild(el('div', { className: 'character-card__name', text: ch.name }));
      card.appendChild(el('div', { className: 'character-card__desc', text: ch.description }));
      card.appendChild(el('div', { className: 'character-card__goal', text: '🎯 ' + ch.goal }));
      list.appendChild(card);
    });

    scene.appendChild(list);

    scene.appendChild(el('div', { className: 'btn-row' }, [
      el('button', {
        className: 'btn',
        text: '◀ 타이틀로',
        onClick: () => window.TitleScene.render()
      })
    ]));

    mount(scene);
  }

  window.CharacterSelectScene = { render };
})();
