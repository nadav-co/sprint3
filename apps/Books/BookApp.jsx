import { BookList } from "./pages/BookList.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"

const { Route, Switch } = ReactRouterDOM


export function BookApp() {
  
    return (
        <section>
            <Switch>
                <Route path="/book/details/:bookId?" component={BookDetails}/>
                <Route path="/book" component={BookList} />
            </Switch>
            <UserMsg/> 
        </section>
    
    )
        

}