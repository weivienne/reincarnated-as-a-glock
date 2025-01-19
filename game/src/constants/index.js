import panel1 from "../panels/panel1.png";
import panel2 from "../panels/panel2.png";
import panel3 from "../panels/panel3.png";
import panel4 from "../panels/panel4.png";

export const PANELS = [
  {
    id: 0,
    background: panel1,
    mc_dialogue: "Type to start",
    mc_dialogue_x: "2.7rem",
    mc_dialogue_y: "10rem",
    other_dialogues: () => [`This is a typing game.`],
    next_id: 1,
  },
  {
    id: 1,
    background: panel2,
    mc_dialogue: "This is another test.",
    mc_dialogue_x: "-2.7rem",
    mc_dialogue_y: "10rem",
    other_dialogues: () => [],
    next_id: 2,
  },
  {
    id: 2,
    background: panel3,
    mc_dialogue: "null",
    mc_dialogue_x: "2.7rem",
    mc_dialogue_y: "10rem",
    other_dialogues: () => [],
    next_id: 3,
  },
  {
    id: 3,
    background: panel4,
    mc_dialogue: " ",
    mc_dialogue_x: "2.7rem",
    mc_dialogue_y: "10rem",
    other_dialogues: () => [],
    next_id: 4,
  },
  {
    id: 4,
    background: panel4,
    mc_dialogue: "null",
    mc_dialogue_x: "2.7rem",
    mc_dialogue_y: "10rem",
    other_dialogues: () => [],
    next_id: 5,
  },
  {
    id: 5,
    background: panel4,
    mc_dialogue: " ",
    mc_dialogue_x: "2.7rem",
    mc_dialogue_y: "10rem",
    other_dialogues: () => [],
    next_id: 6,
  },
];