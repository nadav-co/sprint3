import { mailService } from "../services/mail-service.js"
const { Link } = ReactRouterDOM;

export class MailCompose extends React.Component {

    state = {
        info: {
            title: '',
            subject: '',
            to: '',
            body: ''
        }

    }





    handleChange = (ev) => {
        const info = { ...this.state.info }
        const name = ev.target.name
        const value = ev.target.value
        info[name] = value
        this.setState({
            info
        })
    }

    onSubmitCompose = (ev) => {
        // ev.preventDefault()
        const { info } = this.state
        mailService.submitCompose(info)

    }


    render() {
        console.log(this.promps);
        return (
            <section>
                <form className="mail-compose" action="">
                    <header> New Mail</header>
                    <input name="title" placeholder="title" type="text" onChange={this.handleChange} />
                    <input name="subject" placeholder="subject" type="text" onChange={this.handleChange} />
                    <input name="to" placeholder="to" type="text" onChange={this.handleChange} />
                    <textarea name="body" placeholder="write here" id="" cols="30" rows="10" onChange={this.handleChange}></textarea>
                </form>
                    <Link to="/mail/list" > <button type="button" onClick={this.onSubmitCompose}  >send</button> </Link>
            </section>
        )

    }
}
