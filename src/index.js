import "babel-polyfill"
import React, { Component } from 'react'
import ReactDom from 'react-dom'

import App from './components/main'
// import queryParam from './util'

class Moodmeter extends Component{
  render() {
    if (queryParam('uid')) {
      return <App />
    } else {
      return (
        <div className="text-center">
          <a href="https://workspace.ibm.com/oauth/authorize?response_type=code&client_id=cbebde54-e8ee-4eb4-9ae8-ccc7294a65ee&redirect_uri=https://moodmeter.ngrok.io/api/callback&state=123456789" className="btn btn-lg btn-outline">
            <span className="fa-stack fa-lg" style={{marginRight: "1rem"}}>
              <i className="fa fa-square-o fa-stack-2x"></i>
              <i className="fa fa-bolt fa-stack-1x" style={{top: "-2px"}}></i>
            </span>
            Connect to my Watson Workspace
          </a>
        </div>
      )
    }
  }
}

const queryParam = (param) => {
  let p = new URLSearchParams(window.location.search)
  return p.get(param)
}

const content = document.getElementById('react-app')
ReactDom.render(<Moodmeter />, content)
