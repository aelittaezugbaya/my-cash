import React from 'react';
import {ListGroupItem,Button} from 'react-bootstrap';

export default class Item extends React.Component{
  render(){
    return(
      <ListGroupItem bsStyle={this.props.bsStyle}>
        <div className="row">
          <div className="col-md-3 col-sm-9 col-xs-7">
            <strong><h4 className="total">{`${this.props.name} :`}</h4></strong>
          </div>
          <div className="col-md-6">
            <h4 className="total">{`${this.props.money} €`}</h4>
          </div>

        </div>
      </ListGroupItem>
    )
  }
}
