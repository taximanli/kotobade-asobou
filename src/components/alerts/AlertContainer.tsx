import { Alert } from './Alert'
import { useAlert } from '../../context/AlertContext'

export const AlertContainer = () => {
  const { message, status, isVisible } = useAlert()

  return <Alert isOpen={isVisible} message={message || ''} variant={status} />
}
