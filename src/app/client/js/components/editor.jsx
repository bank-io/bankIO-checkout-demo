// import-sort-ignore

import React, { useCallback, useEffect, useState } from 'react';
import { debounce, stripIndent } from '../lib';

import AceEditor from 'react-ace';

import jsWorkerUrl from 'file-loader!ace-builds/src-noconflict/worker-javascript';
ace.config.setModuleUrl('ace/mode/javascript_worker', jsWorkerUrl);

import htmlWorkerUrl from 'file-loader!ace-builds/src-noconflict/worker-html';
ace.config.setModuleUrl('ace/mode/html_worker', htmlWorkerUrl);

import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-monokai';

export const Editor = React.forwardRef((props, ref) => {
  const [code, setCode] = useState(stripIndent(props.code));

  const onChange = useCallback(
    debounce((newValue) => {
      setCode(newValue);

      let value = newValue;
      if (props.onChange && value && value !== stripIndent(props.code)) {
        props.onChange(value);
      }
    }, 300),
    [props]
  );

  useEffect(() => {
    if (props.onChange) {
      props.onChange(props.code);
    }
  }, []);

  useEffect(() => {
    setCode(stripIndent(props.code));

    if (props.onChange) {
      props.onChange(props.code);
    }
  }, [props.code]);

  return (
    <AceEditor
      ref={ref}
      className="editor"
      mode="html"
      theme="monokai"
      onChange={onChange}
      name="editor"
      editorProps={{ $blockScrolling: Infinity }}
      value={code}
      width="100%"
      height="100%"
      setOptions={{
        // enableBasicAutocompletion: true,
        // enableLiveAutocompletion: true,
        // enableSnippets: true
        showPrintMargin: false,
      }}
    />
  );
});
