import { Fragment } from "react";
import { Transition } from "@headlessui/react";

type Props = {
  isOpen: boolean;
  message: string;
};

export const Alert = ({ isOpen, message }: Props) => {
  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-300 transition"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 max-w-sm w-full bg-rose-200 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="p-4">
          <p className="text-sm text-center font-medium text-gray-900">
            {message}
          </p>
        </div>
      </div>
    </Transition>
  );
};
