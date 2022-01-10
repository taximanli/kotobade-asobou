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

export const getGuessStatuses = (guess: string): CharStatus[] => {
  const splitSolution = solution.split("");
  const solutionCharsTaken = splitSolution.map((x) => false);

  const statuses: CharStatus[] = [];

  guess.split("").forEach((letter, i) => {
    // handle the correct case
    if (letter === splitSolution[i]) {
      statuses.push("correct");
      solutionCharsTaken[i] = true;
      return;
    }

    // handles the absent case
    if (!splitSolution.includes(letter)) {
      statuses.push("absent");
      return;
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    );
    if (indexOfPresentChar > -1) {
      statuses.push("present");
      solutionCharsTaken[indexOfPresentChar] = true;
      return;
    } else {
      statuses.push("absent");
      return;
    }
  });

  return statuses;
};
