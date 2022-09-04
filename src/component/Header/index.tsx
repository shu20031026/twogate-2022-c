import { GithubAuth } from '../domain/githubAuth'
import { css } from '@emotion/react'
import Link from 'next/link'

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
  return (
    <div css={hederContainer}>
      <Link href="/">
        <h1 css={appName}>アプリ名</h1>
      </Link>
      <GithubAuth />
    </div>
  )
}

export default Header
