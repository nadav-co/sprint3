import { NoteImg } from "./NoteImg.jsx";
import { NoteText } from "./NoteText.jsx";
import { NoteTodos } from "./NoteTodos.jsx";

export function DynamicCmp(props){
    const {id} = props
    const {idx} = props
    const {line} = props
    const {info} = line
    switch (line.type) {
    
        case 'NoteText':
            return <NoteText id={id} info={info}  idx={idx}/>
        case 'NoteImg':
            return <NoteImg id={id} info={info} idx={idx}/>
        case 'NoteTodos':
            return <NoteTodos id={id} info={info} idx={idx}/>
    }
    return null
}