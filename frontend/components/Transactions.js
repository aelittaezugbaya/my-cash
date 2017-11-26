/**
 * Created by aelittaezugbaa on 25/11/2017.
 */
import React from 'react';
import {Table} from 'react-bootstrap'
import ModalDebtor from './ModalDebtor';

export default class Transactions extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      modalOpen: false
    }
  }
  static defaultProps = {
    transactions: []
  }

  onClickDelete = () => {
    window.fetch('/api/debtors', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        typeId: this.props.fractionId
      })
    }).then(this.props.onDelete)
  }

  render(){
    const {transactions} = this.props;
    return transactions.length !== 0 && (
      <Table  condensed responsive>
        <ModalDebtor show={this.state.modalOpen} debtorName={this.state.debtorName} close={() => {
          this.setState({modalOpen: false})
          this.props.onDelete();
        }}/>
        <thead>
        <tr>
          <th>Creditor</th>
          <th>Amount</th>
          <th>Date</th>
          <th>{this.props.renderSortButton? 'Sort' : 'Remove'} </th>
        </tr>
        </thead>
        <tbody>
        {
          transactions.map( ({creditorName, amount, bookingDate, typeDescription}) => (
            <tr>
              <th>{creditorName ? creditorName : typeDescription}</th>
              <th>{amount}</th>
              <th>{bookingDate}</th>
              <th><button className="btn btn-primary" onClick={() => {
              
               this.props.renderSortButton ? this.setState({modalOpen: true, debtorName: creditorName}) : this.onClickDelete();
              }}>
                {this.props.renderSortButton? 'Sort' : 'Remove'}</button></th>
            </tr>
          ))
        }
        </tbody>
      </Table>
    );
  }
}
