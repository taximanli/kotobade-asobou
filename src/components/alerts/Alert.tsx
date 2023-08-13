import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import classNames from 'classnames'

type Props = {
  isOpen: boolean
  message: string
  variant?: 'success' | 'error' | 'correct_word'
  topMost?: boolean
}

export const Alert = ({
  isOpen,
  message,
  variant = 'error',
  topMost = false,
}: Props) => {
  const classes = classNames(
    'fixed z-20 left-1/2 transform -translate-x-1/2 max-w-sm w-4/5 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
    {
      'bottom-14 md:bottom-20 bg-rose-500 text-white': variant === 'correct_word',
      'top-1/3 bg-rose-500 text-white': variant === 'error',
      'top-1/3 bg-blue-500 text-white': variant === 'success',
    }
  )

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
      <div className={classes}>
        <div className="p-2">
          <p className="local-font text-baseline text-center font-medium">{message}</p>
        </div>
      </div>
    </Transition>
  )
}
