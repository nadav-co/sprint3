import { mailService } from "../services/mail-service.js";

export class MailStatus extends React.Component {
    state = {
        mailsReaded: [],
        status: 0
    }

    componentDidUpdate(prevprops) {
        const { props } = this.props
        const prev = prevprops.props.location.pathname
        const curr = props.location.pathname
        if (curr !== prev) {
            this.checkStatus()
        }
    }

    get status() {
        return this.state.status + '%'
    }

    componentDidMount() {
        this.onChangeStatus()
    }
    onChangeStatus = () => {
        const mails = mailService.query()
        const mailsReaded = mailService.checkStatus(mails)
        this.setState({
            mailsReaded
        })
    }
    checkStatus = () => {
        const { mails } = this.props
        const amount = ((this.state.mailsReaded.length) / (mails.length)) * 100
        this.setState({
            status: amount.toFixed(0)
        }, this.onChangeStatus())
    }

    render() {
        return (
            <div className="status-container">
                <div style={{ width: this.status }} className="status">
                </div>
            </div>
        )
    }
}
