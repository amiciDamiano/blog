import { Box, Divider, Paper, Stack } from '@mui/material'
import React, { useRef } from 'react'
import Puller from './Puller'

const getNextKey = (key, boxes) => {
    let next = Number(key.split('|')[1]) + 1;
    if (next >= Object.keys(boxes.current).length) {
        next = next - 2;
    }
    return Object.keys(boxes.current).find(k => next === Number(k.split('|')[1]));
};
const sumFlexGrow = (boxes, ignoreKeys) => {
    let res = 0;
    for(let k in boxes.current) {
        if(!ignoreKeys.includes(k)) {
            res +=Number (boxes.current[k].style.flexGrow);
        }
    }
    return res;
};
const ResizableStack = ({ direction, children, StackProps, ...other }) => {
    const maxFlex = children.length;
    const nextKey = useRef(null);
    const boxRefs = useRef({});
    const resizings = useRef({});
    const lastDragPositions = useRef({});
    const resizingKey = useRef(null);
    const orientation = direction === 'row' ? 'vertical' : 'horizontal';
    const coordinate = direction === 'row' ? 'x' : 'y';
    const eventCoordinate = direction === 'row' ? 'clientX' : 'clientY';
    const clientMeasure = direction === 'row' ? 'clientWidth' : 'clientHeight';
    
    const handleResize = (e) => {
        const touch = e.type === "touchmove";
        if (resizingKey.current) {
            let differenceFromLastPoint;
            if(touch) {
                differenceFromLastPoint = (e.touches[0][eventCoordinate] - lastDragPositions.current[resizingKey.current][coordinate])
            } else {
                differenceFromLastPoint = (e[eventCoordinate] - lastDragPositions.current[resizingKey.current][coordinate])
            }
            if(boxRefs.current[resizingKey.current].style.flexGrow !== "0") {
                const first = (differenceFromLastPoint * boxRefs.current[resizingKey.current].style.flexGrow);
                const flexDifference = first / boxRefs.current[resizingKey.current][clientMeasure];
                if(touch) {   
                    lastDragPositions.current[resizingKey.current] = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                } else {
                    lastDragPositions.current[resizingKey.current] = { x: e.clientX, y: e.clientY };
                }
                boxRefs.current[resizingKey.current].style.flexGrow = (Number(boxRefs.current[resizingKey.current].style.flexGrow) + flexDifference);
                boxRefs.current[nextKey.current].style.flexGrow = maxFlex - sumFlexGrow(boxRefs, [resizingKey.current, nextKey.current]) - Number(boxRefs.current[resizingKey.current].style.flexGrow);
            } else {
                const ratioFlexPx = Number(boxRefs.current[nextKey.current].style.flexGrow) / Number(boxRefs.current[nextKey.current][clientMeasure]);
                const flexDifference = differenceFromLastPoint * ratioFlexPx;
                if(touch) {   
                    lastDragPositions.current[resizingKey.current] = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                } else {
                    lastDragPositions.current[resizingKey.current] = { x: e.clientX, y: e.clientY };
                }
                boxRefs.current[resizingKey.current].style.flexGrow = (Number(boxRefs.current[resizingKey.current].style.flexGrow) + flexDifference);
                boxRefs.current[nextKey.current].style.flexGrow = maxFlex - sumFlexGrow(boxRefs, [resizingKey.current, nextKey.current]) - Number(boxRefs.current[resizingKey.current].style.flexGrow);
            }
        }
    };
    const toggleResizing = (e, key, start) => {
        const touch = e.type === "touchstart";
        if(key) {
            resizings.current[key] = start;
        }
        if (start) {
            resizingKey.current = key;
            if(!touch) {
                window.addEventListener("mouseup", toggleEnd.current)
                window.addEventListener("mousemove", resizing.current)
            }
            nextKey.current = getNextKey(key, boxRefs);
            boxRefs.current[key].style.pointerEvents = 'none';
            boxRefs.current[key].style.userSelect = 'none';
            boxRefs.current[nextKey.current].style.pointerEvents = 'none';
            boxRefs.current[nextKey.current].style.userSelect = 'none';
            lastDragPositions.current[key] = { x: e.clientX, y: e.clientY };
        } else {
            if(!touch) {
                window.removeEventListener("mouseup", toggleEnd.current)
                window.removeEventListener("mousemove", resizing.current)
            }
            boxRefs.current[resizingKey.current].style.pointerEvents = 'all';
            boxRefs.current[resizingKey.current].style.userSelect = 'unset';
            boxRefs.current[nextKey.current].style.pointerEvents = 'all';
            boxRefs.current[nextKey.current].style.userSelect = 'unset';
            resizingKey.current = null;
        }
    };
    const toggleEnd = useRef((e) => toggleResizing(e, null, false))
    const resizing = useRef((e) => handleResize(e, null, false))

    return (
        <Stack {...StackProps} sx={{ ...StackProps?.sx, flexWrap: "wrap" }} direction={direction}>{
            children.map((child, idx) => {
                const key = `resizable-child|${idx}`
                return (
                    <React.Fragment key={key}>
                        <Box component={Paper} style={{ flex: 1, overflow: "hidden" }} ref={_ => boxRefs.current[key] = _}>
                            {child}
                        </Box>
                        { (maxFlex - 1) !== idx && (
                            <Divider sx={{ [ orientation === "vertical" ? "mx" : "my" ]: 1 }} flexItem orientation={orientation} >
                                <Puller 
                                    orientation={orientation} 
                                    onTouchStart={(e) => toggleResizing(e, key, true)} 
                                    onTouchMove={resizing.current} 
                                    onTouchEnd={toggleEnd.current} 

                                    onMouseDown={(e) => toggleResizing(e, key, true)} 
                                />
                            </Divider>
                        )}
                    </React.Fragment>
                )
            })
        }</Stack>
    )
}

export default ResizableStack