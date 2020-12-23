import { mailService } from "../services/mail-service.js";
const { Link } = ReactRouterDOM;

export class MailPreview extends React.Component {

    state = {
        currMail:{}

    }

    componentWillUnmount(){
        this.loadMail()
    }

    loadMail=()=>{
        const mail = this.props.mail
        this.setState({
            currMail:mail
        })
    }

    changeReadState=(id)=>{
        console.log(id);
        mailService.changeState(id)
    }

    render() {
        const { mail } = this.props
        const cls = (mail.isRead) ? 'read' : 'unread'
        return (
            <section>
                <Link to={`/mail/${mail.id}`}>
                    <div onClick={()=>this.changeReadState(mail.id)} className={`${cls} mail-preview`} >
                        <span>{mail.subject}</span> <p> {mail.body}</p>
                    </div>
                </Link>
            </section>
        )
    }

}