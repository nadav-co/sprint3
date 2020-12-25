import { mailService } from "../services/mail-service.js"
import { keepService } from "../../Keep/services/keep-service.js"
import { NotePreview } from "../../Keep/cmps/NotePreview.jsx";
import { DynamicCmp } from "../../Keep/cmps/DynamicCmp.jsx";
// import {NotePreview}
const { Link } = ReactRouterDOM;

export class MailCompose extends React.Component {

    state = {
        info: {
            title: '',
            subject: '',
            to: '',
            body: ''
        },
        note:null

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
        // if(note){
        //     mailService.submitCompose(note)
        // }
        const { info } = this.state
        mailService.submitCompose(info)
    }

    render() {
        const {note} = this.state
        return (
            <section>
                {note && note.lines.map((line, idx) => <DynamicCmp colors={note.colors} id={note.id} key={line.id} idx={idx} line={line} />)}

                {!note && <form className="mail-compose" action="">
                    <header> New Mail</header>
                    <input name="title" placeholder="title" type="text" onChange={this.handleChange} />
                    <input name="subject" placeholder="subject" type="text" onChange={this.handleChange} />
                    <input name="to" placeholder="to" type="text" onChange={this.handleChange} />
                    <textarea name="body" placeholder="write here" id="" cols="30" rows="10" onChange={this.handleChange}></textarea>
                <Link to="/mail/list" > <button className='send-btn' type="button" onClick={this.onSubmitCompose}  >send</button> </Link>
                </form> }
            </section>
        )

    }
}
