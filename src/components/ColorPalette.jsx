const ColorPalette = ({ setPrimaryColor, shown, setShown, position }) => {
  // COLORES DISPONIBLES
  const colors = ["red", "blue", "cyan", "yellow", "green"];
  return (
    <div
      className={`palette ${shown ? "visible" : "hidden"}`}
      style={{
        left: position[0],
        top: position[1],
        tranform: "translateX(-50%)",
        transform: "translateY(-50%)",
      }}
    >
      {
        //ITERO POR LOS COLORES DISPONIBLES
        colors.map((color, index) => (
          <span
            key={index}
            onClick={() => {
              setPrimaryColor(color);
              setShown(false);
            }}
            style={{ backgroundColor: color }}
          ></span>
        ))
      }
    </div>
  );
};

export default ColorPalette;
