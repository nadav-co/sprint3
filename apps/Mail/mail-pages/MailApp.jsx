import { mailService } from "../services/mail-service.js";
import { MailList } from "../cmps/MailList.jsx"
import { MailDetails } from "./MailDetails.jsx"
import { MailStatus } from "../cmps/MailStatus.jsx"
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
            <div className="aside">
                <div className="page-nav" ><Link to="/mail/add" className="add-link" > <img className="add-btn btn" src="../assets/img/add.jpg" /> <div className="aside-title">Compose</div>  </Link></div>
                <div className="page-nav" ><Link to="/mail/favs" className="add-link"> <img  onClick={this.onFilterFavs} className= "add-btn btn" src="../assets/img/star.jpg" /><div className="aside-title">Marked</div> </Link></div>
                <div className="page-nav"> <Link to="/mail/trash" className="add-link"> <img src="../assets/img/trash.jpg" alt=""  className="add-btn btn"/> <div className="aside-title">Trash</div>  </Link> </div>
                    <MailStatus  mails={this.state.mails} props={this.props} />
            </div>
                <div className="mails-container">
                <Switch>
                    <Route path="/mail/list" component={MailList} />
                    <Route path="/mail/add" component={MailCompose} />
                    <Route path="/mail/favs" component={MailFavs}/>
                    <Route path="/mail/trash" component={MailTrash}/>
                    <Route path="/mail/:mailId" component={MailDetails} />
                </Switch>
                </div>
                </div>
            </section>
        )
    }
}