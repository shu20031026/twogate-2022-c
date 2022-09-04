import {
  buttonStyle,
  inputForm,
  inputFormWrapper,
  newCardContainer,
  textArea,
} from './style'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { authState } from '~/context/atoms'
import { createMyCard } from '~/utils/firestore'

const NewCard = () => {
  const authData = useRecoilValue(authState)
  const [name, setName] = useState<string>('')
  const [eventTag, setEventTag] = useState<string>('')
  const [groupTag, setGroupTag] = useState<string>('')
  const [repository, setRepository] = useState<string>('')
  const [overview, setOverview] = useState<string>('')
  const [serviceURL, setServiceURL] = useState<string>('')

  const createNewCard = async () => {
    console.log('create new card')
    const uid = authData?.uid ? authData?.uid : ''
    await createMyCard(
      {
        eventTag,
        groupTag,
        name,
        overview,
        repository,
        serviceURL,
      },
      uid
    )
    setName('')
    setEventTag('')
    setGroupTag('')
    setRepository('')
    setOverview('')
    setServiceURL('')
  }

  return (
    <div css={newCardContainer}>
      <div css={inputFormWrapper}>
        <input
          placeholder="名前"
          css={inputForm}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div css={inputFormWrapper}>
        <input
          placeholder="イベントタグ"
          css={inputForm}
          onChange={(e) => setEventTag(e.target.value)}
          value={eventTag}
        />
      </div>
      <div css={inputFormWrapper}>
        <input
          placeholder="グループタグ"
          css={inputForm}
          onChange={(e) => setGroupTag(e.target.value)}
          value={groupTag}
        />
      </div>
      <div css={inputFormWrapper}>
        <input
          placeholder="プロダクトのリポジトリURL"
          css={inputForm}
          onChange={(e) => setRepository(e.target.value)}
          value={repository}
        />
      </div>
      <div css={inputFormWrapper}>
        <input
          placeholder="プロダクトのURL"
          css={inputForm}
          onChange={(e) => setServiceURL(e.target.value)}
          value={serviceURL}
        />
      </div>
      <div css={inputFormWrapper}>
        <textarea
          placeholder="プロダクトの概要"
          css={textArea}
          onChange={(e) => setOverview(e.target.value)}
          value={overview}
        />
      </div>
      <button css={buttonStyle} onClick={() => createNewCard()}>
        名刺を作成
      </button>
    </div>
  )
}

export default NewCard
