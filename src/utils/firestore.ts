import { firestore } from '~/infra/firebase'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'

export const fetchUserData = async (collectionName: string) => {
  const docRef = doc(firestore, 'user', collectionName)
  try {
    const docSnap = await getDoc(docRef)
    console.info(docSnap.data())
  } catch (error) {
    console.error(error)
  }
}

export const fetchUserCollections = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'user'))
    querySnapshot.forEach(async (doc) => {
      console.log(doc.id, ' => ', doc.data())
      doc.data().mycard.forEach(async (item: any) => {
        const cardData = await fetchCardData(item)
        console.log(cardData)
      })
    })
  } catch (error) {
    console.error(error)
  }
}

export const fetchCardData = async (cardPath: any) => {
  try {
    const getCard = await getDoc(cardPath)
    return getCard.data()
  } catch (error) {
    console.error(error)
  }
}

export const fetchMyCardList = async (uid: string) => {
  const docRef = doc(firestore, 'user', uid)
  try {
    const docSnap = await getDoc(docRef)
    const myCardList = docSnap.data()?.mycard.map(async (item: any) => {
      const cardDoc = await getDoc(item)
      return cardDoc.data()
    })
    return await Promise.all(myCardList)
  } catch (error) {
    console.error(error)
  }
}

export const fetchExchangeCardList = async (uid: string) => {
  const docRef = doc(firestore, 'user', uid)
  try {
    const docSnap = await getDoc(docRef)
    const myCardList = docSnap.data()?.exchangeCards.map(async (item: any) => {
      const cardDoc = await getDoc(item.cardId)
      const cardURL = item.picture
      return {
        cardData: cardDoc.data(),
        picture: cardURL,
      }
    })
    console.log(await Promise.all(myCardList))
  } catch (error) {
    console.error(error)
  }
}
