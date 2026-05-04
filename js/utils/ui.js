/* ===========================================================
   UI 헬퍼
   - DOM 조작을 한 곳에 모아둡니다.
   - 다른 파일에서는 window.UI.xxx 형태로 사용합니다.
   =========================================================== */

(function () {
  'use strict';

  const APP_ID = 'app';

  /** #app 영역을 깨끗이 비웁니다. */
  function clearApp() {
    const app = document.getElementById(APP_ID);
    if (app) app.innerHTML = '';
    return app;
  }

  /**
   * 간단한 엘리먼트 생성 헬퍼
   * @param {string} tag    - 'div', 'button' 등
   * @param {object} options - { className, text, html, onClick, attrs }
   * @param {Array}  children - 자식 노드 배열 (선택)
   */
  function el(tag, options = {}, children = []) {
    const node = document.createElement(tag);

    if (options.className) node.className = options.className;
    if (options.text != null) node.textContent = options.text;
    if (options.html != null) node.innerHTML = options.html;
    if (options.onClick) node.addEventListener('click', options.onClick);

    if (options.attrs) {
      for (const [k, v] of Object.entries(options.attrs)) {
        node.setAttribute(k, v);
      }
    }

    children.forEach(child => {
      if (child) node.appendChild(child);
    });

    return node;
  }

  /**
   * 새 씬을 #app에 마운트합니다.
   * @param {HTMLElement} sceneRoot - .scene 클래스가 적용된 루트 엘리먼트
   */
  function mount(sceneRoot) {
    const app = clearApp();
    if (app) app.appendChild(sceneRoot);
  }

  // 전역 노출
  window.UI = { clearApp, el, mount };
})();
