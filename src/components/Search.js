import { Autocomplete, CircularProgress, ListItemButton, ListSubheader, Paper, Popper, TextField } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import { useSearch } from '../hooks';

const Search = ({ dictionary, closeSidebar }) => {
    const { loading, searchOpen, setSearchOpen, options, changeHandler, searchString } = useSearch();
    return (
        <Autocomplete
            open={searchOpen}
            onOpen={() => setSearchOpen(true)}
            onClose={() => setSearchOpen(false)}
            fullWidth
            inputValue={searchString || ''}
            onInputChange={changeHandler}
            options={options}
            loading={loading}
            PopperComponent={(props) => (
                <Popper 
                    {...props} 
                    placement="bottom-start"
                    style={{ ...props.style, width: 250 }} 
                />
            )}
            noOptionsText={dictionary["noOptions"]}
            renderGroup={({ children, group }) => {
                return <React.Fragment key={group}>
                    <ListSubheader component={Paper} sx={{ boxShadow: "unset" }} elevation={3}>
                        {dictionary[group]}
                    </ListSubheader>
                    {children}
                </React.Fragment>
            }}
            renderOption={(params, option) => {
                return <ListItemButton
                    {...params}
                    key={option.path}
                    component={Link}
                    to={option.path}
                    sx={{ textTransform: "capitalize" }}
                    onClick={() => {
                        setSearchOpen(false);
                        changeHandler({ type: "change", target: { value: "" } });
                        closeSidebar && closeSidebar();
                    }}
                >
                    {option.title}
                </ListItemButton>
            }}
            groupBy={option => option.category}
            getOptionLabel={option => option.category || ''}
            filterOptions={(x) => x}
            renderInput={params => (
                <TextField
                    {...params}
                    key={'search'}
                    color='secondary'
                    label={`${dictionary['search']}...`}
                    variant="outlined"
                    // type="search"
                    size="small"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            </React.Fragment>
                        ),
                    }}
                    // sx={{ mx: 1 }}
                />
            )}
        />
    )
}

export default Search;