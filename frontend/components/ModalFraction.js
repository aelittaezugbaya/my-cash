/**
 * Created by aelittaezugbaa on 25/11/2017.
 */
import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import Input from './Input';
import Dropdown from'./Dropdown';

export default class ModalFraction extends React.Component{
  constructor(props){
    super(props)
    this.state={
      subscriptions: false,
      type: 'Monthly Payment'
    }

  }

  chooseSubscriptions(){
    this.setState({
      subscriptions:true
    })
  }

  close = () => {
    this.props.close();
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    window.fetch('/api/fractions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.name.value,
        amount: this.amount.value,
        type: this.state.type
      })
    })

  }

  render(){

    return(
      <Modal show={this.props.show} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Fraction</Modal.Title>
        </Modal.Header>
        <form onSubmit={this.onFormSubmit}>
          <Modal.Body>
              <Input id="name" ref={ref => this.name = ref} placeholder="Enter name of the fraction">Fraction Name</Input>
              <Input id="money" ref={ref => this.amount = ref} placeholder="Enter amount of money for this fraction">Amount of money</Input>
              <Dropdown onChange={(value) => this.setState({type: value })} id="types" name="Type of fraction" types={['Monthly payment','Subscriptions','Payment with card', 'Cash withdrawal']}/>
              {this.state.type=='Subscriptions'?<Input id="subs" placeholder="Enter subscriptions">Subscriptions</Input>:''}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Cancel</Button>
            <Button bsStyle='success' type="submit">Save</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );

  }
}
