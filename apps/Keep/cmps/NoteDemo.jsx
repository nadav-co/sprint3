import { NotePreview } from "./NotePreview.jsx"
import { utils } from "../../../lib/utils.js"

export class NoteDemo extends React.Component {

    state = {
      stage:0,
      note:{
        isPinned: true,
        id: utils.makeId(),
        lines: [
            {
                id: utils.makeId(),
                type: 'NoteImg',
                info: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'
            },
            {
                id: utils.makeId(),
                type: 'NoteTodos',
                info: {
                    label: 'How was it:',
                    todos: [
                        { txt: 'Do that', doneAt: null },
                        { txt: 'Do this', doneAt: 187111111 }
                    ]
                }
            }
        ]}
    }

    refH1 = React.createRef()
    componentDidMount() {
        this.refH1.current.scrollIntoView(false)
    }

    render() {
        const {stage} = this.state
        return (
            <section ref={this.refH1} className="main-demo" >
                <NotePreview  note={this.state.note}/>
                {stage < 12 && <button className="next"  onClick={()=>this.setState({stage:stage+1})}>Next</button>}
                {stage >= 12&& <button className="next" onClick={this.props.toggleDemo}>Lets Start</button>}
                {stage === 0 && <h1 className="stage-0 slide-in-bottom">This is where you create a new note</h1>}
                {stage === 0 && <img className="stage-0 bounce" src="assets/img/arrow-up.png"></img>}
                {stage === 1 && <h1 className="stage-1 slide-in-bottom">This is where you delete a note</h1>}
                {stage === 1 && <img className="stage-1 corner-bounce" src="assets/img/arrow-up.png"></img>}
                {stage === 2 && <h1 className="stage-2 slide-in-bottom">This is where you add lines to a note</h1>}
                {stage === 2 && <img className="stage-2 slide-in-left" src="assets/img/arrow-left.png"></img>}
                {stage === 3 && <h1 className="stage-3 slide-in-fwd-center">text</h1>}
                {stage === 3 && <img className="stage-3 slide-in-bottom" src="assets/img/circle.png"></img>}
                {stage === 4 && <h1 className="stage-4 slide-in-fwd-center">Image</h1>}
                {stage === 4 && <img className="stage-4 slide-in-bottom" src="assets/img/circle.png"></img>}
                {stage === 5 && <h1 className="stage-5 slide-in-fwd-center">Video</h1>}
                {stage === 5 && <img className="stage-5 slide-in-bottom" src="assets/img/circle.png"></img>}
                {stage === 6 && <h1 className="stage-6 slide-in-fwd-center">Gif</h1>}
                {stage === 6 && <img className="stage-6 slide-in-bottom" src="assets/img/circle.png"></img>}
                {stage === 7 && <h1 className="stage-7 slide-in-fwd-center">To-Do</h1>}
                {stage === 7 && <img className="stage-7 slide-in-bottom" src="assets/img/circle.png"></img>}
                {stage === 8 && <h1 className="stage-8 slide-in-fwd-center">Pin</h1>}
                {stage === 8 && <img className="stage-8 slide-in-bottom" src="assets/img/circle.png"></img>}
                {stage === 9 && <h1 className="stage-9 slide-in-fwd-center">Send</h1>}
                {stage === 9 && <img className="stage-9 slide-in-bottom" src="assets/img/circle.png"></img>}
                {stage === 10 && <h1 className="stage-10 slide-in-fwd-center">Change Colors</h1>}
                {stage === 10 && <img className="stage-10 slide-in-bottom" src="assets/img/circle.png"></img>}
                {stage === 11 && <h1 className="stage-11 slide-in-fwd-center">Delete Line</h1>}
                {stage === 11 && <img className="stage-11 slide-in-bottom" src="assets/img/circle.png"></img>}
                {stage === 12 && <h1 className="stage-12 slide-in-fwd-center">Mark To-Do</h1>}
                {stage === 12 && <img className="stage-12 slide-in-bottom" src="assets/img/circle.png"></img>}
            </section>
        )
    }
}