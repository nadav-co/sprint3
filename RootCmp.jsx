import { KeepApp } from "./apps/Keep/KeepApp.jsx";
import { MailApp } from "./apps/Mail/MailApp.jsx";
import { Header } from "./cmps/header.jsx";
import { About } from "./pages/about.jsx";
import { Home } from "./pages/home.jsx";


const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
 



                      // ******file naming + paths convention
export function App() {
         return(
             
            <Router>
                <Header/>
            <section className="app">
                <Switch>
                    <Route path="/keep-app" component={KeepApp}/> 
                    <Route path="/mail-app" component={MailApp}/>
                    {/* <Route path="/book" component={BookApp}/> */}
                    <Route path="/about" component={About}/>
                    <Route path="/" component={Home}/>
                </Switch>
                
            </section> 
        </Router>
         )
    }






