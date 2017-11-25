import React from 'react';
import {ListGroup,ListGroupItem} from 'react-bootstrap';
import MainListItem from './MainListItem';
import Header from './Header';
import Item from './Item';
import ModalFraction from './ModalFraction';

  import {
  getAccounts
} from '../api/';



export default class MainView extends React.Component {
  constructor(props){
    super(props);
    this.state={
      total:2000,
      fractions:[{name:'Apartment',money:330},{name:'Food',money:150}]
    }
  }

  componentDidMount(){
    let amount =this.state.total;
    for(let item of this.state.fractions){
      amount-=item.money;
    }
    getAccounts()
      .then(data => console.log(data))
    this.setState({
      rest:amount,
    })
  }

  render(){
    const {total,fractions}=this.state;
    let items = fractions.map(item =><Item name={item.name} money={item.money}/>);
    return(
      <div className="container-fluid">
        <Header>Manage your cash easily!</Header>
        <ListGroup>
          <MainListItem money={total}/>
          {items}
          <Item name="Rest" bsStyle="info" money={this.state.rest}/>
        </ListGroup>
      </div>
    );
  }
}
