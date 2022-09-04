import type { NextPage } from 'next'
import { GithubAuth } from '~/component/domain/githubAuth'
import { fetchUserData } from '~/utils/firestore'
// homeページ
const Home: NextPage = () => {
  return (
    <div>
      <div>home</div>
    </div>
  )
}

export default Home
