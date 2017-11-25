import React from 'react';
import {ListGroupItem} from 'react-bootstrap';

export default class Item extends React.Component{
  render(){
    return(
      <ListGroupItem bsStyle="success">
        <div className="row-fluid">
          <div className="col-md-1 col-sm-9 col-xs-7 main-heading">
            <strong><h4 className="total">{`Total:`}</h4></strong>
          </div>
          <div className="col-md-8">
            <h4 className="total">{`${money} €`}</h4>
          </div>
          </div>
        </ListGroupItem>
    )
  }
}
