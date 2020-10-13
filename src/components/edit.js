import React,{Component} from 'react'
import axios from 'axios'


const formvalid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(value => {
        value.length > 0 && (valid = false)
    });
    return valid;
}


export default class Details extends Component {

    constructor(props){
        super(props)
        this.state={
             note:{},
             edit:false,
             formErrors: {
                title: "",
                content: ""
            }
        }
    }
    componentDidMount(){
        console.log(this.props.match.params.id)
        axios.get('http://localhost:3001/notes/'+this.props.match.params.id).then((result) =>{
            this.setState({note:result.data, title:result.data.title, content:result.data.content})
            console.log(result.data)
        }
            
        ).catch((err) =>{
            console.log(err)
        })
    }

   
    handleChange = (event) => {
      

        const { name, value } = event.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "title":
                formErrors.title = value.length < 3 ? "Must be atleast 3 characters long" : "";
                break;
            case "content":
                formErrors.content = value.length < 5 ? "Must be atleast 5 characters long" : "";
                break;
            default:
                break;
        }
        this.setState({ [name]: value });
        
        console.log(this.state)
    }


    handleSubmit = (event) =>{
        event.preventDefault()

        if (formvalid(this.state.formErrors)) {

            var data={title:this.state.title, content:this.state.content}
    
            axios.put('http://localhost:3001/notes/'+this.props.match.params.id,data ).
            then((result)=> {
                console.log("Updated")
                alert("Updated")
                this.props.history.goBack();
        
            }).catch((err) =>{
                console.log(err)
            })
        }
        else{
            alert("Please Fill the data properly !")
        }
  


    }


    render(){
        const { formErrors } = this.state;
        return(
          
                <div className="container">
                <hr/>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:10}}>
           <span style={{fontSize:20}}>Edit Note</span>
            <button  className="btn  btn-warning" onClick={() =>{this.props.history.goBack()}}>Go Back</button>

           </div>
          <form className="container" onSubmit={this.handleSubmit}>
<div className="form-group">


<label >Title Name</label>
<input required type="text" name="title"  defaultValue={this.state.title} onChange={this.handleChange} className={`form-control ${formErrors.title.length > 0 ? 'is-invalid' : null}`} placeholder="Name"/>
{formErrors.title.length > 0 && <span className='error text-danger'>{formErrors.title}</span>}

<br/>

<label >Content </label>
<input required type="text" name="content"  defaultValue={this.state.content} onChange={this.handleChange} className={`form-control ${formErrors.content.length > 0 ? 'is-invalid' : null}`} placeholder="Street"/>
{formErrors.content.length > 0 && <span className='error text-danger'>{formErrors.content}</span>}

<br/>
<button type="submit" className="btn btn-primary">Update</button>
&nbsp;&nbsp;&nbsp;
</div>


</form>

               
           </div>
       
                 
     
            )
    }
}