import { mailService } from "../services/mail-service.js";
const { Link } = ReactRouterDOM;

export class MailPreview extends React.Component {

    state = {
        currMail: {},
        hidden: false,
        letterCount: 40,
        isOpen:true
    }

    ComponentDidMount() {
        this.loadMail()
    }

    loadMail = () => {
        const mail = this.props.mail
        this.setState({
            currMail: mail
        })
    }
    onFav = (id) => {
        mailService.setFavs(id)
        const copyMail = { ...this.state.currMail }
        copyMail.isFav = !copyMail.isFav
        this.setState({
            currMail: copyMail
        })
    }


    toggleTxt = () => {
        var count = (this.state.isOpen) ? 150 : 40
        this.setState({
            letterCount:count,
            isOpen:!this.state.isOpen
        })
        
    }

    render() {
        const close = '📕'
        const open = '📖'
        const notFav = '☆'
        const fav = '⭐'
        const { mail } = this.props
        const cls = (mail.isRead) ? 'read' : 'unread'
        const readEmoji = (mail.isRead) ? open : close
        const starEmoji = (mail.isFav) ? fav : notFav
        const {date} = mail.sentAt
        const { letterCount } = this.state
        return (
            <section>
                <div className={`${cls} mail-preview`} >
                    <div className="mail-subject">
                        <button className="read-btn " onClick={() => this.onFav(mail.id)}><span>{starEmoji}</span></button>
                        <button className="read-btn" onClick={() => this.props.toggleState(mail.id)}  ><span  > {readEmoji} </span></button>
                        <span  >{mail.subject}</span>
                    </div>
                    <div className="mail-body"> <p onClick={this.toggleTxt}> {mail.body.substring(0, letterCount)}</p >...   </div>
                    <div className="date" > <Link onClick={() => this.props.changeState(mail.id)} to={`/mail/${mail.id}`}> <img className="full-size-icon" src="../../assets/img/full-size.jpg" alt="" /> </Link>{date}</div>
                </div>
            </section>
        )
    }

}