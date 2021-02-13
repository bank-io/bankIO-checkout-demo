import * as patterns from '../patterns';

import { Link, useLocation } from '@reach/router';
import React, { useState } from 'react';

import { Code } from './code';
import { Editor } from './editor';
import { Header } from './header';

let layout = [
  {
    name: 'Integration',
    patterns: [patterns.server],
  },

  {
    name: 'Features',
    patterns: [
      patterns.style,
      patterns.responsive,
      patterns.validation,
      patterns.radio,
    ],
  },
];

export const App = (props) => {
  const [env, setEnv] = useState('sandbox');
  const [errors, setErrors] = useState([]);
  const [code, setCode] = useState(null);

  function onChangeCode(code) {
    setCode(code);

    setErrors([]);
  }

  function onChangeEnv(env) {
    setEnv(env);
  }

  function onCodeRun(code) {
    setErrors([]);
  }

  function onCodeError(err) {
    setErrors((errors) => errors.concat(err.stack || err.toString()));
  }

  const location = useLocation();

  let patternName = props.pattern || 'server';
  let activePattern = patterns[patternName];

  if (!activePattern) {
    activePattern = patterns.server;
  }

  let baseURL = document.body.getAttribute('data-base-url');
  let clientID = document.body.getAttribute('data-client-id');

  const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: 'active' } : {};
  };

  return (
    <div>
      <Header onChangeEnv={(env) => onChangeEnv(env)} />

      <div className="main">
        <div className="column-left">
          {layout.map((group, i) => (
            <div key={i}>
              <h3>{group.name}</h3>
              <ul>
                {group.patterns.map(
                  (pattern) =>
                    !pattern.nosidebar && (
                      <Link
                        getProps={isActive}
                        to={`/pattern/${pattern.slug}`}
                        key={pattern.slug}
                      >
                        <li>
                          <span className="bullet" />
                          <span>{pattern.name}</span>
                        </li>
                      </Link>
                    )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="column-middle">
          <div className="intro">
            <h3>{activePattern.fullName}</h3>
            <div className="introp">{activePattern.intro}</div>
          </div>

          <div className="demo">
            <div className="steps">
              <div className="step right">1. Edit the code</div>

              <div className="step bottom">2. Try the button</div>

              {errors.length ? (
                <div className="errors">
                  {errors.map((err) => (
                    <p key={err}>{err}</p>
                  ))}
                </div>
              ) : (
                <Code
                  setup={activePattern.setup}
                  pattern={patternName}
                  code={code}
                  onError={(err) => onCodeError(err)}
                />
              )}

              <div className="step right">3. Copy code to your site!</div>
            </div>
          </div>
        </div>

        <div className="column-right">
          <Editor
            code={activePattern.code({ env, baseURL, clientID })}
            onChange={(val) => onChangeCode(val)}
          />
        </div>
      </div>
    </div>
  );
};
