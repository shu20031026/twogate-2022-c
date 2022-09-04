import { atom } from 'recoil'

export type authDataType = {
  uid: string | null
  userImage: string | null
}

export const authState = atom<authDataType | undefined>({
  key: 'authState',
  default: undefined,
})

export const githubCredentialState = atom<string | undefined>({
  key: 'githubCredentialState',
  default: undefined,
})
