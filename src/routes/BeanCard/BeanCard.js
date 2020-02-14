import React from 'react'
import PropTypes from 'prop-types'
import BeanContext from '../../contexts/BeanContext'
import './BeanCard.css'




export default function BeanPage(props) {


  //credential of the user (auth-user)
  //onClick => 
  //message saying saved
  //update the user table => coffee_beans_id

  //



    return (
     <BeanContext.Consumer>
       {(context) => (
         <div className='Bean'>
           <h3 className='Bean_name'>
            {props.bean_name}
           </h3>
           <p className='Bean_origin'>
            Origin: {props.bean_origin}
           </p>
           <p className='Bean_masl'>
            Meters Above Sea Level: {props.bean_masl}
           </p>
           <p className='Bean_grower'>
            Grower: {props.bean_grower}
           </p>
           <p className='Bean_process'>
            Process: {props.bean_process}
           </p>
           <p className='flavor_notes'>
            Flavor Notes: {props.flavor_notes}
           </p>
           <button className='save'>Save</button>
         </div>
       )}
     </BeanContext.Consumer>
    )
  }

  BeanPage.propTypes = {
    bean_name: PropTypes.string.isRequired,
  }





