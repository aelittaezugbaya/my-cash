/**
 * Created by aelittaezugbaa on 25/11/2017.
 */
import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import Input from './Input';
import Dropdown from'./Dropdown';

export default class ModalDebtor extends React.Component{
  constructor(props){
    super(props)
    this.state={
      fractions: [],
      selectedValue: null
    }
  }

  close = () => {
    this.props.close();
  }

  componentWillReceiveProps = () => {
    window.fetch('/api/fractions', {
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(data => data.json())
    .then((fractions) => this.setState({fractions, selectedValue: fractions[0]._id}))
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    window.fetch('/api/debtors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        debtorName: this.props.debtorName,
        typeId: this.state.selectedValue
      })
    }).then(this.props.close)
  }

  dropdownChange = (value) => {
    this.setState({
      selectedValue: value
    });
  }

  render(){

    return(
      <Modal show={this.props.show} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Fraction</Modal.Title>
        </Modal.Header>
        <form onSubmit={this.onFormSubmit}>
          <Modal.Body>
              <Dropdown
                types={this.state.fractions}
                onChange={this.dropdownChange}
              />
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
