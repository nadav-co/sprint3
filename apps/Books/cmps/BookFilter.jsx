export class BookFilter extends React.Component {
    state = {
        filterBy:{
            name:'',
            minPrice: -Infinity,
            maxPrice: Infinity
        }
    }

    componentDidMount() {

    }

    handleChange = (ev) => {
        this.setState({
            filterBy: {
                ...this.state.filterBy,
                 [ev.target.name]: ev.target.type === 'number' ? +ev.target.value : ev.target.value
                }},() => this.props.setFilter(this.state.filterBy))
    }

    clearFilter = () => {
        const filterBy = {
            name:'',
            minPrice: -Infinity,
            maxPrice: Infinity
        }
        this.setState({filterBy})
        this.props.setFilter(filterBy)
    }

    render(){
        return(
        <section className="book-filter-container">
            <h1>Search:</h1>
            <form className = "book-filter flex col">
                <label htmlFor="bookName">Book Name: </label>
                <input onChange={this.handleChange} type="text" id="BookName" name="name" value={this.state.filterBy.name} placeholder="Enter Name"/>
                <label htmlFor="bookPrice"> Price: </label>
                <input onChange={this.handleChange} type="number" id="bookPrice" name="minPrice" value={this.state.filterBy.minPrice} placeholder="From:"/>
                <input onChange={this.handleChange} type="number" name="maxPrice" value={this.state.filterBy.maxPrice} placeholder="To:"/>
            <button type="button" onClick={this.clearFilter}>Clear Filters</button>
            </form>
        </section>
        
        )
    }

}