function customRender(reactElement, container) {
    const domElement=document.createElement(reactElement.type)
    domElement.type=reactElement.type.children
    domElement.href=reactElement.props.href
    domElement.target=reactElement.props.target
    domElement.className=reactElement.props.className
    container.appendChild(domElement)

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
const mainconatiner=document.querySelector('#root')