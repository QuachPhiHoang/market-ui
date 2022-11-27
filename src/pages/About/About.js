import Featured from '~/components/Featured';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Hero from '~/components/Hero';
import Team from '~/components/Team';
import Testtimonial from '~/components/Testtimonial';

function About() {
    return (
        <div>
            <Header />
            <Hero />
            <Featured />
            <Team />
            <Testtimonial />
            <Footer />
        </div>
    );
}

export default About;
