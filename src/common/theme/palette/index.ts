import palette from '@common/theme/palette/blue';
// import palette from '@common/theme/palette/custom:';

declare module '@mui/material/styles' {
  interface Theme {}
  interface ThemeOptions {}

  interface PaletteColor {
    lighter: string;
    darker: string;
  }

  interface PaletteOptions {}

  interface TypeBackground {
    neutral: string;
  }
}

export default palette;
