class ContactForm extends React.Component{
    state={
        name:'',
        email:'',
        phone:'',
        message:''
    }
    send=()=>{
        const send_param={
            name:this.name.value,
            id:this.id.value,
            pw:this.pw.value,
            message:this.message.value
        }
        alert(JSON.stringify(send_param));
        
        axios.post('/contact/insertOne',send_param)
        .then((response)=>{
            alert(response.data);
            console.log(response);
            this.name.value="";
            this.id.value="";
            this.pw.value="";
            this.message.value="";
        })
        .catch((error)=>{
            console.log(error);
        });
        
    }
 

    render(){
        console.log("ContactForm.jsx 실행됨");
        return (
            <form id="contact-form" method="post" enctype="multipart/form-data">                    
                <fieldset>
                <label><span class="text-form">Name:</span><input ref={ref=>this.name=ref} name="p1" type="text" /></label>
                <label><span class="text-form">ID:</span><input ref={ref=>this.id=ref} name="p2" type="text" /></label>   
                <label><span class="text-form">PW:</span><input ref={ref=>this.pw=ref} name="p3" type="text" /></label>                                    
                                    
                    <div class="wrapper"><div class="text-form">Message:</div><textarea ref={ref=>this.message=ref}></textarea></div>
                    <div class="buttons">
                        <a class="button" href="#" onClick="document.getElementById('contact-form').reset()">Clear</a>
                        <a class="button" href="#" onClick={this.send}>Send</a>
                    </div>                             
                </fieldset>                     
            </form>
        );
    }
}


ReactDOM.render( 
    <ContactForm / > ,
    document.getElementById('react-contact-form')
);