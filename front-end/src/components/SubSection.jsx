import PropTypes from 'prop-types';

/* images */
import filterIcon from '../assets/filterIcon.png';
import accessIcon from '../assets/accessIcon.png';
import profileIcon from '../assets/profile.png';

function Card (props) {
  return (
    <div className='card col-12 col-lg-5 col-xl-3'>
      <div className='card-body'>
        <img className='col-4 col-lg-12' src={props.img} alt={props.h3} />
        <h3>{props.h3}</h3>
        <p>{props.p}</p>
      </div>
    </div>
  );
}

function BtnGroup (props) {
  const titles = props.titles;
  return (
    <div>
      {titles.map((title, index) => <button key={index}>{title}</button>)}
    </div>
  );
}

function TestimonialCard (props) {
  return (
    <div className='col-12 col-lg-5 p-3'>
      <p>{props.comment}</p>
      <p>⭐⭐⭐⭐⭐</p>
      <p>- <b>{props.user}</b></p>
    </div>
  );
}

Card.propTypes = {
  img: PropTypes.string.isRequired,
  h3: PropTypes.string.isRequired,
  p: PropTypes.string.isRequired
};

TestimonialCard.propTypes = {
  user: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired
};

BtnGroup.propTypes = {
  titles: PropTypes.array.isRequired
};

export default function SubSection () {
  return (
    <section className='cards text-center p-3'>
      <h1 className='col-12 py-2'>Why Choose DeveFind?</h1>
      <div className='container d-flex flex-wrap justify-content-center gap-3'>
        <Card
          img={filterIcon}
          h3='Advanced Filtering'
          p='Find the right candidates faster with our powerful search filters.'
        />
        <Card
          img={accessIcon}
          h3='Easy Access'
          p='A pool of Tech professionals to choose from.'
        />
        <Card
          img={profileIcon}
          h3='Profile Management'
          p='Job seekers can easily update and showcase their skills and experience.'
        />
      </div>
      <div className='py-5 row m-0'>
        <div className='col-12 col-md-6'>
          <h2>Get found by the right job or internship</h2>
          <h2>or</h2>
          <h2>Get recruiting ...</h2>
        </div>
        <div className='profiles col-12 col-md-6 d-flex flex-wrap justify-content-center'>
          <BtnGroup titles={['Front-end Developer', 'Back-end Developer', 'Mobile App Developer']} />
          <BtnGroup titles={['IT Support Specialist', 'Cloud Engineer', 'UX/UI Designer']} />
          <BtnGroup titles={['Research and Development (R&D) Engineer', 'DevOps Engineer', 'XR Developer (AR/VR)']} />
          <BtnGroup titles={['Wireless Engineer', 'Business Intelligence (BI) Developer', 'Data Analyst', 'and More ...']} />
        </div>
        <section className='testimonials-section d-flex flex-wrap justify-content-center py-3'>
          <h2 className='col-12 py-3'>What Our Users Say</h2>
          <div className='testimonials container d-flex flex-wrap justify-content-between gap-1'>
            <TestimonialCard
              user='Recruiter from TechCorp'
              comment='DeveFind helped me find the perfect candidate in just a few hours!'
            />

            <TestimonialCard
              user='Jane Doe, Software Engineer'
              comment="I landed my dream job thanks to DeveFind's easy-to-use platform."
            />
          </div>
        </section>
      </div>
    </section>
  );
}
