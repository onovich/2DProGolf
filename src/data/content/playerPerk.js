export const PLAYER_PERK_CONTENT = {
  'frontier-wind-reading': {
    title: '巡回心得：稳态读风',
    summary: '你已经学会在更长的球路里持续修正判断。空中受风偏移略微降低，逆风下的最低推进更稳定。',
    citySummary: '稳态读风已启用：空中风偏 -12%，逆风最低推进 +6%。',
    modifiers: {
      airborneWindMultiplier: 0.88,
      headwindForwardClampBonus: 0.06,
    },
  },
  'crown-landing-control': {
    title: '巡回心得：冠城停球',
    summary: '你开始学会在高压赛区里把落点管理成可复盘的结果。首跳弹起更低，落地后的滑出更短。',
    citySummary: '冠城停球已启用：首跳弹起 -18%，落地滑出 -12%。',
    modifiers: {
      landingBounceMultiplier: 0.82,
      landingFrictionMultiplier: 0.88,
    },
  },
  'champion-read-line': {
    title: '巡回心得：冠军定线',
    summary: '你开始在终盘赛事里把果岭读线压成稳定执行。推杆受坡影响略微降低，更容易把终盘节奏收住。',
    citySummary: '冠军定线已启用：推杆受坡影响 -16%。',
    modifiers: {
      putterSlopeMultiplier: 0.84,
    },
  },
};