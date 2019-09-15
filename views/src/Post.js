import React, {Component} from 'react'
import {connect} from 'react-redux'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {addPost} from './actions/post'

class Post extends Component {
  constructor() {
    super()
    this.state = {title:null, summary:null, files:null, imagePreviewUrl:null}
  }
  handleChange = (e)=>{
    this.setState({
      [e.target.id]:e.target.value
    })
  }
  handleFileChange = (e)=>{
    let reader = new FileReader()
    let files = e.target.files
    let file
    const dataFiles = []
    for(let i = 0; i<files.length; i++){
      dataFiles.push(files[i])
      this.setState({
          files: dataFiles
      });
      file = files[i]
    }
    reader.readAsDataURL(file)
  }
  handleSubmit = (e)=>{
    e.preventDefault()
    if (this.state.files) {
      const fd = new FormData()
      for (var i = 0; i < this.state.files.length; i++) {
        fd.append('file', this.state.files[i], this.state.files[i].name)
      }
      this.setState({
        [e.target.id]:e.target.value
      })
      const {title, summary} = this.state
      fd.append('title', title)
      fd.append('summary', summary)
      console.log(fd)
      this.props.addPost(fd)

    }
  }
  render(){
    let {imagePreviewUrl} = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} alt='Preview' className='img-fluid' />);
    } else {
      imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }
    return(
      <div className='container'>
        <h2 className='text-left'>POST</h2>
        <div className='row'>
          <div className='col-sm-6'>
          <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input type='text' id='title' onChange={this.handleChange} className='form-control' />
            </div>
            <div className='form-group'>
              <label htmlFor='summary'>Summary</label>
              <textarea id='summary' onChange={this.handleChange} className='form-control' ></textarea>
            </div>
            <div className='form-group'>
              <label>Choose file</label>
              <input type='file' onChange={this.handleFileChange} className='form-control' multiple />
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </form>
          </div>
          <div className='col-sm-4'>
            <div className="imgPreview">
              {imagePreview}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return{
    post:state.post
  }
}

export default connect(mapStateToProps, {addPost})(Post)
