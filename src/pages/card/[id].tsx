import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchCardData, updateExchangeCardList } from '../../utils/firestore'
import { CardModel } from '~/models/card'
import QRcode from 'qrcode.react'
import { useRecoilState } from 'recoil'
import { authState, githubCredentialState } from '~/context/atoms'
import { firebaseAuth, githubProvider } from '~/infra/firebase'
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { css } from '@emotion/react'

const CardContainer = css`
  width: 100%;
  text-align: center;
  padding: 0 40px 0 40px;
`

const qrcodeWrapper = css`
  margin: 20px;
`

const serviceNameStyle = css`
  color: #00b9aa;
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 10px;
`

const tagWrapper = css`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`

const tagStyle1 = css`
  background-color: #00b9aa;
  padding: 4px 10px 4px 10px;
  color: white;
`
const tagStyle2 = css`
  border: 1px solid #00b9aa;
  padding: 4px 10px 4px 10px;
  color: #00b9aa;
`

const creatorNameStyle = css`
  font-size: 20px;
  margin-bottom: 10px;
`

const urlWrapper = css`
  text-align: center;
`

const urlButton = css`
  width: fit-content;
  padding: 10px;
  border-radius: 3px;
  background-color: #00b9aa;
  color: white;
  margin: 0 auto;
  margin-bottom: 30px;
`

const overviewStyle = css`
  width: 100%;
`

const saveButton = css`
  position: absolute;
  width: calc(100% - 80px);
  bottom: 30px;
  margin: 0 40px 0 40px;
  border: 1px solid #00b9aa;
  color: #00b9aa;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 2px;
`

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
      <div css={overviewStyle}>{card.overview}</div>
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
