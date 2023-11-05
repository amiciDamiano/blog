import { CancelTwoTone } from '@mui/icons-material';
import { Chip, Stack } from '@mui/material';
import React from 'react'

const TagList = ({ canDelete = false, tags, onDelete = null }) => {
    
    return (
        <Stack sx={{ mt: tags.length <= 0 && '0px!important', mb: tags.length > 0 && (_ => `-${_.spacing(1)}!important`) }} direction="row" flexWrap="wrap" spacing={1}>
            {tags.map((tag, index) => <React.Fragment key={tag}>
                {canDelete
                    ? (
                        <Chip sx={{ mb: _ => `${_.spacing(1)}!important` }} size="small" deleteIcon={<CancelTwoTone />} label={tag} onDelete={() => onDelete(index)} />
                    )
                    : (
                        <Chip sx={{ mb: _ => `${_.spacing(1)}!important` }} size="small" label={tag} />
                    )
                }
            </React.Fragment>
            )}
        </Stack>
    )
};

export default TagList;