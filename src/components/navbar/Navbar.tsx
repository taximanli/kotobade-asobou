import {
  CalendarIcon,
  ChartBarIcon,
  DotsVerticalIcon,
  QuestionMarkCircleIcon,
  HeartIcon,
} from '@heroicons/react/outline'

import { ENABLE_ARCHIVED_GAMES } from '../../constants/settings'
import { GAME_TITLE } from '../../constants/strings'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsSupportModalOpen: (value: boolean) => void
  setIsDatePickerModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsSupportModalOpen,
  setIsDatePickerModalOpen,
  setIsStatsModalOpen,
  setIsSettingsModalOpen,
}: Props) => {
  const gameHeading = GAME_TITLE.split(' ')
  
  return (
    <div className="flex max-w-lg mx-auto items-center mb-2 md:mb-3 mt-0 md:mt-3">
      <h1 className="hidden">{GAME_TITLE}</h1>
      <QuestionMarkCircleIcon
        className="h-6 w-6 ml-1 sm:ml-3 cursor-pointer dark:stroke-white"
        onClick={() => setIsInfoModalOpen(true)}
      />
      <HeartIcon
        className="h-6 w-6 ml-1 sm:ml-2 cursor-pointer stroke-red-600 dark:stroke-red-400"
        onClick={() => setIsSupportModalOpen(true)}
      />
      <span
        className="hidden xs:inline local-font text-sm sm:text-sm md:text-base lg:text-lg font-bold ml-2 sm:ml-2.5 shrink dark:text-white cursor-pointer"
        onClick={() => setIsSupportModalOpen(true)}
      >
        {gameHeading[0]} {gameHeading[1]}
      </span>
      <span
        className="hidden xs:inline local-font text-xl sm:text-2xl font-bold ml-2 sm:ml-2.5 grow dark:text-white cursor-pointer"
        onClick={() => setIsSupportModalOpen(true)}
      >
        {gameHeading[2]}
      </span>
      <span
        className="inline xs:hidden text-center local-font text-xl font-bold grow dark:text-white cursor-pointer"
        onClick={() => setIsSupportModalOpen(true)}
      >
        {gameHeading[2]}
      </span>
      {ENABLE_ARCHIVED_GAMES && (
        <CalendarIcon
          className="h-6 w-6 mr-1 sm:mr-2 cursor-pointer stroke-red-600 dark:stroke-red-400"
          onClick={() => setIsDatePickerModalOpen(true)}
        />
      )}
      <ChartBarIcon
        className="h-6 w-6 mr-1 sm:mr-2 cursor-pointer dark:stroke-white"
        onClick={() => setIsStatsModalOpen(true)}
      />
      <DotsVerticalIcon
        className="h-6 w-6 mr-1 sm:mr-3 cursor-pointer dark:stroke-white"
        onClick={() => setIsSettingsModalOpen(true)}
      />
    </div>
  )
}
