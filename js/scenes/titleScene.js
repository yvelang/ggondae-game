/* ===========================================================
   타이틀 화면
   - 게임 시작 / 이어하기(저장 데이터 있을 때) 선택
   =========================================================== */

(function () {
  'use strict';

  function render() {
    const { el, mount } = window.UI;

    const scene = el('div', { className: 'scene title' });

    scene.appendChild(el('div', { className: 'title__logo', text: '꼰대 오피스' }));
    scene.appendChild(el('div', {
      className: 'title__tagline',
      text: '— 살아남거나, 에이스가 되거나, 꼰대가 되거나 —'
    }));

    scene.appendChild(el('button', {
      className: 'btn btn--primary',
      text: '▶ 새 게임 시작',
      onClick: () => window.Game.start()
    }));

    if (window.Storage.has()) {
      scene.appendChild(el('button', {
        className: 'btn',
        text: '⏵ 이어하기',
        onClick: () => window.Game.continueFromSave()
      }));
    }

    scene.appendChild(el('button', {
      className: 'btn',
      text: '도움말 (조작법)',
      onClick: () => alert('마우스 클릭으로 선택지를 고르세요.\n매일 발생하는 상황에서 어떻게 행동할지 결정하면 됩니다.')
    }));

    mount(scene);
  }

  window.TitleScene = { render };
})();
