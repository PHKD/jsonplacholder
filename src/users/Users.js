import React from 'react';
import axios from 'axios';
//import page from './page.scss';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
class Users extends React.Component{

  constructor(props){
    super(props);
  this.state = {
    users: [],
    newDataData: {
      id: '',name: '',username:'',email:'',address:'',street:'',suite:'',city:'',zipcode:'',
      lat:'',lng:'',phone:'',website:'',Cname:'',catchPhrase:'',bs:''
    },
    editDataData: {
      id: '',name: '',username:'',email:'',street:'',suite:'',city:'',zipcode:'',
      lat:'',lng:'',phone:'',website:'',Cname:'',catchPhrase:'',bs:''
    },
    newDataModal: false,
    editPostModal: false
  };
}
  componentWillMount() {
    this.getData();
  }
  toggleAddDataModal() {
    this.setState({
      newDataModal: ! this.state.newDataModal
    });
  }
  toggleEditDataModal() {
    this.setState({
      editDataModal: ! this.state.editDataModal
    });
  }
  addData() {
    axios.post('https://jsonplaceholder.typicode.com/users', this.state.newDataData).then((response) => {
      let { users } = this.state;

      users.push(response.data);

      this.setState({ users, newPostModal: false, newPostData: {
        id: '',name: '',username:'',email:'',street:'',suite:'',city:'',zipcode:'',
      lat:'',lng:'',phone:'',website:'',Cname:'',catchPhrase:'',bs:''
      }});
    });
  }
  updateData() {
    let { id,name,username,email,street,suite,city,zipcode,
      lat,lng,phone,website,Cname,catchPhrase,bs } = this.state.editDataData;

    axios.put('https://jsonplaceholder.typicode.com/users' + this.state.editDataData.id, {
      id,name,username,email,street,suite,city,zipcode,
      lat,lng,phone,website,Cname,catchPhrase,bs
    }).then((response) => {
      this.getData();

      this.setState({
        editDataModal: false, editDataData: { id: '',name: '',username:'',email:'',street:'',suite:'',city:'',zipcode:'',
      lat:'',lng:'',phone:'',website:'',Cname:'',catchPhrase:'',bs:''}
      })
    });
  }
  editData(id,name,username,email,street,suite,city,zipcode,
      lat,lng,phone,website,Cname,catchPhrase,bs) {
    this.setState({
      editDataData: {id,name,username,email,street,suite,city,zipcode,
      lat,lng,phone,website,Cname,catchPhrase,bs }, editDataModal: ! this.state.editDataModal
    });
  }
  deleteData(id) {
    axios.delete('https://jsonplaceholder.typicode.com/users' + id).then((response) => {
      this.getData();
    });
  }
  getData() {
    axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
      this.setState({
        users: response.data
      })
    });
  }
  render() {
    let users = this.state.users.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
		  <td>{user.address.street}</td>
		  <td>{user.address.suite}</td>
		  <td>{user.address.city}</td>
		  <td>{user.address.zipcode}</td>
		  <td>{user.address.geo.lat}</td>
		  <td>{user.address.geo.lng}</td>
		  <td>{user.phone}</td>
		  <td>{user.website}</td>
      <td>{user.company.name}</td>
		  <td>{user.company.catchPhrase}</td>
		  <td>{user.company.bs}</td>
		  
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editData.bind(this,user.id,user.name,user.username,user.email,user.address.street,
			user.address.suite,user.address.city,user.address.zipcode,
      user.address.geo.lat,user.address.geo.lng,user.phone,user.website,user.company.name,user.company.catchPhrase,user.company.bs)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteData.bind(this, user.id)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

      <h1>USERS</h1>
      <Button className="my-3" color="primary" onClick={this.toggleAddDataModal.bind(this)}>Add User</Button>

      <Modal isOpen={this.state.newDataModal} toggle={this.toggleAddDataModal.bind(this)}>
        <ModalHeader toggle={this.toggleAddDataModal.bind(this)}>Add a new user</ModalHeader>
        <ModalBody>
		<FormGroup>
            <Label for="id">id</Label>
            <Input id="id" value={this.state.newDataData.id} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.id = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>
        <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" value={this.state.newDataData.name} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.name = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="username">UserName</Label>
            <Input id="username" value={this.state.newDataData.username} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.username = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input id="email" value={this.state.newDataData.email} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.email = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="street">Street</Label>
            <Input id="street" value={this.state.newDataData.street} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.street = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="suite">Suite</Label>
            <Input id="suite" value={this.state.newDataData.suite} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.suite = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="city">City</Label>
            <Input id="city" value={this.state.newDataData.city} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.city = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="zipcode">ZipCode</Label>
            <Input id="zipcode" value={this.state.newDataData.zipcode} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.zipcode = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="lat">LAT</Label>
            <Input id="lat" value={this.state.newDataData.lat} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.lat = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="lng">LNG</Label>
            <Input id="lng" value={this.state.newDataData.lng} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.lng = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="phone">Phone</Label>
            <Input id="phone" value={this.state.newDataData.phone} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.phone = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="website">Website</Label>
            <Input id="website" value={this.state.newDataData.website} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.website = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="Cname">Company Name</Label>
            <Input id="Cname" value={this.state.newDataData.Cname} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.Cname = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="catchPhrase">Catch Phrase</Label>
            <Input id="catchPhrase" value={this.state.newDataData.catchPhrase} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.catchPhrase = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="bs">BS</Label>
            <Input id="bs" value={this.state.newDataData.bs} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.bs = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addData.bind(this)}>Add User</Button>{' '}
          <Button color="secondary" onClick={this.toggleAddDataModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editDataModal} toggle={this.toggleEditDataModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditDataModal.bind(this)}>Edit a user</ModalHeader>
        <ModalBody>
        <FormGroup>
            <Label for="id">Id</Label>
            <Input id="id" value={this.state.editDataData.id} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.id = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>
		<FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" value={this.state.editDataData.name} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.name = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="username">UserName</Label>
            <Input id="username" value={this.state.editDataData.username} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.username = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input id="email" value={this.state.editDataData.email} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.email = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="street">Street</Label>
            <Input id="street" value={this.state.editDataData.street} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.street = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="suite">Suite</Label>
            <Input id="suite" value={this.state.editDataData.suite} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.suite = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="city">City</Label>
            <Input id="city" value={this.state.editDataData.city} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.city = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="zipcode">ZipCode</Label>
            <Input id="zipcode" value={this.state.editDataData.zipcode} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.zipcode = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="lat">LAT</Label>
            <Input id="lat" value={this.state.editDataData.lat} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.lat = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="lng">LNG</Label>
            <Input id="lng" value={this.state.editDataData.lng} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.lng = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="phone">Phone</Label>
            <Input id="phone" value={this.state.editDataData.phone} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.phone = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="website">Website</Label>
            <Input id="website" value={this.state.editDataData.website} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.website = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="Cname">Company Name</Label>
            <Input id="Cname" value={this.state.editDataData.Cname} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.Cname = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="catchPhrase">CatchPhrase</Label>
            <Input id="catchPhrase" value={this.state.editDataData.catchPhrase} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.catchPhrase = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="bs">BS</Label>
            <Input id="bs" value={this.state.editDataData.bs} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.bs = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateData.bind(this)}>Update user</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditDataModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>


        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>UserName</th>
              <th>Email</th>
              <th>street</th>
			        <th>suite</th>
			        <th>city</th>
			        <th>zipcode</th>
			        <th>lat</th>
			        <th>lng</th>
			        <th>Phone</th>
              <th>Website</th>
              <th>Company Name</th>
			        <th>Company CatchPhrase</th>
			        <th>Company Bs</th>
            </tr>
          </thead>

          <tbody>
            {users}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default Users;