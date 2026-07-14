import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDOQxUa-gCigs0f3AZCxc5aTXb4z0sAE-U',
  authDomain: 'oyliyo.firebaseapp.com',
  databaseURL: 'https://oyliyo-default-rtdb.firebaseio.com',
  projectId: 'oyliyo',
  storageBucket: 'oyliyo.firebasestorage.app',
  messagingSenderId: '699568184909',
  appId: '1:699568184909:web:324eb6222823c5df2e8604',
  measurementId: 'G-FH160KSPXT',
}

const app = initializeApp(firebaseConfig)

export const database = getDatabase(app)
export const auth = getAuth(app)

let anonymousAuthPromise: Promise<void> | null = null

export const ensureAnonymousAuth = () => {
  if (anonymousAuthPromise) return anonymousAuthPromise

  if (auth.currentUser) {
    anonymousAuthPromise = Promise.resolve()
    return anonymousAuthPromise
  }

  anonymousAuthPromise = new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        unsubscribe()
        resolve()
        return
      }

      signInAnonymously(auth)
        .then(() => {
          unsubscribe()
          resolve()
        })
        .catch(error => {
          unsubscribe()
          reject(error)
        })
    })
  })

  return anonymousAuthPromise
}
