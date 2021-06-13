import React from 'react';
import { WarningTwoTone } from '@ant-design/icons';

const Element = ({ content }) => (
  <div className="warning-element">
    <WarningTwoTone
      twoToneColor="#fa8c16" 
      style={{ fontSize: '1rem', marginRight: '4px' }}
    />
    {content}
  </div>
)

const Warning = () => (
  <div className="warning">
    <Element content="This extension is still in early access."/>
    <Element content="When turn the subtitle on, it may take a few second to get script from W3."/>
    <Element content="If a problem found, don't hesitate to contact anhmgb, but no guarantee he will response immediately."/>
  </div>
);

export default Warning;