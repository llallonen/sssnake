import React from 'react';
export interface ICanvas {
    height: number;
    width: number;
}

export const Canvas = ({ height, width }: ICanvas) => {
    return (
        <canvas
            style={{
                border: "3px solid black",
            }}
            height={height}
            width={width}
        />
    );
};