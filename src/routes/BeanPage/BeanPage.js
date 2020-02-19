// import React, { Component } from 'react';
// import FilterApiService from '..//../services/filter-api-service'

// import BeansListContext from '../../contexts/BeansListContext';
// // import FilterApiService from '..//../services/filter-api-service'
// import BeanPage from '../BeanCard/BeanCard';
// // import FilterFlavorNoteOptions from '../../components/FilterFlavorNoteOptions/FilterFlavorNoteOptions';
// import './BeanListPage.css';
// import config from '../../config';
// import CheckBox from '../../components/Checkbox/Checkbox'



// export default class BeanListPage extends Component {
//   static defaultProps = {
//     match: { params: {} },
//   }
  
//   state = {
//     bean: [],
//     error: null,
//   };

//   static contextType = BeansListContext;



//   renderBean() {
//     const { bean } = this.context
//     return (
//       <div className='Bean'>
//           <h3 className='Bean_name'>
//           {bean.bean_name}
//           </h3>
//           <p className='Bean_origin'>
//           Origin: {bean.bean_origin}
//           </p>
//           <p className='Bean_masl'>
//           Meters Above Sea Level: {bean.bean_masl}
//           </p>
//           <p className='Bean_grower'>
//           Grower: {bean.bean_grower}
//           </p>
//           <p className='Bean_process'>
//           Process: {bean.bean_process}
//           </p>
//           <p className='flavor_notes'>
//           Flavor Notes: {bean.flavor_notes}
//           </p>
//      </div>
//     )
//   }

//   render() {
//     const { error, bean } = this.context
//     let content
//     if (error) {
//       content = (error.error === `Bean doesn't exist`)
//         ? <p className='red'>Bean not found</p>
//         : <p className='red'>There was an error</p>
//     } else if (!bean.id) {
//       content = <div className='loading' />
//     } else {
//       content = this.renderBean()
//     }
//     return (
//       <section className='BeanPage'>
//         {content}
//       </section>
//     )
//   }
// }


