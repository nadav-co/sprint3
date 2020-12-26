import { googleService } from "../services/google-service.js"
import { bookService } from "../services/book-service.js"
import { bus } from "../../../services/event-bus-service.js"
import { GoogleBooksList } from "./GoogleBooksList.jsx";

export class AddBook extends React.Component {
    
    state = {
      isHidden: true,
      googleBooks: null
    }

    componentDidMount() {

    }

    handleChange = (ev) => {
        if (!ev.target.value) return
        googleService.getGoogleBooks(ev.target.value)
        .then(books => this.setState({googleBooks: books}))
    }

    onAddGoogleBook = (idx) => {
        const book = this.state.googleBooks[idx]            
        bookService.addGoogleBook(book)
        bus.emit('userMsg',{txt: `book ${book.volumeInfo.title} was successfully added.`,link: `/#/book/details/${book.id}`,status:'success'})
        this.props.reloadBooks()
    }

    render() {
        return (
            <section className="add-book flex col">
                <div className="search-gogle-books flex col">
                <h1>Add Book:</h1>
                <label htmlFor="addBook">Book Name:</label>
                <input onChange={this.handleChange} type="text" placeholder="Enter Name"/>
                </div>
                
                {this.state.googleBooks && <ul className="google-list"><GoogleBooksList addBook={this.onAddGoogleBook} googleBooks={this.state.googleBooks}/></ul>}
            </section>
        )
    }
}