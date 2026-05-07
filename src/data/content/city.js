export const CITY_CONTENT = {
  'misty-range-town': {
    title: '雾岸练习镇',
    subtitle: '教程后的第一处落脚点',
    progressSummary: '当前阶段：完成新手训练线并取得巡回证后，这里会从起点变成已完成前站。',
    visualTheme: 'misty-range',
    npcs: [
      {
        id: 'yuezhi',
        name: '岳止',
        role: '赛事登记员',
        summary: '前互联网产品经理，教程后第一个正式给你任务的人，讲话像一张已经填好的流程表。',
        dialogue: [
          '欢迎。别紧张，这里的表不用你填太多，毕竟你多半也不知道自己怎么来的。',
          '如果你想回去，先从赢最不丢人的比赛开始。别的异世界可能先发剑，我们这里先发参赛编号，流程上也算有始有终。',
        ],
      },
      {
        id: 'qiaomeilan',
        name: '乔美岚',
        role: '热饮摊老板',
        summary: '前连锁奶茶店店长，负责把雾岸镇的休息感维持在一个不会让人彻底崩掉的水平。',
        dialogue: [
          '我以前一天要哄两百个客人，现在只要看你们和风吵架，轻松多了。',
          '你这一路学得还行。正式赛记得别把每一杆都打成情绪发言，不然看起来像热血番，结局却总是公司年终总结。',
        ],
      },
      {
        id: 'mengjibai',
        name: '孟既白',
        role: '装备修整师',
        summary: '前机械工程师，以后球杆和装备系统的入口，讲话总比别人多半层结构。',
        dialogue: [
          '球杆不是玄学。至少大部分时候不是。真正可怕的是人在紧张时会把错误归给玄学，然后再怪异世界没有用户手册。',
          '等你打完第一场正式赛，再来。我可以把杆面角度讲得比你的人生规划清楚，这句我已经对很多穿越者说过了。',
        ],
      },
      {
        id: 'tangqi',
        name: '唐栖',
        role: '练习场常驻选手',
        summary: '前插画师，第一位带着一点松弛感的年轻对手，观察力比表面上认真得多。',
        dialogue: [
          '这里的风看着乱，其实比人好懂。它至少不会先说“我懂你”，再把球推沟里。',
          '你要是真去报雾岸练习杯，别想着一杆证明自己。先把第一洞活着打完。',
        ],
      },
      {
        id: 'linzhihe',
        name: '林稚禾',
        role: '临时主持人',
        summary: '前电台主播，镇上负责把比赛说得体面一点的人，也是正式赛氛围的入口。',
        dialogue: [
          '欢迎来到今天的练习赛预备时段。愿各位都能在风里保住一点体面。',
          '等你准备好了就去登记。真正的球场不会因为你刚学完教程就自动心软，现实和异世界在这点上倒是意外统一。',
        ],
      },
    ],
    views: {
      default: {
        description: '晨雾、木牌和练习旗杆挤在一起，这地方像城镇，也像专门给新来者缓一口气的临时港口。你能听见远处有人在登记比赛，也能听见热饮摊那边正在评价别人的挥杆。',
        objective: '先认识镇上的关键人物，然后报名雾岸练习杯，开始教程后的第一场正式赛。',
        primaryAction: {
          label: '报名雾岸练习杯',
          type: 'start-competition',
          competitionId: 'misty-practice-cup',
        },
        secondaryAction: {
          label: '去热饮摊缓口气',
          type: 'focus-npc',
          npcId: 'qiaomeilan',
        },
      },
      'after-cup': {
        description: '雾气还是那样轻，但镇上的人看你的眼神已经不完全把你当成刚醒的新手了。公告牌旁边多了一张写着成绩的卡片，杯赛的名字还没散场。',
        objective: '你已经打完雾岸练习杯。先和岳止确认巡回证，再听听林稚禾怎么评价你这场正式首秀。',
        progressSummary: '区域完成度：雾岸练习杯已完成，镇内公告牌已记录你的首场正式赛成绩。',
        primaryAction: {
          label: '领取巡回证',
          type: 'claim-tour-pass',
          nextView: 'pass-issued',
          focusNpcId: 'yuezhi',
        },
        secondaryAction: {
          label: '听林稚禾赛后播报',
          type: 'focus-npc',
          npcId: 'linzhihe',
        },
        npcDialogue: {
          yuezhi: [
            '做得不错。雾岸练习杯的成绩已经记上去了，至少说明你不是那种一出教程就会把球打进公告栏的人。这个世界对新人最大的温柔，也就到这一步。',
            '这是你的巡回证。接下来你可以离开练习镇，去真正有分量的球场了。',
          ],
          linzhihe: [
            '播报更新。新人已经完成雾岸练习杯，并且没有把自己打成笑话，这在这里算相当体面。',
            '下一次你上场，观众就不会只把你当作“刚通过教程的人”了。',
          ],
          tangqi: [
            '看吧，我就说别想着一杆证明自己。你这样一洞一洞把比赛打下来，反而开始像回事了。荒诞归荒诞，分数表可从不陪你演。',
          ],
        },
      },
      'pass-issued': {
        description: '岳止把巡回证递给你之后，雾岸练习镇忽然变得像真正的起点，而不只是新手缓冲带。公告牌旁边挂着一张简化航线图，提醒你这地方之外还有更大的赛程。',
        objective: '巡回证已经到手。先查看世界地图预览，确认离开雾岸练习镇后的第一站。',
        progressSummary: '区域完成度：雾岸训练线已闭环，当前进度允许前往镜湖坡地。',
        primaryAction: {
          label: '查看世界地图预览',
          type: 'open-world-map',
          mapId: 'frontier-preview',
        },
        secondaryAction: {
          label: '再和岳止确认一下',
          type: 'focus-npc',
          npcId: 'yuezhi',
        },
        npcDialogue: {
          yuezhi: [
            '巡回证已经生效了。你现在可以离开雾岸练习镇，报名外部赛程。恭喜，你的异世界求生路线正式从“先别死”升级成“先别丢太大的人”。',
            '先看看航线图。下一站不会像这里一样宽容，但至少你已经不是完全没准备。',
          ],
          qiaomeilan: [
            '拿到巡回证了？那你现在算是能去更远的地方丢人了。进步，确实是进步。日剧一般到这里该放热血配乐，我们这边通常先放冷风。',
          ],
          linzhihe: [
            '从现在开始，你的名字就不只会出现在镇内公告牌。外面的播报名单，也会慢慢记住你。希望他们先记住成绩，不是先记住事故。',
          ],
        },
      },
    },
  },
  'mirror-lake-links': {
    title: '镜湖坡地',
    subtitle: '离开新手区后的第一站',
    progressSummary: '当前阶段：镜湖坡地已开放，区域重心从入门教学转向稳态判断和长滚线控制。',
    visualTheme: 'mirror-lake',
    npcs: [
      {
        id: 'hanmao',
        name: '韩卯',
        role: '刚到不久的新人',
        summary: '前销售，和主角几乎同代的外来者，焦虑、嘴硬，但明显已经在这里摔过几跤。',
        dialogue: [
          '我知道要稳，但我一稳就觉得人生又回去了。结果现在学会了，稳不代表慢，乱才是真的浪费。',
          '你也是刚从雾岸出来？那你应该懂，这里已经不太会给人留侥幸了。镜湖这地方像那种表面很安静的回合，下一秒就把你的人生感想滚下坡。',
        ],
      },
      {
        id: 'mahainan',
        name: '马会南',
        role: '场地维护员',
        summary: '前工地班组长，负责镜湖坡地边界和秩序的人，说话直接，但一听就是懂球的。',
        dialogue: [
          '别把球打出边界，捡球的是我，不是神。镜湖这边坡多，失误比雾岸更会滚。',
          '你要是在这里还能稳住，后面的场地才有继续谈的必要。人来异世界之后还是得上班，只是工种改成被果岭教育。',
        ],
      },
      {
        id: 'mengjibai',
        name: '孟既白',
        role: '巡回装备师',
        summary: '前机械工程师，你在雾岸见过的修整师之一，这次已经提前到了镜湖坡地布置器材。',
        dialogue: [
          '能走到镜湖，说明你至少开始值得我认真讲配置了。这里的坡度会惩罚含糊，装备选择也一样。放心，我讲参数的语气比神谕可靠。',
        ],
      },
    ],
    views: {
      default: {
        description: '镜面一样的湖水贴着球道边缘，风更轻，但地形不再温柔。雾岸教你别乱来，镜湖则会开始要求你把每一杆都打得更像决定。',
        objective: '镜湖坡地的第一场区域赛已经开放。先确认这里的节奏，再报名“镜湖定线赛”，看看你能不能把稳定性带出雾岸。',
        progressSummary: '区域完成度：镜湖定线赛待完成，下一站仍未正式开放。',
        primaryAction: {
          label: '报名镜湖定线赛',
          type: 'start-competition',
          competitionId: 'mirror-lake-marker-cup',
        },
        secondaryAction: {
          label: '听听韩卯的提醒',
          type: 'focus-npc',
          npcId: 'hanmao',
        },
        npcDialogue: {
          hanmao: [
            '欢迎来到镜湖坡地。这里最烦人的地方不是风，是你明明觉得这一杆够稳，结果球还能多滚半个决定。像加班到快下班时又被丢来一个“很小的修改”。',
            '先适应这里吧。后面的比赛，不会像雾岸那样让你先热身很久。',
          ],
        },
      },
      'after-marker-cup': {
        description: '你已经把镜湖的第一场区域赛打完了。坡地、慢风和长滚线没有把你直接送回新手区，镇上的人说话也开始少一点试探，多一点默认你能听懂。',
        objective: '镜湖定线赛已经完成。先听听韩卯和马会南怎么评价你的表现，再决定要不要回巡回航线图看下一站。',
        progressSummary: '区域完成度：镜湖定线赛已完成，烬沙回环现已在巡回航线图上解锁。',
        primaryAction: {
          label: '查看巡回航线图',
          type: 'open-world-map',
          mapId: 'frontier-preview',
        },
        secondaryAction: {
          label: '听韩卯赛后评价',
          type: 'focus-npc',
          npcId: 'hanmao',
        },
        npcDialogue: {
          hanmao: [
            '你居然真把镜湖定线赛打完了，而且看起来还没被这些坡彻底说服去躺平。那说明你已经开始适应正式赛区了。',
            '接下来别再把“新手运气”挂嘴边了。你现在得对自己的判断负责。',
          ],
          mahainan: [
            '行，至少你没把球都送到我负责捡的地方去。镜湖这边认的是耐心，不是脾气。你算过关了。',
          ],
          mengjibai: [
            '你现在终于到了值得我认真给配置建议的阶段。镜湖之后，装备误差和判断误差会一起放大，像两份你都没回的消息一起追上门。',
          ],
        },
      },
    },
  },
  'cinder-dune-circuit': {
    title: '烬沙回环',
    subtitle: '风线与落点开始真正收窄',
    progressSummary: '当前阶段：烬沙回环已开放，这里会把风、落点和风险管理压得更紧。',
    visualTheme: 'cinder-dune',
    npcs: [
      {
        id: 'xutao',
        name: '许萄',
        role: '巡回摄影师',
        summary: '前婚礼摄影师，现在更爱拍人被风线和沙地同时教育的瞬间。',
        dialogue: [
          '烬沙最有意思的不是失误，是人明明知道危险还会试图赌一个更漂亮的落点。镜头可喜欢这种事。',
          '你如果能在这里稳住，照片都会显得你像提前想过。要是稳不住，也很有电影感，只是通常是黑色喜剧。',
        ],
      },
      {
        id: 'acheng',
        name: '阿澄',
        role: '场地观察员',
        summary: '前数据分析师，习惯把风和坡拆成一组一组变量去看，对模糊判断没什么耐心。',
        dialogue: [
          '风和坡都没错，错的是人总以为自己已经把它们都算进去了。烬沙会专门惩罚这种自信，像一封措辞很客气的拒信。',
        ],
      },
      {
        id: 'mahainan',
        name: '马会南',
        role: '外场维护员',
        summary: '前工地班组长，你在镜湖见过他，这次轮到他在更难的场地继续提醒你别拿边界当建议。',
        dialogue: [
          '到了烬沙，边界不是吓人的，是来帮你分清楚哪些想法从一开始就该收回去。这里连沙子都比有些人诚实。',
        ],
      },
    ],
    views: {
      default: {
        description: '沙丘把风线切成一段一段，安全落点比你第一眼看到的更少。这里不喜欢模糊操作，更不喜欢人把侥幸叫灵感。',
        objective: '烬沙回环的第一场区域赛已经开放。先感受这里的风险密度，再报名“烬沙开线赛”，确认自己有没有资格继续往前走。',
        progressSummary: '区域完成度：烬沙开线赛待完成，后续高地区域仍未开放。',
        primaryAction: {
          label: '报名烬沙开线赛',
          type: 'start-competition',
          competitionId: 'cinder-dune-open',
        },
        secondaryAction: {
          label: '听阿澄分析风线',
          type: 'focus-npc',
          npcId: 'acheng',
        },
        npcDialogue: {
          acheng: [
            '烬沙回环的问题从来不是“风大不大”，而是风线会不会刚好把你原本就模糊的落点判断再切碎一点。',
            '先别想着炫技，先学会把风险压进你能接受的范围。',
          ],
        },
      },
      'after-open': {
        description: '你已经把烬沙的第一场区域赛打完了。这里仍然不好说话，但至少开始承认你不是靠运气走到这一步的。',
        objective: '烬沙开线赛已经完成。先听听许萄和阿澄的评价，再回巡回航线图确认高地区域是否出现新的信号。',
        progressSummary: '区域完成度：烬沙开线赛已完成，下一层高地区域开始进入可预期状态。',
        resultSummary: '最近赛果：烬沙开线赛已完赛，区域赛报已更新至更高难度赛区。',
        primaryAction: {
          label: '查看巡回航线图',
          type: 'open-world-map',
          mapId: 'frontier-preview',
        },
        secondaryAction: {
          label: '听许萄赛后观察',
          type: 'focus-npc',
          npcId: 'xutao',
        },
        npcDialogue: {
          xutao: [
            '挺好。你打到后来已经不是在跟风抢话，而是在决定哪句话值得说出口。照片里这种差别会很明显。',
          ],
          acheng: [
            '你至少开始把变量当变量，而不是当借口了。继续保持，后面的区域才值得谈。',
          ],
          mahainan: [
            '行，这回你没把自己打成维护记录。到这一步，算你真的脱离新手区了。',
          ],
        },
      },
    },
  },
  'skyrail-heights': {
    title: '天轨高地',
    subtitle: '开始与高空、长线和耐心较劲',
    progressSummary: '当前阶段：天轨高地已开放，这里会要求你在更长的球路里持续保持判断稳定。',
    visualTheme: 'skyrail-heights',
    npcs: [
      {
        id: 'linzhihe',
        name: '林稚禾',
        role: '高地区域播报员',
        summary: '前电台主播，这次她不只是主持人，更像是在替高地区域把话说得更体面一点。',
        dialogue: [
          '欢迎来到天轨高地。这里的问题不再是你会不会看风，而是你能不能在很长的一洞里一直看对。热血漫画会把这叫成长，我们一般叫别中途发病。',
        ],
      },
      {
        id: 'xutao',
        name: '许萄',
        role: '高地观测员',
        summary: '比起在烬沙看人犹豫，她更喜欢在高地看人怎么和自己的耐心相处。',
        dialogue: [
          '天轨高地拍出来最有意思的，不是飞得多高，是一个人能不能把同一个判断坚持到最后。',
        ],
      },
      {
        id: 'hanmao',
        name: '韩卯',
        role: '先到一步的巡回选手',
        summary: '前销售，你在镜湖见过他，现在他已经把焦虑转成了一点点更靠谱的提醒。',
        dialogue: [
          '别被高地唬住。这里最坏的不是失误，是你打一半突然不信自己前面做过的判断。人一心虚，连云都像在看笑话。',
        ],
      },
    ],
    views: {
      default: {
        description: '高地的球道像被风和高度同时拉长了，容错并没有真的变少，但它会逼你在更久的时间里持续做对同一件事。',
        objective: '天轨高地的第一场区域赛已经开放。先适应这里的长线判断，再报名“天轨升线赛”，确认自己能否在高地区域稳住完整节奏。',
        progressSummary: '区域完成度：天轨升线赛待完成，更高层巡回区仍未正式开放。',
        primaryAction: {
          label: '报名天轨升线赛',
          type: 'start-competition',
          competitionId: 'skyrail-ascent-trial',
        },
        secondaryAction: {
          label: '听韩卯的提醒',
          type: 'focus-npc',
          npcId: 'hanmao',
        },
        npcDialogue: {
          hanmao: [
            '天轨最烦的地方是，你明明知道该怎么打，但洞太长，人就会想在中途改主意。别让这种事发生。',
            '你要是真的能把节奏撑完整，这地方会第一次像是在认真承认你是巡回选手。',
          ],
        },
      },
      'after-ascent': {
        description: '你已经把天轨的第一场区域赛完整撑下来了。高地没有变温柔，但至少开始默认你能把长线判断坚持到底。',
        objective: '天轨升线赛已经完成。先听听林稚禾和许萄怎么评价你的高地表现，然后查看巡回航线图，确认白昼冠城是否已经正式开放。',
        progressSummary: '区域完成度：天轨升线赛已完成，当前章节的四站推进链已经闭环，白昼冠城开始进入可进入状态。',
        resultSummary: '最近赛果：天轨升线赛已完赛，长线高地区域成绩已写入巡回播报。',
        primaryAction: {
          label: '查看巡回航线图',
          type: 'open-world-map',
          mapId: 'frontier-preview',
        },
        secondaryAction: {
          label: '听林稚禾赛后播报',
          type: 'focus-npc',
          npcId: 'linzhihe',
        },
        npcDialogue: {
          linzhihe: [
            '播报更新。你在天轨高地没有只靠一两杆漂亮球硬撑过去，而是把整场节奏真的维持住了。这个评价会比掌声更值钱。',
          ],
          xutao: [
            '高地里最难拍的不是飞行轨迹，是一个人一直没有临场变卦的那股稳定。你这次终于给到我了。',
          ],
          hanmao: [
            '行吧，现在我不能再拿“你也是刚从雾岸出来的人”看你了。你已经走得比那时候远多了。',
          ],
        },
      },
    },
  },
  'white-day-crown-city': {
    title: '白昼冠城',
    subtitle: '真正的世界级赛区开始看你配不配留下',
    progressSummary: '当前阶段：白昼冠城已开放。这里不再把你当作刚完成前线巡回线的人，而是直接按世界级赛区的标准要求稳定度。',
    visualTheme: 'white-day-crown',
    npcs: [
      {
        id: 'jiangyue',
        name: '江越',
        role: '冠城赛务总监',
        summary: '前航空调度员，说话像把所有人都提前排进了赛程表里，礼貌，但完全不会为谁放低标准。',
        dialogue: [
          '欢迎来到白昼冠城。这里不缺会打球的人，所以我们首先看的是谁能在完整赛程里一直做对。要把这理解成欢迎也行，理解成通知也行。',
        ],
      },
      {
        id: 'shenyao',
        name: '沈遥',
        role: '常驻强手',
        summary: '前中学语文老师，你以前只在场边听过她的点评，现在她已经站到了更高层赛区里，像是在等你追上来。',
        dialogue: [
          '能走到这里，说明你已经不需要别人反复提醒基础问题了。接下来麻烦的是，你要学会在高手云集的地方也别把自己的节奏交出去。人生里很多场合都这样，可惜这里会直接记分。',
        ],
      },
      {
        id: 'qinzhao',
        name: '秦照',
        role: '果岭审校员',
        summary: '她负责把赛场修得足够公平，也足够不留情面。所有人都知道，她比风更擅长让人怀疑自己。',
        dialogue: [
          '白昼冠城的问题从来不是难不难，而是你明明看懂了，能不能还是照着那个判断打完。',
        ],
      },
    ],
    views: {
      default: {
        description: '白昼冠城不像前面的城市那样会先给你一点缓冲。它从你踏进来开始就默认你已经打穿了足够多的赛区，只剩下“能不能在世界级标准里持续稳定”这个问题。',
        objective: '报名“白昼定席赛”，用第一场世界级资格赛确认自己是否能在更高层巡回区站稳。这里会把风、线路长度、障碍和心理压力一起摆上来。',
        progressSummary: '区域完成度：白昼定席赛待完成，冠城主赛区尚未正式开放。',
        primaryAction: {
          label: '报名白昼定席赛',
          type: 'start-competition',
          competitionId: 'white-day-crown-qualifier',
        },
        secondaryAction: {
          label: '听沈遥的提醒',
          type: 'focus-npc',
          npcId: 'shenyao',
        },
        npcDialogue: {
          shenyao: [
            '前线巡回线打完，只能证明你能稳定长到这里。白昼冠城的问题是，你能不能在高手旁边也继续相信自己的判断。',
            '别把这里想成领奖台。先把资格赛打到别人没法把你当作“刚上来的新人”。',
          ],
        },
      },
      'after-qualifier': {
        description: '白昼冠城的第一场资格赛已经结束。这里并没有突然变得友好，但至少开始承认你不是误闯进来的名字。',
        objective: '白昼定席赛已经完成。先和江越确认资格赛记录，然后报名“冠城主赛”，确认自己是否能在冠城最核心的赛区继续稳定。',
        progressSummary: '区域完成度：白昼定席赛已完成，冠城主赛区现已开放。',
        resultSummary: '最近赛果：白昼定席赛已完赛，你的名字已经被写进冠城资格赛记录。',
        primaryAction: {
          label: '报名冠城主赛',
          type: 'start-competition',
          competitionId: 'white-day-crown-masters',
        },
        secondaryAction: {
          label: '听江越确认赛务记录',
          type: 'focus-npc',
          npcId: 'jiangyue',
        },
        npcDialogue: {
          jiangyue: [
            '记录已更新。白昼定席赛的资格成绩已经入档，从现在开始，没人能再把你划回“前线试跑”那一栏。',
          ],
          shenyao: [
            '行，这次你不是靠某一洞硬冲进来的。你把整场的稳定度真的带到了世界级赛区，这才算最麻烦也最值钱的那一步。',
          ],
          qinzhao: [
            '白昼冠城不会因为你打完一场资格赛就让路，但至少会承认，你已经值得被更难的果岭认真针对。',
          ],
        },
      },
      'after-masters': {
        description: '冠城主赛已经结束。白昼冠城没有给你多余的掌声，但它开始默认你属于可以继续被更高层赛区认真对待的那一组人。',
        objective: '冠城主赛已经完成。先和江越确认主赛记录，然后报名“世界冠军赛”，确认自己是否已经足够站到白昼冠城最顶层的正式赛事里。',
        progressSummary: '区域完成度：冠城主赛已完成，世界冠军赛现已开放。',
        resultSummary: '最近赛果：冠城主赛已完赛，你已经在白昼冠城主赛区留下完整记录。',
        primaryAction: {
          label: '报名世界冠军赛',
          type: 'start-competition',
          competitionId: 'white-day-world-championship',
        },
        secondaryAction: {
          label: '听江越确认主赛记录',
          type: 'focus-npc',
          npcId: 'jiangyue',
        },
        npcDialogue: {
          jiangyue: [
            '记录已更新。冠城主赛的完整成绩已经入档，这意味着你的名字不再只和资格赛一起出现。',
          ],
          shenyao: [
            '现在你终于不是“刚从前线巡回线上来的人”了。你已经在冠城主赛里把稳定度打成了别人必须承认的事实。',
          ],
          qinzhao: [
            '好消息是，你已经够资格继续往上走。坏消息是，更上面的赛区只会把这种资格当作起点。',
          ],
        },
      },
      'after-championship': {
        description: '世界冠军赛已经结束。白昼冠城终于把你从“值得关注的名字”改成了真正站上顶点的人，但它也同时把你送到了所有普通赛事逻辑的尽头。',
        objective: '世界冠军赛已经完成。先和江越确认世界冠军赛记录，再查看巡回航线图并前往通天塔，完成这条推进线最后剩下的终章赛程。',
        progressSummary: '区域完成度：世界冠军赛已完成，通天塔现已成为唯一剩下的终章目标。',
        resultSummary: '最近赛果：世界冠军赛已完赛，你已经在白昼冠城拿到了最高级别的正式赛记录。',
        primaryAction: {
          label: '查看巡回航线图',
          type: 'open-world-map',
          mapId: 'frontier-preview',
        },
        secondaryAction: {
          label: '听江越确认冠军记录',
          type: 'focus-npc',
          npcId: 'jiangyue',
        },
        npcDialogue: {
          jiangyue: [
            '记录已更新。世界冠军赛的完整成绩已经入档，从现在开始，白昼冠城不会再用“潜力”这个词描述你。',
          ],
          shenyao: [
            '行，这次你不是闯进顶层赛区，而是真的把最核心那场比赛打赢了。接下来已经不是普通赛事会回答你的问题了。',
          ],
          qinzhao: [
            '通天塔终于会认真看你一眼了。别高兴太早，那地方大概不会像白昼冠城这样还愿意按赛事逻辑和你讲道理。',
          ],
        },
      },
    },
  },
  'heaven-spire': {
    title: '通天塔',
    subtitle: '普通赛事已经结束，剩下的是这个世界最后的一次回应',
    progressSummary: '当前阶段：通天塔已开放。这里不再按普通巡回赛区的逻辑评价你，而是把整条推进线最后的意义压成一段仪式性终章。',
    visualTheme: 'heaven-spire',
    npcs: [
      {
        id: 'sprite',
        name: '精灵',
        role: '最后的引导者',
        summary: '它一路陪你说了很多碎话，到了这里反而第一次像是真的在认真看你要把最后一杆打成什么。',
        dialogue: [
          '走到这里之后，已经没有谁还能继续拿“你只是运气不错”这种话糊弄过去了。通天塔只会问最后一个问题。',
        ],
      },
      {
        id: 'jiangyue',
        name: '江越',
        role: '最后的赛务见证人',
        summary: '他不是来主持赛事流程的，更像是来确认你已经把普通赛事能完成的事情都做完了。',
        dialogue: [
          '从赛务角度讲，这里已经超出了正常巡回赛可以解释的范围。但从记录角度讲，你确实一步没跳地走到了这里。',
        ],
      },
      {
        id: 'deity-echo',
        name: '神灵回声',
        role: '终章的回应',
        summary: '它并没有像史诗故事那样正式登场，更像是一种一直等你把最后一杆打出来的规则本身。',
        dialogue: [
          '你终于把自己沿着这一整条球路送到了这里。那么，最后一击该由谁来定义它的意义？',
        ],
      },
    ],
    views: {
      default: {
        description: '通天塔没有像别的城市那样给你一个正常入口。它更像是把前面所有赛事的重量重新压缩成了三洞，每一洞都不只是考验技巧，而是在逼你给这条推进线一个最后答案。',
        objective: '报名“通天塔终章”，完成整条推进线最后的三洞。这里不再强调普通意义上的晋级，而是要把最后一击变成真正的收束。',
        progressSummary: '终章完成度：通天塔终章待完成。',
        primaryAction: {
          label: '进入通天塔终章',
          type: 'start-competition',
          competitionId: 'heaven-spire-last-shot',
        },
        secondaryAction: {
          label: '听精灵最后的提醒',
          type: 'focus-npc',
          npcId: 'sprite',
        },
        npcDialogue: {
          sprite: [
            '别把这里当普通决赛。通天塔最烦的是，它会逼你承认自己一路到底是怎么走过来的。',
            '最后三洞没有谁能替你总结，你只能自己把最后一杆打成答案。',
          ],
        },
      },
      'after-finale': {
        description: '通天塔终章已经结束。这里没有传统意义上的颁奖和掌声，只有一种像黑屏前最后一次回声那样的安静，提醒你这条球路终于真的走完了。',
        objective: '通天塔终章已经完成。先听精灵和神灵回声如何回应最后一击，再从巡回航线图回看这条已经闭环的推进线。',
        progressSummary: '终章完成度：通天塔终章已完成，整条推进链正式闭环。',
        resultSummary: '最近赛果：通天塔终章已完赛，最后一击已经被写进这条推进线的终局记录。',
        primaryAction: {
          label: '查看巡回航线图',
          type: 'open-world-map',
          mapId: 'frontier-preview',
        },
        secondaryAction: {
          label: '听神灵回声',
          type: 'focus-npc',
          npcId: 'deity-echo',
        },
        npcDialogue: {
          sprite: [
            '好吧，这下我不能再说你只是一步一步勉强走过来的了。你真的把整条推进线从头打到了尽头。',
          ],
          jiangyue: [
            '按任何能被记录的标准看，你都已经把这条赛程完整完成了。至于通天塔之后该怎么命名，那已经不是赛务会继续决定的事。',
          ],
          'deity-echo': [
            '很好。你没有把最后一击打成侥幸，也没有把它交给空话。那么，回去吧，或者继续坠落吧。答案已经在那一杆里。',
          ],
        },
      },
    },
  },
};