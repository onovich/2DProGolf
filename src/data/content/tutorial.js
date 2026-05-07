export const TUTORIAL_HOLES = {
  1: {
    title: '教学关卡 1',
    subtitle: '把球打出去',
    description: '先学会瞄准、出杆和把球稳定送向旗杆。',
    course: {
      windMax: 2.4,
      holeDistance: {
        min: 760,
        max: 920,
      },
      angleRange: 0.14,
      bunkerCount: 1,
      bunkerOffsetRange: 220,
    },
    storyEvents: [
      {
        id: 'tutorial-1-first-shot-feedback',
        trigger: 'shot-settled',
        once: true,
        phase: 'playing',
        lines: [
          {
            speaker: '精灵',
            text: '不错，至少这次不是把人生继续打出边界。接下来开始学会读风、读坡和读自己的贪心。',
          },
        ],
        onComplete: {
          type: 'set-phase',
          phase: 'playing',
        },
      },
    ],
    goals: [
      {
        id: 'take-first-shot',
        label: '完成第一次击球',
        type: 'event',
        event: 'shot-taken',
      },
      {
        id: 'clean-hole',
        label: '本洞不触发罚杆',
        type: 'penalty-free',
      },
      {
        id: 'finish-in-four',
        label: '4 杆内完成本洞',
        type: 'max-strokes',
        max: 4,
      },
    ],
    summary: {
      title: '雾岸练习回顾',
      speaker: '精灵',
      text: '这就算通过第一轮了。你现在至少已经具备了在这个世界不被风随便嘲笑的资格。接下来会看到更大的球场和更奇怪的人。',
      nextObjective: '下一洞开始学习球杆差异和落点规划。',
      reward: '获得雾岸练习资格',
      transition: [
        {
          speaker: '精灵',
          text: '休息一秒。下一课会稍微长一点，你得开始明白为什么高尔夫要准备不止一支杆。',
        },
      ],
    },
  },
  2: {
    title: '教学关卡 2',
    subtitle: '理解球杆差异',
    description: '学会根据距离与落点规划切换球杆，而不是每一杆都只想着一把梭。',
    course: {
      windMax: 2.8,
      holeDistance: {
        min: 980,
        max: 1180,
      },
      angleRange: 0.18,
      bunkerCount: 2,
      bunkerOffsetRange: 280,
    },
    storyEvents: [
      {
        id: 'tutorial-2-hole-start',
        trigger: 'hole-start',
        once: true,
        phase: 'intro',
        lines: [
          {
            speaker: '精灵',
            text: '第二课，学会别把每个问题都交给同一支球杆。工具分工，通常比逞强有效。',
          },
          {
            speaker: '精灵',
            text: '这一洞稍微长一点。试着在一洞里用至少两种球杆，把落点想清楚。',
          },
        ],
        onComplete: {
          type: 'set-phase',
          phase: 'playing',
        },
      },
      {
        id: 'tutorial-2-shot-feedback',
        trigger: 'shot-settled',
        once: true,
        phase: 'playing',
        lines: [
          {
            speaker: '精灵',
            text: '你现在开始真正像在“规划”了。记住，不同球杆不是装饰，它们是不同的问题解法。',
          },
        ],
        onComplete: {
          type: 'set-phase',
          phase: 'playing',
        },
      },
    ],
    goals: [
      {
        id: 'take-second-hole-shot',
        label: '完成第一次击球',
        type: 'event',
        event: 'shot-taken',
      },
      {
        id: 'use-two-clubs',
        label: '本洞至少使用两种球杆',
        type: 'distinct-clubs-used',
        target: 2,
      },
      {
        id: 'finish-in-five',
        label: '5 杆内完成本洞',
        type: 'max-strokes',
        max: 5,
      },
    ],
    summary: {
      title: '球杆分工回顾',
      speaker: '精灵',
      text: '很好，你开始知道什么时候该发力，什么时候该收一点了。下一洞就轮到风来打断你的自信。',
      nextObjective: '下一洞开始正式学习顺风、逆风和侧风的差异。',
      reward: '获得球杆切换训练记录',
      transition: [
        {
          speaker: '精灵',
          text: '先别高兴太早。第三课轮到风了，它不讲道理，但会逼你学会修正。',
        },
        {
          speaker: '精灵',
          text: '这次我会让风从侧面来。别试图跟它硬碰，你要学会预留偏移。',
        },
      ],
    },
  },
  3: {
    title: '教学关卡 3',
    subtitle: '理解风的方向',
    description: '开始在实战里理解顺风、逆风和侧风的差异，学会提前给出修正空间。',
    course: {
      windMin: 3.4,
      windMax: 4.9,
      windMode: 'cross-right',
      windJitter: 0.16,
      holeDistance: {
        min: 1080,
        max: 1260,
      },
      angleRange: 0.16,
      bunkerCount: 2,
      bunkerOffsetRange: 240,
    },
    storyEvents: [
      {
        id: 'tutorial-3-hole-start',
        trigger: 'hole-start',
        once: true,
        phase: 'intro',
        lines: [
          {
            speaker: '精灵',
            text: '第三课，开始认真看风。你会发现它不是来抢控制权的，是来逼你提前思考的。',
          },
          {
            speaker: '精灵',
            text: '这一洞的风会从侧面推球。别盯着旗杆死打，给偏移留出空间。',
          },
        ],
        onComplete: {
          type: 'set-phase',
          phase: 'playing',
        },
      },
      {
        id: 'tutorial-3-shot-feedback',
        trigger: 'shot-settled',
        once: true,
        phase: 'playing',
        lines: [
          {
            speaker: '精灵',
            text: '看到了吗？风不是要你认输，而是提醒你别把瞄准线当成承诺。',
          },
        ],
        onComplete: {
          type: 'set-phase',
          phase: 'playing',
        },
      },
    ],
    goals: [
      {
        id: 'take-third-hole-shot',
        label: '完成第一次击球',
        type: 'event',
        event: 'shot-taken',
      },
      {
        id: 'wind-hole-clean',
        label: '本洞不触发罚杆',
        type: 'penalty-free',
      },
      {
        id: 'finish-in-five-with-wind',
        label: '在 5 杆内完成风力练习洞',
        type: 'max-strokes',
        max: 5,
      },
    ],
    summary: {
      title: '风向修正回顾',
      speaker: '精灵',
      text: '很好，你已经开始意识到：真正的瞄准，不是对着目标画直线，而是把偏移也算进计划里。',
      nextObjective: '下一课可以开始把坡度也一起算进去。',
      reward: '获得基础读风训练记录',
      transition: [
        {
          speaker: '精灵',
          text: '第四课先把风放轻一点。你要开始注意球落地以后怎么继续走，而不是只盯着起飞那一瞬间。',
        },
        {
          speaker: '精灵',
          text: '尤其是果岭附近，坡度会把你的侥幸一点点推走。',
        },
      ],
    },
  },
  4: {
    title: '教学关卡 4',
    subtitle: '读坡与停球',
    description: '开始把坡度和滚动距离算进计划，学会让球停在你真正需要的位置。',
    course: {
      windMin: 0.6,
      windMax: 1.8,
      holeDistance: {
        min: 860,
        max: 1040,
      },
      angleRange: 0.12,
      bunkerCount: 1,
      bunkerOffsetRange: 180,
    },
    storyEvents: [
      {
        id: 'tutorial-4-hole-start',
        trigger: 'hole-start',
        once: true,
        phase: 'intro',
        lines: [
          {
            speaker: '精灵',
            text: '第四课，开始读坡。你现在不能只问“打多远”，还要问“落地后会往哪边继续滚”。',
          },
          {
            speaker: '精灵',
            text: '这一洞风不大，把注意力放在果岭附近。至少让球有一次稳稳停在果岭上。',
          },
        ],
        onComplete: {
          type: 'set-phase',
          phase: 'playing',
        },
      },
      {
        id: 'tutorial-4-slope-feedback',
        trigger: 'shot-settled',
        once: true,
        phase: 'playing',
        lines: [
          {
            speaker: '精灵',
            text: '记住这种感觉。球停下来的位置，往往比它落地的那一刻更说明你有没有真的读懂地形。',
          },
        ],
        onComplete: {
          type: 'set-phase',
          phase: 'playing',
        },
      },
    ],
    goals: [
      {
        id: 'take-fourth-hole-shot',
        label: '完成第一次击球',
        type: 'event',
        event: 'shot-taken',
      },
      {
        id: 'settle-on-green',
        label: '让球至少一次停在果岭上',
        type: 'settle-on-terrain',
        terrain: 'green',
      },
      {
        id: 'finish-in-four-with-slope',
        label: '4 杆内完成坡度练习洞',
        type: 'max-strokes',
        max: 4,
      },
    ],
    summary: {
      title: '坡度判断回顾',
      speaker: '精灵',
      text: '你已经开始真正处理“落点之后”的问题了。等你把风、坡和球杆一起考虑，球场才会像一张可以解读的地图。',
      nextObjective: '后续可以把风、坡与球杆组合成完整策略课。',
      reward: '获得基础读坡训练记录',
      transition: [
        {
          speaker: '精灵',
          text: '最后一课，我们把前面学的东西放在一起。你不能再把失误怪给单一因素了。',
        },
        {
          speaker: '精灵',
          text: '选杆、读风、看坡，这三件事要在同一杆之前完成。欢迎来到真正像高尔夫的一洞。',
        },
      ],
    },
  },
  5: {
    title: '教学关卡 5',
    subtitle: '组合完整策略',
    description: '把球杆选择、风向修正和停球位置一起纳入判断，完成训练场的结业练习。',
    course: {
      windMin: 2.8,
      windMax: 4.2,
      windMode: 'headwind',
      windJitter: 0.22,
      holeDistance: {
        min: 1120,
        max: 1320,
      },
      angleRange: 0.2,
      bunkerCount: 2,
      bunkerOffsetRange: 220,
    },
    storyEvents: [
      {
        id: 'tutorial-5-hole-start',
        trigger: 'hole-start',
        once: true,
        phase: 'intro',
        lines: [
          {
            speaker: '精灵',
            text: '第五课，也是训练场结业课。这里不会只考你一种能力，而是看你能不能把前四课真的拼起来。',
          },
          {
            speaker: '精灵',
            text: '这一洞有顶风、有障碍，也需要你把球送上果岭。别只想着一杆解决，先把整洞拆开。',
          },
        ],
        onComplete: {
          type: 'set-phase',
          phase: 'playing',
        },
      },
      {
        id: 'tutorial-5-shot-feedback',
        trigger: 'shot-settled',
        once: true,
        phase: 'playing',
        lines: [
          {
            speaker: '精灵',
            text: '对，就是这种感觉。真正的策略不是神来一杆，而是每一杆都知道自己在为下一杆争取什么。',
          },
        ],
        onComplete: {
          type: 'set-phase',
          phase: 'playing',
        },
      },
    ],
    goals: [
      {
        id: 'take-fifth-hole-shot',
        label: '完成第一次击球',
        type: 'event',
        event: 'shot-taken',
      },
      {
        id: 'use-two-clubs-in-finale',
        label: '本洞至少使用两种球杆',
        type: 'distinct-clubs-used',
        target: 2,
      },
      {
        id: 'settle-on-green-in-finale',
        label: '让球至少一次停在果岭上',
        type: 'settle-on-terrain',
        terrain: 'green',
      },
      {
        id: 'finish-finale-in-five',
        label: '5 杆内完成结业练习洞',
        type: 'max-strokes',
        max: 5,
      },
    ],
    summary: {
      title: '训练场结业回顾',
      speaker: '精灵',
      text: '很好。你现在还远称不上高手，但至少已经知道高尔夫不是比谁用力更大，而是比谁更早开始思考。接下来，你可以去面对真正的球场和真正的人了。',
      nextObjective: '打开巡回航线图，确认第一场正式赛从哪里开始。',
      reward: '获得训练场结业证明',
      nextActionLabel: '进入巡回航线图',
      nextAction: {
        type: 'open-world-map',
        mapId: 'frontier-preview',
      },
    },
  },
};