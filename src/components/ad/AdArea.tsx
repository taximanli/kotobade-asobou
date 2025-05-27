import { Adsense } from '@ctrl/react-adsense'

const appAd = process.env.REACT_APP_AD!

type Props = {
  adClientId: string
  adSlotId: string
}

export const AdArea = ({ adClientId, adSlotId }: Props) => {
  return (
    <>
      {appAd === 'on' && (
        <div className="text-center adsbygoogle">
          <Adsense client={adClientId} slot={adSlotId} />
        </div>
      )}
    </>
  )
}
