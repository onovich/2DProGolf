export const COMPETITION_CONTENT = {
  'misty-practice-cup': {
    title: '雾岸练习杯',
    cityId: 'misty-range-town',
    nextMapId: 'frontier-preview',
    nextMapNodeId: 'mirror-lake-links',
    startHole: 6,
    completionCityView: 'after-cup',
    completionFocusNpc: 'yuezhi',
    holes: [
      {
        hole: 6,
        course: {
          windMin: 1.2,
          windMax: 2.4,
          windMode: 'cross-left',
          windJitter: 0.18,
          holeDistance: {
            min: 980,
            max: 1140,
          },
          angleRange: 0.16,
          bunkerCount: 1,
          bunkerOffsetRange: 190,
        },
        storyEvents: [
          {
            id: 'misty-cup-hole-6-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '林稚禾',
                text: '雾岸练习杯第一洞开始。风不算凶，但足够提醒你这已经不是教程，也不是那种穿越后立刻拿满主角光环的剧本。',
              },
              {
                speaker: '沈遥',
                text: '别急着抢节奏。第一洞先把自己放进比赛里，再考虑漂亮。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '雾岸练习杯 第一洞',
          speaker: '沈遥',
          text: '第一洞的重点不是惊艳，是别把前面的学习一上场就忘干净。你目前做得还算稳，至少没有把异世界初登场打成社死现场。',
          nextObjective: '第二洞会把坡度和更长的推进距离一起摆出来。',
          reward: '赛事累计杆数已记录',
          nextActionLabel: '前往第二洞',
          nextAction: {
            type: 'next-hole',
          },
        },
      },
      {
        hole: 7,
        course: {
          windMin: 1.8,
          windMax: 3.1,
          windMode: 'tailwind',
          windJitter: 0.2,
          holeDistance: {
            min: 1100,
            max: 1280,
          },
          angleRange: 0.2,
          bunkerCount: 2,
          bunkerOffsetRange: 240,
        },
        storyEvents: [
          {
            id: 'misty-cup-hole-7-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '精灵',
                text: '第二洞开始变得更像真正比赛。顺风会骗你觉得一切都变简单，但滚动和落点会补回来。这个世界很少直接骂人，它通常只是让球多滚一点。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '雾岸练习杯 第二洞',
          speaker: '精灵',
          text: '不错。你已经不是在逐条背教程，而是开始自己组合判断了。最后一洞就看你能不能把这股劲保持住，别在终盘突然演一出“我有一个大胆想法”。',
          nextObjective: '最后一洞会同时考你选杆、顶风和落点耐心。',
          reward: '赛事累计杆数继续更新',
          nextActionLabel: '进入决胜洞',
          nextAction: {
            type: 'next-hole',
          },
        },
      },
      {
        hole: 8,
        course: {
          windMin: 2.6,
          windMax: 4.1,
          windMode: 'headwind',
          windJitter: 0.24,
          holeDistance: {
            min: 1180,
            max: 1380,
          },
          angleRange: 0.22,
          bunkerCount: 2,
          bunkerOffsetRange: 260,
        },
        storyEvents: [
          {
            id: 'misty-cup-hole-8-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '林稚禾',
                text: '雾岸练习杯最后一洞。这里的风会试着催你失误，别替它省力。你都一路打到这里了，别把最后一幕交给慌张。',
              },
              {
                speaker: '沈遥',
                text: '最后一洞也不用急着英雄主义。把每一杆都打成下一杆的垫脚石，就够赢很多人了。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '雾岸练习杯 完赛',
          speaker: '林稚禾',
          text: '雾岸练习杯结束。你已经把训练场里学来的东西带进了正式赛，这比单独某一杆漂亮更重要。毕竟在这个世界，能稳定活过三洞比突然燃一次更像主角。',
          nextObjective: '回到雾岸练习镇，领取巡回证并准备离开新手区。',
          reward: '雾岸练习杯成绩已记入镇内公告牌',
          nextActionLabel: '返回雾岸练习镇',
          nextAction: {
            type: 'complete-competition',
            competitionId: 'misty-practice-cup',
          },
        },
      },
    ],
  },
  'mirror-lake-marker-cup': {
    title: '镜湖定线赛',
    cityId: 'mirror-lake-links',
    startHole: 9,
    completionCityView: 'after-marker-cup',
    completionFocusNpc: 'hanmao',
    holes: [
      {
        hole: 9,
        course: {
          windMin: 0.9,
          windMax: 1.8,
          windMode: 'tailwind',
          windJitter: 0.14,
          holeDistance: {
            min: 920,
            max: 1060,
          },
          angleRange: 0.12,
          bunkerCount: 1,
          bunkerOffsetRange: 180,
        },
        storyEvents: [
          {
            id: 'mirror-marker-hole-9-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '韩卯',
                text: '镜湖定线赛第一洞。这里不靠大风吓人，靠的是你以为自己已经够稳。那种自信通常活不过一个果岭。',
              },
              {
                speaker: '马会南',
                text: '第一洞先别逞快。镜湖这边的球，落下去以后才开始认真考你。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '镜湖定线赛 第一洞',
          speaker: '韩卯',
          text: '可以。你开始知道“稳”不是保守，而是愿意为下一杆提前留位置。',
          nextObjective: '第二洞会把坡度读线和更细的停球要求一起摆出来。',
          reward: '镜湖定线赛累计杆数已记录',
          nextActionLabel: '进入第二洞',
          nextAction: {
            type: 'next-hole',
          },
        },
      },
      {
        hole: 10,
        course: {
          windMin: 1.1,
          windMax: 2.2,
          windMode: 'cross-right',
          windJitter: 0.18,
          holeDistance: {
            min: 1040,
            max: 1220,
          },
          angleRange: 0.18,
          bunkerCount: 2,
          bunkerOffsetRange: 210,
        },
        storyEvents: [
          {
            id: 'mirror-marker-hole-10-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '孟既白',
                text: '第二洞开始会更像镜湖的标准题。侧风不重，但足够把你那点模糊判断放大成麻烦。像一句“应该没事吧”被现实认真听见。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '镜湖定线赛 第二洞',
          speaker: '孟既白',
          text: '不错，你的落点开始像算过，不像碰运气。这种区别到了镜湖以后会越来越值钱。',
          nextObjective: '最后一洞会把长滚线和终段耐心一起算进去。',
          reward: '镜湖定线赛累计杆数继续更新',
          nextActionLabel: '进入决胜洞',
          nextAction: {
            type: 'next-hole',
          },
        },
      },
      {
        hole: 11,
        course: {
          windMin: 1.4,
          windMax: 2.8,
          windMode: 'headwind',
          windJitter: 0.2,
          holeDistance: {
            min: 1180,
            max: 1360,
          },
          angleRange: 0.2,
          bunkerCount: 2,
          bunkerOffsetRange: 230,
        },
        storyEvents: [
          {
            id: 'mirror-marker-hole-11-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '韩卯',
                text: '最后一洞。镜湖真正烦人的地方就在这里，你会一直觉得自己只差一点点。',
              },
              {
                speaker: '精灵',
                text: '别被“一点点”带走。很多失误都不是大错，是人忍不住替那一点点补第二个错。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '镜湖定线赛 完赛',
          speaker: '韩卯',
          text: '镜湖定线赛结束。你现在已经不只是会把球打进去，而是开始懂得怎么把整洞打顺。',
          nextObjective: '回到镜湖坡地，准备查看下一站是否已经开放。',
          reward: '镜湖定线赛成绩已写入区域公告板',
          nextActionLabel: '返回镜湖坡地',
          nextAction: {
            type: 'complete-competition',
            competitionId: 'mirror-lake-marker-cup',
          },
        },
      },
    ],
  },
  'cinder-dune-open': {
    title: '烬沙开线赛',
    cityId: 'cinder-dune-circuit',
    startHole: 12,
    completionCityView: 'after-open',
    completionFocusNpc: 'acheng',
    holes: [
      {
        hole: 12,
        course: {
          windMin: 2.2,
          windMax: 3.8,
          windMode: 'cross-left',
          windJitter: 0.22,
          holeDistance: {
            min: 980,
            max: 1160,
          },
          angleRange: 0.18,
          bunkerCount: 2,
          bunkerOffsetRange: 220,
        },
        storyEvents: [
          {
            id: 'cinder-open-hole-12-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '阿澄',
                text: '烬沙开线赛第一洞。别被眼前这点空地骗了，真正危险的是你以为还留得住的余量。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '烬沙开线赛 第一洞',
          speaker: '阿澄',
          text: '还行。你至少开始明白，在这里“安全”本身也是需要提前规划的落点。',
          nextObjective: '第二洞会进一步压缩容错，你得更早决定要不要保守。',
          reward: '烬沙开线赛累计杆数已记录',
          nextActionLabel: '进入第二洞',
          nextAction: {
            type: 'next-hole',
          },
        },
      },
      {
        hole: 13,
        course: {
          windMin: 2.6,
          windMax: 4.4,
          windMode: 'headwind',
          windJitter: 0.24,
          holeDistance: {
            min: 1160,
            max: 1360,
          },
          angleRange: 0.22,
          bunkerCount: 3,
          bunkerOffsetRange: 250,
        },
        storyEvents: [
          {
            id: 'cinder-open-hole-13-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '许萄',
                text: '第二洞开始就像一张会动的照片。风、沙和犹豫谁都能抢镜，看你想把哪个放大。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '烬沙开线赛 第二洞',
          speaker: '许萄',
          text: '不错。你终于开始把“别犯大错”当成主动策略，而不是被动求稳。',
          nextObjective: '最后一洞会把风线和边界一起压到你脸上。',
          reward: '烬沙开线赛累计杆数继续更新',
          nextActionLabel: '进入决胜洞',
          nextAction: {
            type: 'next-hole',
          },
        },
      },
      {
        hole: 14,
        course: {
          windMin: 3.0,
          windMax: 4.9,
          windMode: 'cross-right',
          windJitter: 0.28,
          holeDistance: {
            min: 1220,
            max: 1440,
          },
          angleRange: 0.24,
          bunkerCount: 3,
          bunkerOffsetRange: 280,
        },
        storyEvents: [
          {
            id: 'cinder-open-hole-14-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '马会南',
                text: '最后一洞。边界就在那儿，不会自己躲开。你要么提前尊重它，要么等它教你。',
              },
              {
                speaker: '精灵',
                text: '烬沙的题型很简单：你到底有没有真的接受“稳”是一种能力，而不是妥协。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '烬沙开线赛 完赛',
          speaker: '许萄',
          text: '烬沙开线赛结束。你已经开始懂得，在真正难的球场里，漂亮从来都是建立在先活下来的基础上。',
          nextObjective: '返回烬沙回环，准备确认高地区域是否已经进入下一个阶段。',
          reward: '烬沙开线赛成绩已写入区域赛报',
          nextActionLabel: '返回烬沙回环',
          nextAction: {
            type: 'complete-competition',
            competitionId: 'cinder-dune-open',
          },
        },
      },
    ],
  },
  'skyrail-ascent-trial': {
    title: '天轨升线赛',
    cityId: 'skyrail-heights',
    startHole: 15,
    completionCityView: 'after-ascent',
    completionFocusNpc: 'linzhihe',
    completionFlowAction: {
      type: 'open-chapter-recap',
      recapId: 'frontier-circuit-complete',
    },
    holes: [
      {
        hole: 15,
        course: {
          windMin: 1.8,
          windMax: 3.2,
          windMode: 'tailwind',
          windJitter: 0.18,
          holeDistance: {
            min: 1080,
            max: 1260,
          },
          angleRange: 0.16,
          bunkerCount: 1,
          bunkerOffsetRange: 180,
        },
        storyEvents: [
          {
            id: 'skyrail-ascent-hole-15-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '林稚禾',
                text: '天轨升线赛第一洞。这里先不急着压你，只是想看看你会不会自己把节奏打散。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '天轨升线赛 第一洞',
          speaker: '林稚禾',
          text: '不错。你没有急着在高地证明自己，这反而说明你真的开始知道怎么比赛了。',
          nextObjective: '第二洞会拉长线路，逼你把判断持续更久。',
          reward: '天轨升线赛累计杆数已记录',
          nextActionLabel: '进入第二洞',
          nextAction: {
            type: 'next-hole',
          },
        },
      },
      {
        hole: 16,
        course: {
          windMin: 2.4,
          windMax: 3.9,
          windMode: 'cross-left',
          windJitter: 0.2,
          holeDistance: {
            min: 1240,
            max: 1440,
          },
          angleRange: 0.2,
          bunkerCount: 2,
          bunkerOffsetRange: 210,
        },
        storyEvents: [
          {
            id: 'skyrail-ascent-hole-16-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '许萄',
                text: '第二洞开始就会拉长。高地最怕的不是你一杆失手，是你在很长的一洞里慢慢把自己说服偏了。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '天轨升线赛 第二洞',
          speaker: '许萄',
          text: '你开始有能力把同一个决定撑到它真正落地，而不是半路被焦虑篡位。',
          nextObjective: '最后一洞会同时考验高空落点和长期耐心。',
          reward: '天轨升线赛累计杆数继续更新',
          nextActionLabel: '进入决胜洞',
          nextAction: {
            type: 'next-hole',
          },
        },
      },
      {
        hole: 17,
        course: {
          windMin: 2.8,
          windMax: 4.4,
          windMode: 'headwind',
          windJitter: 0.24,
          holeDistance: {
            min: 1360,
            max: 1580,
          },
          angleRange: 0.22,
          bunkerCount: 2,
          bunkerOffsetRange: 240,
        },
        storyEvents: [
          {
            id: 'skyrail-ascent-hole-17-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '韩卯',
                text: '最后一洞。你已经知道该怎么打了，问题只剩下你能不能在最后也继续信自己前面的判断。',
              },
              {
                speaker: '精灵',
                text: '高地最喜欢考的，从来不是技巧上限，而是你会不会在离终点最近的时候突然自己拆掉节奏。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '天轨升线赛 完赛',
          speaker: '林稚禾',
          text: '天轨升线赛结束。你已经把这条巡回线从雾岸一路打到高地，而且没有靠偶然把自己送上来。',
          nextObjective: '返回天轨高地，等待更高层巡回区在后续章节开放。',
          reward: '天轨升线赛成绩已写入高地区域播报',
          nextActionLabel: '返回天轨高地',
          nextAction: {
            type: 'complete-competition',
            competitionId: 'skyrail-ascent-trial',
          },
        },
      },
    ],
  },
  'white-day-crown-qualifier': {
    title: '白昼定席赛',
    cityId: 'white-day-crown-city',
    startHole: 18,
    completionCityView: 'after-qualifier',
    completionFocusNpc: 'jiangyue',
    holes: [
      {
        hole: 18,
        course: {
          windMin: 2.6,
          windMax: 4.3,
          windMode: 'cross-right',
          windJitter: 0.22,
          holeDistance: {
            min: 1320,
            max: 1500,
          },
          angleRange: 0.22,
          bunkerCount: 2,
          bunkerOffsetRange: 220,
        },
        storyEvents: [
          {
            id: 'white-day-qualifier-hole-18-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '江越',
                text: '白昼定席赛第一洞开始。这里不会先给你适应时间，资格赛本身就是适应的一部分。',
              },
              {
                speaker: '沈遥',
                text: '把它当成正常比赛，不要把“世界级”三个字打成自己的额外障碍。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '白昼定席赛 第一洞',
          speaker: '沈遥',
          text: '很好。你没有被这地方的名头带乱节奏，说明你至少带着正常的比赛脑子走进来了。',
          nextObjective: '第二洞会把球道读线和风险管理同时抬起来。',
          reward: '白昼定席赛累计杆数已记录',
          nextActionLabel: '进入第二洞',
          nextAction: {
            type: 'next-hole',
          },
        },
      },
      {
        hole: 19,
        course: {
          windMin: 3.1,
          windMax: 4.9,
          windMode: 'headwind',
          windJitter: 0.24,
          holeDistance: {
            min: 1440,
            max: 1640,
          },
          angleRange: 0.24,
          bunkerCount: 3,
          bunkerOffsetRange: 250,
        },
        storyEvents: [
          {
            id: 'white-day-qualifier-hole-19-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '秦照',
                text: '第二洞开始，容错会变得像没少过，但真正能用上的那一部分并不多。你得自己决定哪一步值得冒险。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '白昼定席赛 第二洞',
          speaker: '秦照',
          text: '你在高压球道里没有急着抢答案，而是把每一步都打到了自己能负责的地方。这个判断在冠城比漂亮球更值钱。',
          nextObjective: '最后一洞会把线路长度、风向扰动和终盘压力叠在一起。',
          reward: '白昼定席赛累计杆数继续更新',
          nextActionLabel: '进入决胜洞',
          nextAction: {
            type: 'next-hole',
          },
        },
      },
      {
        hole: 20,
        course: {
          windMin: 3.4,
          windMax: 5.2,
          windMode: 'cross-left',
          windJitter: 0.26,
          holeDistance: {
            min: 1520,
            max: 1740,
          },
          angleRange: 0.26,
          bunkerCount: 3,
          bunkerOffsetRange: 270,
        },
        storyEvents: [
          {
            id: 'white-day-qualifier-hole-20-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '江越',
                text: '最后一洞。资格赛不会替你总结，只会看你能不能在最容易犹豫的时候仍然把判断执行完。',
              },
              {
                speaker: '精灵',
                text: '很好，终于到了这种地方也不能靠嘴硬过关的时候。现在请把稳定度认真拿出来。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '白昼定席赛 完赛',
          speaker: '江越',
          text: '白昼定席赛结束。你已经在更高层巡回区完成了第一场有记录的完整资格赛，这件事本身就足够说明你不是偶然走到这里。',
          nextObjective: '返回白昼冠城，确认资格赛记录，并等待冠城主赛区与世界冠军赛在后续章节继续展开。',
          reward: '白昼定席赛成绩已写入冠城资格赛记录',
          nextActionLabel: '返回白昼冠城',
          nextAction: {
            type: 'complete-competition',
            competitionId: 'white-day-crown-qualifier',
          },
        },
      },
    ],
  },
  'white-day-crown-masters': {
    title: '冠城主赛',
    cityId: 'white-day-crown-city',
    startHole: 21,
    completionCityView: 'after-masters',
    completionFocusNpc: 'jiangyue',
    completionFlowAction: {
      type: 'open-chapter-recap',
      recapId: 'white-day-crown-complete',
    },
    holes: [
      {
        hole: 21,
        course: {
          windMin: 3.6,
          windMax: 5.4,
          windMode: 'cross-right',
          windJitter: 0.24,
          holeDistance: {
            min: 1560,
            max: 1760,
          },
          angleRange: 0.25,
          bunkerCount: 3,
          bunkerOffsetRange: 280,
        },
        storyEvents: [
          {
            id: 'white-day-masters-hole-21-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '江越',
                text: '冠城主赛第一洞开始。资格赛会先问你能不能进门，主赛只问你能不能把标准一直撑住。',
              },
              {
                speaker: '沈遥',
                text: '现在别再想着“证明自己配得上”。你已经进场了，接下来要做的是把比赛正常打完。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '冠城主赛 第一洞',
          speaker: '沈遥',
          text: '很好。你没有把主赛开场打成自我证明秀，这反而说明你终于开始真正像个世界级赛区选手。',
          nextObjective: '第二洞会把长线和落点管理一起抬高，逼你认真处理首跳后的每一次滑出。',
          reward: '冠城主赛累计杆数已记录',
          nextActionLabel: '进入第二洞',
          nextAction: {
            type: 'next-hole',
          },
        },
      },
      {
        hole: 22,
        course: {
          windMin: 4.1,
          windMax: 5.9,
          windMode: 'headwind',
          windJitter: 0.26,
          holeDistance: {
            min: 1680,
            max: 1880,
          },
          angleRange: 0.27,
          bunkerCount: 3,
          bunkerOffsetRange: 300,
        },
        storyEvents: [
          {
            id: 'white-day-masters-hole-22-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '秦照',
                text: '第二洞开始，主赛会让所有不够干净的落点管理原形毕露。光把球打到附近已经不够，你得把后续滑出也算进去。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '冠城主赛 第二洞',
          speaker: '秦照',
          text: '你开始把落点管理成了一种可持续的决定，而不是临场碰运气。到了冠城，这种能力会比一两杆漂亮球更值钱。',
          nextObjective: '最后一洞会把终盘压力、长线判断和落地控制同时压上来。',
          reward: '冠城主赛累计杆数继续更新',
          nextActionLabel: '进入决胜洞',
          nextAction: {
            type: 'next-hole',
          },
        },
      },
      {
        hole: 23,
        course: {
          windMin: 4.4,
          windMax: 6.3,
          windMode: 'cross-left',
          windJitter: 0.28,
          holeDistance: {
            min: 1760,
            max: 1980,
          },
          angleRange: 0.28,
          bunkerCount: 4,
          bunkerOffsetRange: 320,
        },
        storyEvents: [
          {
            id: 'white-day-masters-hole-23-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '江越',
                text: '最后一洞。冠城主赛不会替你美化任何东西，它只会留下最准确的一条记录。把这洞也按你前面的标准打完。',
              },
              {
                speaker: '精灵',
                text: '你已经走到这种地方了，就别在最后一洞忽然把稳定度扔回给情绪。认真收官。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '冠城主赛 完赛',
          speaker: '江越',
          text: '冠城主赛结束。你已经在白昼冠城最核心的赛区里留下了完整成绩，这件事足够让更终盘的赛区认真看你一眼。',
          nextObjective: '返回白昼冠城，确认主赛记录，并等待世界冠军赛与通天塔在后续阶段继续展开。',
          reward: '冠城主赛成绩已写入白昼冠城主赛记录',
          nextActionLabel: '返回白昼冠城',
          nextAction: {
            type: 'complete-competition',
            competitionId: 'white-day-crown-masters',
          },
        },
      },
    ],
  },
  'white-day-world-championship': {
    title: '世界冠军赛',
    cityId: 'white-day-crown-city',
    startHole: 24,
    completionCityView: 'after-championship',
    completionFocusNpc: 'jiangyue',
    completionFlowAction: {
      type: 'open-chapter-recap',
      recapId: 'world-champion-complete',
    },
    holes: [
      {
        hole: 24,
        course: {
          windMin: 4.6,
          windMax: 6.5,
          windMode: 'cross-right',
          windJitter: 0.28,
          holeDistance: {
            min: 1820,
            max: 2020,
          },
          angleRange: 0.29,
          bunkerCount: 4,
          bunkerOffsetRange: 330,
        },
        storyEvents: [
          {
            id: 'white-day-world-hole-24-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '江越',
                text: '世界冠军赛第一洞开始。走到这里的人都知道怎么挥杆，所以这场比赛只看谁能把完整判断一直撑到最后。',
              },
              {
                speaker: '沈遥',
                text: '别把“世界冠军”四个字拿来吓自己。先把它当比赛，然后一洞一洞打到别人没法收回这个名字。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '世界冠军赛 第一洞',
          speaker: '沈遥',
          text: '很好。你没有被终盘名头拖着跑，这说明你还在用比赛脑子，而不是用幻想脑子挥杆。',
          nextObjective: '第二洞会把终盘压力和更苛刻的果岭读线一起压上来。',
          reward: '世界冠军赛累计杆数已记录',
          nextActionLabel: '进入第二洞',
          nextAction: {
            type: 'next-hole',
          },
        },
      },
      {
        hole: 25,
        course: {
          windMin: 5.0,
          windMax: 6.9,
          windMode: 'headwind',
          windJitter: 0.3,
          holeDistance: {
            min: 1900,
            max: 2120,
          },
          angleRange: 0.3,
          bunkerCount: 4,
          bunkerOffsetRange: 350,
        },
        storyEvents: [
          {
            id: 'white-day-world-hole-25-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '秦照',
                text: '第二洞开始，终盘比赛最擅长放大的不是失误本身，而是你在失误前那一点想临时改主意的冲动。把读线执行到底。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '世界冠军赛 第二洞',
          speaker: '秦照',
          text: '你开始像真正的冠军候选那样处理果岭和风险，而不是单纯靠气势把自己送过去。',
          nextObjective: '最后一洞会把世界冠军赛所有的终盘压力压成最直接的一次收官判断。',
          reward: '世界冠军赛累计杆数继续更新',
          nextActionLabel: '进入决胜洞',
          nextAction: {
            type: 'next-hole',
          },
        },
      },
      {
        hole: 26,
        course: {
          windMin: 5.2,
          windMax: 7.2,
          windMode: 'cross-left',
          windJitter: 0.32,
          holeDistance: {
            min: 1980,
            max: 2200,
          },
          angleRange: 0.31,
          bunkerCount: 5,
          bunkerOffsetRange: 370,
        },
        storyEvents: [
          {
            id: 'white-day-world-hole-26-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '江越',
                text: '最后一洞。世界冠军赛不会因为你已经走得很远就自动温和，它只会看你能不能把最后一次判断也认真执行到底。',
              },
              {
                speaker: '精灵',
                text: '好了，已经没有什么普通赛程能替你兜底了。把这一洞打完，然后去面对这个世界最后还没回答你的那件事。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '世界冠军赛 完赛',
          speaker: '江越',
          text: '世界冠军赛结束。白昼冠城最核心的赛事已经被你完整打下来了，这之后剩下的已经不再是普通巡回赛会回答的问题。',
          nextObjective: '返回白昼冠城，确认世界冠军赛记录，并准备面对通天塔。',
          reward: '世界冠军赛成绩已写入白昼冠城终盘记录',
          nextActionLabel: '返回白昼冠城',
          nextAction: {
            type: 'complete-competition',
            competitionId: 'white-day-world-championship',
          },
        },
      },
    ],
  },
  'heaven-spire-last-shot': {
    title: '通天塔终章',
    cityId: 'heaven-spire',
    startHole: 27,
    completionCityView: 'after-finale',
    completionFocusNpc: 'sprite',
    completionFlowAction: {
      type: 'open-chapter-recap',
      recapId: 'heaven-spire-finale',
    },
    holes: [
      {
        hole: 27,
        course: {
          windMin: 4.2,
          windMax: 6.2,
          windMode: 'tailwind',
          windJitter: 0.2,
          holeDistance: {
            min: 1500,
            max: 1680,
          },
          angleRange: 0.18,
          bunkerCount: 1,
          bunkerOffsetRange: 180,
        },
        storyEvents: [
          {
            id: 'heaven-spire-hole-27-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '精灵',
                text: '通天塔第一洞开始。奇怪吧，走到最后反而没人在乎你会不会打球了，只在乎你到底怎么把自己带到了这里。',
              },
              {
                speaker: '江越',
                text: '按记录来说，这一洞已经不属于普通赛事，但你仍然需要把它认真打完。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '通天塔 第一洞',
          speaker: '精灵',
          text: '很好。你没有把第一洞打成情绪宣言，这反而说明你直到最后都还在认真打球。',
          nextObjective: '第二洞会更像一次回看，逼你把这一路学会的稳定度继续带下去。',
          reward: '通天塔终章累计记录已开始',
          nextActionLabel: '进入第二洞',
          nextAction: {
            type: 'next-hole',
          },
        },
      },
      {
        hole: 28,
        course: {
          windMin: 4.8,
          windMax: 6.8,
          windMode: 'headwind',
          windJitter: 0.18,
          holeDistance: {
            min: 1620,
            max: 1800,
          },
          angleRange: 0.16,
          bunkerCount: 1,
          bunkerOffsetRange: 160,
        },
        storyEvents: [
          {
            id: 'heaven-spire-hole-28-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '神灵回声',
                text: '第二洞开始。你已经赢过很多比赛，现在只剩下你是否真的明白那些胜利是怎么被打出来的。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '通天塔 第二洞',
          speaker: '神灵回声',
          text: '你没有试图在终章里重新发明自己，而是把一路积累下来的判断带到了这里。这比任何华丽都更接近答案。',
          nextObjective: '最后一洞会把一切收束成真正的最后一击。',
          reward: '通天塔终章累计记录继续更新',
          nextActionLabel: '进入最后一洞',
          nextAction: {
            type: 'next-hole',
          },
        },
      },
      {
        hole: 29,
        course: {
          windMin: 3.6,
          windMax: 5.2,
          windMode: 'cross-right',
          windJitter: 0.12,
          holeDistance: {
            min: 1280,
            max: 1460,
          },
          angleRange: 0.12,
          bunkerCount: 0,
          bunkerOffsetRange: 0,
        },
        storyEvents: [
          {
            id: 'heaven-spire-hole-29-start',
            trigger: 'hole-start',
            once: true,
            phase: 'intro',
            lines: [
              {
                speaker: '精灵',
                text: '最后一洞。别想太多史诗句子，你只需要把这最后一杆也认真打完。',
              },
              {
                speaker: '神灵回声',
                text: '来吧。把你一路走到这里的意义，压进最后一次挥杆里。',
              },
            ],
            onComplete: {
              type: 'set-phase',
              phase: 'playing',
            },
          },
        ],
        summary: {
          title: '通天塔 终章完成',
          speaker: '神灵回声',
          text: '最后一击已经完成。回去吧，或者继续坠落吧。无论答案是什么，它都已经被你亲手打出去了。',
          nextObjective: '返回通天塔顶端，听完最后的回应，再回看这条已经闭环的推进线。',
          reward: '通天塔终章记录已写入最终航线',
          nextActionLabel: '返回通天塔顶端',
          nextAction: {
            type: 'complete-competition',
            competitionId: 'heaven-spire-last-shot',
          },
        },
      },
    ],
  },
};