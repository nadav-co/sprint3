import { mailService } from "../services/mail-service.js";
import { bus } from "../../../services/event-bus-service.js";
const {Link } = ReactRouterDOM;

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
      const trash = mailService.removeMail(id)
    //   mailService.createTrash(trash)

    }

    onEditSubject=(ev)=>{
        const selectedMail = {...this.state.selectedMail}
        selectedMail.subject = ev.target.value
        this.setState({
            selectedMail
        })
        mailService.changeSubject(selectedMail.id,ev.target.value)

    }

    render() {

        return (
            <section className="mail-details">
                <input onChange={this.onEditSubject} type="text" placeholder="edit subject"/>
              {this.state.selectedMail && <p>{this.state.selectedMail.subject} </p>  }
              {this.state.selectedMail && <p>{this.state.selectedMail.body} </p>  }
                    
                  <Link to="/mail/list">  <button onClick={this.onRemoveMail}> delete mail</button> </Link>
                  <Link to="/mail/list"><button>back</button></Link> 
            
            </section>
        )
    }
}
