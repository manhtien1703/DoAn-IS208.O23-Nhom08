import Header from "./Header";
import Footer from "./Footer";
import PropTypes from "prop-types";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
