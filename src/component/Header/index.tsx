import { GithubAuth } from '../domain/githubAuth'
import { css } from '@emotion/react'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { authState } from '~/context/atoms'

const hederContainer = css`
  background-color: #00b9aa;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  width: 100%;
  height: 60px;
`

const appName = css`
  color: white;
  line-height: 100%;
  margin: 0;
  margin-top: 15px;
  margin-left: 10px;
`

const Header = () => {
  const auth = useRecoilValue(authState)
  return (
    <div css={hederContainer}>
      {auth?.uid ? (
        <Link href="/mypage">
          <h1 css={appName}>HackCard</h1>
        </Link>
      ) : (
        <Link href="/">
          <h1 css={appName}>HackCard</h1>
        </Link>
      )}
      <GithubAuth />
    </div>
  )
}

export default Header
