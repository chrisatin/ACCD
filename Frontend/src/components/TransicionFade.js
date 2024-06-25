import React from 'react';
import { CSSTransition } from 'react-transition-group';

const TransicionFade = ({ show, children }) => {
  
  return (
    <CSSTransition
      in={show} 
      timeout={300}
      classNames="fade" 
      unmountOnExit 
    >
      {children}
    </CSSTransition>
  );
};

export default TransicionFade;