import React from 'react';
import worker0 from '../pic/worker/worker0.png';
import worker1 from '../pic/worker/worker1.png';
import worker2 from '../pic/worker/worker2.png';
import worker3 from '../pic/worker/worker3.png';
import worker4 from '../pic/worker/worker4.png';
import worker5 from '../pic/worker/worker5.png';
import worker6 from '../pic/worker/worker6.png';
import worker7 from '../pic/worker/worker7.png';
import worker8 from '../pic/worker/worker8.png';
import worker9 from '../pic/worker/worker9.png';
import worker10 from '../pic/worker/worker10.png';
import worker11 from '../pic/worker/worker11.png';
import worker12 from '../pic/worker/worker12.png';
import worker13 from '../pic/worker/worker13.png';
import worker14 from '../pic/worker/worker14.png';
import worker15 from '../pic/worker/worker15.png';
import worker16 from '../pic/worker/worker16.png';
import worker17 from '../pic/worker/worker17.png';
import worker18 from '../pic/worker/worker18.png';
import worker19 from '../pic/worker/worker19.png';
import worker20 from '../pic/worker/worker20.png';
import worker21 from '../pic/worker/worker21.png';

function WorkerPic({ id }) {

  const getPic = () => {
    const num = id % 22; // If you have 4 images, use modulo 4
    if (num === 0) {
      return worker0;
    }
    if (num === 1) {
      return worker1;
    }
    if (num === 2) {
      return worker2;
    }
    if (num === 3) {
      return worker3;
    }
    if (num === 4) {
        return worker4;
    }
    if (num === 5) {
        return worker5;
    }
    if (num === 6) {
        return worker6;
    }
    if (num === 7) {
        return worker7;
    }
    if (num === 8) {
        return worker8;
    }
    if (num === 9) {
        return worker9;
    }
    if (num === 10) {
        return worker10;
    }
    if (num === 11) {
        return worker11;
    }
    if (num === 12) {
          return worker12;
    }
    if (num === 13) {
          return worker13;
    }
    if (num === 14) {
          return worker14;
    }
    if (num === 15) {
          return worker15;
    }
    if (num === 16) {
        return worker16;
    }
    if (num === 17) {
          return worker17;
    }
    if (num === 18) {
          return worker18;
    }
    if (num === 19) {
          return worker19;
    }
    if (num === 20) {
          return worker20;
    }
    if (num === 21) {
        return worker21;
  }
  };

  return (
    <img src={getPic()} alt={`Worker ${id}`} />
  );
}

export default WorkerPic;
