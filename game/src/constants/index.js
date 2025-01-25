// BG panels
import panel1 from "../panels/panel1.png";
import panel2 from "../panels/panel2.png";
import panel3 from "../panels/panel3.png";
import panel4 from "../panels/panel4.png";
import panel5 from "../panels/panel5.png";
import panel6 from "../panels/panel6.png";
import panel7 from "../panels/panel7.png";
import panel8 from "../panels/panel8.png";
import panel9 from "../panels/panel9.png";
import panel10 from "../panels/panel10.png";
import panel11 from "../panels/panel11.png";
import panel12 from "../panels/panel12.png";
import panel13 from "../panels/panel13.png";
import panel14 from "../panels/panel14.png";
import panel15 from "../panels/panel15.png";
import panel16 from "../panels/panel16.png";
import panel17 from "../panels/panel17.png";
import panel18 from "../panels/panel18.png";

// Monster animations
// import monster1 from "../combat/monster1.webm";
// import death from "../combat/death.webm";

const BLACK = "#000000";
const WHITE = "#ffffff";
const GREEN = "#80cc8f";
const RED = "#ff0000";

export const PANELS = [
  {
    id: 0,
    background: panel1,
    mc_dialogue: ["type to start"],
    mc_dialogue_x: "9rem",
    mc_dialogue_y: "30rem",
    rotate: "0deg",
    size: "20px",
    color_before: GREEN,
    color_after: WHITE,
    other_dialogues: () => [`This is a typing game.`],
    combat: false,
    next_id: 1,
  },
  {
    id: 1,
    background: panel2,
    mc_dialogue: ["ding!"],
    mc_dialogue_x: "12rem",
    mc_dialogue_y: "17.5rem",
    rotate: "10deg",
    size: "25px",
    color_before: GREEN,
    color_after: BLACK,
    other_dialogues: () => [],
    combat: false,
    next_id: 2,
  },
  {
    id: 2,
    background: panel3,
    mc_dialogue: ["dammit. need to find the nest fast."],
    mc_dialogue_x: "8rem",
    mc_dialogue_y: "33rem",
    rotate: "-37deg",
    size: "25px",
    color_before: GREEN,
    color_after: BLACK,
    other_dialogues: () => [],
    combat: true,
    next_id: 3,
  },
  {
    id: 3,
    background: panel4,
    mc_dialogue: ["oh no, it's empty!"],
    mc_dialogue_x: "13.5rem",
    mc_dialogue_y: "25rem",
    rotate: "-23deg",
    size: "25px",
    color_before: GREEN,
    color_after: BLACK,
    other_dialogues: () => [],
    combat: false,
    next_id: 4,
  },
  {
    id: 4,
    background: panel5,
    mc_dialogue: ["arg, useless thing", "out of bullets", "damn rifle"],
    mc_dialogue_x: "13rem",
    mc_dialogue_y: "8.5rem",
    rotate: "-23deg",
    size: "25px",
    color_before: GREEN,
    color_after: BLACK,
    other_dialogues: () => [],
    combat: false,
    next_id: 5,
  },
  {
    id: 5,
    background: panel6,
    mc_dialogue: ["shit."],
    mc_dialogue_x: "13.5rem",
    mc_dialogue_y: "25.5rem",
    rotate: "-23deg",
    size: "30px",
    color_before: GREEN,
    color_after: BLACK,
    other_dialogues: () => [],
    combat: false,
    next_id: 6,
  },

  {
    id: 6,
    background: panel7,
    mc_dialogue: ["i'm not even close to finishing!"],
    mc_dialogue_x: "2rem",
    mc_dialogue_y: "34rem",
    rotate: "0deg",
    size: "25px",
    color_before: GREEN,
    color_after: BLACK,
    other_dialogues: () => [`This is a typing game.`],
    combat: false,
    next_id: 7,
  },
  {
    id: 7,
    background: panel8,
    mc_dialogue: ["editor wesson is going to kill me."],
    mc_dialogue_x: "9.5rem",
    mc_dialogue_y: "26rem",
    rotate: "0deg",
    size: "25px",
    color_before: GREEN,
    color_after: BLACK,
    other_dialogues: () => [],
    combat: false,
    next_id: 8,
  },
  {
    id: 8,
    background: panel9,
    mc_dialogue: ["trudge"],
    mc_dialogue_x: "19rem",
    mc_dialogue_y: "24.8rem",
    rotate: "0deg",
    size: "30px",
    color_before: GREEN,
    color_after: BLACK,
    other_dialogues: () => [],
    combat: false,
    next_id: 9,
  },
  {
    id: 9,
    background: panel10,
    mc_dialogue: ["i don't even know where this story is going.."],
    mc_dialogue_x: "17.5rem",
    mc_dialogue_y: "29rem",
    rotate: "0deg",
    size: "23px",
    color_before: GREEN,
    color_after: BLACK,
    other_dialogues: () => [],
    combat: false,
    next_id: 10,
  },
  {
    id: 10,
    background: panel11,
    mc_dialogue: ["maybe then i'll be"],
    mc_dialogue_x: "10rem",
    mc_dialogue_y: "36rem",
    rotate: "0deg",
    size: "25px",
    color_before: GREEN,
    color_after: WHITE,
    other_dialogues: () => [],
    combat: false,
    next_id: 11,
  },
  {
    id: 11,
    background: panel12,
    mc_dialogue: ["screech"],
    mc_dialogue_x: "5rem",
    mc_dialogue_y: "30rem",
    rotate: "0deg",
    size: "80px",
    color_before: GREEN,
    color_after: RED,
    other_dialogues: () => [],
    combat: false,
    next_id: 12,
  },
  {
    id: 12,
    background: panel13,
    mc_dialogue: ["good enough."],
    mc_dialogue_x: "9rem",
    mc_dialogue_y: "28rem",
    rotate: "0deg",
    size: "23px",
    color_before: GREEN,
    color_after: WHITE,
    other_dialogues: () => [`This is a typing game.`],
    combat: false,
    next_id: 13,
  },
  {
    id: 13,
    background: panel14,
    mc_dialogue: [
      "...",
      ".....",
      "am i dead?",
      "what was that?",
      "huh?",
      "this is",
      "...",
      "wha-",
    ],
    mc_dialogue_x: "8rem",
    mc_dialogue_y: "16rem",
    rotate: "0deg",
    size: "20px",
    color_before: GREEN,
    color_after: WHITE,
    other_dialogues: [
      "screech",
      "rata tat tat",
      "click click",
      "\"shit.\"",
      "clang!",
    ],
    combat: false,
    next_id: 14,
  },
  {
    id: 14,
    background: panel15,
    mc_dialogue: ["woooosh"],
    mc_dialogue_x: "2.7rem",
    mc_dialogue_y: "20rem",
    rotate: "-40deg",
    size: "90px",
    color_before: GREEN,
    color_after: BLACK,
    other_dialogues: () => [],
    combat: false,
    next_id: 15,
  },
  {
    id: 15,
    background: panel16,
    mc_dialogue: ["hates glocks"],
    mc_dialogue_x: "9.6rem",
    mc_dialogue_y: "39.3rem",
    rotate: "0deg",
    size: "18px",
    color_before: GREEN,
    color_after: RED,
    other_dialogues: () => [],
    combat: false,
    next_id: 16,
  },
  {
    id: 16,
    background: panel17,
    mc_dialogue: ["eh!?"],
    mc_dialogue_x: "-0.8rem",
    mc_dialogue_y: "14.5rem",
    rotate: "0deg",
    size: "30px",
    color_before: GREEN,
    color_after: BLACK,
    other_dialogues: () => [],
    combat: false,
    next_id: 17,
  },
  {
    id: 17,
    background: panel18,
    mc_dialogue: [" "],
    mc_dialogue_x: "2.7rem",
    mc_dialogue_y: "10rem",
    rotate: "0deg",
    size: "30px",
    color_before: GREEN,
    color_after: BLACK,
    other_dialogues: () => [],
    combat: false,
    next_id: 18,
  },
];
