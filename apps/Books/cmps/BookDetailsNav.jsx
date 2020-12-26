import {bookService} from '../services/book-service.js'

const { NavLink } = ReactRouterDOM;

export class DetailsNav extends React.Component {
    
    state = {
      ids:{
        nextId:null,
        prevId:null
      }
    }

    componentDidMount() {
      this.setIds()
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.id !== this.props.id) {
          this.setIds()
      }
    }

    setIds = ()=>{
      bookService.getNegsbyId(this.props.id)
      .then(ids => this.setState({ids}))
    }

   

    render() {
      const {prevId} = this.state.ids
      if (this.state.bookIdx) return <h1>Loading...</h1>
        return (
          <ul className="details-nav">
              {prevId && <li><NavLink to={`/book/details/${prevId}`}>Previous</NavLink></li>}
              {this.state.ids.nextId &&<li><NavLink to={`/book/details/${this.state.ids.nextId}`}>Next</NavLink></li>}
          </ul>
        )
    }
}