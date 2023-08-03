import Blowfish from 'egoroof-blowfish'

import { BLOWFISH_IV, BLOWFISH_KEY } from '../constants/settings'

// https://github.com/egoroof/blowfish/blob/master/README.md
const bf = new Blowfish(BLOWFISH_KEY, Blowfish.MODE.ECB, Blowfish.PADDING.NULL)
bf.setIv(BLOWFISH_IV)

export const encrypt = (data: string) =>
  btoa(
    bf.encode(data).reduce((data, byte) => data + String.fromCharCode(byte), '')
  )

export const decrypt = (encoded: string) => {
  try {
    return bf.decode(
      Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0)),
      Blowfish.TYPE.STRING
    )
  } catch (error) {
    return null
  }
}
