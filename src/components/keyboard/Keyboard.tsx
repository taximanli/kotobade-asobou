import { CharValue } from "../../lib/keyboard";
import { Key } from "./Key";

type Props = {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
};

export const Keyboard = (props: Props) => {
  const onClick = (value: CharValue) => {
    if (value === "ENTER") {
      return props.onEnter();
    }
    if (value === "DELETE") {
      return props.onDelete();
    }
    return props.onChar(value);
  };

  return (
    <div>
      <div className="flex justify-center mb-1">
        <Key value="Q" onClick={onClick}>
          Q
        </Key>
        <Key value="W" onClick={onClick}>
          W
        </Key>
        <Key value="E" onClick={onClick}>
          E
        </Key>
        <Key status="correct" value="R" onClick={onClick}>
          R
        </Key>
        <Key value="T" onClick={onClick}>
          T
        </Key>
        <Key value="Y" onClick={onClick}>
          Y
        </Key>
        <Key status="present" value="U" onClick={onClick}>
          U
        </Key>
        <Key value="I" onClick={onClick}>
          I
        </Key>
        <Key value="O" onClick={onClick}>
          O
        </Key>
        <Key value="P" onClick={onClick}>
          P
        </Key>
      </div>
      <div className="flex justify-center mb-1">
        <Key value="A" onClick={onClick}>
          A
        </Key>
        <Key value="S" onClick={onClick}>
          S
        </Key>
        <Key value="D" onClick={onClick}>
          D
        </Key>
        <Key status="present" value="F" onClick={onClick}>
          F
        </Key>
        <Key value="G" onClick={onClick}>
          G
        </Key>
        <Key value="H" onClick={onClick}>
          H
        </Key>
        <Key value="J" onClick={onClick}>
          J
        </Key>
        <Key status="absent" value="K" onClick={onClick}>
          K
        </Key>
        <Key value="L" onClick={onClick}>
          L
        </Key>
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          ENTER
        </Key>
        <Key value="Z" onClick={onClick}>
          Z
        </Key>
        <Key value="X" onClick={onClick}>
          X
        </Key>
        <Key value="C" onClick={onClick}>
          C
        </Key>
        <Key value="V" onClick={onClick}>
          V
        </Key>
        <Key value="B" onClick={onClick}>
          B
        </Key>
        <Key value="N" onClick={onClick}>
          N
        </Key>
        <Key value="M" onClick={onClick}>
          M
        </Key>
        <Key width={65.4} value="DELETE" onClick={onClick}>
          DELETE
        </Key>
      </div>
    </div>
  );
};
