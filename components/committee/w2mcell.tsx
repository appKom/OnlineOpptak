import React, { BaseSyntheticEvent, useState, useEffect } from "react";
import styles from "../../styles/committee.module.css";

interface Props {
  mouseDown: number;
  removeCell: Function;
  addCell: Function;
  date: string;
  time: string;
}

function W2MCell(props: Props) {
  const markedColor = "rgb(177, 215, 180)";
  const unMarkedColor = "#F7F6DC";

  function handleMouseOver(e: BaseSyntheticEvent, ignore?: boolean) {
    if (props.mouseDown || ignore) {
      let div: HTMLDivElement = e.target;
      if (div.style.backgroundColor == markedColor) {
        div.innerText = "";
        div.style.backgroundColor = unMarkedColor;
        props.removeCell([props.date, props.time]);
      } else {
        div.innerText = "x";
        div.style.backgroundColor = markedColor;
        props.addCell([props.date, props.time]);
      }
    }
  }

  return (
    <div
      onMouseEnter={(e) => handleMouseOver(e)}
      onMouseDown={(e) => handleMouseOver(e, true)}
      className={`cell ${styles.cell}`}
    ></div>
  );
}

export default W2MCell;
