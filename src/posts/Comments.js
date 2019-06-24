import React from 'react';
import axios from 'axios';
//import page from './page.scss';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
class Comments extends React.Component{

  constructor(props){
    super(props);
  this.state = {
    posts: [],
    postId:'',
    newDataData: {
      postId:'',
      name: '',
      email: '',
	  body: ''
    },
    editDataData: {
      postId:'',
      id: '',
      name: '',
      email: '',
	  body: ''
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
    axios.post('https://jsonplaceholder.typicode.com/comments', this.state.newDataData).then((response) => {
      let { posts } = this.state;

      posts.push(response.data);

      this.setState({ posts, newPostModal: false, newPostData: {
        postId:'',
        name: '',
        email: '',
		body: ''
      }});
    });
  }
  updateData() {
    let { postId,name,email, body } = this.state.editDataData;

    axios.put('https://jsonplaceholder.typicode.com/comments' + this.state.editDataData.id, {
      postId,name,email, body
    }).then((response) => {
      this.getData();

      this.setState({
        editDataModal: false, editDataData: { postId:'',id: '', name: '',email: '', body: '' }
      })
    });
  }
  editData(postId,id,name,email, body) {
    this.setState({
      editDataData: {postId,id,name,email, body }, editDataModal: ! this.state.editDataModal
    });
  }
  deleteData(id) {
    axios.delete('https://jsonplaceholder.typicode.com/comments' + id).then((response) => {
      this.getData();
    });
  }
  searchData(postId) {
    axios.get('https://jsonplaceholder.typicode.com/comments?postId='+this.state.value).then((response) => {
      this.setState({
        posts: response.data
      })
    });
    postId.preventDefault();
  }
  handleChange(postId){
    this.setState({value: postId.target.value});
  }
  getData() {
    axios.get('https://jsonplaceholder.typicode.com/comments').then((response) => {
      this.setState({
        posts: response.data
      })
    });
  }
  render() {
    let posts = this.state.posts.map((post) => {
      return (
        <tr key={post.id}>
          <td>{post.postId}</td>
          <td>{post.id}</td>
          <td>{post.name}</td>
		      <td>{post.email}</td>
          <td>{post.body}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editData.bind(this,post.postId, post.id, post.name, post.email,post.body)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteData.bind(this, post.id)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

      <h1>COMMENTS</h1>
      <form onSubmit={this.searchData}>
       <label> 
      <Input type="text" name="postId" placeholder="Filter with PostID" 
      value={this.state.value} onChange={this.handleChange}/>
      </label>
      <Input type="submit" value="Sumbit" />
      </form>
      <Button className="my-3" color="primary" onClick={this.toggleAddDataModal.bind(this)}>Add Comment</Button>

      <Modal isOpen={this.state.newDataModal} toggle={this.toggleAddDataModal.bind(this)}>
        <ModalHeader toggle={this.toggleAddDataModal.bind(this)}>Add a new comment</ModalHeader>
        <ModalBody>
        <FormGroup>
            <Label for="postId">PostId</Label>
            <Input id="postId" value={this.state.newDataData.postId} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.postId = e.target.value;

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
            <Label for="email">email</Label>
            <Input id="email" value={this.state.newDataData.email} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.email = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="body">Body</Label>
            <Input id="body" value={this.state.newDataData.body} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.body = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addData.bind(this)}>Add Comment</Button>{' '}
          <Button color="secondary" onClick={this.toggleAddDataModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editDataModal} toggle={this.toggleEditDataModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditDataModal.bind(this)}>Edit a new comment</ModalHeader>
        <ModalBody>
        <FormGroup>
            <Label for="postId">postId</Label>
            <Input id="postId" value={this.state.editDataData.postId} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.postId = e.target.value;

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
            <Label for="name">name</Label>
            <Input id="name" value={this.state.editDataData.name} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.name = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="email">email</Label>
            <Input id="email" value={this.state.editDataData.email} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.email = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="body">body</Label>
            <Input id="body" value={this.state.editDataData.body} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.body = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateData.bind(this)}>Update comment</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditDataModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>


        <Table>
          <thead>
            <tr>
              <th>PostId</th>
              <th>Id</th>
              <th>Name</th>
			        <th>Email</th>
              <th>Body</th>
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
export default Comments;