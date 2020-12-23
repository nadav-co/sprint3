import { mailService } from "../services/mail-service.js";
import { MailList } from "../cmps/MailList.jsx"
import { MailDetails } from "./MailDetails.jsx"
import { MailStatus } from "../cmps/MailStatus.jsx"
const { Route, Switch } = ReactRouterDOM;

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



    render() {
        return (
            <section>
                <div className="main-contant">
                <aside>
                    <img  className="btn" src="../assets/img/add.jpg" />
                    <img className="btn" src="../assets/img/star.jpg" />
                    <MailStatus  mails={this.state.mails} props={this.props} />
                </aside>
                <Switch>
                    <Route path="/mail/list" component={MailList} />
                    <Route path="/mail/:mailId" component={MailDetails} />
                </Switch>
                </div>
            </section>
        )
    }
}