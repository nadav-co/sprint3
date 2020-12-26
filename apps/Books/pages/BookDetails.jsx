import { LongText } from "../../../cmps/LongTxt.jsx"
import { bookService } from "../services/book-service.js"
import { bus } from "../../../services/event-bus-service.js"
import { Reviews } from "../cmps/ShowReviews.jsx"
import { AddReview } from "../cmps/AddReview.jsx"
import { DetailsNav } from "../cmps/BookDetailsNav.jsx"

const { NavLink } = ReactRouterDOM;

export class BookDetails extends React.Component {
    state={
        isAddRevShown: false,
        isLongTxtShown: false,
        book:null
    }

    killBookChangeListener;

    componentDidMount() {
       this.killBookChangeListener = bus.on('changeBook',(book) => this.setState({book}))
       this.loadBook()
    }
    componentWillUnmount() {
        this.killBookChangeListener()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook()
        }
    }

    loadBook = () =>{
        bookService.getById(this.props.match.params.bookId)
       .then((book) => this.setState({book:book}))
    }

    onSetTxtState = () => this.setState({isLongTxtShown: !this.state.isLongTxtShown})

    onDeleteReview = (id) => {
        bookService.removeReviewById(id, this.state.book.id)
        .then((book => this.setState({book})))
    
    }
    onAddReview = () =>{
        this.setState({isAddRevShown:true})
    }

    render() {
        const book = this.state.book 
        if (!book) return <h1>Loading</h1>
        return(
            <section className="book-details-container flex">
                <div onClick={(ev) => ev.stopPropagation()} className="book-details">
                    <h1><NavLink to="/book">&lt;Go Back</NavLink></h1>
                    
                    <img src={book.thumbnail} alt=""/>
                    <h2>{book.title}</h2>
                    <h3>{book.subtitle}</h3>
                    <h4>{book.authors.join(', ')}</h4>
                    <h3>language: {book.language}</h3>
                    <h3>{book.pageCount > 500 ? 'Long Reading' : book.pageCount > 200 ? 'Decent Reading' : 'Light Reading'}: {book.pageCount}</h3>
                    <h3>{new Date(Date.now()).getFullYear()- book.publishedDate > 10 ? 'Veteran Book,' : new Date(Date.now()).getFullYear()- book.publishedDate < 1 ? 'New!' : ''} published in-{book.publishedDate}</h3>
                    <h3>price: <span className={book.listPrice.amount < 20 ? 'geen' : book.listPrice.amount > 150 ? 'red' : ''}>{book.listPrice.amount} </span>{book.listPrice.currencyCode}</h3>
                    <LongText onSetState={this.onSetTxtState} text={book.description} isLong={this.state.isLongTxtShown}/>
                    {this.state.isAddRevShown && <AddReview book={this.state.book}/>}
                    <Reviews addReview={this.onAddReview} book={book} deleteReview={this.onDeleteReview}/>
                    <DetailsNav id={book.id}/>
                </div>
            </section>
                
            
        )
    }

}