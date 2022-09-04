import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '~/constant/firebase'
import { getAuth, GithubAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
export const githubProvider = new GithubAuthProvider()

export const firestore = getFirestore(firebaseApp)
