import React from 'react';
import { Search as SearchIcon, LocationOn } from '@mui/icons-material';

import { Box, Button, Container, Tabs, Tab, Paper, InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

interface SearchBarProps {
  tabValue: number;
  handleTabChange: (value: React.SetStateAction<number>) => void;
}

// Styled components for the search box
const SearchBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  backgroundColor: 'white',
  width: '100%',
  maxWidth: 700,
  margin: '0 auto',
  marginTop: theme.spacing(4),
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1),
  fontSize: '1.1rem',
}));
// eslint-disable-next-line react/function-component-definition
export default function SearchBar({ tabValue, handleTabChange }: SearchBarProps) {
  return (
    <Container
      maxWidth="lg"
      sx={{ position: 'absolute', bottom: '10%', left: 0, right: 0, zIndex: 10 }}
    >
      <SearchBox>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Events" />
          <Tab label="Venues" />
          <Tab label="Performers" />
        </Tabs>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              border: '1px solid #ddd',
              borderRadius: 1,
              px: 2,
              mr: 2,
            }}
          >
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <SearchInput
              placeholder={
                // eslint-disable-next-line no-nested-ternary
                tabValue === 0
                  ? 'Search for events'
                  : tabValue === 1
                  ? 'Search for venues'
                  : 'Search for performers'
              }
              fullWidth
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              border: '1px solid #ddd',
              borderRadius: 1,
              px: 2,
            }}
          >
            <LocationOn sx={{ color: 'text.secondary', mr: 1 }} />
            <SearchInput placeholder="Location" fullWidth />
          </Box>

          <Button
            variant="contained"
            sx={{
              ml: 2,
              px: 4,
              py: 1.5,
              bgcolor: '#d1410c',
              '&:hover': {
                bgcolor: '#b0380b',
              },
            }}
          >
            Search
          </Button>
        </Box>
      </SearchBox>
    </Container>
  );
}
