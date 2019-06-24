import React from 'react';
import axios from 'axios';
//import page from './page.scss';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
class Photos extends React.Component{

  constructor(props){
    super(props);
  this.state = {
    posts: [],
    albumId:'',
    newDataData: {
      albumId:'',
      title: '',
      url: '',
	  thumbnailUrl: ''
    },
    editDataData: {
      albumId:'',
      id: '',
      title: '',
      url: '',
	  thumbnailUrl: ''
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
    axios.post('https://jsonplaceholder.typicode.com/photos', this.state.newDataData).then((response) => {
      let { posts } = this.state;

      posts.push(response.data);

      this.setState({ posts, newPostModal: false, newPostData: {
        albumId:'',
        title: '',
        url: '',
		thumbnailUrl: ''
      }});
    });
  }
  updateData() {
    let { albumId,title,url, thumbnailUrl } = this.state.editDataData;

    axios.put('https://jsonplaceholder.typicode.com/photos' + this.state.editDataData.id, {
      albumId,title,url, thumbnailUrl
    }).then((response) => {
      this.getData();

      this.setState({
        editDataModal: false, editDataData: { albumId:'',id: '', title: '',url: '', thumbnailUrl: '' }
      })
    });
  }
  editData(albumId,id,title,url, thumbnailUrl) {
    this.setState({
      editDataData: {albumId,id,title,url, thumbnailUrl }, editDataModal: ! this.state.editDataModal
    });
  }
  deleteData(id) {
    axios.delete('https://jsonplaceholder.typicode.com/photos' + id).then((response) => {
      this.getData();
    });
  }
  searchData(albumId) {
    axios.get('https://jsonplaceholder.typicode.com/photos?albumId='+this.state.value).then((response) => {
      this.setState({
        posts: response.data
      })
    });
    albumId.preventDefault();
  }
  handleChange(albumId){
    this.setState({value: albumId.target.value});
  }
  getData() {
    axios.get('https://jsonplaceholder.typicode.com/photos').then((response) => {
      this.setState({
        posts: response.data
      })
    });
  }
  render() {
    let posts = this.state.posts.map((post) => {
      return (
        <tr key={post.id}>
          <td>{post.albumId}</td>
          <td>{post.id}</td>
          <td>{post.title}</td>
		  <td><img src={post.url} alt="image" width="60" height="60" /></td>
          <td><img src={post.thumbnailUrl} alt="thumb" width="60" height="60"/></td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editData.bind(this,post.albumId, post.id, post.title, post.url,post.thumbnailUrl)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteData.bind(this, post.id)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

      <h1>PHOTOS</h1>
      <form onSubmit={this.searchData}>
       <label> 
      <Input type="text" name="albumId" placeholder="Filter with AlbumID" 
      value={this.state.value} onChange={this.handleChange}/>
      </label>
      <Input type="submit" value="Sumbit" />
      </form>
      <Button className="my-3" color="primary" onClick={this.toggleAddDataModal.bind(this)}>Add Photo</Button>

      <Modal isOpen={this.state.newDataModal} toggle={this.toggleAddDataModal.bind(this)}>
        <ModalHeader toggle={this.toggleAddDataModal.bind(this)}>Add a new photo</ModalHeader>
        <ModalBody>
        <FormGroup>
            <Label for="albumId">albumId</Label>
            <Input id="albumId" value={this.state.newDataData.albumId} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.albumId = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="title">title</Label>
            <Input id="title" value={this.state.newDataData.title} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.title = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>
		  <FormGroup>
            <Label for="url">url</Label>
            <Input id="url" value={this.state.newDataData.url} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.url = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="thumbnailUrl">thumbnailUrl</Label>
            <Input id="thumbnailUrl" value={this.state.newDataData.thumbnailUrl} onChange={(e) => {
              let { newDataData } = this.state;

              newDataData.thumbnailUrl = e.target.value;

              this.setState({ newDataData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addData.bind(this)}>Add Photo</Button>{' '}
          <Button color="secondary" onClick={this.toggleAddDataModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editDataModal} toggle={this.toggleEditDataModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditDataModal.bind(this)}>Edit a photo</ModalHeader>
        <ModalBody>
        <FormGroup>
            <Label for="albumId">albumId</Label>
            <Input id="albumId" value={this.state.editDataData.albumId} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.albumId = e.target.value;

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
		  <FormGroup>
            <Label for="url">url</Label>
            <Input id="url" value={this.state.editDataData.url} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.url = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="thumbnailUrl">thumbnailUrl</Label>
            <Input id="thumbnailUrl" value={this.state.editDataData.thumbnailUrl} onChange={(e) => {
              let { editDataData } = this.state;

              editDataData.thumbnailUrl = e.target.value;

              this.setState({ editDataData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateData.bind(this)}>Update photo</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditDataModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>


        <Table>
          <thead>
            <tr>
              <th>AlbumId</th>
              <th>Id</th>
              <th>Title</th>
			  <th>Url</th>
              <th>ThumbnailUrl</th>
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
export default Photos;