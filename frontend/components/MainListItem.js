import React from 'react';
import {ListGroupItem,Button} from 'react-bootstrap';
import ModalFraction from './ModalFraction';


export default class MainListItem extends React.Component {
  constructor(props){
    super(props);
    this.state={
      money:2000,
      showModal:false
    }
    this.open=this.open.bind(this);
  }
  open() {
    this.setState({ showModal: true });

  }
  render(){
    let {money}=this.state;
    return(
      <div>
        <ModalFraction show={this.state.showModal} close={() => this.setState({ showModal: false })}/>
        <ListGroupItem bsStyle="success">
          <div className="row">
            <div className="col-md-2 col-sm-9 col-xs-7 main-heading">
              <strong><h4 className="total">{`Total:`}</h4></strong>
            </div>
            <div className="col-md-8">
              <h4 className="total">{`${money} €`}</h4>
            </div>
            <div className="text-right">
              <Button className='add' bsStyle="primary" onClick={this.open}>Add Fraction</Button>
            </div>

          </div>
        </ListGroupItem>
      </div>
    );

  }
}