import { KeepApp } from "./apps/Keep/KeepApp.jsx";
import { MailApp } from "./apps/Mail/mail-pages/MailApp.jsx";
import { Header } from "./cmps/Header.jsx";
import { About } from "./pages/about.jsx";
import { Home } from "./pages/home.jsx";

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;


// ******file naming + paths convention
export function App() {

    return (
        <Router>
            <section className="app">
                <Header />
                <Switch>
                    <Route path="/keep" component={KeepApp} />
                    <Route path="/mail" component={MailApp} />
                    <Route path="/about" component={About} />
                    <Route path="/" component={Home} />
                </Switch>
            </section>
        </Router>
    )
}





