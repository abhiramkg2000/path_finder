import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import {
  DEFAULT_BOX_COLOR,
  SELECTED_BOX_COLOR,
  PATH_BOX_COLOR,
  WHITE,
  BLACK,
} from "../../constants/constants";
import { BoxItemType } from "../../types/types";

import "./customBox.css";

type CustomBoxProps = {
  index: number;
  item: BoxItemType;
  setGridBoxes: React.Dispatch<React.SetStateAction<BoxItemType[][]>>;
  gridSize: number;
  selectedBoxes: BoxItemType[];
  setSelectedBoxes: React.Dispatch<React.SetStateAction<BoxItemType[]>>;
  pathArray: BoxItemType[];
};

const CustomBox = ({
  index,
  item,
  setGridBoxes,
  gridSize,
  selectedBoxes,
  setSelectedBoxes,
  pathArray,
}: CustomBoxProps) => {
  const boxTextColor = item.color === SELECTED_BOX_COLOR ? WHITE : BLACK;
  const boxWidth = 1 / gridSize;
  const boxHeight = 1 / gridSize;
  const handleClick = () => {
    // let selectedBoxes: BoxItemType[] = [];
    // selected.forEach((row) => {
    //   row.forEach((item) => {
    //     if (item.clicked) {
    //       selectedBoxes = [...selectedBoxes, item];
    //     }
    //   });
    // });
    const isBoxSelected = selectedBoxes.some(
      (box) => parseInt(box.i + "" + box.j) === index
    );

    if (selectedBoxes.length < 2 && !isBoxSelected) {
      // console.log("if working");
      setGridBoxes((prev) => {
        const formattedArray = prev.map((row, i) => {
          return row.map((item, j) => {
            if (parseInt(i + "" + j) === index) {
              return {
                ...item,
                clicked: !item.clicked,
                color: SELECTED_BOX_COLOR,
              };
            }
            return item;
          });
        });
        return formattedArray;
      });
      setSelectedBoxes((prev) => {
        // console.log("prev1", prev, item);
        return [
          ...prev,
          {
            ...item,
            clicked: !item.clicked,
            color: SELECTED_BOX_COLOR,
          },
        ];
      });
    } else {
      // console.log(
      //   "else working",
      //   selectedBoxes.filter((box) => parseInt(box.i + "" + box.j) === index)
      // );
      if (isBoxSelected) {
        setGridBoxes((prev) => {
          const formattedArray = prev.map((row, i) => {
            return row.map((item, j) => {
              if (parseInt(i + "" + j) === index) {
                return {
                  ...item,
                  clicked: !item.clicked,
                  color: DEFAULT_BOX_COLOR,
                };
              }
              return item;
            });
          });
          return formattedArray;
        });
        setSelectedBoxes((prev) => {
          // console.log(
          //   "prev2",
          //   prev.filter((box) => parseInt(box.i + "" + box.j) !== index)
          // );
          return prev.filter((box) => parseInt(box.i + "" + box.j) !== index);
        });
      }
    }
  };

  useEffect(() => {
    // console.log(index);

    //to check if the box is present in the pathArray
    const isBoxSelected = pathArray
      .slice(1, -1)
      .some((box) => parseInt(box.i + "" + box.j) === index);

    let timeoutId = 0;

    if (isBoxSelected) {
      timeoutId = setTimeout(() => {
        // Change the background color after the specified delay
        setGridBoxes((prev) => {
          const formattedArray = prev.map((row, i) => {
            return row.map((item, j) => {
              if (parseInt(i + "" + j) === index) {
                return {
                  ...item,
                  color: PATH_BOX_COLOR, // Change to the desired color
                };
              }
              return item;
            });
          });
          return formattedArray;
        });
      }, pathArray.findIndex((item) => parseInt(item.i + "" + item.j) === index) * 500); // Set the delay in milliseconds (e.g., 2000ms for 2 seconds)

      // Cleanup the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [index, pathArray, setGridBoxes]);

  return (
    <Grid
      item
      xs={1}
      className="grid_item"
      sx={{
        backgroundColor: item.color,
        color: boxTextColor,
        width: `${boxWidth * 100}px`,
        height: `${boxHeight * 400}px`,
      }}
      onClick={handleClick}
    >
      <Box className="box">
        {item.i}
        {item.j}
      </Box>
    </Grid>
  );
};

export default CustomBox;
