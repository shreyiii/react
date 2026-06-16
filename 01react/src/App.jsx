function App() {

  return (
    <div>
      <h1>Hello this is a react app using Vite BY SHREY</h1>
    </div>
  )
}
const reactElement={
    type:'h1',
    props:{
        href:'https://www.google.com',
        target:'_blank',
        className:'heading', 
    },
        children:'Hello this is a react app using Vite BY SHREY'
    }
const anaotherReactElement=(
    <h1>Hello this is a react app using Vite BY SHREY</h1>
)

ReactDOM.render(reactElement, document.getElementById('root')).render(
  <anaotherReactElement/>
)


export default App
