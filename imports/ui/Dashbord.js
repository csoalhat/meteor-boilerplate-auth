import React from 'react';

import PrivateHeader from './PrivateHeader';

// stateless functional component - only used for visual data with no react state logic
export default () => {
  return (
    <div>
      <PrivateHeader title="Dashbord" />
      <div className="wrapper">
        <p>Dashbord Content</p>
      </div>
    </div>
  );
};
