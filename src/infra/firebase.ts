import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '~/constant/firebase'
import { getAuth, GithubAuthProvider } from 'firebase/auth'

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)

export const githubProvider = new GithubAuthProvider()
