export function LongText(props){
    return (
        <div>
            <p>{props.isLong ? props.text : props.text.length > 100 ? props.text.substring(0,100) + '...' : props.text}</p>
            {props.text.length > 100 && <button onClick={() =>props.onSetState()}>Show {props.isLong ? 'Less' : 'More'}</button>}
        </div>
      
    )
}