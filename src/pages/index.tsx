import type { NextPage } from 'next'
import { GithubAuth } from '~/component/domain/githubAuth'
import { fetchUserCollections, fetchUserData } from '~/utils/firestore'
// homeページ
const Home: NextPage = () => {
  return (
    <div>
      <div>
        <GithubAuth />
      </div>
      <div onClick={fetchUserCollections}>
        <p>fetch</p>
      </div>
      <div>home</div>
    </div>
  )
}

export default Home
