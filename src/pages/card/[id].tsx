import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchCardData, updateExchangeCardList } from '../../utils/firestore'
import { CardModel } from '~/models/card'
import QRcode from 'qrcode.react'
import {
  CardContainer,
  creatorNameStyle,
  qrcodeWrapper,
  saveButton,
  serviceNameStyle,
  tagStyle1,
  tagStyle2,
  tagWrapper,
  urlButton,
  urlWrapper,
} from './style'
import { useRecoilState } from 'recoil'
import { authState, githubCredentialState } from '~/context/atoms'
import { firebaseAuth, githubProvider } from '~/infra/firebase'
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth'
// 名刺ページ

interface CardProps {
  card: CardModel
  cardId: string | string[] | undefined
}

const CardComponent = ({ card, cardId }: CardProps) => {
  const url = `https://twogate-2022-c.web.app/card/${cardId}`
  return (
    <div>
      <div css={qrcodeWrapper}>
        <QRcode value={url} size={200} />
      </div>
      <div css={serviceNameStyle}>{card.serviceName}</div>
      <div css={tagWrapper}>
        <div css={tagStyle1}>{card.eventTag}</div>
        <div css={tagStyle2}>{card.groupTag}</div>
      </div>
      <div css={creatorNameStyle}>{card.name}</div>
      <a href={card.serviceURL} css={urlWrapper}>
        <div css={urlButton}>{card.serviceURL}</div>
      </a>
      <div>{card.overview}</div>
    </div>
  )
}

const NameCard: NextPage = () => {
  const [authData, setAuthData] = useRecoilState(authState)
  const [githubCredential, setGithubCredential] = useRecoilState(
    githubCredentialState
  )
  const router = useRouter()
  const { id } = router.query
  const cardId = router.query.id
  const [card, setCard] = useState<CardModel>()
  useEffect(() => {
    if (!router.isReady) return
    fetchCardData(id).then((data) => {
      setCard(data as CardModel)
    })
  }, [router.isReady, router.query.id])

  const exchange = async () => {
    if (authData?.uid !== undefined) {
      await updateExchangeCardList(authData.uid, `${cardId}`, '')
      router.replace('/mypage')
    }
  }

  const login = async () => {
    try {
      const res = await signInWithPopup(firebaseAuth, githubProvider)
      const credential = GithubAuthProvider.credentialFromResult(res)
      console.log(res)
      setAuthData({
        uid: res.user.uid,
        userImage: res.user.photoURL ? res.user.photoURL : '',
      })
      setGithubCredential(credential?.accessToken)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <div css={CardContainer}>
        {card && <CardComponent card={card} cardId={cardId} />}
      </div>
      {authData?.uid !== undefined ? (
        <div css={saveButton} onClick={exchange}>
          保存
        </div>
      ) : (
        <div css={saveButton} onClick={login}>
          ログイン
        </div>
      )}
    </>
  )
}
export default NameCard
