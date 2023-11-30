import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/**
 * SignLink component, a redirection link component in the sign in and sign up pages.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const SignLink = props => {
  const { url, title } = props;
  return (
    <NavLink to={url} variant="body2">
      {title}
    </NavLink>
  );
};

SignLink.propTypes = {
  /** The url of the link.*/
  url: PropTypes.string,
  /** The title of the link.*/
  title: PropTypes.string,
};
export default SignLink;
