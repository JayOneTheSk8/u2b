import React from 'react';


const UserDropdown = (props) => {
  return (
    <ul className="user-dropdown">
      <li>Account Details</li>
      <li>Manage Subscriptions</li>
      <li><button onClick={props.logout}>Log Out</button></li>
    </ul>
  );
}
// make logout a link
export default UserDropdown;
