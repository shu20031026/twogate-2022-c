import { firestore } from '~/infra/firebase'
import { addDoc, doc, getDoc, collection, setDoc } from 'firebase/firestore'

export const fetchCardData = async (cardId: any) => {
  const cardsCollection = collection(firestore, 'cards')
  const cardDoc = doc(cardsCollection, cardId)
  try {
    const getCard = await getDoc(cardDoc)
    return getCard.data()
  } catch (error) {
    console.error(error)
  }
}

export const fetchUserData = async (uid: string) => {
  const docRef = doc(firestore, 'user', uid)
  try {
    const getUser = await getDoc(docRef)
    return getUser.data()
  } catch (error) {
    console.error
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
    return await Promise.all(myCardList)
  } catch (error) {
    console.error(error)
  }
}

export type cardObject = {
  eventTag: string
  groupTag: string
  name: string
  overview: string
  repository: string
  serviceURL: string
}

export const createCard = async (cardData: cardObject) => {
  const docRef = await addDoc(collection(firestore, 'cards'), cardData)
  console.log(docRef.id)
  return docRef.id
}

export const updateMyCardList = async (uid: string, cardId: string) => {
  const currentUserData = await fetchUserData(uid)
  const docRef = doc(firestore, 'cards', cardId)
  currentUserData?.mycard.push(docRef)
  await setDoc(doc(firestore, 'user', uid), currentUserData)
}

export const createMyCard = async (cardData: cardObject, uid: string) => {
  const cardId = await createCard(cardData)
  await updateMyCardList(uid, cardId)
  return cardId
}

export type exchangeCardSet = {
  cardId: string
  picture: string
}

export const updateExchangeCardList = async (
  uid: string,
  cardId: string,
  picture: string
) => {
  const currentUserData = await fetchUserData(uid)
  console.log(currentUserData?.mycard)
  const docRef = doc(firestore, 'cards', cardId)
  currentUserData?.exchangeCards.push({ cardId: docRef, picture })
  await setDoc(doc(firestore, 'user', uid), currentUserData)
}
