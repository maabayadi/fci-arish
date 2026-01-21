import "./Hero.css";
import heroImg from "../assets/hero.jpg";

export default function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="overlay">
        <h1>
          Shape Your Future at
          <br />
          <span>Faculty of Computers and Information</span>
        </h1>

        <p>
          Join Arish University and begin your journey into the world of
          technology, innovation, and advanced computing sciences.
        </p>

        {/* الأزرار ألغيناهم، التنقل سيكون من Navbar */}
      </div>
    </section>
  );
}
