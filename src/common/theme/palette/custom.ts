import CustomPalette from '@common/theme/palette/type';
import { alpha } from '@mui/material/styles';

const GREY = {
  0: '#FFFFFF',
  50: '#F8F9FA',
  100: '#E9ECEF',
  200: '#DEE2E6',
  300: '#CED4DA',
  400: '#ADB5BD',
  500: '#6C757D',
  600: '#495057',
  700: '#343A40',
  800: '#212529',
  900: '#161A1D',
  A100: '#E2E6EA',
  A200: '#BFC5CC',
  A400: '#6C757D',
  A700: '#343A40',
};

const PRIMARY = {
  lighter: '#E3F2FD',
  light: '#64B5F6',
  main: '#2A5C8A', // Professional Trust Blue
  dark: '#1A3C5A',
  darker: '#0E2438',
  contrastText: '#FFFFFF',
};

const SECONDARY = {
  lighter: '#FFECDD',
  light: '#FF8E5D',
  main: '#FF6B35', // Energetic Coral
  dark: '#CC5222',
  darker: '#993915',
  contrastText: '#FFFFFF',
};

const INFO = {
  lighter: '#E3F2FD',
  light: '#64B5F6',
  main: '#2196F3',
  dark: '#0D47A1',
  darker: '#082255',
  contrastText: '#FFFFFF',
};

const SUCCESS = {
  lighter: '#E8F5E9',
  light: '#81C784',
  main: '#4CAF50', // Fresh Green
  dark: '#2E7D32',
  darker: '#1B5E20',
  contrastText: GREY[800],
};

const WARNING = {
  lighter: '#FFF8E1',
  light: '#FFD54F',
  main: '#FFC107', // Warm Amber
  dark: '#FF8F00',
  darker: '#FF6F00',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FFEBEE',
  light: '#E57373',
  main: '#D32F2F', // Alert Red
  dark: '#B71C1C',
  darker: '#7A0C2E',
  contrastText: '#FFFFFF',
};

// Event-specific colors
const EVENT = {
  conference: '#6C4AB6', // Professional Purple
  concert: '#FF4081', // Vibrant Pink
  workshop: '#4DB6AC', // Educational Teal
  social: '#FFB74D', // Casual Orange
};

const palette: CustomPalette = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  event: EVENT,
  grey: GREY,
  divider: alpha(GREY[500], 0.16),
  text: {
    primary: GREY[800],
    secondary: GREY[600],
    disabled: GREY[400],
  },
  background: {
    paper: '#FFFFFF',
    default: GREY[50],
    neutral: GREY[100],
  },
  action: {
    active: GREY[600],
    hover: alpha(PRIMARY.main, 0.04),
    selected: alpha(PRIMARY.main, 0.08),
    disabled: alpha(GREY[500], 0.32),
    disabledBackground: alpha(GREY[500], 0.12),
    focus: alpha(PRIMARY.main, 0.12),
    hoverOpacity: 0.04,
    disabledOpacity: 0.32,
  },
};

export default palette;
