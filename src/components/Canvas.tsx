import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { IGlobalState } from '../store/reducers';
import { drawObject, generateRandomPosition, IObjectBody } from '../utilities';
export interface ICanvas {
    height: number;
    width: number;
}

export const Canvas = ({ height, width }: ICanvas) => {
    const snake1 = useSelector((state: IGlobalState) => state.snake);
  
    const [pos, setPos] = useState<IObjectBody>(
      generateRandomPosition(width - 20, height - 20)
    );

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  

    useEffect(() => {
        setContext(canvasRef.current && canvasRef.current.getContext("2d"));
        drawObject(context, snake1, "#91C483");
        drawObject(context, [pos], "#676FA3");

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

