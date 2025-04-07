import React, { useState } from "react";
import "../styles.css";

const Box = ({ primaryColor, box_side_length }) => {
  // CADA CAJA TENDRÁ SU ESTADO DE COLOR QUE SERÁ ALTERNADO POR LOS EVENTOS DE CLICK, MOUSEENTER Y MOUSELEAVE DE LAS MISMAS
  const [color, setColor] = useState("");
  // EN EL CASO DE HACER CLICK "PINTO" Y "DESPINTO" LA CAJA
  const handleClick = (e) => {
    if (e.which == 1) {
      e.preventDefault();
    } else {
      setColor(color ? "" : primaryColor ? primaryColor : "red");
    }
  };

  // MIENTRAS QUE EN EL MOUSEOVER CHEQUEO SI EL EVENTO SE REALIZA CON EL CLICK IZQUIERDO DEL MOUSE DE ANTES
  const handleColored = (e) => {
    if (e.buttons == 1 || e.buttons == 3) {
      setColor(primaryColor ? primaryColor : "red");
    }
  };

  const handleLeaveClicked = (e) => {
    if (e.buttons == 1 || e.buttons == 3) {
      setColor(primaryColor ? primaryColor : "red");
    }
  };
  return (
    <React.Fragment>
      <span
        className="box"
        onClick={handleClick}
        onMouseLeave={handleLeaveClicked}
        onMouseEnter={handleColored}
        //ES NECESARIO OMITIR EL CASO DEL DRAGSTART YA QUE NO DESEAMOS DETECTAR DICHO EVENTO
        onDragStart={(e) => {
          e.preventDefault();
          return false;
        }}
        style={{
          width: box_side_length,
          height: box_side_length,
          backgroundColor: color,
        }}
      ></span>
    </React.Fragment>
  );
};

export default Box;
