import "./less/main.less";

import { render } from "inferno";
import { BrowserRouter } from "inferno-router";

import Header from "./components/header/Header";
import Routes from "./components/routes/Routes";
import Footer from "./components/footer/Footer";

function Entry() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <Footer />
    </BrowserRouter>
  );
}

render( <Entry />, document.getElementById( "inferno" ) );