import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class SearchBar extends Component{
    render(){
        return(
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input className='search-contacts' type='text' 
                    placeholder='Search contacts' value={this.props.query}
                    onChange={this.props.handleChange}/>
                    <Link to='/create' className='add-contact'/>
                </div>
            </div>
        )
    }
}

export default SearchBar