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
  useMediaQuery,
} from '@mui/material';
import { useContext, useEffect, useMemo } from 'react';
import { ThemeContext, LanguageContext } from './contexts';
import Main from './components/Main';
import AppBar from './components/AppBar';
import { Menu, MenuOpen } from '@mui/icons-material';
import Content from './Content';
import SidebarMenu from './components/SidebarMenu';
import { BrowserRouter } from 'react-router-dom';
import { STORE_LANGUAGE_PREFERENCE, STORE_THEME_PREFERENCE } from './utilities';

function App() {

  const { state: { dark, sidebarOpen }, openSidebar, closeSidebar, setDarkMode } = useContext(ThemeContext);
  const { state: { languageAbbr, menuOpened, languages }, openMenu, closeMenu, onChangeLanguage } = useContext(LanguageContext);
  // useEffect(()=>alert(sidebarOpen), [sidebarOpen]);
  useEffect(() => {
    const _dark = localStorage.getItem(STORE_THEME_PREFERENCE) === 'true';
    setDarkMode(_dark);
  }, []);

  useEffect(() => {
    const _languageAbbr = localStorage.getItem(STORE_LANGUAGE_PREFERENCE);
    if (_languageAbbr !== 'null') {
      onChangeLanguage(_languageAbbr);
    }
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                scrollbarColor: "#6b6b6b #2b2b2b",
                "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                  backgroundColor: "transparent",
                  // backgroundColor: "#2b2b2b",
                  width: 5,
                  height: 5,
                },
                "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                  borderRadius: 8,
                  backgroundColor: "#6b6b6b",
                  // border: "3px solid #2b2b2b",
                },
                "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
                  backgroundColor: "#959595",
                },
                "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
                  backgroundColor: "#959595",
                },
                "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#959595",
                },
                "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                  backgroundColor: "#2b2b2b",
                },
              },
            },
          },
        },
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
          },
        },
      }),
    [dark],
  );

  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <BrowserRouter basename='/blog'>
      <MaterialProvider theme={theme}>
        <Box sx={{ display: 'flex', overflowX: 'hidden' }}>
          <CssBaseline />
          <AppBar position="fixed" sx={{ justifyContent: { sm: "center" } }} open={sidebarOpen || matches}>
            <Toolbar sx={{ zIndex: (theme) => theme.zIndex.drawer + 9999999 }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={sidebarOpen ? closeSidebar : openSidebar}
                edge="start"
                sx={{ mr: 2, display: { xs: 'block', md: 'none' }, }}
              >
                {sidebarOpen
                  ? <MenuOpen />
                  : <Menu />
                }
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                {'false === false'}
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
          <Sidebar>
            <SidebarMenu />
          </Sidebar>
          <Main open={sidebarOpen} sx={{ marginTop: theme.spacing(8), paddingInline: 0 }}>
            <Backdrop
              sx={{ display: { md: "none" }, color: '#fff', zIndex: 1 }}
              open={sidebarOpen}
              onClick={closeSidebar}
            />
            {/* <Container> */}
            <Content />
            {/* </Container> */}
          </Main>
        </Box>
      </MaterialProvider>
    </BrowserRouter>
  );
}

export default App;
