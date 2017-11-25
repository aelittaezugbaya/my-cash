import React from 'react';
import {ListGroup,ListGroupItem} from 'react-bootstrap';
import MainListItem from './MainListItem';
import Header from './Header'
import {
  getAccounts
} from '../api/';


export default class App extends React.Component {

  state = () => {

  }
  componentDidMount() {
    getAccounts()
    .then(data => console.log(data))
  }

  render(){
    return(
      <div className="container-fluid">
        <Header>Manage your cash easily!</Header>
        <ListGroup>
          <MainListItem/>
          <ListGroupItem header="Heading 2" href="#">Linked item</ListGroupItem>
          <ListGroupItem header="Heading 3" bsStyle="danger">Danger styling</ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}
