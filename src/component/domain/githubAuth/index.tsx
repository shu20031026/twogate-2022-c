import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { firebaseAuth, githubProvider } from '~/infra/firebase'
import { buttonContainer, buttonText, buttonWrapper } from './style'
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
      console.log(res)
      setAuthData({
        uid: res.user.uid,
        userImage: res.user.photoURL ? res.user.photoURL : '',
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

  return (
    <div css={buttonWrapper}>
      {authData && githubCredential ? (
        <div onClick={signOutApp} css={buttonContainer}>
          <p css={buttonText}>サインアウト</p>
        </div>
      ) : (
        <div onClick={signInApp} css={buttonContainer}>
          <p css={buttonText}>ログイン</p>
        </div>
      )}
    </div>
  )
}
