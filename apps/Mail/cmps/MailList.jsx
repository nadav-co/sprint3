import { MailPreview } from "./MailPreview.jsx"
import { mailService } from "../services/mail-service.js";

export class MailList extends React.Component {

    state = {
        mails: [],
        filterBySub: '',
        // sortBy:{
        //     read:null,
        //     unread:null
        // }

    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        const mails = mailService.query(this.state.filterBySub)
        this.setState({
            mails
        })
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

                {this.state.mails.map(mail => {
                    return <MailPreview toggleState={this.toggleReadState} changeState={this.changeReadState} key={mail.body} mail={mail} />
                })}
            </section>
        )
    }
}