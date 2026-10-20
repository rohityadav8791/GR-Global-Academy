import { schoolData } from '../data/schoolData';
import './styles/Activities.css';

const ActivitiesSection = () => (
  <section id="activities" className="section bg-cream">
    <div className="container">
      <div className="section-header">
        <span className="section-kicker">Student Activities</span>
        <h2>Student Activities and Achievements</h2>
        <div className="accent-bar"></div>
        <p>Explore the wide range of co-curricular activities at Gr Global Academy.</p>
      </div>
      <div className="activities-grid">
        {schoolData.activities.map((activity, index) => (
          <div key={index} className="activity-card card">
            <div className="card-image">
              <img src={activity.image} alt={activity.imageAlt} loading="lazy" />
            </div>
            <h3>{activity.title}</h3>
            <p>{activity.description}</p>
          </div>
          ))}
        </div>
      </div>
    </section>
  );

export default ActivitiesSection;
