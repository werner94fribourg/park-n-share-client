import React from 'react';
import { Link } from 'react-router-dom';

function SignUpLink() {
  return (
    <Link to="/signup" variant="body2">
      Don't have an account? Sign Up
    </Link>
  );
}

export default SignUpLink;
