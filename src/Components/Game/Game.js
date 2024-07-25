"use client";

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styles from './Game.module.scss'


const Game = () => {
  const initialGrid = Array.from({ length: 11 }, () => Array(11).fill('u'));

  const [grid, setGrid] = useState(initialGrid);
  const [turn, setTurn] = useState(1)

  const numRows = grid.length;
  const numCols = grid[0].length;

  // Define the possible directions in a hexagonal grid
  const directions = useMemo(() => [
    [-1, 0], [-1, 1], // upper-left, upper-right
    [0, -1], [0, 1],  // left, right
    [1, -1], [1, 0]   // lower-left, lower-right
  ], []);

  // Function to perform DFS for general path checking
  const whiteDFS = useCallback((row, col, visited, targetRow, targetCol) => {
    // Check if the position is out of bounds or not 'r' or already visited
    if (row < 0 || row >= numRows || col < 0 || col >= numCols || grid[row][col] !== 'w' || visited[row][col]) {
      return false;
    }

    // If we've reached the target row or column, a path exists
    if (row === targetRow || col === targetCol) {
      return true;
    }

    // Mark this cell as visited
    visited[row][col] = true;

    // Explore all possible directions
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      if (whiteDFS(newRow, newCol, visited, targetRow, targetCol)) {
        return true;
      }
    }
    
    return false;
  }, [directions, grid, numCols, numRows]);

  const blackDFS = useCallback((row, col, visited, targetRow, targetCol) => {
    // Check if the position is out of bounds or not 'r' or already visited
    if (row < 0 || row >= numRows || col < 0 || col >= numCols || grid[row][col] !== 'b' || visited[row][col]) {
      return false;
    }

    // If we've reached the target row or column, a path exists
    if (row === targetRow || col === targetCol) {
      return true;
    }

    // Mark this cell as visited
    visited[row][col] = true;

    // Explore all possible directions
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      if (blackDFS(newRow, newCol, visited, targetRow, targetCol)) {
        return true;
      }
    }
    
    return false;
  }, [directions, grid, numCols, numRows]);

  // Function to find if there's a path from leftmost to rightmost horizontally
  const hasClearHorizontalPath =  useCallback(() => {
    // Create a visited array
    const visited = Array.from({ length: numRows }, () => Array(numCols).fill(false));

    // Start DFS from each cell in the leftmost column
    for (let row = 0; row < numRows; row++) {
      if (grid[row][0] === 'b' && blackDFS(row, 0, visited, -1, numCols - 1)) {
        return true;
      }
    }
    return false;
  }, [numCols, numRows, blackDFS, grid]);

  // Function to find if there's a path from top to bottom vertically
  const hasClearVerticalPath = useCallback(() => {
    // Create a visited array
    const visited = Array.from({ length: numRows }, () => Array(numCols).fill(false));

    // Start DFS from each cell in the top row
    for (let col = 0; col < numCols; col++) {
      if (grid[0][col] === 'w' && whiteDFS(0, col, visited, numRows - 1, -1)) {
        return true;
      } 

    }
    return false;
  }, [numCols, numRows, whiteDFS, grid]);

  // Function to handle button click to check the horizontal path
  const checkHorizontalPath = useCallback(() => {
    const result = hasClearHorizontalPath();
    console.log(result ? 'Horizontal Path exists!' : 'No horizontal path found.');
  }, [hasClearHorizontalPath]);

  // Function to handle button click to check the vertical path
  const checkVerticalPath =  useCallback(() => {
    const result = hasClearVerticalPath();
    console.log(result ? 'Vertical Path exists!' : 'No vertical path found.');
  }, [hasClearVerticalPath]);

  useEffect(() => {
    checkHorizontalPath();
    checkVerticalPath();
  }, [turn, checkHorizontalPath, checkVerticalPath]);
  // Function to handle cell click to toggle 'u' and 'r'
  // Function to handle cell click to toggle 'u', 'r', and 'b'
  const toggleCell = (rowIndex, colIndex) => {
    setGrid(prevGrid => {
      let cellChanged = false;
    
      const newGrid = prevGrid.map((row, rIdx) => 
        row.map((cell, cIdx) => {
          if (rIdx === rowIndex && cIdx === colIndex) {
            if (cell === 'u') {
              cellChanged = true;
              return turn % 2 === 1 ? 'w' : 'b';
            }
          }
          return cell;
        })
      );
    
      if (cellChanged) {
        setTurn(turn + 1);
      }
    
      return newGrid;
    });
  };

  // const isEdgeHexagon = (rowIndex, colIndex) => {
  //   const isTopRow = rowIndex === 0;
  //   const isBottomRow = rowIndex === numRows - 1;
  //   const isLeftColumn = colIndex === 0;
  //   const isRightColumn = colIndex === numCols - 1;
  
  //   return (
  //     isTopRow || isBottomRow || isLeftColumn || isRightColumn
  //   );
  // };


  return(
    <div className={styles.hexGrid}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.hexRow} style={{ marginLeft: 25 + (33 * rowIndex) }}>
            {row.map((cell, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`} 
                className={`${styles.hex} ${styles[cell === 'w' ? 'hexW' : cell === 'b' ? 'hexB' : 'hexU']}`}
                onClick={() => toggleCell(rowIndex, colIndex)}
              >
                <p>-{rowIndex}-{colIndex}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
  )
}

export default Game