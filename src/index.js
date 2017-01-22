import "babel-polyfill"
import React, {Component} from 'react'
import ReactDom from 'react-dom'

import App from './components/main'

class HelloWorld extends Component{

  render() {
    return (
      <App/>
    )
  }
}

const content = document.getElementById('react-app')
ReactDom.render(<HelloWorld />, content)
