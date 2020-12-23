import { mailService } from "../services/mail-service.js";
export class MailDetails extends React.Component {

    state = {
        selectedMail: {

        }
    }

    componentDidMount() {
        this.getSelectedMail()
    }

    getSelectedMail = () => {
        const { mailId } = this.props.match.params
        const currMail = mailService.getMailById(mailId)
        
        this.setState({
            selectedMail: currMail
        })
    }

    onRemoveMail=()=>{
        const {id} =this.state.selectedMail
        mailService.removeMail(id)
    }

    render() {
        console.log(this.state.selectedMail);
        return (
            <section className="mail-details">
              {this.state.selectedMail && <p>{this.state.selectedMail.body} </p> }
                
                    
                    
                    <button onClick={this.onRemoveMail}> delete mail</button>
            
            </section>
        )
    }
}
