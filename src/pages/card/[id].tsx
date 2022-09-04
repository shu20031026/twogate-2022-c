import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchCardData } from '../../utils/firestore'
import Card from '../../component/card'
import { CardModel } from '~/models/card'
// 名刺ページ
const NameCard: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [card, setCard] = useState<CardModel>()
  useEffect(() => {
    if (!router.isReady) return
    fetchCardData(id).then((data) => {
      setCard(data as CardModel)
    })
  }, [router.isReady, router.query.id])
  return (
    <div>
      名刺ページ{router.query.id}
      <>{card && <Card card={card} />}</>
    </div>
  )
}
export default NameCard
