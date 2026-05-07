export function renderGameScreen() {
  return `
<div id="game-container">
  <div id="loading">
    <div class="spinner mb-6"></div>
    <h2 class="text-2xl font-bold tracking-widest text-emerald-400">正在雕刻地形...</h2>
    <p class="text-gray-400 text-sm mt-3">多重分形噪音演算中</p>
  </div>

  <canvas id="bg-canvas"></canvas>
  <canvas id="fg-canvas"></canvas>

  <div id="target-indicator"></div>

  <div id="ui-layer" class="p-4 flex flex-col justify-between">
    <div class="flex justify-between items-start gap-3">
      <div class="panel p-4 text-white shadow-lg">
        <div class="text-xs text-emerald-400 font-bold uppercase tracking-widest mb-1">Hole <span id="hole-num" class="text-white text-lg">1</span></div>
        <div class="text-3xl font-black mb-2">Par <span id="hole-par">4</span></div>
        <div class="flex gap-4 text-sm font-medium text-gray-300">
          <div>Strokes: <span id="stroke-count" class="text-white font-bold text-lg">0</span></div>
          <div>Distance: <span id="dist-to-hole" class="text-white font-bold text-lg">0</span> m</div>
        </div>
        <div class="text-[10px] text-gray-500 mt-2 uppercase tracking-wide">拖动空白处平移画面 | 双击居中</div>
      </div>

      <div class="flex items-start gap-3">
        <div class="panel p-3 text-white flex flex-col items-center shadow-lg">
          <div class="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Wind</div>
          <div class="relative w-14 h-14 rounded-full border-2 border-gray-600 bg-gray-800 flex items-center justify-center shadow-inner">
            <div id="wind-arrow" class="absolute w-1.5 h-10 bg-emerald-400 origin-bottom transform rotate-0" style="bottom: 50%; border-radius: 3px;"></div>
            <div class="absolute w-3 h-3 bg-white rounded-full z-10 shadow-md"></div>
          </div>
          <div class="text-sm font-bold mt-2"><span id="wind-speed" class="text-emerald-400">0</span> mph</div>
        </div>

        <button id="open-system-menu" class="system-trigger panel" type="button">设置</button>
      </div>
    </div>

    <div class="flex justify-center mb-6">
      <div class="panel p-2 flex gap-2 shadow-2xl" id="club-selector">
        <button class="club-btn px-4 py-3 rounded-lg text-white font-bold bg-gray-800" data-club="wood">1W 木杆</button>
        <button class="club-btn px-4 py-3 rounded-lg text-white font-bold bg-gray-800 active" data-club="iron">7I 铁杆</button>
        <button class="club-btn px-4 py-3 rounded-lg text-white font-bold bg-gray-800" data-club="wedge">PW 挖起杆</button>
        <button class="club-btn px-4 py-3 rounded-lg text-white font-bold bg-gray-800" data-club="putter">PT 推杆</button>
      </div>
    </div>

    <div id="guide-panel" class="panel text-white shadow-2xl">
      <div class="guide-header">
        <div>
          <div id="guide-speaker" class="guide-speaker">精灵</div>
          <div class="guide-subtitle">序章引导</div>
        </div>
        <div id="guide-progress" class="guide-progress">1/1</div>
      </div>
      <div id="guide-text" class="guide-text"></div>
      <div class="guide-actions">
        <button id="guide-skip" class="guide-btn guide-btn-secondary" type="button">收起</button>
        <button id="guide-next" class="guide-btn guide-btn-primary" type="button">继续</button>
      </div>
    </div>

    <div id="summary-panel" class="panel text-white shadow-2xl">
      <div id="summary-kicker" class="summary-kicker">Hole Complete</div>
      <div id="summary-title" class="summary-title">Par</div>
      <div id="summary-speaker" class="summary-speaker">精灵</div>
      <div id="summary-text" class="summary-text"></div>
      <div class="summary-stats">
        <div class="summary-stat">
          <span class="summary-label">杆数</span>
          <span id="summary-strokes" class="summary-value">0</span>
        </div>
        <div class="summary-stat">
          <span class="summary-label">标准杆</span>
          <span id="summary-par" class="summary-value">4</span>
        </div>
      </div>
      <div id="summary-goals" class="summary-goals"></div>
      <div id="summary-objective" class="summary-note"></div>
      <div id="summary-reward" class="summary-note summary-reward"></div>
      <div class="guide-actions">
        <button id="summary-next" class="guide-btn guide-btn-primary" type="button">前往下一洞</button>
      </div>
    </div>

    <div id="city-panel" class="panel text-white shadow-2xl">
      <div class="city-kicker">Town Arrival</div>
      <div id="city-title" class="city-title">雾岸练习镇</div>
      <div id="city-subtitle" class="city-subtitle"></div>
      <div id="city-description" class="city-text"></div>
      <div id="city-objective" class="city-objective"></div>
      <div id="city-progress" class="city-progress"></div>
      <div id="city-npc-list" class="city-npc-list"></div>
      <div class="city-focus-card">
        <div id="city-focus-name" class="city-focus-name"></div>
        <div id="city-focus-role" class="city-focus-role"></div>
        <div id="city-focus-summary" class="city-focus-summary"></div>
        <div id="city-focus-dialogue" class="city-focus-dialogue"></div>
      </div>
      <div class="guide-actions">
        <button id="city-secondary-action" class="guide-btn guide-btn-secondary" type="button">查看角色</button>
        <button id="city-primary-action" class="guide-btn guide-btn-primary" type="button">继续</button>
      </div>
    </div>

    <div id="world-map-panel" class="panel text-white shadow-2xl">
      <div class="world-map-kicker">Route Briefing</div>
      <div id="world-map-title" class="world-map-title">巡回航线图</div>
      <div id="world-map-subtitle" class="world-map-subtitle"></div>
      <div id="world-map-description" class="world-map-text"></div>
      <div id="world-map-objective" class="world-map-objective"></div>
      <div id="world-map-visual" class="world-map-visual">
        <div id="world-map-region-layer" class="world-map-region-layer"></div>
        <svg id="world-map-route-layer" class="world-map-route-layer" viewBox="0 0 100 100" preserveAspectRatio="none"></svg>
        <div id="world-map-landmark-layer" class="world-map-landmark-layer"></div>
      </div>
      <div id="world-map-node-list" class="world-map-node-list"></div>
      <div class="world-map-focus-card">
        <div id="world-map-focus-name" class="world-map-focus-name"></div>
        <div id="world-map-focus-status" class="world-map-focus-status"></div>
        <div id="world-map-focus-description" class="world-map-focus-description"></div>
      </div>
      <div class="guide-actions">
        <button id="world-map-secondary-action" class="guide-btn guide-btn-secondary" type="button">查看据点</button>
        <button id="world-map-primary-action" class="guide-btn guide-btn-primary" type="button">进入赛程</button>
      </div>
    </div>
  </div>

  <div id="message-overlay">Par</div>
</div>
`;
}
