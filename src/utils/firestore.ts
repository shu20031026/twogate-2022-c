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
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data())
    })
  } catch (error) {
    console.error(error)
  }
}
