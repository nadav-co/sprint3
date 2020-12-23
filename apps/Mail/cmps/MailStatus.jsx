import { mailService } from "../services/mail-service.js";

export class MailStatus extends React.Component {

    state = {
        mailsReaded: [],
        status: 0
    }
    componentDidUpdate(prevprops) {
        const {props} = this.props 
        const prev=prevprops.props.location.pathname
        const curr=props.location.pathname
        if(curr !== prev){
            this.onChangeStatus()
            this.checkStatus()
        }
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

    checkStatus=()=>{
        const {mails} = this.props
        const amount = ((this.state.mailsReaded.length) / (mails.length)) * 100 
        // console.log('state mails read length',this.state.mailsReaded.length); 
        // console.log('mails length',mails.length);
        this.setState({
            status:amount.toFixed(0)
        })
    }

    render() {
        return (
            <h1 className="status">{this.state.status}%</h1>
        )
    }
}
