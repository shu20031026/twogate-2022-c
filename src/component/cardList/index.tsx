import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { authState } from '~/context/atoms'
import { fetchExchangeCardList, fetchMyCardList } from '~/utils/firestore'
import { SmallCard } from '../smallCard'
import { cardWrapper } from './style'

export const MyCardList = () => {
  const authData = useRecoilValue(authState)
  const uid = authData?.uid ? authData?.uid : ''
  const [cardsData, setCardsData] = useState<any[] | undefined>(undefined)
  useEffect(() => {
    //
    const f = async () => {
      const data = await fetchMyCardList(uid)
      setCardsData(data)
    }
    f()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(cardsData)
  return (
    <div>
      {cardsData?.length === 0 ? (
        <div>名刺がありません</div>
      ) : (
        <div>
          {cardsData?.map((card) => (
            <div key={card.cardId} css={cardWrapper}>
              <SmallCard
                cardId={card.cardId}
                name={card.cardData.name}
                serviceName={card.cardData.serviceName}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const ExchangeCardList = () => {
  const authData = useRecoilValue(authState)
  const uid = authData?.uid ? authData?.uid : ''
  const [exchangeCardsData, setExchangeCardsData] = useState<any[] | undefined>(
    undefined
  )
  useEffect(() => {
    const f = async () => {
      const data = await fetchExchangeCardList(uid)
      setExchangeCardsData(data)
    }
    f()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      {exchangeCardsData?.length === 0 ? (
        <div>名刺がありません</div>
      ) : (
        <div>
          {exchangeCardsData?.map((card) => (
            <div key={card.cardId} css={cardWrapper}>
              <SmallCard
                cardId={card.cardId}
                name={card.cardData.name}
                serviceName={card.cardData.serviceName}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
