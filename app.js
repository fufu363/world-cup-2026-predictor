const STORAGE_KEY = "goalmap-2026-manual-bracket-v4";
const LANGUAGE_KEY = "goalmap-2026-language";
const REAL_DATA = window.GOALMAP_REAL_DATA;
const LIVE_DATA_SOURCE = {
  groups: "https://worldcup26.ir/get/groups",
  games: "https://worldcup26.ir/get/games",
};
const LIVE_DATA_TIMEOUT_MS = 12000;
const GROUP_ORDER = "ABCDEFGHIJKL".split("");
const API_TEAM_IDS = {
  1: "mex", 2: "rsa", 3: "kor", 4: "cze",
  5: "can", 6: "bih", 7: "qat", 8: "sui",
  9: "bra", 10: "mar", 11: "hai", 12: "sco",
  13: "usa", 14: "par", 15: "aus", 16: "tur",
  17: "ger", 18: "cur", 19: "civ", 20: "ecu",
  21: "ned", 22: "jpn", 23: "swe", 24: "tun",
  25: "bel", 26: "egy", 27: "irn", 28: "nzl",
  29: "esp", 30: "cpv", 31: "ksa", 32: "uru",
  33: "fra", 34: "sen", 35: "irq", 36: "nor",
  37: "arg", 38: "alg", 39: "aut", 40: "jor",
  41: "por", 42: "cod", 43: "uzb", 44: "col",
  45: "eng", 46: "cro", 47: "gha", 48: "pan",
};

const TEAM_DATA = {
  mex: ["墨西哥", "Mexico", "MX"], rsa: ["南非", "South Africa", "ZA"], kor: ["韩国", "South Korea", "KR"], cze: ["捷克", "Czechia", "CZ"],
  can: ["加拿大", "Canada", "CA"], bih: ["波黑", "Bosnia and Herzegovina", "BA"], qat: ["卡塔尔", "Qatar", "QA"], sui: ["瑞士", "Switzerland", "CH"],
  bra: ["巴西", "Brazil", "BR"], mar: ["摩洛哥", "Morocco", "MA"], hai: ["海地", "Haiti", "HT"], sco: ["苏格兰", "Scotland", "SC"],
  usa: ["美国", "United States", "US"], par: ["巴拉圭", "Paraguay", "PY"], aus: ["澳大利亚", "Australia", "AU"], tur: ["土耳其", "Türkiye", "TR"],
  ger: ["德国", "Germany", "DE"], cur: ["库拉索", "Curaçao", "CW"], civ: ["科特迪瓦", "Ivory Coast", "CI"], ecu: ["厄瓜多尔", "Ecuador", "EC"],
  ned: ["荷兰", "Netherlands", "NL"], jpn: ["日本", "Japan", "JP"], swe: ["瑞典", "Sweden", "SE"], tun: ["突尼斯", "Tunisia", "TN"],
  bel: ["比利时", "Belgium", "BE"], egy: ["埃及", "Egypt", "EG"], irn: ["伊朗", "Iran", "IR"], nzl: ["新西兰", "New Zealand", "NZ"],
  esp: ["西班牙", "Spain", "ES"], cpv: ["佛得角", "Cape Verde", "CV"], ksa: ["沙特阿拉伯", "Saudi Arabia", "SA"], uru: ["乌拉圭", "Uruguay", "UY"],
  fra: ["法国", "France", "FR"], sen: ["塞内加尔", "Senegal", "SN"], irq: ["伊拉克", "Iraq", "IQ"], nor: ["挪威", "Norway", "NO"],
  arg: ["阿根廷", "Argentina", "AR"], alg: ["阿尔及利亚", "Algeria", "DZ"], aut: ["奥地利", "Austria", "AT"], jor: ["约旦", "Jordan", "JO"],
  por: ["葡萄牙", "Portugal", "PT"], cod: ["刚果（金）", "DR Congo", "CD"], uzb: ["乌兹别克斯坦", "Uzbekistan", "UZ"], col: ["哥伦比亚", "Colombia", "CO"],
  eng: ["英格兰", "England", "EN"], cro: ["克罗地亚", "Croatia", "HR"], gha: ["加纳", "Ghana", "GH"], pan: ["巴拿马", "Panama", "PA"],
};

const TRANSLATIONS = {
  zh: {
    pageTitle: "GoalMap · 2026 世界杯预测模拟器",
    pageDescription: "从小组排名开始，手动完成 2026 世界杯完整对阵预测。",
    brandHome: "GoalMap 首页",
    predictionSteps: "预测步骤",
    predictionProgress: "预测进度",
    navGroups: "小组排名",
    navThirds: "最佳第三",
    navKnockout: "淘汰赛",
    dataSnapshot: "手动数据快照",
    dataLoading: "正在联网更新",
    dataLive: "已联网更新",
    dataFallback: "使用内置快照",
    refreshData: "刷新联网数据",
    restart: "重新开始",
    heroTitle: "世界杯预测模拟器",
    heroDescription: "小组赛最终排名已经锁定，真实淘汰赛结果会自动写入；未完赛的路径继续由你亲手预测。",
    completion: "预测完成度",
    startPrediction: "开始我的预测",
    teamsCount: "支球队",
    groupsCount: "个小组",
    thirdsCount: "个最佳第三",
    knockoutCount: "强淘汰赛",
    waitingChampion: "等待你的冠军",
    updatedAt: "当前积分数据更新于",
    officialStandings: "查看 FIFA 官方积分榜 ↗",
    stepGroups: "排列小组",
    stepGroupsHint: "小组赛已锁定",
    adjustAnytime: "最终排名",
    stepThirds: "最佳第三",
    stepThirdsHint: "前 8 名自动晋级",
    stepChampion: "选择冠军",
    stepChampionHint: "逐场点击晋级",
    groupsTitle: "从当前真实积分榜继续预测",
    groupsDescription: "小组赛已经结束，积分、净胜球和最终排名已锁定；淘汰赛继续由你预测。",
    autosave: "自动保存",
    restoreStandings: "恢复真实排名",
    legendDirect: "直接晋级",
    legendThird: "进入最佳第三比较",
    legendOut: "暂时出局",
    thirdsTitle: "再排一次：谁是最好的第三名？",
    thirdsDescription: "12 支小组第三名已经按最终积分排序，前 8 队进入 32 强。",
    thirdsCounter: "/ 12 晋级",
    rank: "排名",
    teamLabel: "球队",
    source: "来源",
    status: "状态",
    qualificationLine: "晋级线",
    qualificationHint: "上方 8 队晋级 · 下方 4 队出局",
    thirdsNote: "小组赛已全部结束，第三名晋级/出局状态已确认；第三名进入 32 强后的落位按 FIFA 官方组合映射生成。",
    bracketTitle: "完整冠军路径",
    bracketDescription: "从 32 强开始点击你看好的球队，它会自动出现在下一轮。",
    matchesSelected: "/ 31 场已选择",
    clearBracket: "清空淘汰赛",
    syncKnockout: "同步真实淘汰赛",
    clickToAdvance: "真实赛果已锁定，未赛场次仍可预测",
    selected: "已选择",
    waitingPrevious: "等待上轮结果",
    round32: "32 强",
    round16: "16 强",
    quarterFinals: "1/4 决赛",
    semiFinals: "半决赛",
    final: "决赛",
    yourChampion: "你的预测冠军",
    summaryTitle: "一套逻辑，看到底。",
    summaryOneTitle: "小组排名随手拖",
    summaryOneText: "不录比分，不填复杂表格，直接表达你心里的最终排名。",
    summaryTwoTitle: "晋级关系自动串联",
    summaryTwoText: "小组排名变化后，32 强入口和后续路径会同步更新。",
    summaryThreeTitle: "所有选择本地保存",
    summaryThreeText: "关掉页面也不怕，回来可以继续完成你的冠军故事。",
    footerDisclaimer: "积分数据来自公开赛事数据源，并以 FIFA 官方页面交叉核对 · 非 FIFA 官方产品",
    groupTitle: "{group} 组",
    topTwoAdvance: "前 2 名晋级",
    playedShort: "赛",
    goalDifferenceShort: "净",
    pointsShort: "分",
    directAdvance: "直接晋级",
    bestThird: "最佳第三",
    outsideComparison: "比较区外",
    temporarilyOut: "暂时出局",
    clinchedTopTwo: "已锁定小组前二",
    dragToRank: "拖动调整排名",
    thirdSource: "{group} 组 · {points}分 · {gd}",
    provisionalQualified: "暂列晋级区",
    provisionalOutside: "暂列区外",
    confirmedThirdQualified: "确认晋级",
    confirmedThirdOutside: "已出局",
    groupStageLocked: "小组赛已锁定",
    realResult: "真实赛果",
    realResultScore: "真实赛果 · {score}",
    waitingWinner: "等待 M{match} 胜者",
    chooseAdvance: "选择 {team} 晋级",
    choose: "选择",
    championEmpty: "等待决赛结果",
    championEmptyPath: "完成 31 场选择，见证冠军诞生",
    championPath: "{group} 组出线 · 连赢 5 场捧杯",
    championToast: "{team}成为你的 2026 世界杯冠军！",
    groupUpdatedToast: "小组排名已更新，淘汰赛选择已清空",
    thirdUpdatedToast: "最佳第三排名已更新，32 强签表已重新生成",
    restoredToast: "已恢复当前真实积分排名",
    resetToast: "新的预测已经准备好",
    bracketClearedToast: "未完赛预测已清空，真实赛果保留",
    groupStageLockedToast: "小组赛已经结束，排名已锁定",
    realResultLockedToast: "这场已经有真实赛果，不能修改",
    noRealResultsToast: "目前还没有可同步的淘汰赛赛果",
    realResultsSyncedToast: "已同步 {count} 场真实淘汰赛结果",
    liveDataLoadedToast: "已更新到最新联网数据",
    liveDataFailedToast: "联网更新失败，继续使用内置快照",
  },
  en: {
    pageTitle: "GoalMap · 2026 World Cup Predictor",
    pageDescription: "Build your complete 2026 World Cup bracket from the group standings to the final.",
    brandHome: "GoalMap home",
    predictionSteps: "Prediction steps",
    predictionProgress: "Prediction progress",
    navGroups: "Group standings",
    navThirds: "Best third-placed",
    navKnockout: "Knockout stage",
    dataSnapshot: "Manual data snapshot",
    dataLoading: "Updating online",
    dataLive: "Online data loaded",
    dataFallback: "Using bundled snapshot",
    refreshData: "Refresh online data",
    restart: "Start over",
    heroTitle: "World Cup Predictor",
    heroDescription: "The final group standings are locked, real knockout results are applied automatically, and the remaining path is still yours to predict.",
    completion: "Prediction complete",
    startPrediction: "Start predicting",
    teamsCount: "teams",
    groupsCount: "groups",
    thirdsCount: "best third-place teams",
    knockoutCount: "team knockout",
    waitingChampion: "Your champion awaits",
    updatedAt: "Standings snapshot updated",
    officialStandings: "View FIFA standings ↗",
    stepGroups: "Rank the groups",
    stepGroupsHint: "Group stage locked",
    adjustAnytime: "Final table",
    stepThirds: "Best third-placed",
    stepThirdsHint: "Top 8 advance",
    stepChampion: "Pick a champion",
    stepChampionHint: "Choose every winner",
    groupsTitle: "Predict from the current standings",
    groupsDescription: "The group stage is complete, so the final standings are locked. Continue predicting the knockout stage.",
    autosave: "Autosaved",
    restoreStandings: "Restore standings",
    legendDirect: "Direct qualification",
    legendThird: "Third-place comparison",
    legendOut: "Currently out",
    thirdsTitle: "Which third-placed teams advance?",
    thirdsDescription: "The 12 third-placed teams are ordered by the final standings. The top eight enter the round of 32.",
    thirdsCounter: "/ 12 advance",
    rank: "Rank",
    teamLabel: "Team",
    source: "Group",
    status: "Status",
    qualificationLine: "Qualification line",
    qualificationHint: "Top 8 advance · Bottom 4 go out",
    thirdsNote: "The group stage is complete. Third-place qualification is confirmed, and round-of-32 slots follow the official FIFA combination mapping.",
    bracketTitle: "Complete path to the trophy",
    bracketDescription: "Choose a team in each match and it will move automatically into the next round.",
    matchesSelected: "/ 31 matches picked",
    clearBracket: "Clear knockout picks",
    syncKnockout: "Sync real knockout",
    clickToAdvance: "Real results are locked. Unplayed matches remain open.",
    selected: "Selected",
    waitingPrevious: "Waiting for previous round",
    round32: "Round of 32",
    round16: "Round of 16",
    quarterFinals: "Quarter-finals",
    semiFinals: "Semi-finals",
    final: "Final",
    yourChampion: "Your predicted champion",
    summaryTitle: "One bracket. Every decision.",
    summaryOneTitle: "Drag group standings",
    summaryOneText: "No score entry or complicated tables—just arrange teams in your predicted final order.",
    summaryTwoTitle: "Automatic bracket links",
    summaryTwoText: "Changing a group or third-place order immediately updates the round of 32 and the full path.",
    summaryThreeTitle: "Saved on your device",
    summaryThreeText: "Close the page and return later—your bracket stays saved in your browser.",
    footerDisclaimer: "Standings use public competition data cross-checked with FIFA · Not an official FIFA product",
    groupTitle: "Group {group}",
    topTwoAdvance: "Top 2 advance",
    playedShort: "P",
    goalDifferenceShort: "GD",
    pointsShort: "Pts",
    directAdvance: "Direct",
    bestThird: "Best third",
    outsideComparison: "Outside top 8",
    temporarilyOut: "Currently out",
    clinchedTopTwo: "Top two clinched",
    dragToRank: "Drag to change ranking",
    thirdSource: "Group {group} · {points} pts · {gd}",
    provisionalQualified: "Provisional top 8",
    provisionalOutside: "Provisional outside",
    confirmedThirdQualified: "Qualified",
    confirmedThirdOutside: "Eliminated",
    groupStageLocked: "Group stage locked",
    realResult: "Real result",
    realResultScore: "Real result · {score}",
    waitingWinner: "Winner of M{match}",
    chooseAdvance: "Advance {team}",
    choose: "Pick",
    championEmpty: "Waiting for the final",
    championEmptyPath: "Complete all 31 picks to crown your champion",
    championPath: "Advanced from Group {group} · Won 5 knockout matches",
    championToast: "{team} is your 2026 World Cup champion!",
    groupUpdatedToast: "Group order updated. Knockout picks were cleared.",
    thirdUpdatedToast: "Third-place order updated. The round of 32 was rebuilt.",
    restoredToast: "Current standings restored",
    resetToast: "A new prediction is ready",
    bracketClearedToast: "Unplayed knockout picks cleared. Real results were kept.",
    groupStageLockedToast: "The group stage is complete. Standings are locked.",
    realResultLockedToast: "This match already has a real result and cannot be changed.",
    noRealResultsToast: "There are no knockout results to sync yet.",
    realResultsSyncedToast: "Synced {count} real knockout results.",
    liveDataLoadedToast: "Updated to the latest online data.",
    liveDataFailedToast: "Online update failed. Keeping the bundled snapshot.",
  },
};

let liveData = structuredClone(REAL_DATA);
let INITIAL_GROUPS = structuredClone(liveData.groups);
let GROUP_IDS = Object.keys(INITIAL_GROUPS);
let INITIAL_THIRD_ORDER = [...liveData.thirdOrder];
let GROUP_STAGE_LOCKED = isGroupStageLocked(liveData);
let REAL_KNOCKOUT_RESULTS = liveData.knockoutResults ?? {};
let snapshotGroups = structuredClone(INITIAL_GROUPS);
let snapshotThirdOrder = [...INITIAL_THIRD_ORDER];
let snapshotStats = structuredClone(liveData.stats);
let snapshotUpdatedAt = liveData.updatedAt;

// Rendered in bracket-path order, not numeric match order, so adjacent matches feed the next round visually.
const ROUND_32_TEMPLATES = [
  { no: 74, a: "1E", thirdSlot: 0 },
  { no: 77, a: "1I", thirdSlot: 1 },
  { no: 73, a: "2A", b: "2B" },
  { no: 75, a: "1F", b: "2C" },
  { no: 83, a: "2K", b: "2L" },
  { no: 84, a: "1H", b: "2J" },
  { no: 81, a: "1D", thirdSlot: 4 },
  { no: 82, a: "1G", thirdSlot: 5 },
  { no: 76, a: "1C", b: "2F" },
  { no: 78, a: "2E", b: "2I" },
  { no: 79, a: "1A", thirdSlot: 2 },
  { no: 80, a: "1L", thirdSlot: 3 },
  { no: 86, a: "1J", b: "2H" },
  { no: 88, a: "2D", b: "2G" },
  { no: 85, a: "1B", thirdSlot: 6 },
  { no: 87, a: "1K", thirdSlot: 7 },
];

const ROUND_DEFINITIONS = [
  {
    key: "r16",
    container: "round16",
    matches: [
      [89, 74, 77], [90, 73, 75], [93, 83, 84], [94, 81, 82],
      [91, 76, 78], [92, 79, 80], [95, 86, 88], [96, 85, 87],
    ],
  },
  {
    key: "qf",
    container: "quarterFinals",
    matches: [[97, 89, 90], [98, 93, 94], [99, 91, 92], [100, 95, 96]],
  },
  {
    key: "sf",
    container: "semiFinals",
    matches: [[101, 97, 98], [102, 99, 100]],
  },
  {
    key: "final",
    container: "finalRound",
    matches: [[104, 101, 102]],
  },
];

const DEFAULT_THIRD_SLOT_GROUPS = ["C", "F", "H", "E", "B", "A", "G", "D"];
const THIRD_SLOT_WINNER_GROUPS = ["E", "I", "A", "L", "D", "G", "B", "K"];
// FIFA Annex C third-place allocation table. Values are ordered by the match slots above.
const OFFICIAL_THIRD_MAPS = {
  EFGHIJKL: "FGEKIHJL",
  DFGHIJKL: "DFHKIJGL",
  DEGHIJKL: "DGEKIHJL",
  DEFHIJKL: "DFEKIHJL",
  DEFGIJKL: "DFEKIJGL",
  DEFGHJKL: "DFEKJHGL",
  DEFGHIKL: "DFEKIHGL",
  DEFGHIJL: "DFEIJHGL",
  DEFGHIJK: "DFEKJHGI",
  CFGHIJKL: "CFHKIJGL",
  CEGHIJKL: "CGEKIHJL",
  CEFHIJKL: "CFEKIHJL",
  CEFGIJKL: "CFEKIJGL",
  CEFGHJKL: "CFEKJHGL",
  CEFGHIKL: "CFEKIHGL",
  CEFGHIJL: "CFEIJHGL",
  CEFGHIJK: "CFEKJHGI",
  CDGHIJKL: "CDHKIJGL",
  CDFHIJKL: "DFCKIHJL",
  CDFGIJKL: "DFCKIJGL",
  CDFGHJKL: "DFCKJHGL",
  CDFGHIKL: "DFCKIHGL",
  CDFGHIJL: "DFCIJHGL",
  CDFGHIJK: "DFCKJHGI",
  CDEHIJKL: "CDEKIHJL",
  CDEGIJKL: "CDEKIJGL",
  CDEGHJKL: "CDEKJHGL",
  CDEGHIKL: "CDEKIHGL",
  CDEGHIJL: "CDEIJHGL",
  CDEGHIJK: "CDEKJHGI",
  CDEFIJKL: "DFCKEIJL",
  CDEFHJKL: "DFCKEHJL",
  CDEFHIKL: "DFCKIHEL",
  CDEFHIJL: "DFCIEHJL",
  CDEFHIJK: "DFCKEHJI",
  CDEFGJKL: "DFCKEJGL",
  CDEFGIKL: "DFCKEIGL",
  CDEFGIJL: "DFCIEJGL",
  CDEFGIJK: "DFCKEJGI",
  CDEFGHKL: "DFCKEHGL",
  CDEFGHJL: "DFCEJHGL",
  CDEFGHJK: "DFCKJHGE",
  CDEFGHIL: "DFCIEHGL",
  CDEFGHIK: "DFCKEHGI",
  CDEFGHIJ: "DFCIJHGE",
  BFGHIJKL: "FGHKBIJL",
  BEGHIJKL: "BGEKIHJL",
  BEFHIJKL: "FHEKBIJL",
  BEFGIJKL: "FGEKBIJL",
  BEFGHJKL: "FGEKBHJL",
  BEFGHIKL: "FHEKBIGL",
  BEFGHIJL: "FGEIBHJL",
  BEFGHIJK: "FGEKBHJI",
  BDGHIJKL: "DGHKBIJL",
  BDFHIJKL: "DFHKBIJL",
  BDFGIJKL: "DFIKBJGL",
  BDFGHJKL: "DFHKBJGL",
  BDFGHIKL: "DFHKBIGL",
  BDFGHIJL: "DFHIBJGL",
  BDFGHIJK: "DFHKBJGI",
  BDEHIJKL: "DHEKBIJL",
  BDEGIJKL: "DGEKBIJL",
  BDEGHJKL: "DGEKBHJL",
  BDEGHIKL: "DHEKBIGL",
  BDEGHIJL: "DGEIBHJL",
  BDEGHIJK: "DGEKBHJI",
  BDEFIJKL: "DFEKBIJL",
  BDEFHJKL: "DFEKBHJL",
  BDEFHIKL: "DFEKBHIL",
  BDEFHIJL: "DFEIBHJL",
  BDEFHIJK: "DFEKBHJI",
  BDEFGJKL: "DFEKBJGL",
  BDEFGIKL: "DFEKBIGL",
  BDEFGIJL: "DFEIBJGL",
  BDEFGIJK: "DFEKBJGI",
  BDEFGHKL: "DFEKBHGL",
  BDEFGHJL: "DFHEBJGL",
  BDEFGHJK: "DFHKBJGE",
  BDEFGHIL: "DFEIBHGL",
  BDEFGHIK: "DFEKBHGI",
  BDEFGHIJ: "DFHIBJGE",
  BCGHIJKL: "CGHKBIJL",
  BCFHIJKL: "CFHKBIJL",
  BCFGIJKL: "CFIKBJGL",
  BCFGHJKL: "CFHKBJGL",
  BCFGHIKL: "CFHKBIGL",
  BCFGHIJL: "CFHIBJGL",
  BCFGHIJK: "CFHKBJGI",
  BCEHIJKL: "CHEKBIJL",
  BCEGIJKL: "CGEKBIJL",
  BCEGHJKL: "CGEKBHJL",
  BCEGHIKL: "CHEKBIGL",
  BCEGHIJL: "CGEIBHJL",
  BCEGHIJK: "CGEKBHJI",
  BCEFIJKL: "CFEKBIJL",
  BCEFHJKL: "CFEKBHJL",
  BCEFHIKL: "CFEKBHIL",
  BCEFHIJL: "CFEIBHJL",
  BCEFHIJK: "CFEKBHJI",
  BCEFGJKL: "CFEKBJGL",
  BCEFGIKL: "CFEKBIGL",
  BCEFGIJL: "CFEIBJGL",
  BCEFGIJK: "CFEKBJGI",
  BCEFGHKL: "CFEKBHGL",
  BCEFGHJL: "CFHEBJGL",
  BCEFGHJK: "CFHKBJGE",
  BCEFGHIL: "CFEIBHGL",
  BCEFGHIK: "CFEKBHGI",
  BCEFGHIJ: "CFHIBJGE",
  BCDHIJKL: "CDHKBIJL",
  BCDGIJKL: "CDIKBJGL",
  BCDGHJKL: "CDHKBJGL",
  BCDGHIKL: "CDHKBIGL",
  BCDGHIJL: "CDHIBJGL",
  BCDGHIJK: "CDHKBJGI",
  BCDFIJKL: "DFCKBIJL",
  BCDFHJKL: "DFCKBHJL",
  BCDFHIKL: "DFCKBHIL",
  BCDFHIJL: "DFCIBHJL",
  BCDFHIJK: "DFCKBHJI",
  BCDFGJKL: "DFCKBJGL",
  BCDFGIKL: "DFCKBIGL",
  BCDFGIJL: "DFCIBJGL",
  BCDFGIJK: "DFCKBJGI",
  BCDFGHKL: "DFCKBHGL",
  BCDFGHJL: "DFCJBHGL",
  BCDFGHJK: "CFHKBJGD",
  BCDFGHIL: "DFCIBHGL",
  BCDFGHIK: "DFCKBHGI",
  BCDFGHIJ: "CFHIBJGD",
  BCDEIJKL: "CDEKBIJL",
  BCDEHJKL: "CDEKBHJL",
  BCDEHIKL: "CDEKBHIL",
  BCDEHIJL: "CDEIBHJL",
  BCDEHIJK: "CDEKBHJI",
  BCDEGJKL: "CDEKBJGL",
  BCDEGIKL: "CDEKBIGL",
  BCDEGIJL: "CDEIBJGL",
  BCDEGIJK: "CDEKBJGI",
  BCDEGHKL: "CDEKBHGL",
  BCDEGHJL: "CDHEBJGL",
  BCDEGHJK: "CDHKBJGE",
  BCDEGHIL: "CDEIBHGL",
  BCDEGHIK: "CDEKBHGI",
  BCDEGHIJ: "CDHIBJGE",
  BCDEFJKL: "DFCKBEJL",
  BCDEFIKL: "DFCKBIEL",
  BCDEFIJL: "DFCIBEJL",
  BCDEFIJK: "DFCKBEJI",
  BCDEFHKL: "DFCKBHEL",
  BCDEFHJL: "DFCEBHJL",
  BCDEFHJK: "DFCKBHJE",
  BCDEFHIL: "DFCIBHEL",
  BCDEFHIK: "DFCKBHEI",
  BCDEFHIJ: "DFCIBHJE",
  BCDEFGKL: "DFCKBEGL",
  BCDEFGJL: "DFCEBJGL",
  BCDEFGJK: "DFCKBJGE",
  BCDEFGIL: "DFCIBEGL",
  BCDEFGIK: "DFCKBEGI",
  BCDEFGIJ: "DFCIBJGE",
  BCDEFGHL: "DFCEBHGL",
  BCDEFGHK: "DFCKBHGE",
  BCDEFGHJ: "CFHEBJGD",
  BCDEFGHI: "DFCIBHGE",
  AFGHIJKL: "FGHKIAJL",
  AEGHIJKL: "AGEKIHJL",
  AEFHIJKL: "FHEKIAJL",
  AEFGIJKL: "FGEKIAJL",
  AEFGHJKL: "FHEKJAGL",
  AEFGHIKL: "FHEKIAGL",
  AEFGHIJL: "FHEIJAGL",
  AEFGHIJK: "FHEKJAGI",
  ADGHIJKL: "DGHKIAJL",
  ADFHIJKL: "DFHKIAJL",
  ADFGIJKL: "DFIKJAGL",
  ADFGHJKL: "DFHKJAGL",
  ADFGHIKL: "DFHKIAGL",
  ADFGHIJL: "DFHIJAGL",
  ADFGHIJK: "DFHKJAGI",
  ADEHIJKL: "DHEKIAJL",
  ADEGIJKL: "DGEKIAJL",
  ADEGHJKL: "DHEKJAGL",
  ADEGHIKL: "DHEKIAGL",
  ADEGHIJL: "DHEIJAGL",
  ADEGHIJK: "DHEKJAGI",
  ADEFIJKL: "DFEKIAJL",
  ADEFHJKL: "DFHKEAJL",
  ADEFHIKL: "DFHKIAEL",
  ADEFHIJL: "DFHIEAJL",
  ADEFHIJK: "DFHKEAJI",
  ADEFGJKL: "DFEKJAGL",
  ADEFGIKL: "DFEKIAGL",
  ADEFGIJL: "DFEIJAGL",
  ADEFGIJK: "DFEKJAGI",
  ADEFGHKL: "DFHKEAGL",
  ADEFGHJL: "DFHEJAGL",
  ADEFGHJK: "DFHKJAGE",
  ADEFGHIL: "DFHIEAGL",
  ADEFGHIK: "DFHKEAGI",
  ADEFGHIJ: "DFHIJAGE",
  ACGHIJKL: "CGHKIAJL",
  ACFHIJKL: "CFHKIAJL",
  ACFGIJKL: "CFIKJAGL",
  ACFGHJKL: "CFHKJAGL",
  ACFGHIKL: "CFHKIAGL",
  ACFGHIJL: "CFHIJAGL",
  ACFGHIJK: "CFHKJAGI",
  ACEHIJKL: "CHEKIAJL",
  ACEGIJKL: "CGEKIAJL",
  ACEGHJKL: "CHEKJAGL",
  ACEGHIKL: "CHEKIAGL",
  ACEGHIJL: "CHEIJAGL",
  ACEGHIJK: "CHEKJAGI",
  ACEFIJKL: "CFEKIAJL",
  ACEFHJKL: "CFHKEAJL",
  ACEFHIKL: "CFHKIAEL",
  ACEFHIJL: "CFHIEAJL",
  ACEFHIJK: "CFHKEAJI",
  ACEFGJKL: "CFEKJAGL",
  ACEFGIKL: "CFEKIAGL",
  ACEFGIJL: "CFEIJAGL",
  ACEFGIJK: "CFEKJAGI",
  ACEFGHKL: "CFHKEAGL",
  ACEFGHJL: "CFHEJAGL",
  ACEFGHJK: "CFHKJAGE",
  ACEFGHIL: "CFHIEAGL",
  ACEFGHIK: "CFHKEAGI",
  ACEFGHIJ: "CFHIJAGE",
  ACDHIJKL: "CDHKIAJL",
  ACDGIJKL: "CDIKJAGL",
  ACDGHJKL: "CDHKJAGL",
  ACDGHIKL: "CDHKIAGL",
  ACDGHIJL: "CDHIJAGL",
  ACDGHIJK: "CDHKJAGI",
  ACDFIJKL: "DFCKIAJL",
  ACDFHJKL: "CDHKFAJL",
  ACDFHIKL: "CDHKIAFL",
  ACDFHIJL: "CDHIFAJL",
  ACDFHIJK: "CDHKFAJI",
  ACDFGJKL: "DFCKJAGL",
  ACDFGIKL: "DFCKIAGL",
  ACDFGIJL: "DFCIJAGL",
  ACDFGIJK: "DFCKJAGI",
  ACDFGHKL: "CDHKFAGL",
  ACDFGHJL: "DFCHJAGL",
  ACDFGHJK: "CFHKJAGD",
  ACDFGHIL: "CDHIFAGL",
  ACDFGHIK: "CDHKFAGI",
  ACDFGHIJ: "CFHIJAGD",
  ACDEIJKL: "CDEKIAJL",
  ACDEHJKL: "CDHKEAJL",
  ACDEHIKL: "CDHKIAEL",
  ACDEHIJL: "CDHIEAJL",
  ACDEHIJK: "CDHKEAJI",
  ACDEGJKL: "CDEKJAGL",
  ACDEGIKL: "CDEKIAGL",
  ACDEGIJL: "CDEIJAGL",
  ACDEGIJK: "CDEKJAGI",
  ACDEGHKL: "CDHKEAGL",
  ACDEGHJL: "CDHEJAGL",
  ACDEGHJK: "CDHKJAGE",
  ACDEGHIL: "CDHIEAGL",
  ACDEGHIK: "CDHKEAGI",
  ACDEGHIJ: "CDHIJAGE",
  ACDEFJKL: "DFCKEAJL",
  ACDEFIKL: "DFCKIAEL",
  ACDEFIJL: "DFCIEAJL",
  ACDEFIJK: "DFCKEAJI",
  ACDEFHKL: "CDHKFAEL",
  ACDEFHJL: "CDHEFAJL",
  ACDEFHJK: "CFHKEAJD",
  ACDEFHIL: "CDHIFAEL",
  ACDEFHIK: "CDHKFAEI",
  ACDEFHIJ: "CFHIEAJD",
  ACDEFGKL: "DFCKEAGL",
  ACDEFGJL: "DFCEJAGL",
  ACDEFGJK: "DFCKJAGE",
  ACDEFGIL: "DFCIEAGL",
  ACDEFGIK: "DFCKEAGI",
  ACDEFGIJ: "DFCIJAGE",
  ACDEFGHL: "CDHEFAGL",
  ACDEFGHK: "CFHKEAGD",
  ACDEFGHJ: "CFHEJAGD",
  ACDEFGHI: "CFHIEAGD",
  ABGHIJKL: "AGHKBIJL",
  ABFHIJKL: "AFHKBIJL",
  ABFGIJKL: "FGIKBAJL",
  ABFGHJKL: "FGHKBAJL",
  ABFGHIKL: "AFHKBIGL",
  ABFGHIJL: "FGHIBAJL",
  ABFGHIJK: "FGHKBAJI",
  ABEHIJKL: "AHEKBIJL",
  ABEGIJKL: "AGEKBIJL",
  ABEGHJKL: "AGEKBHJL",
  ABEGHIKL: "AHEKBIGL",
  ABEGHIJL: "AGEIBHJL",
  ABEGHIJK: "AGEKBHJI",
  ABEFIJKL: "AFEKBIJL",
  ABEFHJKL: "FHEKBAJL",
  ABEFHIKL: "FHEKBAIL",
  ABEFHIJL: "FHEIBAJL",
  ABEFHIJK: "FHEKBAJI",
  ABEFGJKL: "FGEKBAJL",
  ABEFGIKL: "AFEKBIGL",
  ABEFGIJL: "FGEIBAJL",
  ABEFGIJK: "FGEKBAJI",
  ABEFGHKL: "FHEKBAGL",
  ABEFGHJL: "FGHEBAJL",
  ABEFGHJK: "FGHKBAJE",
  ABEFGHIL: "FHEIBAGL",
  ABEFGHIK: "FHEKBAGI",
  ABEFGHIJ: "FGHIBAJE",
  ABDHIJKL: "DHIKBAJL",
  ABDGIJKL: "DGIKBAJL",
  ABDGHJKL: "DGHKBAJL",
  ABDGHIKL: "DHIKBAGL",
  ABDGHIJL: "DGHIBAJL",
  ABDGHIJK: "DGHKBAJI",
  ABDFIJKL: "DFIKBAJL",
  ABDFHJKL: "DFHKBAJL",
  ABDFHIKL: "DFHKBAIL",
  ABDFHIJL: "DFHIBAJL",
  ABDFHIJK: "DFHKBAJI",
  ABDFGJKL: "DGFKBAJL",
  ABDFGIKL: "DFIKBAGL",
  ABDFGIJL: "DGFIBAJL",
  ABDFGIJK: "DGFKBAJI",
  ABDFGHKL: "DFHKBAGL",
  ABDFGHJL: "DFHJBAGL",
  ABDFGHJK: "DFHKBAGJ",
  ABDFGHIL: "DFHIBAGL",
  ABDFGHIK: "DFHKBAGI",
  ABDFGHIJ: "DFHJBAGI",
  ABDEIJKL: "ADEKBIJL",
  ABDEHJKL: "DHEKBAJL",
  ABDEHIKL: "DHEKBAIL",
  ABDEHIJL: "DHEIBAJL",
  ABDEHIJK: "DHEKBAJI",
  ABDEGJKL: "DGEKBAJL",
  ABDEGIKL: "ADEKBIGL",
  ABDEGIJL: "DGEIBAJL",
  ABDEGIJK: "DGEKBAJI",
  ABDEGHKL: "DHEKBAGL",
  ABDEGHJL: "DGHEBAJL",
  ABDEGHJK: "DGHKBAJE",
  ABDEGHIL: "DHEIBAGL",
  ABDEGHIK: "DHEKBAGI",
  ABDEGHIJ: "DGHIBAJE",
  ABDEFJKL: "DFEKBAJL",
  ABDEFIKL: "DFEKBAIL",
  ABDEFIJL: "DFEIBAJL",
  ABDEFIJK: "DFEKBAJI",
  ABDEFHKL: "DFHKBAEL",
  ABDEFHJL: "DFHEBAJL",
  ABDEFHJK: "DFHKBAJE",
  ABDEFHIL: "DFHIBAEL",
  ABDEFHIK: "DFHKBAEI",
  ABDEFHIJ: "DFHIBAJE",
  ABDEFGKL: "DFEKBAGL",
  ABDEFGJL: "DFEJBAGL",
  ABDEFGJK: "DFEKBAGJ",
  ABDEFGIL: "DFEIBAGL",
  ABDEFGIK: "DFEKBAGI",
  ABDEFGIJ: "DFEJBAGI",
  ABDEFGHL: "DFHEBAGL",
  ABDEFGHK: "DFHKBAGE",
  ABDEFGHJ: "DFHJBAGE",
  ABDEFGHI: "DFHIBAGE",
  ABCHIJKL: "CHIKBAJL",
  ABCGIJKL: "CGIKBAJL",
  ABCGHJKL: "CGHKBAJL",
  ABCGHIKL: "CHIKBAGL",
  ABCGHIJL: "CGHIBAJL",
  ABCGHIJK: "CGHKBAJI",
  ABCFIJKL: "CFIKBAJL",
  ABCFHJKL: "CFHKBAJL",
  ABCFHIKL: "CFHKBAIL",
  ABCFHIJL: "CFHIBAJL",
  ABCFHIJK: "CFHKBAJI",
  ABCFGJKL: "FGCKBAJL",
  ABCFGIKL: "CFIKBAGL",
  ABCFGIJL: "FGCIBAJL",
  ABCFGIJK: "FGCKBAJI",
  ABCFGHKL: "CFHKBAGL",
  ABCFGHJL: "CFHJBAGL",
  ABCFGHJK: "CFHKBAGJ",
  ABCFGHIL: "CFHIBAGL",
  ABCFGHIK: "CFHKBAGI",
  ABCFGHIJ: "CFHJBAGI",
  ABCEIJKL: "ACEKBIJL",
  ABCEHJKL: "CHEKBAJL",
  ABCEHIKL: "CHEKBAIL",
  ABCEHIJL: "CHEIBAJL",
  ABCEHIJK: "CHEKBAJI",
  ABCEGJKL: "CGEKBAJL",
  ABCEGIKL: "ACEKBIGL",
  ABCEGIJL: "CGEIBAJL",
  ABCEGIJK: "CGEKBAJI",
  ABCEGHKL: "CHEKBAGL",
  ABCEGHJL: "CGHEBAJL",
  ABCEGHJK: "CGHKBAJE",
  ABCEGHIL: "CHEIBAGL",
  ABCEGHIK: "CHEKBAGI",
  ABCEGHIJ: "CGHIBAJE",
  ABCEFJKL: "CFEKBAJL",
  ABCEFIKL: "CFEKBAIL",
  ABCEFIJL: "CFEIBAJL",
  ABCEFIJK: "CFEKBAJI",
  ABCEFHKL: "CFHKBAEL",
  ABCEFHJL: "CFHEBAJL",
  ABCEFHJK: "CFHKBAJE",
  ABCEFHIL: "CFHIBAEL",
  ABCEFHIK: "CFHKBAEI",
  ABCEFHIJ: "CFHIBAJE",
  ABCEFGKL: "CFEKBAGL",
  ABCEFGJL: "CFEJBAGL",
  ABCEFGJK: "CFEKBAGJ",
  ABCEFGIL: "CFEIBAGL",
  ABCEFGIK: "CFEKBAGI",
  ABCEFGIJ: "CFEJBAGI",
  ABCEFGHL: "CFHEBAGL",
  ABCEFGHK: "CFHKBAGE",
  ABCEFGHJ: "CFHJBAGE",
  ABCEFGHI: "CFHIBAGE",
  ABCDIJKL: "CDIKBAJL",
  ABCDHJKL: "CDHKBAJL",
  ABCDHIKL: "CDHKBAIL",
  ABCDHIJL: "CDHIBAJL",
  ABCDHIJK: "CDHKBAJI",
  ABCDGJKL: "DGCKBAJL",
  ABCDGIKL: "CDIKBAGL",
  ABCDGIJL: "DGCIBAJL",
  ABCDGIJK: "DGCKBAJI",
  ABCDGHKL: "CDHKBAGL",
  ABCDGHJL: "CDHJBAGL",
  ABCDGHJK: "CDHKBAGJ",
  ABCDGHIL: "CDHIBAGL",
  ABCDGHIK: "CDHKBAGI",
  ABCDGHIJ: "CDHJBAGI",
  ABCDFJKL: "DFCKBAJL",
  ABCDFIKL: "DFCKBAIL",
  ABCDFIJL: "DFCIBAJL",
  ABCDFIJK: "DFCKBAJI",
  ABCDFHKL: "CDHKBAFL",
  ABCDFHJL: "DFCHBAJL",
  ABCDFHJK: "CFHKBAJD",
  ABCDFHIL: "CDHIBAFL",
  ABCDFHIK: "CDHKBAFI",
  ABCDFHIJ: "CFHIBAJD",
  ABCDFGKL: "DFCKBAGL",
  ABCDFGJL: "DFCJBAGL",
  ABCDFGJK: "DFCKBAGJ",
  ABCDFGIL: "DFCIBAGL",
  ABCDFGIK: "DFCKBAGI",
  ABCDFGIJ: "DFCJBAGI",
  ABCDFGHL: "DFCHBAGL",
  ABCDFGHK: "CFHKBAGD",
  ABCDFGHJ: "CFHJBAGD",
  ABCDFGHI: "CFHIBAGD",
  ABCDEJKL: "CDEKBAJL",
  ABCDEIKL: "CDEKBAIL",
  ABCDEIJL: "CDEIBAJL",
  ABCDEIJK: "CDEKBAJI",
  ABCDEHKL: "CDHKBAEL",
  ABCDEHJL: "CDHEBAJL",
  ABCDEHJK: "CDHKBAJE",
  ABCDEHIL: "CDHIBAEL",
  ABCDEHIK: "CDHKBAEI",
  ABCDEHIJ: "CDHIBAJE",
  ABCDEGKL: "CDEKBAGL",
  ABCDEGJL: "CDEJBAGL",
  ABCDEGJK: "CDEKBAGJ",
  ABCDEGIL: "CDEIBAGL",
  ABCDEGIK: "CDEKBAGI",
  ABCDEGIJ: "CDEJBAGI",
  ABCDEGHL: "CDHEBAGL",
  ABCDEGHK: "CDHKBAGE",
  ABCDEGHJ: "CDHJBAGE",
  ABCDEGHI: "CDHIBAGE",
  ABCDEFKL: "DFCKBAEL",
  ABCDEFJL: "DFCEBAJL",
  ABCDEFJK: "DFCKBAJE",
  ABCDEFIL: "DFCIBAEL",
  ABCDEFIK: "DFCKBAEI",
  ABCDEFIJ: "DFCIBAJE",
  ABCDEFHL: "CDHEBAFL",
  ABCDEFHK: "CFHKBAED",
  ABCDEFHJ: "CFHEBAJD",
  ABCDEFHI: "CFHIBAED",
  ABCDEFGL: "DFCEBAGL",
  ABCDEFGK: "DFCKBAGE",
  ABCDEFGJ: "DFCJBAGE",
  ABCDEFGI: "DFCIBAGE",
  ABCDEFGH: "CFHEBAGD",
};

let currentLanguage = localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "zh";
let state = loadState();
let bracket = {};
let dragged = null;
let pointerDragged = null;
let pointerTarget = null;
let toastTimer = null;
let dataStatusMode = "fallback";

const el = (id) => document.getElementById(id);
const t = (key, values = {}) => {
  const template = TRANSLATIONS[currentLanguage][key] ?? TRANSLATIONS.zh[key] ?? key;
  return Object.entries(values).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, value),
    template,
  );
};
const team = (id) => ({
  id,
  name: TEAM_DATA[id][currentLanguage === "en" ? 1 : 0],
  code: TEAM_DATA[id][2],
  flagSrc: flagSrcForTeam(id),
});

const FLAG_CODE_OVERRIDES = {
  eng: "gb-eng",
  sco: "gb-sct",
};

function flagCodeForTeam(teamId) {
  return FLAG_CODE_OVERRIDES[teamId] ?? TEAM_DATA[teamId][2].toLowerCase();
}

function flagSrcForTeam(teamId) {
  return `./assets/flags/${flagCodeForTeam(teamId)}.svg`;
}

function getRealKnockoutResult(matchNo) {
  const raw = REAL_KNOCKOUT_RESULTS[matchNo] ?? REAL_KNOCKOUT_RESULTS[String(matchNo)];
  if (!raw) return null;
  if (typeof raw === "string") return { winnerId: raw, score: "" };
  return {
    winnerId: raw.winner,
    score: raw.score ?? "",
  };
}

function realKnockoutResultCount() {
  return Object.keys(REAL_KNOCKOUT_RESULTS).length;
}

function parseApiNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function parseNullableApiNumber(value) {
  if (value === null || value === undefined || value === "" || value === "null") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function apiTeamId(value) {
  const teamId = API_TEAM_IDS[parseApiNumber(value)];
  if (!teamId || !TEAM_DATA[teamId]) {
    throw new Error(`Unknown live data team id: ${value}`);
  }
  return teamId;
}

function isApiFinished(value) {
  return String(value).toLowerCase() === "true";
}

function isGroupStageLocked(data = liveData) {
  const groups = data.groups ?? {};
  const stats = data.stats ?? {};
  const groupIds = Object.keys(groups);
  return Boolean(data.groupStageLocked) ||
    groupIds.every((groupId) =>
      groups[groupId].every((teamId) => (stats?.[teamId]?.[0] ?? 0) >= 3),
    );
}

async function fetchJsonWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), LIVE_DATA_TIMEOUT_MS);
  try {
    const response = await fetch(`${url}?_=${Date.now()}`, {
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Live data request failed: ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

function buildThirdOrder(groups, stats, fallbackOrder = INITIAL_THIRD_ORDER) {
  const fallbackRank = new Map(fallbackOrder.map((groupId, index) => [groupId, index]));
  return Object.keys(groups)
    .map((groupId) => {
      const teamId = groups[groupId][2];
      const [, , , , gf = 0, , gd = 0, pts = 0] = stats[teamId] ?? [];
      return {
        groupId,
        pts,
        gd,
        gf,
        fallback: fallbackRank.has(groupId) ? fallbackRank.get(groupId) : 99,
      };
    })
    .sort((a, b) =>
      b.pts - a.pts ||
      b.gd - a.gd ||
      b.gf - a.gf ||
      a.fallback - b.fallback ||
      a.groupId.localeCompare(b.groupId),
    )
    .map((entry) => entry.groupId);
}

function normalizeRemoteGroups(payload) {
  const remoteGroups = Array.isArray(payload?.groups) ? payload.groups : [];
  const remoteByName = new Map(
    remoteGroups.map((group) => [String(group.name).toUpperCase(), group]),
  );
  const groups = {};
  const stats = {};

  GROUP_ORDER.forEach((groupId) => {
    const group = remoteByName.get(groupId);
    const rows = Array.isArray(group?.teams) ? group.teams : [];
    if (rows.length !== 4) throw new Error(`Incomplete live data for Group ${groupId}`);

    groups[groupId] = rows.map((row) => apiTeamId(row.team_id));
    rows.forEach((row, index) => {
      const teamId = apiTeamId(row.team_id);
      stats[teamId] = [
        parseApiNumber(row.mp),
        parseApiNumber(row.w),
        parseApiNumber(row.d),
        parseApiNumber(row.l),
        parseApiNumber(row.gf),
        parseApiNumber(row.ga),
        parseApiNumber(row.gd),
        parseApiNumber(row.pts),
        index < 2 ? 1 : 0,
      ];
    });
  });

  return { groups, stats, thirdOrder: buildThirdOrder(groups, stats) };
}

function formatRemoteScore(game) {
  const homeScore = parseApiNumber(game.home_score);
  const awayScore = parseApiNumber(game.away_score);
  const homePenalty = parseNullableApiNumber(game.home_penalty_score);
  const awayPenalty = parseNullableApiNumber(game.away_penalty_score);
  const baseScore = `${homeScore}-${awayScore}`;

  if (homePenalty !== null && awayPenalty !== null) {
    return `${baseScore} (${homePenalty}-${awayPenalty} pens)`;
  }

  const elapsed = String(game.time_elapsed ?? "").toLowerCase();
  return elapsed.includes("aet") ? `${baseScore} (AET)` : baseScore;
}

function normalizeRemoteKnockoutResults(payload) {
  const games = Array.isArray(payload?.games) ? payload.games : [];
  return games.reduce((results, game) => {
    const matchNo = parseApiNumber(game.id);
    if (matchNo < 73 || matchNo > 104 || matchNo === 103 || !isApiFinished(game.finished)) {
      return results;
    }

    const homeTeamId = apiTeamId(game.home_team_id);
    const awayTeamId = apiTeamId(game.away_team_id);
    const homeScore = parseApiNumber(game.home_score);
    const awayScore = parseApiNumber(game.away_score);
    const homePenalty = parseNullableApiNumber(game.home_penalty_score);
    const awayPenalty = parseNullableApiNumber(game.away_penalty_score);
    let winner = null;

    if (homeScore > awayScore) winner = homeTeamId;
    if (awayScore > homeScore) winner = awayTeamId;
    if (!winner && homePenalty !== null && awayPenalty !== null) {
      if (homePenalty > awayPenalty) winner = homeTeamId;
      if (awayPenalty > homePenalty) winner = awayTeamId;
    }

    if (winner) {
      results[matchNo] = {
        winner,
        score: formatRemoteScore(game),
      };
    }
    return results;
  }, {});
}

function normalizeRemoteData(groupsPayload, gamesPayload) {
  const { groups, stats, thirdOrder } = normalizeRemoteGroups(groupsPayload);
  const knockoutResults = normalizeRemoteKnockoutResults(gamesPayload);
  return {
    updatedAt: new Date().toISOString(),
    source: LIVE_DATA_SOURCE.groups,
    groupStageLocked: GROUP_ORDER.every((groupId) =>
      groups[groupId].every((teamId) => (stats[teamId]?.[0] ?? 0) >= 3),
    ),
    knockoutUpdatedAt: new Date().toISOString(),
    knockoutSource: LIVE_DATA_SOURCE.games,
    knockoutResults,
    groups,
    thirdOrder,
    stats,
  };
}

function applyDataSnapshot(nextData) {
  liveData = nextData;
  INITIAL_GROUPS = structuredClone(liveData.groups);
  GROUP_IDS = Object.keys(INITIAL_GROUPS);
  INITIAL_THIRD_ORDER = [...liveData.thirdOrder];
  GROUP_STAGE_LOCKED = isGroupStageLocked(liveData);
  REAL_KNOCKOUT_RESULTS = liveData.knockoutResults ?? {};
  snapshotGroups = structuredClone(INITIAL_GROUPS);
  snapshotThirdOrder = [...INITIAL_THIRD_ORDER];
  snapshotStats = structuredClone(liveData.stats);
  snapshotUpdatedAt = liveData.updatedAt;
  state = cleanState(state);
  renderAll();
  saveState();
  updateDataTimestamp();
}

function setDataStatus(mode) {
  dataStatusMode = mode;
  const badge = el("dataStatus");
  if (!badge) return;
  badge.classList.remove("online", "loading", "fallback");
  badge.classList.add(mode === "live" ? "online" : mode);

  const label = badge.querySelector("span");
  const key = {
    loading: "dataLoading",
    live: "dataLive",
    fallback: "dataFallback",
  }[mode] ?? "dataSnapshot";
  if (label) label.textContent = t(key);
}

async function refreshLiveData({ silent = false } = {}) {
  const previousMode = dataStatusMode === "loading" ? "fallback" : dataStatusMode;
  const refreshButton = el("refreshDataBtn");
  setDataStatus("loading");
  refreshButton.disabled = true;
  refreshButton.classList.add("refreshing");

  try {
    const [groupsPayload, gamesPayload] = await Promise.all([
      fetchJsonWithTimeout(LIVE_DATA_SOURCE.groups),
      fetchJsonWithTimeout(LIVE_DATA_SOURCE.games),
    ]);
    applyDataSnapshot(normalizeRemoteData(groupsPayload, gamesPayload));
    setDataStatus("live");
    if (!silent) showToast(t("liveDataLoadedToast"));
  } catch (error) {
    console.warn("Live data update failed", error);
    setDataStatus(previousMode === "live" ? "live" : "fallback");
    if (!silent) showToast(t("liveDataFailedToast"));
  } finally {
    refreshButton.disabled = false;
    refreshButton.classList.remove("refreshing");
  }
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLanguage === "en" ? "en" : "zh-CN";
  document.title = t("pageTitle");
  el("metaDescription").setAttribute("content", t("pageDescription"));

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAria));
  });

  const toggle = el("languageToggle");
  toggle.textContent = currentLanguage === "zh" ? "EN" : "中文";
  toggle.setAttribute(
    "aria-label",
    currentLanguage === "zh" ? "Switch to English" : "切换到中文",
  );

  const refreshButton = el("refreshDataBtn");
  refreshButton.setAttribute("title", t("refreshData"));
  setDataStatus(dataStatusMode);
}

function setLanguage(language) {
  currentLanguage = language === "en" ? "en" : "zh";
  localStorage.setItem(LANGUAGE_KEY, currentLanguage);
  clearTimeout(toastTimer);
  el("toast").classList.remove("show");
  applyStaticTranslations();
  renderAll();
  updateDataTimestamp();
}

function cleanState(raw) {
  const validGroups =
    raw?.groups &&
    GROUP_IDS.every(
      (groupId) =>
        Array.isArray(raw.groups[groupId]) &&
        raw.groups[groupId].length === 4 &&
        raw.groups[groupId].every((id) => TEAM_DATA[id]),
    );
  const validThirdOrder =
    Array.isArray(raw?.thirdOrder) &&
    raw.thirdOrder.length === 12 &&
    GROUP_IDS.every((id) => raw.thirdOrder.includes(id));

  return {
    groups: !GROUP_STAGE_LOCKED && raw?.manualGroups && validGroups ? raw.groups : structuredClone(INITIAL_GROUPS),
    thirdOrder: !GROUP_STAGE_LOCKED && raw?.manualThirds && validThirdOrder ? raw.thirdOrder : [...INITIAL_THIRD_ORDER],
    selections: raw?.selections && typeof raw.selections === "object" ? raw.selections : {},
    manualGroups: !GROUP_STAGE_LOCKED && Boolean(raw?.manualGroups),
    manualThirds: !GROUP_STAGE_LOCKED && Boolean(raw?.manualThirds),
  };
}

function loadState() {
  try {
    return cleanState(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  } catch {
    return cleanState(null);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function flagMarkup(teamId, extraClass = "") {
  const current = team(teamId);
  return `<span class="team-flag ${extraClass}" aria-hidden="true"><img src="${current.flagSrc}" alt="" loading="lazy"></span>`;
}

function seedTeam(seed) {
  const position = Number(seed[0]) - 1;
  const groupId = seed[1];
  return team(state.groups[groupId][position]);
}

function selectedThirdGroups() {
  return state.thirdOrder.slice(0, 8);
}

function groupStageComplete() {
  return GROUP_IDS.every((groupId) =>
    state.groups[groupId].every((teamId) => getTeamStats(teamId).gp >= 3),
  );
}

function allocateThirdSlots() {
  const available = [...selectedThirdGroups()];
  const combinationKey = [...available].sort().join("");
  const officialMap = OFFICIAL_THIRD_MAPS[combinationKey];

  if (officialMap) {
    return officialMap.split("");
  }

  const allocated = [];

  THIRD_SLOT_WINNER_GROUPS.forEach((winnerGroup, slotIndex) => {
    const preferred = DEFAULT_THIRD_SLOT_GROUPS[slotIndex];
    let choiceIndex = available.indexOf(preferred);
    if (choiceIndex < 0 || available[choiceIndex] === winnerGroup) {
      choiceIndex = available.findIndex((groupId) => groupId !== winnerGroup);
    }
    if (choiceIndex < 0) choiceIndex = 0;
    allocated.push(available.splice(choiceIndex, 1)[0]);
  });

  return allocated;
}

function invalidateBracket(message) {
  state.selections = {};
  rebuildBracket();
  renderBracket();
  saveState();
  if (message) showToast(message);
}

function buildMatch(no, teamA, teamB, sourceA = null, sourceB = null) {
  const validIds = [teamA?.id, teamB?.id].filter(Boolean);
  const realResult = getRealKnockoutResult(no);
  const realWinnerValid = realResult?.winnerId && validIds.includes(realResult.winnerId);
  let winnerId = realWinnerValid ? realResult.winnerId : state.selections[no];

  if (!validIds.includes(winnerId)) {
    delete state.selections[no];
    winnerId = null;
  }

  return {
    no,
    teamA,
    teamB,
    sourceA,
    sourceB,
    winnerId,
    locked: Boolean(realWinnerValid),
    realScore: realWinnerValid ? realResult.score : "",
  };
}

function rebuildBracket() {
  bracket = {};
  const thirdSlots = allocateThirdSlots();

  ROUND_32_TEMPLATES.forEach((template) => {
    const teamA = seedTeam(template.a);
    const teamB = template.thirdSlot !== undefined
      ? team(state.groups[thirdSlots[template.thirdSlot]][2])
      : seedTeam(template.b);
    bracket[template.no] = buildMatch(template.no, teamA, teamB);
  });

  ROUND_DEFINITIONS.forEach((round) => {
    round.matches.forEach(([no, sourceA, sourceB]) => {
      const teamA = bracket[sourceA]?.winnerId ? team(bracket[sourceA].winnerId) : null;
      const teamB = bracket[sourceB]?.winnerId ? team(bracket[sourceB].winnerId) : null;
      bracket[no] = buildMatch(no, teamA, teamB, sourceA, sourceB);
    });
  });
}

function getGroupStatus(groupId, position) {
  if (position < 2) return { label: t("directAdvance"), className: "direct" };
  if (position === 2 && selectedThirdGroups().includes(groupId)) {
    return { label: t("bestThird"), className: "third" };
  }
  if (position === 2) return { label: t("outsideComparison"), className: "bubble" };
  return { label: t("temporarilyOut"), className: "out" };
}

function teamRowMarkup(groupId, teamId, position) {
  const current = team(teamId);
  const status = getGroupStatus(groupId, position);
  const stats = getTeamStats(teamId);
  const confirmedDirect = position < 2 && stats.advanced;
  const statusLabel = confirmedDirect ? t("clinchedTopTwo") : status.label;
  const dragAttributes = GROUP_STAGE_LOCKED
    ? ""
    : `draggable="true" data-drag-type="group" data-group="${groupId}" data-team="${teamId}"`;
  return `
    <div
      class="group-team ${status.className} ${GROUP_STAGE_LOCKED ? "locked" : ""}"
      ${dragAttributes}
    >
      <span class="${GROUP_STAGE_LOCKED ? "lock-mark" : "drag-handle"}" aria-hidden="true" title="${GROUP_STAGE_LOCKED ? t("groupStageLocked") : t("dragToRank")}">${GROUP_STAGE_LOCKED ? "🔒" : "⠿"}</span>
      <span class="position">${position + 1}</span>
      ${flagMarkup(teamId)}
      <strong>${current.name}</strong>
      <span class="team-record">
        <b>${stats.gp}</b><b>${formatGoalDifference(stats.gd)}</b><b>${stats.pts}</b>
      </span>
      <span class="team-status ${confirmedDirect ? "confirmed" : ""}">${statusLabel}</span>
    </div>
  `;
}

function renderGroups() {
  el("groupsGrid").innerHTML = GROUP_IDS.map((groupId) => `
    <article class="group-card">
      <div class="group-card-head">
        <div><span>${groupId}</span><h3>${t("groupTitle", { group: groupId })}</h3></div>
        <small>${t("topTwoAdvance")}</small>
      </div>
      <div class="group-list" data-group-list="${groupId}">
        <div class="group-columns"><span>${t("playedShort")}</span><span>${t("goalDifferenceShort")}</span><span>${t("pointsShort")}</span></div>
        ${state.groups[groupId].map((teamId, index) => teamRowMarkup(groupId, teamId, index)).join("")}
      </div>
    </article>
  `).join("");

  bindDragEvents();
}

function thirdRowMarkup(groupId, index) {
  const teamId = state.groups[groupId][2];
  const current = team(teamId);
  const stats = getTeamStats(teamId);
  const qualified = index < 8;
  const complete = groupStageComplete();
  const statusLabel = complete
    ? (qualified ? t("confirmedThirdQualified") : t("confirmedThirdOutside"))
    : (qualified ? t("provisionalQualified") : t("provisionalOutside"));
  const dragAttributes = GROUP_STAGE_LOCKED
    ? ""
    : `draggable="true" data-drag-type="third" data-group="${groupId}"`;
  return `
    <div
      class="third-row ${qualified ? "qualified" : "eliminated"} ${GROUP_STAGE_LOCKED ? "locked" : ""}"
      ${dragAttributes}
    >
      <span class="${GROUP_STAGE_LOCKED ? "lock-mark" : "drag-handle"}" aria-hidden="true" title="${GROUP_STAGE_LOCKED ? t("groupStageLocked") : t("dragToRank")}">${GROUP_STAGE_LOCKED ? "🔒" : "⠿"}</span>
      <span class="third-position">${String(index + 1).padStart(2, "0")}</span>
      <div class="third-team">${flagMarkup(teamId)}<strong>${current.name}</strong></div>
      <span class="source-badge">${t("thirdSource", {
        group: groupId,
        points: stats.pts,
        gd: formatGoalDifference(stats.gd),
      })}</span>
      <span class="third-status">${statusLabel}</span>
    </div>
  `;
}

function renderThirdRanking() {
  el("thirdRanking").innerHTML = state.thirdOrder
    .map((groupId, index) => thirdRowMarkup(groupId, index))
    .join("");
  bindDragEvents();
}

function matchTeamMarkup(currentTeam, match, slot) {
  if (!currentTeam) {
    const source = slot === "a" ? match.sourceA : match.sourceB;
    return `
      <div class="bracket-team placeholder">
        <span class="team-flag">?</span>
        <span>${t("waitingWinner", { match: source })}</span>
      </div>
    `;
  }

  const picked = match.winnerId === currentTeam.id;
  return `
    <button
      class="bracket-team ${picked ? "picked" : ""} ${match.locked ? "locked" : ""}"
      ${match.locked ? "disabled" : `data-match="${match.no}" data-pick="${currentTeam.id}"`}
      aria-label="${t("chooseAdvance", { team: currentTeam.name })}"
    >
      ${flagMarkup(currentTeam.id)}
      <strong>${currentTeam.name}</strong>
      <span class="pick-mark">${picked ? (match.locked ? t("realResult") : "✓") : t("choose")}</span>
    </button>
  `;
}

function matchMarkup(match) {
  const sourceLabel = match.locked
    ? t("realResultScore", { score: match.realScore || "FT" })
    : (match.sourceA ? `M${match.sourceA} vs M${match.sourceB}` : t("round32"));
  return `
    <article class="bracket-match ${match.winnerId ? "decided" : ""} ${match.locked ? "locked" : ""}">
      <div class="match-meta">
        <span>M${match.no}</span>
        <small>${sourceLabel}</small>
      </div>
      ${matchTeamMarkup(match.teamA, match, "a")}
      ${matchTeamMarkup(match.teamB, match, "b")}
    </article>
  `;
}

function renderBracket() {
  el("round32").innerHTML = ROUND_32_TEMPLATES
    .map((template) => matchMarkup(bracket[template.no]))
    .join("");

  ROUND_DEFINITIONS.forEach((round) => {
    el(round.container).innerHTML = round.matches
      .map(([no]) => matchMarkup(bracket[no]))
      .join("");
  });

  document.querySelectorAll(".bracket-team[data-pick]").forEach((button) => {
    button.addEventListener("click", handleMatchPick);
  });

  el("syncKnockoutBtn").disabled = realKnockoutResultCount() === 0;

  renderChampion();
  updateProgress();
}

function renderChampion() {
  const championId = bracket[104]?.winnerId;
  const card = el("championCard");

  if (!championId) {
    card.classList.add("empty");
    el("championTeam").textContent = t("championEmpty");
    el("championPath").textContent = t("championEmptyPath");
    el("headerChampion").textContent = t("waitingChampion");
    return;
  }

  const champion = team(championId);
  card.classList.remove("empty");
  el("championTeam").innerHTML = `${flagMarkup(champion.id, "champion-flag")}<strong>${champion.name}</strong>`;
  el("championPath").textContent = t("championPath", {
    group: findGroupForTeam(champion.id),
  });
  el("headerChampion").innerHTML = `${flagMarkup(champion.id)}<span>${champion.name}</span>`;
}

function findGroupForTeam(teamId) {
  return GROUP_IDS.find((groupId) => state.groups[groupId].includes(teamId));
}

function handleMatchPick(event) {
  const matchNo = Number(event.currentTarget.dataset.match);
  const teamId = event.currentTarget.dataset.pick;
  if (bracket[matchNo]?.locked) {
    showToast(t("realResultLockedToast"));
    return;
  }
  state.selections[matchNo] = state.selections[matchNo] === teamId ? null : teamId;
  if (!state.selections[matchNo]) delete state.selections[matchNo];
  rebuildBracket();
  renderBracket();
  saveState();

  if (matchNo === 104 && bracket[104].winnerId) {
    const champion = team(bracket[104].winnerId);
    showToast(t("championToast", { team: champion.name }));
    el("championCard").animate(
      [{ transform: "scale(.94)", opacity: 0.5 }, { transform: "scale(1)", opacity: 1 }],
      { duration: 480, easing: "cubic-bezier(.2,.8,.2,1)" },
    );
  }
}

function bindDragEvents() {
  document.querySelectorAll("[draggable='true']").forEach((item) => {
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragend", handleDragEnd);
    item.addEventListener("dragover", handleDragOver);
    item.addEventListener("drop", handleDrop);
    item.querySelector(".drag-handle")?.addEventListener("pointerdown", handlePointerDown);
  });
}

function dragInfoFromItem(item) {
  return {
    type: item.dataset.dragType,
    groupId: item.dataset.group,
    teamId: item.dataset.team || null,
  };
}

function handleDragStart(event) {
  const item = event.currentTarget;
  dragged = dragInfoFromItem(item);
  item.classList.add("dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", JSON.stringify(dragged));
}

function handleDragEnd(event) {
  event.currentTarget.classList.remove("dragging");
  document.querySelectorAll(".drag-over").forEach((item) => item.classList.remove("drag-over"));
  dragged = null;
}

function handleDragOver(event) {
  if (!dragged || event.currentTarget.dataset.dragType !== dragged.type) return;
  if (dragged.type === "group" && event.currentTarget.dataset.group !== dragged.groupId) return;
  event.preventDefault();
  document.querySelectorAll(".drag-over").forEach((item) => item.classList.remove("drag-over"));
  event.currentTarget.classList.add("drag-over");
}

function handleDrop(event) {
  event.preventDefault();
  const target = event.currentTarget;
  target.classList.remove("drag-over");
  if (!dragged || target.dataset.dragType !== dragged.type) return;
  applyDraggedOrder(dragged, target);
}

function applyDraggedOrder(dragInfo, target) {
  if (GROUP_STAGE_LOCKED) {
    showToast(t("groupStageLockedToast"));
    return;
  }
  if (dragInfo.type === "group") {
    if (target.dataset.group !== dragInfo.groupId) return;
    const order = state.groups[dragInfo.groupId];
    const from = order.indexOf(dragInfo.teamId);
    const to = order.indexOf(target.dataset.team);
    if (from === to) return;
    moveItem(order, from, to);
    state.manualGroups = true;
    renderGroups();
    renderThirdRanking();
    invalidateBracket(t("groupUpdatedToast"));
  } else {
    const from = state.thirdOrder.indexOf(dragInfo.groupId);
    const to = state.thirdOrder.indexOf(target.dataset.group);
    if (from === to) return;
    moveItem(state.thirdOrder, from, to);
    state.manualThirds = true;
    renderGroups();
    renderThirdRanking();
    invalidateBracket(t("thirdUpdatedToast"));
  }
}

function handlePointerDown(event) {
  event.preventDefault();
  const item = event.currentTarget.closest("[data-drag-type]");
  pointerDragged = dragInfoFromItem(item);
  pointerTarget = item;
  item.classList.add("dragging");
  document.body.classList.add("pointer-sorting");
  document.addEventListener("pointermove", handlePointerMove);
  document.addEventListener("pointerup", handlePointerUp, { once: true });
  document.addEventListener("pointercancel", handlePointerUp, { once: true });
}

function handlePointerMove(event) {
  if (!pointerDragged) return;
  const target = document
    .elementFromPoint(event.clientX, event.clientY)
    ?.closest("[data-drag-type]");

  document.querySelectorAll(".drag-over").forEach((item) => item.classList.remove("drag-over"));
  if (!target || target.dataset.dragType !== pointerDragged.type) return;
  if (pointerDragged.type === "group" && target.dataset.group !== pointerDragged.groupId) return;

  pointerTarget = target;
  target.classList.add("drag-over");
}

function handlePointerUp() {
  const dragInfo = pointerDragged;
  const target = pointerTarget;
  document.removeEventListener("pointermove", handlePointerMove);
  document.querySelectorAll(".dragging, .drag-over").forEach((item) => {
    item.classList.remove("dragging", "drag-over");
  });
  document.body.classList.remove("pointer-sorting");
  pointerDragged = null;
  pointerTarget = null;
  if (dragInfo && target) applyDraggedOrder(dragInfo, target);
}

function moveItem(array, from, to) {
  const [item] = array.splice(from, 1);
  array.splice(to, 0, item);
}

function getTeamStats(teamId) {
  const [gp = 0, w = 0, d = 0, l = 0, gf = 0, ga = 0, gd = 0, pts = 0, advanced = 0] =
    snapshotStats[teamId] || [];
  return { gp, w, d, l, gf, ga, gd, pts, advanced: Boolean(advanced) };
}

function formatGoalDifference(value) {
  return value > 0 ? `+${value}` : String(value);
}

function updateProgress() {
  const picked = Object.keys(state.selections).filter((no) => bracket[no]?.winnerId).length;
  const percent = Math.round((picked / 31) * 100);
  el("selectedMatches").textContent = picked;
  el("knockoutStepStatus").textContent = `${picked} / 31`;
  el("predictionProgressBar").style.width = `${percent}%`;
  el("heroProgress").textContent = `${percent}%`;

  document.querySelectorAll(".workflow-step").forEach((step, index) => {
    step.classList.toggle("active", index === (picked === 31 ? 2 : picked > 0 ? 2 : 0));
  });
}

function showToast(message) {
  const toast = el("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function resetGroups() {
  state.groups = structuredClone(snapshotGroups);
  state.thirdOrder = [...snapshotThirdOrder];
  state.selections = {};
  state.manualGroups = false;
  state.manualThirds = false;
  renderAll();
  saveState();
  showToast(t("restoredToast"));
}

function resetAll() {
  state = {
    groups: structuredClone(snapshotGroups),
    thirdOrder: [...snapshotThirdOrder],
    selections: {},
    manualGroups: false,
    manualThirds: false,
  };
  renderAll();
  saveState();
  showToast(t("resetToast"));
  document.querySelector(".hero").scrollIntoView({ behavior: "smooth" });
}

function clearBracket() {
  state.selections = {};
  rebuildBracket();
  renderBracket();
  saveState();
  showToast(t("bracketClearedToast"));
}

function syncKnockoutResults() {
  const entries = Object.entries(REAL_KNOCKOUT_RESULTS);
  if (!entries.length) {
    showToast(t("noRealResultsToast"));
    return;
  }

  entries.forEach(([matchNo, result]) => {
    const winnerId = typeof result === "string" ? result : result.winner;
    if (winnerId) state.selections[matchNo] = winnerId;
  });

  rebuildBracket();
  renderBracket();
  saveState();
  showToast(t("realResultsSyncedToast", { count: entries.length }));
}

function renderAll() {
  rebuildBracket();
  renderGroups();
  renderThirdRanking();
  renderBracket();
}

function formatUpdatedAt(dateValue) {
  return new Intl.DateTimeFormat(currentLanguage === "en" ? "en-GB" : "zh-CN", {
    timeZone: "Asia/Shanghai",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(dateValue));
}

function updateDataTimestamp() {
  el("dataUpdatedAt").textContent = formatUpdatedAt(snapshotUpdatedAt);
}

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    el(button.dataset.scroll).scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

el("resetGroupsBtn").addEventListener("click", resetGroups);
el("resetAllBtn").addEventListener("click", resetAll);
el("clearBracketBtn").addEventListener("click", clearBracket);
el("syncKnockoutBtn").addEventListener("click", syncKnockoutResults);
el("refreshDataBtn").addEventListener("click", () => refreshLiveData());
el("languageToggle").addEventListener("click", () => {
  setLanguage(currentLanguage === "zh" ? "en" : "zh");
});

applyStaticTranslations();
renderAll();
updateDataTimestamp();
refreshLiveData({ silent: true });
