import React from 'react';
import {ListGroupItem,Button,Collapse,Well} from 'react-bootstrap';
import Transactions from './Transactions'

export default class Item extends React.Component{
  constructor(props) {
    super(props)
    this.state = {detailed: false}
    this.toggle = this.toggle.bind(this)
  }

  delete(){
    window.fetch(`/api/fractions/${this.props.id}`,
      {
        method: 'DELETE',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        }})
      .then(() => this.props.onDelete())
  }

  toggle() {
    console.log(this.state.detailed)
    this.setState({detailed: !this.state.detailed})
  }
  render(){
    return(
      <ListGroupItem condensed bsStyle={this.props.bsStyle}>
        <div className="row" onClick={this.toggle}>
          <div className="col-md-3 col-sm-9 col-xs-7">
            <strong><h4 className="total">{`${this.props.name} :`}</h4></strong>
          </div>
          <div className="col-md-6">
            <h4 className="total">{`${this.props.money} €`}</h4>
          </div>
          { this.props.name!="Rest" && this.props.name!="Savings" && this.props.name!="Total"
          && <div className="text-right">
            <Button className='add' onClick={()=>this.delete()}>Delete</Button>
          </div>}
        </div>
        { this.props.name!="Rest" && this.props.name!="Savings"
          && (<Collapse in={this.state.detailed}>
              <div>
                <Transactions />
              </div>
            </Collapse>)
        }
        
      </ListGroupItem>
    )
  }
}
