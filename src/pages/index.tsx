import type { NextPage } from 'next'
import { css } from '@emotion/react'

const hoge = css`
  color: red;
`

const Home: NextPage = () => {
  return <div css={hoge}>hoge</div>
}

export default Home
