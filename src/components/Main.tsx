import {Routes, Route, Link} from 'react-router-dom';

const About = () => (
  <div>
    <h1>About</h1>
    <p>You are on the about page</p>
  </div>
);

const Home = () => (
  <div>
    <h1>Home</h1>
    <p>You are home</p>
  </div>
);

const NoMatch = () => (
  <div>
    <h1>404</h1>
    <p>No match</p>
  </div>
);

export function Main() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}
