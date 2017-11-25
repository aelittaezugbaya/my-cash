import React from 'react';
import {ListGroupItem,Button} from 'react-bootstrap';


export default class MainListItem extends React.Component {
  constructor(props){
    super(props);
    this.state={
      money:2000,
    }
  }

  render(){
    let {money}=this.state;
    return(
      <ListGroupItem bsStyle="success">
        <div className="row-fluid">
          <div className="col-md-1 col-sm-9 col-xs-7 main-heading">
            <strong><h4 className="total">{`Total:`}</h4></strong>
          </div>
          <div className="col-md-8">
            <h4 className="total">{`${money} €`}</h4>
          </div>
          <div className="text-right">
            <Button bsStyle="primary">Add Fraction</Button>
          </div>

        </div>
      </ListGroupItem>
    );

  }
}