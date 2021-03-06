import { BookApp } from "./apps/Books/BookApp.jsx";
import { KeepApp } from "./apps/Keep/KeepApp.jsx";
import { MailApp } from "./apps/Mail/mail-pages/MailApp.jsx";
import { Header } from "./cmps/Header.jsx";
import { Footer } from "./cmps/Footer.jsx";
import { About } from "./pages/About.jsx";
import { Home } from "./pages/Home.jsx";

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;


// ******file naming + paths convention
export function App() {

    return (
        <Router>
            <section className="app">
                <Header />
                <Switch>
                    <Route path="/book" component={BookApp} />
                    <Route path="/keep" component={KeepApp} />
                    <Route path="/mail" component={MailApp} />
                    <Route path="/about" component={About} />
                    <Route path="/" component={Home} />
                </Switch>
            </section>
            <Footer  />
        </Router>
    )
}





