export const ENDING_CONTENT = {
  'return-shot': {
    kicker: 'Final Echo',
    title: '最后一击之后',
    subtitle: '你不知道那一杆究竟把你送回了哪里，但它确实已经把这条推进线完整打完。',
    description: '通天塔没有给出传统意义上的结局画面。它只是把所有赛事、所有判断、所有一路撑下来的稳定度，压成最后一次挥杆留下的回声。你也许回到了地球，也许还悬在那一击的余音里，但这条球路已经被你亲手打到了尽头。',
    marks: ['异界回声', '巡回闭合', '最后一击'],
    beats: [
      '白屏没有立刻出现，先出现的是一阵比掌声更空的安静，像整个异世界都在等那一杆落地之后该如何命名你。',
      '精灵没有继续碎碎念，它只是很短地笑了一下，像是终于确认你不是靠任何侥幸把自己送到这里。',
      '如果真的有回家的方向，那大概也不会是靠谁替你宣布，而是靠你最后那一杆已经把答案打出去了。',
      '于是画面没有彻底说明结局，只留下巡回线、通天塔和那次挥杆的余波，像一个故意没有写死的黑屏。',
    ],
    primaryAction: {
      label: '返回通天塔',
      type: 'enter-city',
      cityId: 'heaven-spire',
      view: 'after-finale',
    },
    secondaryAction: {
      label: '查看通关总览',
      type: 'open-tour-summary',
    },
  },
};

export const TOUR_SUMMARY_CONTENT = {
  'final-tour': {
    kicker: 'Tour Complete',
    title: '通关总览',
    subtitle: '这不只是“你打完了”，而是整条巡回线终于能被完整回看。',
    description: '从雾岸练习镇到通天塔，这条线的重点从来都不是把高尔夫变成别的东西，而是用一层轻 RPG 外壳把判断、稳定和成长做出可感知的推进。现在它终于能以章节和成绩两条线同时落地。',
    segments: [
      {
        title: '前线四站',
        subtitle: '从雾岸、镜湖、烬沙到天轨，玩家在这里完成从教程思维到正式巡回节奏的切换。',
        competitionIds: ['misty-practice-cup', 'mirror-lake-marker-cup', 'cinder-dune-open', 'skyrail-ascent-trial'],
        focusTags: ['风线判断', '落点管理', '读坡入门'],
        note: '这一段负责把“会打球”变成“会打比赛”。前几站每一次风线、落点和读坡的收窄，都是在给后面的世界级赛区打底。',
      },
      {
        title: '白昼冠城',
        subtitle: '从资格赛进入主赛，这一段开始确认玩家配不配继续往上。',
        competitionIds: ['white-day-crown-qualifier', 'white-day-crown-masters'],
        focusTags: ['容错压缩', '停球控制', '稳定门槛'],
        note: '白昼冠城不是单纯抬数值，而是把容错进一步压低，让稳定性真正变成门票。',
      },
      {
        title: '世界冠军赛',
        subtitle: '主赛之后的世界级正面对抗，强调的是整套判断是否已经足够成熟。',
        competitionIds: ['white-day-world-championship'],
        focusTags: ['整场连贯', '读线成熟', '压力维持'],
        note: '到了这一段，单杆精彩已经不够，整场比赛的连贯和耐心才是决定差距的东西。',
      },
      {
        title: '通天塔终章',
        subtitle: '普通赛事结束后留下的最后一次回应，也是整条主线真正的落点。',
        competitionIds: ['heaven-spire-last-shot'],
        focusTags: ['终盘执行', '节奏收束', '未知一击'],
        note: '终章的意义不在于再赢一次，而在于把前面所有学到的判断压缩成最后那几洞的完成度。',
      },
    ],
    epilogue: [
      '如果说前面的城市是在教你怎么留下来，那么通天塔之后的这一页，才像是在回答你究竟已经走到了哪里。',
      '它没有把结局写死，只把整条巡回线拆开给你看：你是怎样从稳住第一场小赛，走到敢于把最后一击打进未知里的。',
      '所以这页不是奖励结算，而更像一个停顿。你可以回到通天塔，也可以再去看世界地图，但这条主线已经完整闭合了。',
    ],
  },
};