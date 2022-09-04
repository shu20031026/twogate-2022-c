import type { NextPage } from 'next'
import { GithubAuth } from '~/component/domain/githubAuth'
import {
  createMyCard,
  fetchCardData,
  updateExchangeCardList,
  updateMyCardList,
} from '~/utils/firestore'
// homeページ
const Home: NextPage = () => {
  return (
    <div>
      <div>
        <GithubAuth />
      </div>
      <div onClick={() => fetchCardData('cards_test')}>
        <p>fetch</p>
      </div>
      <div onClick={() => updateMyCardList('user_test', 'hoge')}>
        <p>カード交換</p>
      </div>
      <div
        onClick={() =>
          createMyCard(
            {
              eventTag: 'いべんとたぐ2',
              groupTag: 'ぐるーぷたぐ2',
              name: 'なまえ2',
              overview: 'せつめい2',
              repository: 'りぽじとり2',
              serviceURL: 'さーびすURL2',
            },
            'user_test'
          )
        }
      >
        <p>create</p>
      </div>
      <div
        onClick={() =>
          updateExchangeCardList('user_test', 'QnccPg4UyGWyp5l7Sy68', 'picURL')
        }
      >
        <p>交換</p>
      </div>
      <div>home</div>
    </div>
  )
}

export default Home
