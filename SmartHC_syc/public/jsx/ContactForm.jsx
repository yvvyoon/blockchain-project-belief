class ContactForm extends React.Component{
    // state={
    //     member_no:'',
    // }
    // send=()=>{
    //     const send_param={
    //         member_no:this.member_no.value,
    //     }
    //     alert(JSON.stringify(send_param));
        
    //     axios.post('/member_no',send_param)
    //     .then((response)=>{
    //         alert(response.value);
    //         console.log(response);
    //         this.member_no.value="";
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     });
        
    // }
    state={
        nfc:'',
    }
    send=()=>{
        const send_param={
            nfc:this.nfc.value,
        }
        alert(JSON.stringify(send_param));
        
        axios.post('/nfc',send_param)
        .then((response)=>{
            alert(response.value);
            console.log(response);
            this.nfc.value="";
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
                <label><span class="text-form">NFC:</span><input ref={ref=>this.nfc=ref} name="p1" type="text" /></label>                          
                                    
                    <div class="buttons">
                        <a class="button" href="#" onClick="document.getElementById('contact-form').reset()">Clear</a>
                        <a class="button" href="#" onClick={this.send}>Send</a>
                    </div>                             
                </fieldset>                     
            </form>
        //     <form id="contact-form" method="post" enctype="multipart/form-data">                    
        //     <fieldset>
        //     <label><span class="text-form">member_no:</span><input ref={ref=>this.member_no=ref} name="p1" type="text" /></label>                          
                                
        //         <div class="buttons">
        //             <a class="button" href="#" onClick="document.getElementById('contact-form').reset()">Clear</a>
        //             <a class="button" href="#" onClick={this.send}>member_no</a>
        //         </div>                             
        //     </fieldset>                     
        // </form>
        );
    }
}


ReactDOM.render( 
    <ContactForm / > ,
    document.getElementById('react-contact-form')
);