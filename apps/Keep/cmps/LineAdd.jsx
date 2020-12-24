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
        if (lineType === 'todos') txt ='Enter Title And Todos Sperated By ","'
        this.setState({lineType,txt})
        console.log(this.refInput);
        this.refInput.current.value = ''

    }
    
    onSave = () => {
        
        const {lineType} = this.state
        const {txt} = this.state
        var line
        if (lineType === 'text') line = {type: 'NoteText',info: txt}
        if (lineType === 'img') line = {type: 'NoteImg', info: txt}
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
        return (
            <section className="add-line">
                {this.props.id && <hr/>}
                <input onChange={this.handleChange} ref={this.refInput}  placeholder={this.state.txt} type="text"/>
                <button onClick={this.onSave}>Save</button>
                <ul className="add-options flex">
                    <li onClick={() => this.changeType('text')}><img src="../assets/img/txt.png" alt=""/></li>
                    <li onClick={() => this.changeType('img')}><img src="../assets/img/img.png" alt=""/></li>
                    <li onClick={() => this.changeType('todos')}><img src="../assets/img/todos.png" alt=""/></li>
                </ul>
            </section>
        )
    }
}