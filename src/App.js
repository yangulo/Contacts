import React, { Component } from 'react'
import Contacts from './contacts'
import {Route} from 'react-router-dom'
// import AddContact from './add_contact';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/' component={Contacts}/>
        {/* <Route path='/create' component={AddContact}/> */}
      </div>
    );
  }
}

export default App
