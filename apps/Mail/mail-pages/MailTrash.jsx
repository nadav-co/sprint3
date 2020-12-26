
import { mailService } from "../services/mail-service.js";
const { Link } = ReactRouterDOM;
export class MailTrash extends React.Component {
    state = {
        trash: null
    }

    componentDidMount() {
        const trash = mailService.getTrash()
        this.setState({ trash })
    }

    render() {
        return (
            (this.state.trash && this.state.trash.map(trs => {
                return <div key={trs.id} className={`mail-preview`} >
                    <div className="mail-subject">
                        <span  >{trs.subject}</span>
                    </div>
                    <Link to={`/mail/${trs.id}`}> <p > {trs.body}</p > </Link>
                </div>
            }))
        )
    }

}