import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchBar from './search_bar'

// Use to filter the search bar and show contacts
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

// API
import * as ContactsAPI from './utils/ContactsAPI'

import {Route} from 'react-router-dom'
import AddContact from './add_contact';

class Contacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
      }

    state = {
        contacts: [],
        query:''
    }

    // API call. ContactsAPI request all contacts
    componentDidMount = ()=>{
        ContactsAPI.getAll().then((contacts)=>{
            this.setState(({contacts:contacts}))
        })
    }

    // Add new contact
    createContact(person) {
        ContactsAPI.create(person).then(person => {
          this.setState(state => ({
                contacts: state.contacts.concat([person])
            }))
        })
    }
    
    // Removes a contact from UI, it filters contacts to not showing the given removed contact
    onRemoveContact = (person) => {this.setState((state)=>({
        contacts: this.state.contacts.filter((c) => 
            c.id !== person.id)
        }))
        ContactsAPI.remove(person)
    }
    
    // Matches the state query to the query being typed 
    updateQuery = (q) => {
        this.setState({ query: q.trim()})
    }
    
    // Handles the change in value in serach bar and calls updateQuery
    handleChange = (event) => {
        this.updateQuery(event.target.value)
    }
    
    // Updates state query to '' to show all contacts
    resetCounter = () => {
        this.setState({query:''})
    }
    
    render() {
        let showingContacts
        const { query, contacts } = this.state
        
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingContacts = contacts.filter((contact) => 
            match.test(contact.name))} 
        else {showingContacts = contacts}
        
        showingContacts.sort(sortBy('name'))
        
        return (
            <div>
                <SearchBar query={query} 
                    handleChange={this.handleChange}/>
                {showingContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Showing {contacts.length} out of {showingContacts.length}
                        <button onClick={this.resetCounter}>Reset</button>
                        </span>
                    </div>)
                }
                <ol className="contact-list">
                    {showingContacts.map(person => <li key={person.id} 
                        className="contact-list-item">
                    <div className='contact-avatar' 
                        style={{backgroundImage:`url(${person.avatarURL})`}}></div>
                    <div className='contact-details'>
                        <p>{person.name}</p>
                        <p>{person.email}</p>
                    </div>
                    <button className='contact-remove'
                        onClick={() => this.onRemoveContact(person)}>Remove</button>
                    </li>)}
                </ol>
                <Route exact path='/create' render={({ history }) => (
                    <AddContact onCreateContact={(contact) => {
                        this.createContact(contact)
                        history.push('/')
                        }}
                    />
                )}/>
            </div>
            )
        }
    }
  
  export default Contacts