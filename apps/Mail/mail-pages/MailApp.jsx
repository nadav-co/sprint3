import { mailService } from "../services/mail-service.js";
import { MailDetails } from "./MailDetails.jsx"
import { MailStatus } from "../cmps/MailStatus.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailCompose } from "./MailCompose.jsx"
import { MailFavs } from "./MailFavs.jsx"
import { MailTrash } from "./MailTrash.jsx"
const { Route, Switch,Link } = ReactRouterDOM;

export class MailApp extends React.Component {


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

    onFilterFavs=()=>{
        const favMails= mailService.getFavsMails()
        this.setState({
            mails: favMails
        })

 
    }



    render() {
        return (
            <section>
                <div className="main-contant">
            <div className="aside fade-in-left">
                <div className="page-nav compose"><Link to="/mail/compose" className="add-link compose" > <img className="add-btn btn compose" src="../assets/img/add.png" /> <div className="aside-title compose">Compose</div>  </Link></div>
                <div className="page-nav" ><Link to="/mail/list" className="add-link" > <img className="add-btn btn" src="../assets/img/inbox.jpg" /> <div className="aside-title">Inbox</div>  </Link></div>
                <div className="page-nav" ><Link to="/mail/favs" className="add-link"> <img  onClick={this.onFilterFavs} className= "add-btn btn" src="../assets/img/star.jpg" /><div className="aside-title">Marked</div> </Link></div>
                <div className="page-nav"> <Link to="/mail/trash" className="add-link"> <img src="../assets/img/trash.jpg" alt=""  className="add-btn btn"/> <div className="aside-title">Trash</div>  </Link> </div>
                    <MailStatus  mails={this.state.mails} props={this.props} />
            </div>
                <div className="mails-container">
                <Switch>
                    
                    <Route path="/mail/list" component={MailList} />
                    <Route path="/mail/compose/:noteId?" component={MailCompose} />
                    <Route path="/mail/favs" component={MailFavs}/>
                    <Route path="/mail/trash" component={MailTrash}/>
                    <Route path="/mail/:mailId/" component={MailDetails} />
                </Switch>
                </div>
                </div>
            </section>
        )
    }
}