import React from 'react';
import axios from 'axios';
//import page from './page.scss';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
class Albums extends React.Component{

  constructor(props){
    super(props);
  this.state = {
    posts: [],
    userId:'',
    newDataData: {
      userId:'',
      title: ''
    },
    editDataData: {
      userId:'',
      id: '',
      title: ''
    },
    newDataModal: false,
    editPostModal: false
  };
  this.handleChange = this.handleChange.bind(this);
  this.searchData =this.searchData.bind(this);
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
    axios.post('https://jsonplaceholder.typicode.com/albums', this.state.newDataData).then((response) => {
      let { posts } = this.state;

      posts.push(response.data);

      this.setState({ posts, newPostModal: false, newPostData: {
        userId:'',
        title: ''
      }});
    });
  }
  updateData() {
    let { userId,title } = this.state.editDataData;

    axios.put('https://jsonplaceholder.typicode.com/albums' + this.state.editDataData.id, {
      userId,title
    }).then((response) => {
      this.getData();

      this.setState({
        editDataModal: false, editDataData: { userId:'',id: '', title: '' }
      })
    });
  }
  editData(userId,id, title) {
    this.setState({
      editDataData: {userId,id, title }, editDataModal: ! this.state.editDataModal
    });
  }
  deleteData(id) {
    axios.delete('https://jsonplaceholder.typicode.com/albums' + id).then((response) => {
      this.getData();
    });
  }
  searchData(userId) {
    axios.get('https://jsonplaceholder.typicode.com/albums?userId='+this.state.value).then((response) => {
      this.setState({
        posts: response.data
      })
    });
    userId.preventDefault();
  }
  handleChange(userId){
    this.setState({value: userId.target.value});
  }
  getData() {
    axios.get('https://jsonplaceholder.typicode.com/albums').then((response) => {
      this.setState({
        posts: response.data
      })
    });
  }
  render() {
    let posts = this.state.posts.map((post) => {
      return (
        <tr key={post.id}>
          <td>{post.userId}</td>
          <td>{post.id}</td>
          <td>{post.title}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editData.bind(this,post.userId, post.id, post.title)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteData.bind(this, post.id)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

      <h1>ALBUMS</h1>
      <form onSubmit={this.searchData}>
       <label> 
      <Input type="text" name="userId" placeholder="Filter with UserID" 
      value={this.state.value} onChange={this.handleChange}/>
      </label>
      <Input type="submit" value="Sumbit" width="10px"/>
      </form>
      <Button className="my-3" color="primary" onClick={this.toggleAddDataModal.bind(this)}>Add Album</Button>

      <Modal isOpen={this.state.newDataModal} toggle={this.toggleAddDataModal.bind(this)}>
        <ModalHeader toggle={this.toggleAddDataModal.bind(this)}>Add a new Album</ModalHeader>
        <ModalBody>
        <FormGroup>
            <Label for="userId">UserId</Label>
            <Input id="userId" value={this.state.newDataData.userId} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.userId = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input id="title" value={this.state.newDataData.title} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.title = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addData.bind(this)}>Add Album</Button>{' '}
          <Button color="secondary" onClick={this.toggleAddDataModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editDataModal} toggle={this.toggleEditDataModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditDataModal.bind(this)}>Edit a album</ModalHeader>
        <ModalBody>
        <FormGroup>
            <Label for="userId">UserId</Label>
            <Input id="userId" value={this.state.editDataData.userId} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.userId = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>
        <FormGroup>
            <Label for="id">Id</Label>
            <Input id="id" value={this.state.editDataData.id} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.id = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="title">title</Label>
            <Input id="title" value={this.state.editDataData.title} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.title = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateData.bind(this)}>Update album</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditDataModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>


        <Table>
          <thead>
            <tr>
              <th>UserId</th>
              <th>Id</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {posts}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default Albums;