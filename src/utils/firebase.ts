import { initializeApp } from "firebase/app"
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyCSIGTSkVVBXy2Bm8jFnjVdeYbyrtsQ99w",
  authDomain: "its-about-time-d4f81.firebaseapp.com",
  projectId: "its-about-time-d4f81",
  storageBucket: "its-about-time-d4f81.appspot.com",
  messagingSenderId: "1036513070501",
  appId: "1:1036513070501:web:4c05f3b595472a67e82c4c",
  measurementId: "G-PEWLEREJS5",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export type LeaderboardEntry = {
  elapsedMilliseconds: number
  weapon: "native" | "hp" | "dropdown"
  targetTime: string
  username: string
}

export async function storeLeaderboardEntry(entry: LeaderboardEntry) {
  const docRef = collection(db, "leaderboard")
  await addDoc(docRef, entry)
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const collectionRef = collection(db, "leaderboard")
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q)

    const leaderboard: LeaderboardEntry[] = []
    querySnapshot.forEach((doc) => {
      leaderboard.push(doc.data() as LeaderboardEntry)
    })

    return leaderboard.sort(
      (a, b) => a.elapsedMilliseconds - b.elapsedMilliseconds,
    )
  } catch (error) {
    console.error("Error getting documents", error)
  }

  return []
}
