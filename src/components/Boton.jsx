export function Boton({ valor, manejarClick }) {
  return (
    <button className="boton" onClick={() => manejarClick(valor)}>
      {valor}
    </button>
  );
}
