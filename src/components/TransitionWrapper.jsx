import React, { Fragment } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import "../transitions.css";

const TransitionWrapper = ({ children }) => {
  const location = useLocation();

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition key={location.key} timeout={200} classNames="fade">
        <Fragment>{children}</Fragment>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default TransitionWrapper;
