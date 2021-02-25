import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
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
      <Button
        startIcon={<GitHubIcon />}
        href="https://github.com/bank-io/bankIO-checkout-demo"
        target="_blank"
        rel="noopener"
      >
        Check the project on GitHub
      </Button>
      {/* <Toggle left="sandbox" right="production" default="left" onChange={this.props.onChangeEnv} /> */}
    </header>
  );
};
