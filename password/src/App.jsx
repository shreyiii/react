import { useState, useCallback, useEffect } from 'react'

function App() {
  const MIN_LEN = 4
  const MAX_LEN = 64
  const [length, setlength] = useState(12)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const[password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState([])

  const handleGeneratePassword = useCallback(()=> {
    let pass = ''
    let str = ''
    if(includeUppercase) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(includeLowercase) str += "abcdefghijklmnopqrstuvwxyz"
    if(includeNumbers) str += "0123456789"
    if(includeSymbols) str += "!@#$%^&*()_+~`|}{[]:;?><,./-="
    if(!str) str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    for(let i=0; i<Number(length); i++){
      pass += str.charAt(Math.floor(Math.random() * str.length))
    }
    setPassword(pass)
    setHistory(prev => [pass, ...prev].slice(0, 10))

  },  [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols])
  useEffect(() => {
    if(!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const handleCopy = async () => {
    if(!password) return
    try{
      await navigator.clipboard.writeText(password)
      setCopied(true)
    }catch(e){
      console.error('copy failed', e)
    }
  }

  const computeStrength = () => {
    let score = 0
    if(length >= 8) score++
    if(length >= 12) score++
    if(includeNumbers) score++
    if(includeSymbols) score++
    if(includeUppercase && includeLowercase) score++
    if(score <= 1) return {label: 'Weak', color: 'bg-red-500', pct: 20}
    if(score <= 3) return {label: 'Medium', color: 'bg-yellow-400', pct: 60}
    return {label: 'Strong', color: 'bg-green-500', pct: 100}
  }

  const clearHistory = () => setHistory([])
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center bg-gray-900 shadow-md text-white text-center">
        <div className="w-[400px] p-6 bg-gradient-to-br from-gray-800/70 to-gray-900/60 rounded-xl shadow-xl text-white text-center flex flex-col items-center justify-center generator-card">
          <h2 className="text-2xl font-bold mb-4 text-center">Password Generator</h2>
          <div className="w-full relative rounded-lg mb-4 overflow-hidden">
            <input type={showPassword ? 'text' : 'password'} value={password} readOnly className="w-full p-2 bg-gray-700 text-white text-center placeholder:text-gray-500" placeholder="Your generated password will appear here" />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <button className="text-sm text-gray-300 hover:text-white" onClick={() => setShowPassword(s => !s)}>{showPassword ? 'Hide' : 'Show'}</button>
              <button className="text-sm text-gray-300 hover:text-white" onClick={handleCopy}>{copied ? 'Copied' : 'Copy'}</button>
            </div>
          </div>
          <div className="w-full mb-4">
            <label className="flex items-center mb-2">
              <input type="checkbox" className="mr-2" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />
              Include Uppercase Letters
            </label>
            <label className="flex items-center mb-2">
              <input type="checkbox" className="mr-2" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} />
              Include Lowercase Letters
            </label>
            <label className="flex items-center mb-2">
              <input type="checkbox" className="mr-2" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
              Include Numbers
            </label>
            <label className="flex items-center mb-4">
              <input type="checkbox" className="mr-2" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
              Include Symbols
            </label>
            <input type="number" value={length} onChange={(e) => setlength(Number(e.target.value))} className="w-full p-2 bg-gray-700 text-white text-center" placeholder="Password Length" min={MIN_LEN} max={MAX_LEN} />
            <div className="text-left text-sm mt-2">
              <span className="mr-2">Length: {length}</span>
              <span className="mr-2">Min: {MIN_LEN}</span>
              <span>Max: {MAX_LEN}</span>
            </div>
            <div className="w-full my-3">
              <div className="w-full bg-gray-600 h-2 rounded overflow-hidden">
                <div className={`${computeStrength().color} h-2`} style={{width: `${computeStrength().pct}%`}} />
              </div>
              <div className="text-sm mt-1">Strength: {computeStrength().label}</div>
            </div>
            { (length < MIN_LEN || length > MAX_LEN) && <div className="text-red-400 text-sm mt-2">Choose length between {MIN_LEN} and {MAX_LEN}.</div> }
          </div>
          <button className="w-full btn-primary" onClick={handleGeneratePassword} disabled={length < MIN_LEN || length > MAX_LEN}>Generate Password</button>
          <div className="w-full mt-4 text-left">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">History</h3>
              <button className="text-sm text-gray-300" onClick={clearHistory}>Clear</button>
            </div>
            <ul className="mt-2 max-h-32 overflow-auto text-sm">
              {history.length === 0 && <li className="text-gray-400">No generated passwords yet.</li>}
              {history.map((h, idx) => (
                <li key={idx} className="flex items-center justify-between py-1">
                  <span className="truncate max-w-[260px]">{h}</span>
                  <button className="text-xs text-gray-300" onClick={() => { navigator.clipboard.writeText(h); setCopied(true); }}>Copy</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
