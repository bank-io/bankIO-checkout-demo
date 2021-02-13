import React from 'react';
import { Toggle } from './toggle';

export const Header = ({ showLogo }) => {
  return (
    <header>
      <h1>
        {showLogo ? (
          <img src="https://bankio.ro/logo.svg" alt="BankIO" />
        ) : null}
        <span>Smart Payment Buttons Integration</span>
      </h1>

      {/* <Toggle left="sandbox" right="production" default="left" onChange={this.props.onChangeEnv} /> */}
    </header>
  );
};
