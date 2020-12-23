import {MailPreview} from "./MailPreview.jsx"
import { mailService } from "../services/mail-service.js";

export class MailList extends React.Component {

    state = {
        mails: [],

    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        const mails = mailService.query()
        this.setState({
            mails
        })
    }

    render(){
    return (       
        <section>
            {this.state.mails.map(mail=>{
                return  <MailPreview key={mail.body} mail={mail} />})}
        </section>
    )
  }
}