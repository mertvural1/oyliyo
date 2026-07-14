import { initializeApp } from 'firebase/app'
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

export const database = getDatabase(initializeApp(firebaseConfig))
