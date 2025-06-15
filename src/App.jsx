import { useState } from 'react'
import './App.css'
import Input from './components/Input.jsx'
import Output from './components/Output.jsx' // ✅ Import this
import Alert from './components/Alert.jsx'

function App() {
  const [Array, setArray] = useState([])
  const [showOutput, setShowOutput] = useState(false);
  const [Algo,setAlgo]=useState('');
  const [alerts,setAlerts]=useState('');
  const [showAlerts,setShowAlerts]=useState(false);

  return (
    <div className='center-container container-fluid'>
      {showAlerts && <Alert alerts={alerts} setShowAlerts={setShowAlerts}/>}
      <h1>DSA Visualiser</h1>
      <Input setShowAlerts={setShowAlerts} setAlerts={setAlerts} setArray={setArray} setAlgo={setAlgo} setShowOutput={setShowOutput} />
      {showOutput && <Output setShowAlerts={setShowAlerts} setAlerts={setAlerts} array={Array} Algo={Algo} setarray={setArray} />}
    </div>
  )
}

export default App
