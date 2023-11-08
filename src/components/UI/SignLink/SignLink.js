import { NavLink } from 'react-router-dom';

const SignLink = props => {
  const { url, title } = props;
  return (
    <NavLink to={url} variant="body2">
      {title}
    </NavLink>
  );
};

export default SignLink;
