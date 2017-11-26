import React from 'react';
import {ListGroupItem,Button,Collapse,Well} from 'react-bootstrap';
import Transactions from './Transactions'

export default class Item extends React.Component{
  constructor(props) {
    super(props)
    this.state = {detailed: false}
    this.toggle = this.toggle.bind(this)
  }

  static defaultProps = {
    transactions: []
  }

  delete = (event) => {
    event.stopPropagation();
    window.fetch(`/api/fractions/${this.props.id}`,
      {
        method: 'DELETE',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        }})
      .then(() => this.props.onDelete())
  }

  sumTransactions() {
    if(this.props.transactions.length == 0)
      return 0;
    return this.props.transactions
      .reduce((total, item) => {
        if(total instanceof Object) total = 0;
        return total = total + parseFloat(item.amount);
      });
  }

  toggle() {
    name !== 'Rest' && name !== 'Total' && name !== 'Savings' && this.setState({detailed: !this.state.detailed})
  }
  
  round (number, precision) {
     const factor = Math.pow(10, precision);
     const tempNumber = number * factor;
     const roundedTempNumber = Math.round(tempNumber);
     return roundedTempNumber / factor;
  }

  render(){
    const {name} = this.props;
    return(
      <ListGroupItem condensed bsStyle={this.props.bsStyle}>
        <div className="row" onClick={this.toggle}>
          <div className="col-md-3 col-sm-3 col-xs-3">
            <strong><h4 className="total">{`${this.props.name} :`}</h4></strong>
          </div>
          <div className="col-md-2 col-sm-2 col-xs-2">
            <h4 className="total">{`${this.round(this.props.money, 2)} €`}</h4>
          </div>
          <div className="col-md-2 col-sm-2 col-xs-2">
            {
              name !== 'Rest' && name !== 'Total' && name !== 'Savings' && name !== 'Unsorted' && <h4>{`Spent: ${this.round(this.sumTransactions(), 2)} €`}</h4>
            }
          </div>
          <div className="col-md-4 col-sm-4 col-xs-4">
            {
              name !== 'Rest' && name !== 'Total' && name !== 'Savings' && name !== 'Unsorted' && <h4>{`Available: ${this.round(this.props.money - (this.sumTransactions() * -1), 2)} €`}</h4>
            }
          </div>
          <div className="text-right">
            {name !== 'Rest' && name !== 'Total' && name !== 'Savings' && name !== 'Unsorted' && <Button className='add' onClick={this.delete}>Delete</Button>}
          </div>
        </div>
        { this.props.name!="Rest" && this.props.name!="Savings"
          && (<Collapse in={this.state.detailed}>
              <div>
                <Transactions transactions={this.props.transactions} renderSortButton={name == 'Unsorted'} fractionId={this.props.id} onDelete={this.props.onDelete}/>
              </div>
            </Collapse>)
        }
        
      </ListGroupItem>
    )
  }
}
