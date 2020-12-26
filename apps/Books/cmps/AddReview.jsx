import { bookService } from "../services/book-service.js"
import { bus } from "../../../services/event-bus-service.js"

export class AddReview extends React.Component {

    state = {
        review: bookService.getEmptyReview()
    }


    handleChange = (ev) => {
        this.setState({
            review: {
                ...this.state.review,
                [ev.target.name]: ev.target.type === 'number' ? +ev.target.value : ev.target.value
            }
        })
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        // if(Object.values(this.state.review).some(val => val === '')) return
        bookService.addReview(this.state.review, this.props.book.id)
            .then((book) => {
                bus.emit('changeBook', book)
                this.setState({
                    review: bookService.getEmptyReview()
                })
            })

    }

    render() {
        return (
            <form class="add-book-review flex col" onSubmit={this.onSubmit}>
                <input onChange={this.handleChange} type="text" name="readerName" value={this.state.review.readerName} placeholder="Your Name" required />
                <select onChange={this.handleChange} name="rate" value={this.state.review.rate} placeholder="rate" required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <input onChange={this.handleChange} type="date" name="readAt" value={this.state.review.readAt} placeholder="Read At" required />
                <textarea onChange={this.handleChange} name="txt" value={this.state.review.txt} placeholder="Your Review" required />
                <button>Save</button>


            </form>
        )
    }
}