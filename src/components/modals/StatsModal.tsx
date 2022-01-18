import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/outline'
import { trys, successRate, currentStreak, bestStreak } from '../../lib/stats'

//const boxItem = ( label: string, value: string ) => {
//  return ()
// }

type Props = {
  isOpen: boolean
  handleClose: () => void
  stats: number[]
}

export const StatsModal = ({ isOpen, handleClose, stats }: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 
                            pt-5 pb-4 text-left overflow-hidden shadow-xl transform 
                            transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div className="absolute right-4 top-4">
                <XCircleIcon
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => handleClose()}
                />
              </div>
              <div>
                <div className="text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Statistics
                  </Dialog.Title>
                  <div className="flex justify-center m-1">          
                    <div className="items-center justify-center m-1 w-1/4 bg-blue-300">
                      <div className="text-3xl font-bold">{String(trys(stats))} </div>
                      <div className="text-sm">Total trys</div>
                    </div>
                    <div className="items-center justify-center m-1 w-1/4 bg-blue-300">
                      <div className="text-3xl font-bold">{String(successRate(stats))}% </div>
                      <div className="text-sm">Success rate</div>
                    </div>
                    <div className="items-center justify-center m-1 w-1/4 bg-blue-300">
                      <div className="text-3xl font-bold">{String(currentStreak(stats))}</div>
                      <div className="text-sm">Current streak</div>
                    </div>
                    <div className="items-center justify-center m-1 w-1/4 bg-blue-300">
                      <div className="text-3xl font-bold">{String(bestStreak(stats))}</div>
                      <div className="text-sm">Best streak</div>
                    </div>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                  Guess Distribution
                  </Dialog.Title>
                  <div className="columns-1 justify-left m-2 bg-blue-300 text-sm">
                    <div className="flex justify-left m-1 bg-blue-200">
                      <div>1 {String(stats[0])}</div>
                    </div>
                    <div className="flex justify-left m-1 bg-blue-200">
                      <div>2 {String(stats[1])}</div>
                    </div>
                    <div className="flex justify-left m-1 bg-blue-200">
                      <div>3 {String(stats[2])}</div>
                    </div>
                    <div className="flex justify-left m-1 bg-blue-200">
                      <div>4 {String(stats[3])}</div>
                    </div>
                    <div className="flex justify-left m-1 bg-blue-200">
                      <div>5 {String(stats[4])}</div>
                    </div>
                    <div className="flex justify-left m-1 bg-blue-200">
                      <div>6 {String(stats[5])}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
