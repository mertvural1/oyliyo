import { Creator } from './components/Creator'
import { ResultPage } from './components/ResultPage'
import { getRoomFromUrl } from './lib/poll'

const App = () => {
  const room = getRoomFromUrl()

  return room.code ? <ResultPage poll={room.poll} roomCode={room.code} /> : <Creator />
}

export default App
