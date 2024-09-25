import React, { useState, useEffect, useRef } from 'react';
import Navbar from "./navbar";
import Header from './header';
import '../styles/workersProfiles.css';
import ProfilePicUploader from './profilePic.js';

import axiosInstance from "../context/axios";

import { useUserContext } from '../context/UserProvider.jsx';

const WorkersProfiles = () => {
    const { user, setUser } = useUserContext();
    const [currentUser, setCurrentUser] = useState(user);

    const getWorkers = () => {
      return axiosInstance.get(`/${user.orgId}/schedule`, { params: { }}).then(res => res.data?.schedule)
    }





    const onProfileChange = (field, value) => {
        setCurrentUser(u => ({ ...u, [field]: value }));
    }

  const [cards, setCards] = useState([
    { id: 1, name: 'Blanche Pearson', role: 'Sales Manager', imgSrc: 'images/img-1.jpg' },
    { id: 2, name: 'Joenas Brauers', role: 'Web Developer', imgSrc: 'images/img-2.jpg' },
    { id: 3, name: 'Lariach French', role: 'Online Teacher', imgSrc: 'images/img-3.jpg' },
    { id: 4, name: 'James Khosravi', role: 'Freelancer', imgSrc: 'images/img-4.jpg' },
    { id: 5, name: 'Kristina Zasiadko', role: 'Bank Manager', imgSrc: 'images/img-5.jpg' },
    { id: 6, name: 'Donald Horton', role: 'App Designer', imgSrc: 'images/img-6.jpg' }
  ]);

  // Ref to track the carousel element
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    let isDragging = false, startX, startScrollLeft;

    const onDragStart = (e) => {
      isDragging = true;
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
      carousel.classList.add("dragging");
    };

    const onDragging = (e) => {
      if (!isDragging) return;
      const x = e.pageX;
      carousel.scrollLeft = startScrollLeft - (x - startX);
    };

    const onDragEnd = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
    };

    carousel.addEventListener('mousedown', onDragStart);
    carousel.addEventListener('mousemove', onDragging);
    window.addEventListener('mouseup', onDragEnd);

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      carousel.removeEventListener('mousedown', onDragStart);
      carousel.removeEventListener('mousemove', onDragging);
      window.removeEventListener('mouseup', onDragEnd);
    };
  }, []);

  return (
    <div className="container">
      <Navbar />

      <section className="main">
      <Header text="Our Team" />
      <section className="main-workers">





        <div className="wrapperWorker">
          <ul className="carousel" ref={carouselRef}>
            {cards.map(card => (
              <li key={card.id} className="card">
                <div className="img">

                <ProfilePicUploader
                                photo={currentUser?.photo}
                                setPhoto={(photo) => onProfileChange('photo', photo)}
                            />
                  {/* <img src={card.imgSrc} alt={card.name} draggable="false" /> */}
                </div>
                <h2>{card.name}</h2>
                <span>{card.id}</span>
                <span>{card.role}</span>
                <span>{card.role}</span>
                <span>{card.role}</span>
              </li>
            ))}
          </ul>
        </div>














      </section>
      </section>
    </div>
  );
};

export default WorkersProfiles;
