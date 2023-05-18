import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import Multiselect from 'multiselect-react-dropdown';


const options = [
  {name: '---Select Topic---', id: 0},
  {name: 'PFMS', id: 1},
  {name: 'MS-Office', id: 2},
  {name: 'Office Rules', id: 3},
  {name: 'Programming', id: 4},      
]




class FormMultiFields extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Title' placeholder='Title' />            
          <Form.Input fluid label='First name' placeholder='First name' />
          <Form.Input fluid label='Last name' placeholder='Last name' />
          <Form.Select
            fluid
            label='Gender'
            options={options}
            placeholder='Gender'
          />
        </Form.Group>
        <Form.Group inline>
          <label>Size</label>
          <Form.Radio
            label='Small'
            value='sm'
            checked={value === 'sm'}
            onChange={this.handleChange}
          />
          <Form.Radio
            label='Medium'
            value='md'
            checked={value === 'md'}
            onChange={this.handleChange}
          />
          <Form.Radio
            label='Large'
            value='lg' 
            checked={value === 'lg'}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Multiselect
        options={options} // Options to display in the dropdown
        showCheckbox
        selectedValues={1} // Preselected value to persist in dropdown
        onSelect={(e)=>console.log(e)} // Function will trigger on select event
        onRemove={(e)=>console.log(e)} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
        />        
        <Form.TextArea label='About' placeholder='Tell us more about you...' />
        <Form.Checkbox label='I agree to the Terms and Conditions' />
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}

export default FormMultiFields

// const FormMultiFields = () => {
//   return (
//     <div>
//       <form className="ui form">
//         <div className="equal width fields">
//           <div className="field">
//             <label>First name</label>
//             <div className="ui fluid input">
//               <input type="text" placeholder="First name" />
//             </div>
//           </div>
//           <div className="field">
//             <label>Last name</label>
//             <div className="ui fluid input">
//               <input type="text" placeholder="Last name" />
//             </div>
//           </div>
//           <div className="field">
//             <label>Gender</label>
//             <div
//               role="listbox"
//               aria-expanded="false"
//               className="ui fluid selection dropdown"
//               tabindex="0"
//             >
//               <div
//                 aria-atomic="true"
//                 aria-live="polite"
//                 role="alert"
//                 className="divider default text"
//               >
//                 Gender
//               </div>
//               <i aria-hidden="true" className="dropdown icon"></i>
//               <div className="menu transition">
//                 <div
//                   style="pointer-events:all"
//                   role="option"
//                   aria-checked="false"
//                   aria-selected="true"
//                   className="selected item"
//                 >
//                   <span className="text">Male</span>
//                 </div>
//                 <div
//                   style="pointer-events:all"
//                   role="option"
//                   aria-checked="false"
//                   aria-selected="false"
//                   className="item"
//                 >
//                   <span className="text">Female</span>
//                 </div>
//                 <div
//                   style="pointer-events:all"
//                   role="option"
//                   aria-checked="false"
//                   aria-selected="false"
//                   className="item"
//                 >
//                   <span className="text">Other</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="inline fields">
//           <label>Size</label>
//           <div className="field">
//             <div className="ui radio checkbox">
//               <input
//                 type="radio"
//                 className="hidden"
//                 readonly=""
//                 tabindex="0"
//                 value="sm"
//               />
//               <label>Small</label>
//             </div>
//           </div>
//           <div className="field">
//             <div className="ui radio checkbox">
//               <input
//                 type="radio"
//                 className="hidden"
//                 readonly=""
//                 tabindex="0"
//                 value="md"
//               />
//               <label>Medium</label>
//             </div>
//           </div>
//           <div className="field">
//             <div className="ui radio checkbox">
//               <input
//                 type="radio"
//                 className="hidden"
//                 readonly=""
//                 tabindex="0"
//                 value="lg"
//               />
//               <label>Large</label>
//             </div>
//           </div>
//         </div>
//         <div className="field">
//           <label>About</label>
//           <textarea placeholder="Tell us more about you..." rows="3"></textarea>
//         </div>
//         <div className="field">
//           <div className="ui checkbox">
//             <input type="checkbox" className="hidden" readonly="" tabindex="0" />
//             <label>I agree to the Terms and Conditions</label>
//           </div>
//         </div>
//         <div className="field">
//           <button className="ui button">Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FormMultiFields;
