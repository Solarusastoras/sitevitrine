import React from 'react';
import './OpeningHours.scss';

const OpeningHours = () => {
  const hours = [
    { day: 'Lundi', time: 'Fermé' },
    { day: 'Mardi', time: '12:00 - 14:30, 19:00 - 22:30' },
    { day: 'Mercredi', time: '12:00 - 14:30, 19:00 - 22:30' },
    { day: 'Jeudi', time: '12:00 - 14:30, 19:00 - 22:30' },
    { day: 'Vendredi', time: '12:00 - 14:30, 19:00 - 23:00' },
    { day: 'Samedi', time: '19:00 - 23:00' },
    { day: 'Dimanche', time: '12:00 - 15:00' },
  ];

  return (
    <section className="hours-section" id="horaires">
      <div className="container">
        <div className="section-header">
          <span className="subtitle">Nous rendre visite</span>
          <h2>Horaires d'Ouverture</h2>
        </div>
        <div className="hours-card">
          <div className="hours-grid">
            {hours.map((item, index) => (
              <div key={index} className={`hour-row ${item.time === 'Fermé' ? 'closed' : ''}`}>
                <span className="day">{item.day}</span>
                <span className="time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpeningHours;
