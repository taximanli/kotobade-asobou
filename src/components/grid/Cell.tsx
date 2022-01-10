import { CharStatus } from "../../lib/statuses";
import classnames from "classnames";

type Props = {
  value?: string;
  status?: CharStatus;
};

export const Cell = ({ value, status }: Props) => {
  const classes = classnames(
    "w-14 h-14 border-solid border-2 border-slate-200 flex items-center justify-center mx-0.5 text-lg font-bold rounded",
    {
      "bg-white": !status,
      "bg-slate-400 text-white": status === "absent",
      "bg-green-500 text-white": status === "correct",
      "bg-yellow-500 text-white": status === "present",
    }
  );

  return (
    <>
      <div className={classes}>{value}</div>
    </>
  );
};
