// src/App.tsx
// @ts-nocheck
import React, { useCallback, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Stage, Container, Sprite, Text, Graphics } from '@pixi/react';

const App: React.FC = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const w = window.innerWidth;
  const h = window.innerHeight;

  const drawBoard = useCallback((graphics: React.FC<_ReactPixi.IGraphics>) => {
    graphics.clear();
    graphics.lineStyle(2, 0x000000, 1);
    graphics.beginFill(0x000000)
    for (let i = 1; i <= 2; i++) {
    graphics.drawRoundedRect(i * 100+w/2-150, h/2-250, 3, 300, 100);
    graphics.drawRoundedRect(w/2-150, i * 100+h/2-250, 300, 3, 100);
    }
  }, []);


  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        console.log('winner winner chicken dinner')
        return squares[a];
      }
    }
    return null;
  };
  
  const handleClick = (x: number, y: number) => {
    const index = Math.floor((y+h/2-150) / 100) * 3 + Math.floor((x+w/2-150) / 100)-25
    console.log(x,y)
    console.log(index)
    const squares = [...board];
    console.log(squares)
    if (checkWinner(squares) || squares[index]) {
      return;
    }
    squares[index] = currentPlayer;
    setBoard(squares);
    if(checkWinner(squares)){
      console.log('winner')
    }
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
  };

  return (
    <div>
  
      <Stage width={window.innerWidth} height={window.innerHeight} options={{ backgroundColor: 0xeef1f5 }}  
        onClick={(e) => {
          const x = e.clientX;
          const y = e.clientY;
          if(x>=w/2-150 && x <= 300+w/2-150 && y>=h/2-250 && y<=300+h/2-250)
          handleClick(x, y);
        }}>    
        <Text anchor={0.5} x={w/2} y={50} text={'Player 1:Player 2'}></Text>
        <Text anchor={0.5} x={w/2} y={150} text={currentPlayer}></Text>
          <Graphics draw={drawBoard}>
          </Graphics>
        <Text anchor={0.5} x={w/2} y={h-50} text={'Restart'}></Text>
      </Stage>
    </div>
  );
};

export default App;
