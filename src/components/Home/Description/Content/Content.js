import { splitInHalf } from '../../../../utils/utils';
import HalfSection from '../HalfSection/HalfSection';
import { Box } from '@mui/material';

const Content = props => {
  const { content, title } = props;

  const [firstHalf, secondHalf] = splitInHalf(content);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <HalfSection title={title} text={firstHalf} />
      <HalfSection title={<br />} text={secondHalf} />
    </Box>
  );
};

export default Content;
