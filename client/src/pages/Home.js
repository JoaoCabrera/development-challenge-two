import React from 'react';
import './Home.css';
import Patients from '../components/Patients';
import Header from '../components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <Patients />
    </>
  )
}
