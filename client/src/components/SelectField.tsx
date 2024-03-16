import * as React from 'react';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import { Stack, Typography } from '@mui/material';

interface SelectFieldProps extends AutocompleteProps<any, boolean, boolean, boolean, any> {
    title?: string
}

export default function SelectField(
    props: SelectFieldProps
) {
    const { title } = props
    return (
        <Stack
            direction="column"
            spacing={1}
            sx={{ width: "inherit" }}>

            {title ?
                <Typography sx={{

                    fontSize: {
                        xs: "small",
                        md: "medium",
                    },
                }}>
                    {props.title}
                </Typography>
                : null}
            <Autocomplete
                size='small'
                {...props}
            />
        </Stack>


    );
}
