import {
  ChartBarIcon,
  DotsVerticalIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/outline'
import { GAME_TITLE } from '../../constants/strings'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsSettingsModalOpen,
}: Props) => {
  const gameHeading = GAME_TITLE.split(' ')
  
  return (
    <div className="flex max-w-lg mx-auto items-center mb-2 md:mb-3 mt-0 md:mt-3">
      <h1 className="hidden">{GAME_TITLE}</h1>
      <QuestionMarkCircleIcon
        className="h-6 w-6 ml-3 cursor-pointer dark:stroke-white"
        onClick={() => setIsInfoModalOpen(true)}
      />
      <span className="local-font text-sm sm:text-sm md:text-base lg:text-lg font-bold ml-2.5 shrink dark:text-white">
        {gameHeading[0]} {gameHeading[1]}
      </span>
      <span className="local-font text-xl sm:text-2xl font-bold ml-2.5 grow dark:text-white">
        {gameHeading[2]}
      </span>
      <ChartBarIcon
        className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
        onClick={() => setIsStatsModalOpen(true)}
      />
      <DotsVerticalIcon
        className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
        onClick={() => setIsSettingsModalOpen(true)}
      />
    </div>
  )
}
