import React, { useEffect, useRef, useState } from "react";
import { useLockBodyScroll, useWindowSize } from "react-use";
import "./index.scss";

const HEADER_HEIGHT = 42;

const drawCircle = (
  ctx: CanvasRenderingContext2D | null,
  x: number = 100,
  y: number = 100
) => {
  if (ctx) {
    ctx.fillStyle = "rgb(255 192 203 / 30%)";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
  }
};

let handleDraw = (
  e: MouseEvent,
  ctx: CanvasRenderingContext2D,
  isDrawing: boolean
) => {
  if (isDrawing) {
    drawCircle(ctx, e.x, e.y - HEADER_HEIGHT);
  }
};

const Canvas = () => {
  const canvasRef = useRef(null);
  let [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (canvasRef.current) {
      setCanvas(canvasRef.current);
    }
  }, [canvasRef]);

  /* Set canvas dimensions */
  useEffect(() => {
    if (canvas) {
      canvas.width = windowSize.width;
      canvas.height = windowSize.height - HEADER_HEIGHT;
    }
  }, [canvas, windowSize]);
  /* Even if width and height calculated properly comparing to window size, scrollbars are still appearing for some reason */
  useLockBodyScroll(true);

  /* Draw */
  useEffect(() => {
    if (canvas) {
      let ctx = canvas.getContext("2d");
      let isDrawing = false;
      canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
      });
      canvas.addEventListener("mouseup", (e) => {
        isDrawing = false;
      });
      canvas.addEventListener("mousemove", (e) =>
        handleDraw(e, ctx as CanvasRenderingContext2D, isDrawing)
      );
    }
  }, [canvas]);

  return <canvas id="canvas" ref={canvasRef}></canvas>;
};

export default Canvas;
