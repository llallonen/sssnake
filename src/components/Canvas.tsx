import React, { useEffect, useRef, useState } from 'react';
export interface ICanvas {
    height: number;
    width: number;
}

export const Canvas = ({ height, width }: ICanvas) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        setContext(canvasRef.current && canvasRef.current.getContext('2d'));
    }, [context])

    return (
        <canvas
            ref={canvasRef}
            style={{
                border: "3px solid black",
            }}
            height={height}
            width={width}
        />
    );
};