export const PROLOGUE_EVENTS = [
  {
    id: 'intro-arrival',
    trigger: 'hole-start',
    hole: 1,
    once: true,
    phase: 'intro',
    lines: [
      {
        speaker: '你',
        text: '今天本来只是普通加班日。你只记得车窗上的灯在往后退，然后导航还在一本正经地催你回家。',
      },
      {
        speaker: '你',
        text: '接着是刹车声，短得像被谁直接剪掉。再之后，只剩一下很像开球的脆响。',
      },
      {
        speaker: '你',
        text: '你在草地上醒来。远处有旗杆，旁边的牌子写着“请遵守击球礼仪”。你希望这是梦，但梦通常不会把规则写得这么认真。',
      },
      {
        speaker: '精灵',
        text: '醒了？太好了。我刚还在想，是先教你握杆，还是先教你接受人生已经彻底跑偏了。',
      },
      {
        speaker: '精灵',
        text: '这里是雾岸练习镇边上的训练场。先别急着问怎么回地球，在这个世界，大多数答案都得先靠成绩单说话。',
      },
      {
        speaker: '精灵',
        text: '你现在的短期目标很朴素：先活下来，先学会打球，先别在异世界开局五分钟就把自己打进水里。',
      },
      {
        speaker: '精灵',
        text: '风已经比昨天温柔多了。看清方向、选好球杆，然后把球送去更接近旗杆的地方。剩下的崩溃，我们可以边学边处理。',
      },
    ],
    onComplete: {
      type: 'set-phase',
      phase: 'playing',
    },
  },
];