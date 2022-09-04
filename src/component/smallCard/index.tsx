import { css } from '@emotion/react'
import NextLink from 'next/link'
import QRcode from 'qrcode.react'
import MuiLink from '@mui/material/Link'
import {
  creatorNameStyle,
  infoWrapper,
  qrcodeWrapper,
  serviceNameStyle,
  smallCardContainer,
} from './style'

// eventTag: "TwoGate2022"
// groupTag: "teamC"
// name: "中嶋柊"
// overview: "めっちゃすげぇあぷり"
// repository: "https://github.com/shu20031026/twogate-2022-c"
// serviceURL: "https://twogate-2022-c.web.app"
// serviceName: "hogehogeあぷり"

export const SmallCard = ({ cardId, name, serviceName }: any) => {
  const url = `https://twogate-2022-c.web.app/card/${cardId}`
  return (
    <NextLink href={`/card/${cardId}`} passHref>
      <MuiLink css={smallCardContainer}>
        <div css={qrcodeWrapper}>
          <QRcode value={url} size={75} />
        </div>
        <div css={infoWrapper}>
          <p css={serviceNameStyle}>{serviceName}</p>
          <p css={creatorNameStyle}>creator：{name}</p>
        </div>
      </MuiLink>
    </NextLink>
  )
}
