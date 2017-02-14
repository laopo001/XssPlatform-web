import React, { Component, PropTypes } from 'react';

require('codemirror/lib/codemirror.css');
require('codemirror/addon/hint/show-hint.css');
var CodeMirror=require('codemirror');
require('codemirror/addon/hint/show-hint');
require('codemirror/addon/hint/javascript-hint');
require('codemirror/mode/javascript/javascript');


var ReactCodeMirror = React.createClass({

    getInitialState() {
        return {};
    },
    componentDidMount() {
        var editor = CodeMirror.fromTextArea(this.refs.textarea, {
  lineNumbers: true,
  extraKeys: {"Ctrl": "autocomplete"},
  mode: {name: "javascript", globalVars: true}
});
    },
    render() {
        return <textarea ref="textarea" name={this.props.path} defaultValue={this.props.value}  />
    }
});




export default ReactCodeMirror;