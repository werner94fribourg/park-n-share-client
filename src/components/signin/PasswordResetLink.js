// PasswordResetLink.js
import React from 'react';
import { Link } from 'react-router-dom';

function PasswordResetLink() {
  return (
    <Link to="/passwordReset" variant="body2">
      Forgot password?
    </Link>
  );
}

export default PasswordResetLink;
