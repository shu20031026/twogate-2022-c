import { NextPage } from 'next'
import { useRouter } from 'next/router'
// 名刺ページ
const NameCard: NextPage = () => {
  const router = useRouter()
  return <div>名刺ページ{router.query.id}</div>
}
export default NameCard
