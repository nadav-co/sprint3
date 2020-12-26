import { keepService } from "../services/keep-service.js"
import { utils } from "../../../lib/utils.js"
import { bus } from "../../../services/event-bus-service.js"

export class LineAdd extends React.Component {
    
    state = {
      lineType: 'text',
      txt:'Enter Text'
    }

    refInput = React.createRef()

    componentDidMount() {

    }

    handleChange = (ev) => this.setState({txt: ev.target.value})

    changeType = (lineType) => {
        var txt
        if (lineType === 'text') txt ='Enter Text'
        if (lineType === 'img') txt ='Enter image Url'
        if (lineType === 'video') txt ='Enter Video Url'
        if (lineType === 'gif') txt ='Enter Gif Url'
        if (lineType === 'todos') txt ='Enter Title And Todos Sperated By ","'
        this.setState({lineType,txt})
        this.refInput.current.value = ''
        this.refInput.current.focus()

    }
    
    onSave = (ev) => {
        if (ev.key && ev.key !== 'Enter') return
        const {lineType} = this.state
        const {txt} = this.state
        var line
        if (lineType === 'text') line = {type: 'NoteText',info: txt}
        if (lineType === 'img') line = {type: 'NoteImg', info: txt}
        if (lineType === 'video') line = {type: 'NoteVideo', info: txt}
        if (lineType === 'gif') line = {type: 'NoteGif', info: txt}
        if (lineType === 'todos'){
            const txts = txt.split(',')
            line = {
                type: 'NoteTodos',
                info: {
                    label: txts.splice(0,1)[0],
                    todos: txts.map(txt => ({txt, doneAt: null}))
                }
            }
        }
        keepService.addData(line, this.props.id)
        .then(bus.emit('reloadNotes'))
        this.refInput.current.value = ''
        this.setState({lineType: 'text', txt:'Enter Text'})
        
    }

    render() {
        const fontSize = this.props.id ? '1em' : '1.5em'
        return (
            <section style={{fontSize}} className="add-line">
                {this.props.id && <hr style={{marginBottom: '2em'}}/>}
                <input onKeyUp={this.onSave} onChange={this.handleChange} ref={this.refInput}  placeholder={this.state.txt} type="text"/>
                <button onClick={this.onSave}>Save</button>
                <ul className="add-options flex">
                    <li onClick={() => this.changeType('text')}><img src="assets/img/txt.png" alt=""/></li>
                    <li onClick={() => this.changeType('img')}><img src="assets/img/img.png" alt=""/></li>
                    <li onClick={() => this.changeType('video')}><img src="assets/img/video.png" alt=""/></li>
                    <li onClick={() => this.changeType('gif')}><img src="assets/img/gif.png" alt=""/></li>
                    <li onClick={() => this.changeType('todos')}><img src="assets/img/todos.png" alt=""/></li>
                </ul>
                {!this.props.id && <hr/>}
            </section>
        )
    }
}