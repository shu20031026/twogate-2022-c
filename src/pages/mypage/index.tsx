import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { GithubAuth } from '~/component/domain/githubAuth'
import { authState } from '~/context/atoms'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import NewCard from '~/component/newCard'
import Card from '~/component/card'
import List from '~/component/card_list'
import { loginUser } from '~/utils/firestore'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

// マイページ 未ログインの場合ホームにリダイレクト
const MyPage: NextPage = () => {
  const [value, setValue] = useState(0)
  const authData = useRecoilValue(authState)
  // const githubCredential = useRecoilValue(githubCredentialState)
  const router = useRouter()

  useEffect(() => {
    if (authData !== undefined) {
      loginUser(authData.uid)
    } else {
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <div>
      <>
        <Container maxWidth="md">
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="名刺作成" />
                <Tab label="作成した名刺一覧" />
                <Tab label="交換した名刺一覧" />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <NewCard />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Card />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <List />
            </TabPanel>
          </Box>
        </Container>
      </>
    </div>
  )
}

export default MyPage
