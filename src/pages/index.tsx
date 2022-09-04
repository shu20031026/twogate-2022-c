import type { NextPage } from 'next'
import { GithubAuth } from '~/component/domain/githubAuth'
import { fetchUserData } from '~/utils/firestore'
// homeページ
const Home: NextPage = () => {
  return (
    <div>
      <div>
        <GithubAuth />
      </div>
      <div onClick={() => fetchUserData('user_2')}>
        <p>ユーザー取得</p>
      </div>
      <div>home</div>
    </div>
  )
}

export default Home
