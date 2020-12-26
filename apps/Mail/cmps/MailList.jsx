import { MailPreview } from "./MailPreview.jsx"
import { mailService } from "../services/mail-service.js";
export class MailList extends React.Component {
    state = {
        mails: [],
        filterBySub: '',
        inbox: 0,
        favs: 0,
        trash: 0
    }
    componentDidMount() {
        this.loadMails()
    }
    loadMails = () => {
        const mails = mailService.query(this.state.filterBySub)
        this.setState({
            mails
        })
        const inbox = mails.filter(mail => mail.isRead === false)
        this.setState({
            inbox: inbox.length
        })
        const favs = mails.filter(mail => mail.isFav === true)
        this.setState({
            favs: favs.length
        })
        const trash = mailService.getTrash()
        this.setState({
            trash: trash.length
        })
    }

    setInbox = (type) => {
        const mails = mailService.query(this.state.filterBySub)
        const inbox = mails.filter(mail => mail.type === true)
    }

    onFilterMails = (ev) => {
        const filterBySub = ev.target.value
        const mails = mailService.query(this.state.filterBySub)
        this.setState({
            filterBySub,
            mails
        }, this.loadMails)

    }
    changeReadState = (id) => {
        mailService.changeState(id)
        this.loadMails()
    }
    toggleReadState = (id) => {
        mailService.toggleState(id)
        this.loadMails()
    }
    togglefavsState = (id) => {
        mailService.setFavs(id)
        this.loadMails()
    }

    onFilterReadUnread = (ev) => {
        const value = ev.target.value
        const sortedMails = mailService.filterReadUnread(value)
        this.setState({
            mails: sortedMails
        })
    }

    render() {
        return (
            <section className="preview-header-container">
                <header>
                    <select onChange={this.onFilterReadUnread} name="" id="">
                        <option value="all">All</option>
                        <option value="read">Read</option>
                        <option value="unread">Unread</option>
                    </select>
                    <input name="search-bar" onChange={this.onFilterMails} type="text" placeholder="search" />
                </header>
                <header className="flex" >
                    <div className="inbox-state"  ><img src="assets/img/drawer.jpg" alt="" /> <span className="inbox"> {this.state.inbox}</span> </div>
                    <div className="inbox-state"  ><img src="assets/img/star2.jpg" alt="" /> <span className="inbox"> {this.state.favs}</span> </div>
                    <div className="inbox-state"  ><img src="assets/img/header-trash.jpg" alt="" /> <span className="inbox"> {this.state.trash}</span> </div>
                </header>
                {this.state.mails.map(mail => {
                    return <MailPreview render={this.loadMails} toggleState={this.toggleReadState} changeState={this.changeReadState} key={mail.body} mail={mail} />
                })}
            </section>
        )
    }
}