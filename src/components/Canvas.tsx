import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeMove } from '../store/actions';
import { IGlobalState } from '../store/reducers';
import { drawObject, generateRandomPosition, IObjectBody } from '../utilities';
export interface ICanvas {
    height: number;
    width: number;
}

export const Canvas = ({ height, width }: ICanvas) => {
    const snake1 = useSelector((state: IGlobalState) => state.snake);
    const disallowedDirection = useSelector(
        (state: IGlobalState) => state.disallowedDirection
      );

    const [pos, setPos] = useState<IObjectBody>(
        generateRandomPosition(width - 20, height - 20)
    );

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

    const handleKeyEvent = useCallback((event: KeyboardEvent) {
        if (disallowedDirection) {
            switch (event.key) {
                case 'w':
                    moveSnake(0, -20, disallowedDirection);
                    break;
                case 's':
                    moveSnake(0, 20, disallowedDirection);
                    break;
                case 'w':
                    moveSnake(-20, 0, disallowedDirection);
                    break;
                case 'w':
                    event.preventDefault();
                    moveSnake(-20, 0, disallowedDirection);
                    break;
            }
        } else {
            if (
                disallowedDirection !== 'LEFT' &&
                disallowedDirection !== 'UP' && 
                disallowedDirection !== 'DOWN' &&
                event.key === "d"
            ) {
                moveSnake(20, 0, disallowedDirection)
            }
        },
        [disallowedDirection, moveSnake]
    };

    const moveSnake = useCallback((dx = 0, dy = 0, ds: string) => {
        if (dx < 0 && dy === 0 && ds !== "LEFT") {
            dispatchEvent(makeMove(dx, dy, "MOVE_LEFT"))
        }
        if (dx > 0 && dy === 0 && ds !== "RIGHT") {
            dispatchEvent(makeMove(dx, dy, "MOVE_RIGHT"))
        }
        if (dx === 0 && dy < 0 && ds !== "UP") {
            dispatchEvent(makeMove(dx, dy, "MOVE_UP"))
        }
        if (dx === 0 && dy === 0 && ds !== "DOWN") {
            dispatchEvent(makeMove(dx, dy, "MOVE_DOWN"))
        },
        [dispatch]
    };

    useEffect(() => {
        setContext(canvasRef.current && canvasRef.current.getContext("2d"));
        drawObject(context, snake1, "#91C483");
        drawObject(context, [pos], "#676FA3");

    }, [context])

    useEffect(() => {
        window.addEventListener('keypress', handleKeyEvent);

        return () => {
            window.removeEventListener('keypress', handleKeyEvent)
        }

    }, [disallowedDirection, handleKeyEvent]);

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

