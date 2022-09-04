import type { NextPage } from 'next'
import { GithubAuth } from '~/component/domain/githubAuth'
import {
  fetchExchangeCardList,
  fetchMyCardList,
  fetchUserCollections,
} from '~/utils/firestore'
// homeページ
const Home: NextPage = () => {
  return (
    <div>
      <div>
        <GithubAuth />
      </div>
      <div onClick={() => fetchExchangeCardList('user_test')}>
        <p>fetch</p>
      </div>
      <div>home</div>
    </div>
  )
}

export default Home
