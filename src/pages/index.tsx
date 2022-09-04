import type { NextPage } from 'next'
import { css } from '@emotion/react'
import QRcode from 'qrcode.react'
// homeページ

const container = css`
  width: 100%;
  height: calc(100vh - 60px - 50px);
  text-align: center;
`

const serviceName = css`
  color: #00b9aa;
  font-size: 60px;
  font-weight: 600;
  margin-top: 50px;
  margin-bottom: 40px;
`

const catchCopy = css`
  color: #00b9aa;
  font-size: 20px;
  margin-top: 20px;
`
const Home: NextPage = () => {
  return (
    <div css={container}>
      <div css={serviceName}>HackCard</div>
      <QRcode value="https://twogate-2022-c.web.app" size={250} />
      <div css={catchCopy}>
        ハッカソンでの交流を
        <br />
        オンライン名刺でもっと楽しく
      </div>
    </div>
  )
}

export default Home
