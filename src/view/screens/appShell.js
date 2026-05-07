import { renderGameScreen } from './gameScreen';

export function renderAppShell() {
  return `
<div id="app-shell">
  <div id="game-shell" class="game-shell is-dormant" aria-hidden="true">
    ${renderGameScreen()}
  </div>

  <div id="title-screen" class="shell-overlay visible">
    <div class="shell-backdrop"></div>
    <section class="shell-card title-card" aria-label="标题页">
      <div class="title-kicker">Natural Terrain Tour</div>
      <h1 class="title-heading">2D Pro Golf</h1>
      <div class="shell-action-stack">
        <button id="title-new-game" class="shell-action shell-action-primary" type="button">新游戏</button>
        <button id="title-load-game" class="shell-action" type="button">读档</button>
      </div>
    </section>
  </div>

  <div id="system-menu" class="shell-modal" aria-hidden="true" hidden>
    <div class="shell-backdrop"></div>
    <section class="shell-card system-card panel" aria-label="设置页">
      <div class="system-kicker">System</div>
      <h2 class="system-heading">设置页</h2>
      <p id="system-save-status" class="system-copy">当前没有可读取的本地存档。</p>
      <div class="shell-action-stack compact">
        <button id="menu-resume-game" class="shell-action shell-action-primary" type="button">回到游戏</button>
        <button id="menu-save-game" class="shell-action" type="button">存档</button>
        <button id="menu-load-game" class="shell-action" type="button">读档</button>
        <button id="menu-return-title" class="shell-action shell-action-danger" type="button">回到标题</button>
      </div>
    </section>
  </div>

  <div id="shell-toast" class="shell-toast" aria-live="polite"></div>
</div>
`;
}