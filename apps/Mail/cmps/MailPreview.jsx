import { mailService } from "../services/mail-service.js";
const { Link } = ReactRouterDOM;
export class MailPreview extends React.Component {
    state = {
        currMail: {},
        hidden: false,
        letterCount: 40,
        isOpen: true,
    }
    componentDidMount() {
        this.loadMail()
    }

    loadMail = () => {
        const mail = this.props.mail
        this.setState({
            currMail: mail
        })
    }
    onFav = (id) => {
        this.props.render()
        const currMail = mailService.setFavs(id)
        this.setState({
            currMail: currMail
        })
    }
    toggleTxt = () => {
        var count = (this.state.isOpen) ? 150 : 40
        this.setState({
            letterCount: count,
            isOpen: !this.state.isOpen
        })
    }
    render() {
        const close = '📕'
        const open = '📖'
        const notFav = '☆'
        const fav = '⭐'
        const { mail } = this.props
        const { currMail } = this.state
        const cls = (mail.isRead) ? 'read' : 'unread'
        const readEmoji = (mail.isRead) ? open : close
        const starEmoji = (currMail.isFav) ? fav : notFav
        const date = mail.sentAt
        const { letterCount } = this.state
        return (
            <section>
                <div className={`${cls} mail-preview `} >
                    <div className="mail-subject">
                        <button className="read-btn " onClick={() => this.onFav(mail.id)}><span>{starEmoji}</span></button>
                        <button className="read-btn" onClick={() => this.props.toggleState(mail.id)}  ><span  > {readEmoji} </span></button>
                        <span  >{mail.subject}</span>
                    </div>
                    <div className="mail-body"> <p onClick={this.toggleTxt}> {mail.body.substring(0, letterCount)}</p >...   </div>
                    <div className="date" > <Link onClick={() => this.props.changeState(mail.id)} to={`/mail/${mail.id}`}> <img className="full-size-icon" src="../../assets/img/full-size.jpg" alt="" /> </Link>{date.toDateString()}</div>
                </div>
            </section>
        )
    }
}