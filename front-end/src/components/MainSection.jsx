/* images */
import bgImage from '../assets/Deve.png';

export default function MainSection () {
  return (
    <main>
      <img className='col-12 bgImage' src={bgImage} alt='Background image' />
      <section className='main col-12'>
        <h1 className='col-12 text-center'>Connect with Top IT Talent Effortlessly</h1>
        <p className='subHeadline col-12 px-3 text-center'>Streamlining the recruitment process for IT professionals and recruiters.</p>
        <section className='subSec1 col-12 row m-0'>
          <div className='text-center p-3 col-12 col-md-6'>
            <h3><b>What Is DeveFind?</b></h3>
            <p className='px-3 py-1' id='definition'>
              <b>DeveFind</b> is an innovative platform designed to streamline the hiring process for recruiters looking for
              talented developers. It offers a centralized space where recruiters can easily search, filter, and find the right
              developers to meet their specific needs, saving time and effort in the recruitment process.
            </p>
          </div>
          <div className='p-3 col-12 col-md-6 text-left'>
            <h3 className='text-center'><b>Our Mission</b></h3>
            <ul className=''>
              <li><b>Empowering Recruiters:</b> Making it easier for recruiters to find the best talent quickly and efficiently.</li>
              <li><b>Supporting Developers:</b> Providing developers with more opportunities to showcase their skills and connect with great companies.</li>
              <li><b>Building Community:</b> Fostering a vibrant network of tech professionals and companies to drive innovation.</li>
            </ul>
          </div>
        </section>
      </section>
    </main>
  );
}
