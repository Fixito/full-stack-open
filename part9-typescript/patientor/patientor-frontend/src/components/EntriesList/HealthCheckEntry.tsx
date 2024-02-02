import { HealthCheckEntry as HealthCheckEntryType } from '../../types.ts';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red, green, yellow, grey } from '@mui/material/colors';

interface HealthCheckEntryProps {
  entry: HealthCheckEntryType;
}

const HealthCheckEntry = ({ entry }: HealthCheckEntryProps) => {
  const { healthCheckRating } = entry;

  const color = {
    0: green[500],
    1: yellow[500],
    2: red[500],
    3: grey[900],
  };

  return (
    <div>
      <span style={{ color: color[healthCheckRating] }}>
        <FavoriteIcon />
      </span>
    </div>
  );
};

export default HealthCheckEntry;
