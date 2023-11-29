import React from 'react';
import './HomeworkPage.css';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Content from './Content';

function HomeworkPage() {
  const headerInfo = { /* ваш объект */ };
  const footerInfo = { /* ваш объект */ };
  const sidebarInfo = { /* ваш объект */ };

  return (
    <div className="homework-page">
      <Header info={headerInfo} />
      <Footer info={footerInfo} />
      <Sidebar info={sidebarInfo} />
      <Content />
    </div>
  );
}

export default HomeworkPage;