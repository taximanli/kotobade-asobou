import { solution } from "./words";

export type CharStatus = "absent" | "present" | "correct";

export type CharValue =
  | "Q"
  | "W"
  | "E"
  | "R"
  | "T"
  | "Y"
  | "U"
  | "I"
  | "O"
  | "P"
  | "A"
  | "S"
  | "D"
  | "F"
  | "G"
  | "H"
  | "J"
  | "K"
  | "L"
  | "Z"
  | "X"
  | "C"
  | "V"
  | "B"
  | "N"
  | "M";

export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {};

  guesses.forEach((word) => {
    word.split("").forEach((letter, i) => {
      if (!solution.includes(letter)) {
        // make status absent
        return (charObj[letter] = "absent");
      }

      if (letter === solution[i]) {
        //make status correct
        return (charObj[letter] = "correct");
      }

      if (charObj[letter] !== "correct") {
        //make status present
        return (charObj[letter] = "present");
      }
    });
  });

  return charObj;
};
