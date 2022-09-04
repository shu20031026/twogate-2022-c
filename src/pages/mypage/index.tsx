import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { GithubAuth } from '~/component/domain/githubAuth'
import { authState, githubCredentialState } from '~/context/atoms'
// マイページ 未ログインの場合ホームにリダイレクト
const MyPage: NextPage = () => {
  const authData = useRecoilValue(authState)
  const githubCredential = useRecoilValue(githubCredentialState)
  const router = useRouter()
  useEffect(() => {
    if (!(authData && githubCredential)) {
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <GithubAuth />
      マイページ
    </div>
  )
}

export default MyPage
