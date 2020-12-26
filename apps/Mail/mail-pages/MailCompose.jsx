import { mailService } from "../services/mail-service.js"
import { keepService } from "../../Keep/services/keep-service.js"
import { NotePreview } from "../../Keep/cmps/NotePreview.jsx";
import { DynamicCmp } from "../../Keep/cmps/DynamicCmp.jsx";
const { Link } = ReactRouterDOM;
export class MailCompose extends React.Component {
    state = {
        info: {
            title: '',
            subject: '',
            to: '',
            body: ''
        },
        note: null

    }

    componentDidMount() {
        this.getNoteFromKeeps()
    }

    getNoteFromKeeps = () => {
        var note;
        const id = this.props.match.params.noteId
        if (id && id.length !== 0) {
            note = keepService.getNoteById(id)
        }
        this.handleNote(note)
    }

    handleNote = (note) => {
        if (note) {
            this.setState({
                note
            })
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
        const { info } = this.state
        mailService.submitCompose(info)
    }

    render() {
        const { note } = this.state
        return (
            <section>
                <form className="mail-compose" action="">
                    <header> New Mail  <Link to="/mail/list" > <img className=' send-btn cancel' src="./assets/img/cancel.jpg" alt="" />   </Link></header>
                    <input name="title" placeholder="title" type="text" onChange={this.handleChange} />
                    <input name="subject" placeholder="subject" type="text" onChange={this.handleChange} />
                    <input name="to" placeholder="to" type="text" onChange={this.handleChange} />
                    {note &&<div className="mail-note">
                         <NotePreview note={note} />
                    </div>}
                    {!note &&<textarea name="body" placeholder="write here" id="" cols="30" rows="10" onChange={this.handleChange}></textarea>}
                </form>
                <Link to="/mail/list" > <img className=' send-btn' src="./assets/img/send.jpg" alt="" onClick={this.onSubmitCompose} />   </Link>
            </section>
        )
    }
}
