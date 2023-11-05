import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import { getRandomColor, getTextColor } from '../utilities';
import { Button, ButtonGroup, Divider } from '@mui/material';
import { ShuffleTwoTone } from '@mui/icons-material';

const ColorPicker = forwardRef(({ label }, ref) => {
    const colorRef = useRef();
    const dividerRef = useRef();
    const inputRef = useRef();
    const RANDOM_COLOR = useMemo(getRandomColor, []);

    useImperativeHandle(ref, () => inputRef.current.value, []);

    const handleChangeColor = color => {
        const textColor = getTextColor(color);
        colorRef.current.style.color = textColor;
        dividerRef.current.style.borderColor = textColor;
        colorRef.current.style.backgroundColor = color;
        inputRef.current.value = color;
    }
    return (
        <ButtonGroup
            sx={{
                height: "100%",
                cursor: "pointer",
                backgroundColor: RANDOM_COLOR,
                color: getTextColor(RANDOM_COLOR),
                // border: _ => `2px solid ${error ? _.palette.error.main : "transparent"}`
            }}
            ref={colorRef}
        >
            <Button
                fullWidth
                component="label"
                sx={{
                    border: "none!important",
                    color: "inherit"
                }}
            >
                <input
                    style={{
                        cursor: "pointer",
                        opacity: 0,
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%"
                    }}
                    ref={inputRef}
                    defaultValue={RANDOM_COLOR}
                    onChange={({ target }) => handleChangeColor(target.value)}
                    type="color"
                />
                {label}
            </Button>
            <Divider ref={dividerRef} sx={{ borderColor: getTextColor(RANDOM_COLOR), my: 1 }} orientation="vertical" flexItem />
            <Button
                sx={{
                    border: "none!important",
                    color: "inherit"
                }}
                onClick={() => handleChangeColor(getRandomColor())}
            >
                <ShuffleTwoTone />
            </Button>
        </ButtonGroup>
    )
})

export default ColorPicker