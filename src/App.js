import Sidebar from './components/Sidebar';
import {
  ThemeProvider as MaterialProvider,
  createTheme,
  Box,
  CssBaseline,
  Toolbar,
  IconButton,
  Typography,
  Backdrop,
  Button,
  MenuItem,
  Menu as MUIMenu,
  Container
} from '@mui/material';
import { useContext, useEffect, useMemo } from 'react';
import { ThemeContext, LanguageContext } from './contexts';
import Main from './components/Main';
import AppBar from './components/AppBar';
import { Menu, MenuOpen } from '@mui/icons-material';
import Content from './Content';

function App() {

  const { state: { dark, sidebarOpen }, openSidebar, closeSidebar, setDarkMode } = useContext(ThemeContext);
  const { state: { languageAbbr, menuOpened, languages }, openMenu, closeMenu, onChangeLanguage } = useContext(LanguageContext);

  useEffect(() => {
    const _dark = localStorage.getItem(process.env.REACT_APP_THEME_PREFERENCE) === 'true';
    setDarkMode(_dark);
  }, []);

  useEffect(() => {
    const _languageAbbr = localStorage.getItem(process.env.REACT_APP_LANGUAGE_PREFERENCE);
    if(_languageAbbr !== 'null') {
      onChangeLanguage(_languageAbbr);
    }
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: dark ? 'dark' : 'light',
          primary: {
            main: '#fdd835',
            light: '#fddf5d',
            dark: '#b19725'
          },
          secondary: {
            main: '#ef6c00',
            light: '#f28933',
            dark: '#a74b00'
          }
        },
      }),
    [dark],
  );

  return (
    <MaterialProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ justifyContent: { sm: "center" } }} open={sidebarOpen || theme.breakpoints.up('xs')}>
          <Toolbar sx={{ zIndex: (theme) => theme.zIndex.drawer + 9999999 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={sidebarOpen ? closeSidebar : openSidebar}
              edge="start"
              sx={{ mr: 2, display: { xs: 'block', sm: 'none' }, }}
            >
              {sidebarOpen
                ? <MenuOpen />
                : <Menu />
              }
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {'false === false Javascript'}
            </Typography>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Button style={{ justifySelf: 'flex-end' }} id="language-menu" color='inherit' onClick={openMenu}>{languageAbbr}</Button>
              <MUIMenu
                id="language-menu"
                anchorEl={document.getElementById("language-menu")}
                open={menuOpened}
                onClose={closeMenu}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {Object.entries(languages).map(([key, value]) => (
                  <MenuItem key={key} onClick={() => onChangeLanguage(key)}>{value.label}</MenuItem>
                ))}
              </MUIMenu>
            </Box>
          </Toolbar>
        </AppBar>
        <Sidebar />
        <Main open={sidebarOpen} sx={{ marginTop: theme.spacing(8) }}>
          <CssBaseline />
          <Backdrop
            sx={{ display: { sm: "none" }, color: '#fff', zIndex: 1 }}
            open={sidebarOpen}
            onClick={closeSidebar}
          />
          <Container>
            <Content />
          </Container>
        </Main>
      </Box>
    </MaterialProvider>
  );
}

export default App;
