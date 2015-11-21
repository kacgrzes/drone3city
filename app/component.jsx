import React from 'react';
import CSS from './Component.css'
 
class Hello extends React.Component {
  render() {
    return <h1>Hello</h1>
  }
}
 
React.render(<Hello/>, document.getElementById('app'));