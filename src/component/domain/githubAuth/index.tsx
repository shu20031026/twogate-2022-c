import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { firebaseAuth, githubProvider } from '~/infra/firebase'
import { authButton } from './style'
import { useRecoilState } from 'recoil'
import { authState, githubCredentialState } from '~/context/atoms'
import { useRouter } from 'next/router'

export const GithubAuth = () => {
  const [authData, setAuthData] = useRecoilState(authState)
  const [githubCredential, setGithubCredential] = useRecoilState(
    githubCredentialState
  )
  const router = useRouter()

  const signInApp = async () => {
    try {
      const res = await signInWithPopup(firebaseAuth, githubProvider) //ユーザー情報
      const credential = GithubAuthProvider.credentialFromResult(res) // GitHubアクセストークン等
      setAuthData({
        uid: res.user.uid,
        userImage: res.user.photoURL,
      })
      setGithubCredential(credential?.accessToken)
      router.replace('/mypage')
    } catch (err) {
      console.error(err)
    }
  }

  const signOutApp = async () => {
    try {
      const res = signOut(firebaseAuth)
      setAuthData(undefined)
      setGithubCredential(undefined)
      console.info(res)
      router.replace('/')
    } catch (err) {
      console.error(err)
    }
  }

  const test = () => {
    console.log(authData)
    console.log(githubCredential)
  }

  return (
    <div>
      {authData && githubCredential ? (
        <div onClick={signOutApp} css={authButton}>
          <p>サインアウト</p>
        </div>
      ) : (
        <div onClick={signInApp}>
          <p>GitHubでログイン</p>
        </div>
      )}
      <div onClick={test}>
        <p>test</p>
      </div>
    </div>
  )
}
