import React from 'react';
import { Button } from 'antd';
import { CloseCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';

const Actions = ({
  isLoading,
  onDisplaySubtitle,
  onHideSubtitle,
  isShowSubtitle
}) => (
  <div className="actions">
    <div className="button">
      <Button
        type="primary"
        className="turn-on-button"
        loading={isLoading}
        block
        onClick={onDisplaySubtitle}
      >
        Turn on
      </Button>
      <Button
        block
        onClick={onHideSubtitle}
      >
        Turn off
      </Button>
    </div>
    {isShowSubtitle ? (
      <div className="status">
        <CheckCircleTwoTone
          twoToneColor="#52c41a"
          style={{ fontSize: '1rem', marginRight: '4px' }}
        />
        Your subtitle is on
      </div>
    ) : (
      <div className="status">
        <CloseCircleTwoTone
          twoToneColor="#f5222d"
          style={{ fontSize: '1rem', marginRight: '4px' }}
        />
        Your subtitle is off
      </div>
    )}
  </div>
);

export default Actions;