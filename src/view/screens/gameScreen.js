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
    <div class="flex justify-between items-start">
      <div class="panel p-4 text-white shadow-lg">
        <div class="text-xs text-emerald-400 font-bold uppercase tracking-widest mb-1">Hole <span id="hole-num" class="text-white text-lg">1</span></div>
        <div class="text-3xl font-black mb-2">Par <span id="hole-par">4</span></div>
        <div class="flex gap-4 text-sm font-medium text-gray-300">
          <div>Strokes: <span id="stroke-count" class="text-white font-bold text-lg">0</span></div>
          <div>Distance: <span id="dist-to-hole" class="text-white font-bold text-lg">0</span> m</div>
        </div>
        <div class="text-[10px] text-gray-500 mt-2 uppercase tracking-wide">拖动空白处平移画面 | 双击居中</div>
      </div>

      <div class="panel p-3 text-white flex flex-col items-center shadow-lg">
        <div class="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Wind</div>
        <div class="relative w-14 h-14 rounded-full border-2 border-gray-600 bg-gray-800 flex items-center justify-center shadow-inner">
          <div id="wind-arrow" class="absolute w-1.5 h-10 bg-emerald-400 origin-bottom transform rotate-0" style="bottom: 50%; border-radius: 3px;"></div>
          <div class="absolute w-3 h-3 bg-white rounded-full z-10 shadow-md"></div>
        </div>
        <div class="text-sm font-bold mt-2"><span id="wind-speed" class="text-emerald-400">0</span> mph</div>
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
  </div>

  <div id="message-overlay">Par</div>
</div>
`;
}
