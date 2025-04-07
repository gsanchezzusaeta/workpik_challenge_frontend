import "./styles.css";
import Box from "./components/Box";
import useWindowDimensions from "./hooks/useDimensions";
import { useEffect, useState } from "react";
import ColorPalette from "./components/ColorPalette";

//CANTIDAD REQUERIDA DE FILAS
const ROW_QUANTITY = 100;

export default function App() {
  //UTILIZO HOOK PARA OBTENER LAS DIMENSIONES DE LA PANTALLA PARA EL CALCULO DEL LADO DE LAS CAJAS
  const { width, height } = useWindowDimensions();

  //MANEJO DE LOS ESTADOS NECESARIOS
  const [boxes, setBoxes] = useState({}); // OBJETO QUE ME DICE CANTIDAD TOTAL DE CAJAS Y MEDIDA DE LAS MISMAS
  const [shown, setShown] = useState(false); // BOOLEANO QUE MANEJA LA VISIBILIDAD DE LA PALETA DE COLORES
  const [mousePosition, setMousePosition] = useState([0, 0]); //PAR DE COORDENADAS DE LA POSICIÓN DEL MOUSE
  const [primaryColor, setPrimaryColor] = useState("red"); // STRING DEL COLOR QUE ESTA SIENDO UTILIZADO

  useEffect(() => {
    // CON LAS MEDIDAS DE LA PANTALLA OBTENGO LA MEDIDA DE LADO DE C/ CAJA Y OBTENGO LA CANTIDAD TOTAL A MOSTRAR
    let box_side_length = width / ROW_QUANTITY;
    let col_quantity = height / box_side_length;
    let boxes_total_quantity = ROW_QUANTITY * col_quantity;
    setBoxes({
      boxes_total_quantity: Math.round(boxes_total_quantity),
      box_side_length,
    });
  }, []);

  useEffect(() => {
    // MANEJO DE EVENTO DEL CLICK DERECHO EN LA PANTALLA (actualizo el metodo cada vez que cambio el estado de "show")
    const handleContextMenu = (e) => {
      // MUESTRO/ESCONDO LA PALETA Y ACTUALIZO LA POSICIÓN DEL MOUSE
      if (shown) {
        setShown(false);
      } else {
        setMousePosition([e.pageX, e.pageY]);
        setShown(true);
      }
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [shown]);

  return (
    <div className="App">
      <ColorPalette
        setPrimaryColor={setPrimaryColor}
        shown={shown}
        setShown={setShown}
        position={mousePosition}
      />
      {
        //ITERO POR LA CANTIDAD DE CAJAS A MOSTRAR
        Array(boxes?.boxes_total_quantity)
          .fill("")
          .map((_, index) => (
            <Box
              key={index}
              box_side_length={boxes.box_side_length}
              primaryColor={primaryColor}
            />
          ))
      }
    </div>
  );
}
