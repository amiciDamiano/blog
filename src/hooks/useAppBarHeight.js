import { useMediaQuery, useTheme } from '@mui/material';

const useAppBarHeight = () => {
    const {
        mixins: { toolbar },
        breakpoints,
    } = useTheme();
    const toolbarDesktopQuery = breakpoints.up('sm');
    const toolbarLandscapeQuery = `${breakpoints.up('xs')} and (orientation: landscape)`;
    const isDesktop = useMediaQuery(toolbarDesktopQuery);
    const isLandscape = useMediaQuery(toolbarLandscapeQuery);
    let currentToolbarMinHeight;
    if (isDesktop) {
        currentToolbarMinHeight = toolbar[toolbarDesktopQuery];
    } else if (isLandscape) {
        currentToolbarMinHeight = toolbar[`${breakpoints.up('xs')}`]['@media (orientation: landscape)'];
    } else {
        currentToolbarMinHeight = toolbar;
    }
    return currentToolbarMinHeight.minHeight;
}

export default useAppBarHeight;