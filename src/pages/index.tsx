import type { NextPage } from 'next'
import { GithubAuth } from '~/component/domain/githubAuth'
// homeページ
const Home: NextPage = () => {
  return (
    <div>
      <div>
        <GithubAuth />
      </div>
      <div>home</div>
    </div>
  )
}

export default Home
