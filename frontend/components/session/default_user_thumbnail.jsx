import React from 'react';

const DefaultUserThumbnail = (props) => {
  return (
    <div className='user-circle'>
      <p className='first-letter'>{props.username[0].toUpperCase()}</p>
    </div>
  );
};

export default DefaultUserThumbnail;
