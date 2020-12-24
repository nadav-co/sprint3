import { mailService } from "../services/mail-service.js";
const { Link } = ReactRouterDOM;

export class MailPreview extends React.Component {

    state = {
        currMail: {},
        hidden: false

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
    onFav=(id)=>{
        mailService.setFavs(id)
        const copyMail = {...this.state.currMail}
        copyMail.isFav =!copyMail.isFav
        this.setState({
            currMail:copyMail
        }) 
    }


    render() {
        // const read = '📭'
        // const unread = '📫'
        const close = '📕'
        const open = '📖'
        const notFav = '☆'
        const fav = '★'
        const { mail } = this.props
        const cls = (mail.isRead) ? 'read' : 'unread'
        const readEmoji = (mail.isRead)? open : close
        const starEmoji = (mail.isFav)? fav : notFav
        return (
            <section>
                <div  className={`${cls} mail-preview`} >
                    <div className="mail-subject">
                    <button className="read-btn " onClick={()=> this.onFav(mail.id)}><span>{starEmoji}</span></button>
                        <button onClick={() => this.props.changeState(mail.id)}  className="read-btn" ><span className="read-emoji" > {readEmoji} </span></button>
                        <span  >{mail.subject}</span>
                    </div>
                    <Link to={`/mail/${mail.id}`}> <p onClick={() => this.props.changeState(mail.id)}> {mail.body}</p > </Link>
                </div>
            </section>
        )
    }

}