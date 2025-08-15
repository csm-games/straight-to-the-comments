import React, { useMemo, useState } from "react";

/**
 * Straight to the Comments — Twist Version
 * -------------------------------------------------
 * A single-file React component you can drop into Cursor and deploy to GitHub Pages.
 * TailwindCSS recommended. Works without external libs.
 *
 * How to use quickly:
 * 1) Create a Vite + React + TS or JS project (this file is JS/JSX). Tailwind optional but styled for it.
 * 2) Put this file as src/App.jsx (or any component) and render it.
 * 3) `npm run dev` to test, then push to GitHub + enable Pages.
 *
 * Notes:
 * - The game simulates five platforms with orientation-aware layouts (vertical vs horizontal).
 * - The visible metric is Likes (top-right). A subtle bar (top-left) tracks hidden Digital Footprint.
 * - Mean styles give big early likes but suffer decay and hidden reach penalties across rounds.
 * - Kind styles build a hidden Respect Multiplier that pays off in later rounds.
 * - End screen reveals Digital Footprint and platform consequences.
 */

// ---------------------------------------------
// 1) Core Data
// ---------------------------------------------

const PLATFORMS = [
  {
    key: "instagram",
    label: "Instagram",
    orientation: "vertical", // vertical viewport (portrait)
    accent: "#d62976",
    mockMedia: "/assets/ig.jpg", // replace with your own asset or leave as placeholder
  },
  {
    key: "tiktok",
    label: "TikTok",
    orientation: "vertical",
    accent: "#25F4EE",
    mockMedia: "/assets/tt.mp4", // not actually playing, just a poster frame look
  },
  {
    key: "youtube",
    label: "YouTube",
    orientation: "horizontal", // horizontal viewport (landscape)
    accent: "#FF0000",
    mockMedia: "/assets/yt.jpg",
  },
  {
    key: "text",
    label: "Text Message",
    orientation: "vertical",
    accent: "#10b981",
    mockMedia: "/assets/sms.jpg",
  },
  {
    key: "discord",
    label: "Discord",
    orientation: "horizontal",
    accent: "#5865F2",
    mockMedia: "/assets/discord.jpg",
  },
];

const STYLES = [
  { key: "hypebeast", label: "Hypebeast" },
  { key: "supporter", label: "Supporter" },
  { key: "jokester", label: "Jokester" },
  { key: "roaster", label: "Roaster" },
  { key: "critic", label: "Critic" },
  { key: "hater", label: "Hater" },
];

// Dialogue seeds — provide structure that you can expand to 90+ lines.
// For each platform & style, include 3 exchanges (player -> npc -> player).
// Below are SHORT demo lines; replace with authentic teen-safe content.
const DIALOGUE = {
  instagram: {
    hypebeast: [
      ["Fit is fire fr 🔥", "Drip check passed ✅", "Had to gas it up, looks clean."],
      ["Colors go crazy", "Lowkey vibes", "Palette goes hard ngl."],
      ["Photo hits different", "Angles on point", "Respect the shot!"],
    ],
    supporter: [
      ["Proud of you!", "That's sweet to see.", "Keep going — you got this."],
      ["You worked hard on this", "We notice it", "Keep shining."],
      ["Such a wholesome post", "Needed this today", "Sending good energy."],
    ],
    jokester: [
      ["Bro said 'new phone who dis' pose", "Lmao true", "Okay model status unlocked 😂"],
      ["That shadow got main character energy", "Cameo of the year", "Shadow's the real star."],
      ["Camera ate and left no crumbs", "Plate clean fr", "Chef's kiss 📸"]
    ],
    roaster: [
      ["Bro dressed like a traffic cone", "Orange supremacy", "Relax I'm playin'… kinda."],
      ["Caption trying too hard", "Corn meter rising", "Tell me I'm wrong."],
      ["That filter 2017 core", "Time traveler vibes", "Welcome back, I guess."]
    ],
    critic: [
      ["Lighting's harsh tbh", "Yeah bit overexposed", "Maybe try golden hour next time"],
      ["Crop feels tight", "Headroom zero", "Rule of thirds could help"],
      ["Edit's heavy", "Skin looks plasticky", "Dial back the smoothing"]
    ],
    hater: [
      ["Delete this 💀", "Why post this tho", "Do it for the unblock button"],
      ["Cringe alert", "Muting fr", "Touch grass challenge"],
      ["Unfollow speedrun", "World record", "No offense but offense"]
    ],
  },
  tiktok: {
    hypebeast: [["Beat goes crazy", "Looping this", "Dance clean!"],["Transitions smooth", "Facts", "Chef mode editing"],["Camera moves 🔥", "Stabilized clean", "Teach me that pan"]],
    supporter: [["Keep posting!", "We love consistent creators", "You're improving fast"],["Thanks for the laugh", "Wholesome", "Made my day"],["Algorithm better notice", "Manifesting FYP", "You deserve it"]],
    jokester: [["This my Roman Empire now", "Rent free", "Certified brain worm"],["POV: you're the main quest", "Side quests crying", "100% completion vibes"],["Chef accidentally cooked", "5 Michelin memes", "Sauce unlimited"]],
    roaster: [["Transition jump scare", "Scream 7 teaser", "I'm suing my FYP"],["Audio fighting for its life", "Mic said nope", "Speaker cooked"],["Edits outdated", "CapCut 101", "Tutorial from 2019?"]],
    critic: [["Cut 2 drags", "Trim 0.5s", "Pacing fixes everything"],["Color grade off", "Green tint", "Try warmer midtones"],["Hook weak", "Grab in 1s", "Lead with payoff"]],
    hater: [["Not funny lol", "0/10", "Pack it up"],["Who asked", "Nobody", "Touch grass DLC"],["Reported for boredom", "Ban comedy", "Certified sleep aid"]],
  },
  youtube: {
    hypebeast: [["Intro slaps", "Subs incoming", "Certified binge"],["Thumbnail clean", "Title wins", "CTR about to rise"],["Outro classy", "Respect", "Bell tapped"]],
    supporter: [["This helped a lot", "Bookmarked", "Thanks for explaining"],["You put effort", "Appreciated", "Keep it up"],["Kind energy", "Channel feels safe", "Subbed"]],
    jokester: [["That mic said ASMR not tutorial", "I can hear atoms", "Whisper king"],["Editor deserves a raise", "Oh wait it's you", "Double raise"],["Cooking with chaos", "Chef unhinged", "Tastes like views"]],
    roaster: [["Timestamps where", "Lost in the void", "Navigation who"],["Intro too long", "Skip speedrun", "Get to the point"],["Ad density insane", "Mid-roll city", "Wallet cried"]],
    critic: [["Audio peaks", "Limiter needed", "Normalize to -14 LUFS"],["B-roll repeats", "Need variety", "Shoot alt angles"],["Script rambles", "Cut fluff", "Tighten beats"]],
    hater: [["Worst video today", "Delete channel", "I'm serious"],["Skill issue", "Unsubbed", "Tragic"],["Imagine posting this", "Couldn't be me", "Clown shoes"]],
  },
  text: {
    hypebeast: [["W idea", "Let's run it", "I'm in"],["Proud of u", "Lowkey inspiring", "You got this"],["Gold star", "Teacher mode", "A+ vibes"]],
    supporter: [["That sounded tough", "Here for you", "Call later?"],["Nice move", "Respect the honesty", "You're growing"],["Appreciate u", "Means a lot", "Let's celebrate small wins"]],
    jokester: [["I'll bring the snacks", "You bring the chaos", "Deal"],["Plot twist energy", "Season 3 arc", "Renewed"],["Sending memes", "Therapy lite", "Invoice pending"]],
    roaster: [["Bro you always late", "L clock", "Try time"],["Excuse speedrun PB", "Gold split", "World champ"],["Skill diff", "Accept it", "Training arc when?"]],
    critic: [["That text could land wrong", "Try softer", "Read once more"],["Timing bad", "They're busy", "Send later"],["Message long", "Trim 30%", "Get to point"]],
    hater: [["Nobody cares", "Cry about it", "Mute"],["Embarrassing take", "Delulu", "Good luck"],["You're the problem", "Always were", "Bye"]],
  },
  discord: {
    hypebeast: [["GG team", "Clean comms", "Let's queue"],["Art share goes hard", "Pinned?", "Respect brushwork"],["Build is cracked", "Guide pls", "Teach lobby"]],
    supporter: [["Welcome new folks", "Glad you're here", "Ask anything"],["Mod team cooked", "Thanks y'all", "Community feels safe"],["Great callout", "Saved the run", "Clutch"]],
    jokester: [["Ping @everyone speedrun", "Mods typing…", "jk jk"],["Cat tax or ban", "Rules are rules", "Where's the cat"],["Microwave beeps = boss fight", "We doomed", "gg ez"]],
    roaster: [["You camped spawn", "Peak cringe", "Skill issue"],["Fanart traced?", "Looks sus", "Show layers"],["Strat outdated", "Patch notes exist", "Read next time"]],
    critic: [["Thread drift", "Back on topic?", "Make a new channel"],["Overposting", "Slow mode pls", "Signal to noise"],["Link source", "No screenshots", "Credit artists"]],
    hater: [["Mods asleep", "Chaos time", "Spam incoming"],["Server lame", "Leaving", "Touch grass"],["Everyone here mid", "Delete server", "Bye"]],
  },
};

// Scoring constants
const SCORING = {
  // Immediate likes awarded per selection this round
  baseLikes: {
    hater: 30,
    roaster: 20,
    critic: 10,
    jokester: 8,
    hypebeast: 4,
    supporter: 2,
  },
  // A hidden footprint delta per selection
  footprint: {
    hater: -20,
    roaster: -15,
    critic: -10,
    jokester: 0,
    hypebeast: +5,
    supporter: +10,
  },
  // Likes decay applied to PAST mean comments in LATER rounds
  decay: {
    hater: -15,
    roaster: -10,
    critic: -5,
    jokester: 0,
    hypebeast: 0,
    supporter: 0,
  },
};

// Round-by-round hidden curve settings
const ROUNDS = 5;
const RESPECT_MULTIPLIER_PER_10_FOOTPRINT = 0.05; // every +10 footprint adds +5% future likes
const LOW_FOOTPRINT_REACH_PENALTY = -0.07; // applied when footprint below threshold per round
const LOW_FOOTPRINT_THRESHOLD = -20; // below this, later likes reduced
const BLOCK_THRESHOLD = -45; // platform blocks when platform-local toxicity below this (sum of negative picks)

// ---------------------------------------------
// 2) Helpers
// ---------------------------------------------

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

function formatNum(n){
  return n.toLocaleString();
}

// compute round modifier based on current footprint before awarding new likes
function computeRespectMultiplier(footprint){
  const steps = Math.floor(footprint / 10);
  return 1 + steps * RESPECT_MULTIPLIER_PER_10_FOOTPRINT; // grows discretely
}

function computeReachPenalty(footprint){
  return footprint < LOW_FOOTPRINT_THRESHOLD ? (1 + LOW_FOOTPRINT_REACH_PENALTY) : 1;
}

// ---------------------------------------------
// 3) Component
// ---------------------------------------------

export default function App(){
  const [round, setRound] = useState(0); // 0..4
  const [likes, setLikes] = useState(0);
  const [footprint, setFootprint] = useState(0); // hidden; shown as unlabeled bar
  const [blocked, setBlocked] = useState([]); // array of platform keys
  const [history, setHistory] = useState([]); // [{platformKey, styleKey}]
  const [platformToxicity, setPlatformToxicity] = useState({}); // per platform sum of negative footprints
  const [log, setLog] = useState([]); // on-screen dialogue log per round
  const [finished, setFinished] = useState(false);

  const platform = useMemo(() => PLATFORMS[round], [round]);

  function applyDecayFromPastChoices() {
    // Every new round, apply decay to past mean choices to create the illusion fade.
    // We reduce a portion of total likes based on the composition of prior choices.
    if (history.length === 0) return 0;
    let decayTotal = 0;
    for (let i = 0; i < history.length; i++) {
      const { styleKey } = history[i];
      decayTotal += SCORING.decay[styleKey] || 0;
    }
    return decayTotal;
  }

  function pickStyle(styleKey){
    if (finished) return;
    const platformKey = platform.key;

    // 1) Dialogue
    const lines = (DIALOGUE?.[platformKey]?.[styleKey] || [["...","...","..."]])[Math.floor(Math.random()*3)];
    setLog(lines);

    // 2) Compute likes for this selection with hidden multipliers/penalties
    const base = SCORING.baseLikes[styleKey] || 0;
    const respect = computeRespectMultiplier(footprint);
    const penalty = computeReachPenalty(footprint);

    // Like decay illusion from earlier mean picks
    const decay = applyDecayFromPastChoices();

    let delta = Math.round((base * respect * penalty) + decay);
    if (blocked.includes(platformKey)) delta = Math.floor(delta * 0.25); // heavily throttled if blocked

    const newLikes = Math.max(0, likes + Math.max(0, delta)); // likes never go negative visually

    // 3) Hidden footprint changes
    const fDelta = SCORING.footprint[styleKey] || 0;
    const newFoot = clamp(footprint + fDelta, -100, 100);

    // 4) Platform toxicity tracking & blocking
    const tox = { ...platformToxicity };
    tox[platformKey] = (tox[platformKey] || 0) + Math.min(0, fDelta);

    const newBlocked = blocked.includes(platformKey) || tox[platformKey] <= BLOCK_THRESHOLD
      ? Array.from(new Set([...blocked, platformKey]))
      : blocked;

    // 5) Commit state and progress
    setLikes(newLikes);
    setFootprint(newFoot);
    setPlatformToxicity(tox);
    setBlocked(newBlocked);

    const newHist = [...history, { platformKey, styleKey }];
    setHistory(newHist);

    // advance to next round after short pause (simulate thread play)
    setTimeout(() => {
      if (round + 1 >= ROUNDS) {
        setFinished(true);
      } else {
        setRound(round + 1);
        setLog([]);
      }
    }, 900); // snappy pacing; adjust if you want longer dialogue time
  }

  function reset(){
    setRound(0); setLikes(0); setFootprint(0); setBlocked([]);
    setHistory([]); setPlatformToxicity({}); setFinished(false); setLog([]);
  }

  // ENDING LOGIC: summarize consequences and final rating.
  const summary = useMemo(() => {
    let rating = "Mixed";
    if (footprint >= 30) rating = "Positive Influence";
    else if (footprint <= -30) rating = "Shadow Reputation";

    const platformResults = PLATFORMS.map(p => {
      const isBlocked = blocked.includes(p.key);
      const tox = platformToxicity[p.key] || 0;
      if (isBlocked) return { label: p.label, result: "Shadowbanned / Comments Hidden" };
      if (footprint >= 30 && tox === 0) return { label: p.label, result: "Featured / Pinned Comment" };
      if (footprint >= 10) return { label: p.label, result: "Mild Boost from Reputation" };
      return { label: p.label, result: "No special actions" };
    });

    return { rating, platformResults };
  }, [footprint, blocked, platformToxicity]);

  // UI subcomponents
  const TopBar = () => (
    <div className="flex items-center justify-between w-full p-3">
      {/* Hidden-ish footprint bar (no label) */}
      <div className="flex items-center gap-2">
        <div className="w-40 h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-2 transition-all"
            style={{
              width: `${clamp((footprint + 100) / 2, 0, 100)}%`,
              background: footprint >= 0 ? "linear-gradient(to right,#34d399,#22c55e)" : "linear-gradient(to right,#f87171,#ef4444)",
            }}
          />
        </div>
        <div className="text-xs text-neutral-400 select-none">{/* intentionally unlabeled */}</div>
      </div>

      <div className="text-right">
        <div className="text-neutral-400 text-xs">Likes</div>
        <div className="text-2xl font-semibold tabular-nums">{formatNum(likes)}</div>
      </div>
    </div>
  );

  const PlatformShell = ({ children }) => {
    const orient = platform.orientation;
    const base = "bg-white rounded-2xl shadow p-3 border border-neutral-200";
    // Simulate per-platform viewport frames
    if (orient === "vertical") {
      return (
        <div className={`${base} w-[360px] h-[640px] relative overflow-hidden`}>{children}</div>
      );
    }
    return (
      <div className={`${base} w-[720px] h-[405px] relative overflow-hidden`}>{children}</div>
    );
  };

  const PlatformTopUI = () => (
    <div className="flex items-center justify-between text-xs text-neutral-500">
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full" style={{background: platform.accent}} />
        <span className="font-medium">{platform.label}</span>
      </div>
      <span className="opacity-60">@user · now</span>
    </div>
  );

  const MockMedia = () => (
    <div className="mt-2 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-400 text-sm h-full select-none">
      <span>Media Placeholder ({platform.orientation})</span>
    </div>
  );

  const CommentsUI = () => (
    <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur p-3 border-t border-neutral-200">
      {/* Dialogue view */}
      {log.length > 0 ? (
        <div className="mb-3 space-y-1 text-sm">
          <div><span className="text-neutral-500">You:</span> {log[0]}</div>
          <div><span className="text-neutral-500">NPC:</span> {log[1]}</div>
          <div><span className="text-neutral-500">You:</span> {log[2]}</div>
        </div>
      ) : (
        <div className="mb-3 text-neutral-400 text-sm">Choose a comment style to reply…</div>
      )}
      <div className="grid grid-cols-3 gap-2">
        {STYLES.map(s => (
          <button
            key={s.key}
            onClick={() => pickStyle(s.key)}
            className="text-sm px-3 py-2 rounded-xl border border-neutral-300 hover:border-neutral-400 active:translate-y-[1px]"
          >{s.label}</button>
        ))}
      </div>
    </div>
  );

  const GameCard = () => (
    <PlatformShell>
      <div className="h-full flex flex-col">
        <PlatformTopUI />
        <MockMedia />
        <CommentsUI />
      </div>
    </PlatformShell>
  );

  if (finished) {
    const blocks = blocked.length;
    return (
      <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col items-center py-6">
        <TopBar />
        <div className="max-w-3xl w-full bg-white border border-neutral-200 rounded-2xl shadow p-6">
          <h1 className="text-2xl font-semibold mb-4">Results</h1>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl border border-neutral-200">
              <div className="text-neutral-500 text-xs">Total Likes</div>
              <div className="text-3xl font-bold">{formatNum(likes)}</div>
            </div>
            <div className="p-4 rounded-xl border border-neutral-200">
              <div className="text-neutral-500 text-xs">Platforms that blocked you</div>
              <div className="text-3xl font-bold">{blocks}</div>
              <div className="text-xs text-neutral-500 mt-1">{blocked.map(k => PLATFORMS.find(p=>p.key===k)?.label).join(", ") || "None"}</div>
            </div>
            <div className="p-4 rounded-xl border border-neutral-200">
              <div className="text-neutral-500 text-xs">Digital Footprint</div>
              <div className="text-3xl font-bold">{footprint}</div>
              <div className="text-xs text-neutral-500 mt-1">How people see you online & IRL</div>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">Platform Consequences</h2>
            <ul className="space-y-1 text-sm">
              {summary.platformResults.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-[6px] inline-block w-2 h-2 rounded-full bg-neutral-300" />
                  <span><span className="font-medium">{r.label}:</span> {r.result}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-neutral-200">
            <div className="text-neutral-500 text-xs mb-1">Final Rating</div>
            <div className="text-xl font-semibold">{summary.rating}</div>
            <div className="text-sm text-neutral-500 mt-2">Replay choosing different comment styles to discover alternate outcomes. Kindness builds long-term reach.</div>
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={reset} className="px-4 py-2 rounded-xl border border-neutral-300 hover:border-neutral-400">Replay</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col items-center py-6">
      <TopBar />
      <div className="max-w-5xl w-full flex flex-col items-center gap-4">
        <h1 className="text-xl font-semibold">Straight to the Comments</h1>
        <p className="text-sm text-neutral-500">Chase the likes. (Or do you?)</p>
        <div className="flex flex-col items-center gap-3">
          <div className="text-xs text-neutral-500">Round {round + 1} / {ROUNDS}</div>
          <GameCard />
          <div className="text-xs text-neutral-500">
            Tip: Some comments blow up fast but cool off later. Others age well.
          </div>
          <div className="text-xs text-neutral-400">UI auto-adjusts: {platform.label} is {platform.orientation === 'vertical' ? 'portrait' : 'landscape'}.</div>
        </div>
      </div>
    </div>
  );
}
