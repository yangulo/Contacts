import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ImageInput from './ImageInput'
import serializeForm from 'form-serialize'

class AddContact extends Component{
    
    handleSubmit= (event) => {
        event.preventDefault()
        const values = serializeForm(event.target, { hash: true })
        console.log(values)
        if (this.props.onCreateContact)
            this.props.onCreateContact(values)
    }

    render(){
        return(
            <div>
                {/* <Link to='/' className='close-create-contact'/> */}
                <form className='create-contact-form' onSubmit={this.handleSubmit}>
                    <ImageInput className='create-contact-avatar-input'
                        name='avatarURL'
                        maxHeight={64}/>
                    <div className='create-contact-details'>
                        <input type='text' name='name' placeholder='Name'/>
                        <input type='text' name='email' placeholder='Email'/>
                        <button to='/'>Add Contact</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddContact
