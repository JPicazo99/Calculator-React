import { useState } from 'react';
import { Boton } from './components/Boton';
import { Pantalla } from './components/Pantalla';
import './App.css';

const botones = [
  "sin", "cos", "tan", "√",
  "(", ")", "log", "^",
  "7", "8", "9", "/",
  "4", "5", "6", "*",
  "1", "2", "3", "-",
  "0", ".", "=", "+",
  "⌫", "C"
];

export default function App() {
  const [entrada, setEntrada] = useState("");
  const [modoOscuro, setModoOscuro] = useState(false);

  const manejarClick = (valor) => {
    if (valor === "=") {
      try {
        const entradaModificada = entrada
          .replace(/sin\(([^)]+)\)/g, (_, x) => `Math.sin((${x}) * Math.PI / 180)`)
          .replace(/cos\(([^)]+)\)/g, (_, x) => `Math.cos((${x}) * Math.PI / 180)`)
          .replace(/tan\(([^)]+)\)/g, (_, x) => `Math.tan((${x}) * Math.PI / 180)`)
          .replace(/log\(/g, "Math.log10(")
          .replace(/√/g, "Math.sqrt")
          .replace(/\^/g, "**"); // soporte para potencia

        setEntrada(eval(entradaModificada).toString());
      } catch {
        setEntrada("Error");
      }
    } else if (valor === "C") {
      setEntrada("");
    } else if (valor === "⌫") {
      setEntrada((prev) => prev.slice(0, -1));
    } else {
      setEntrada((prev) => prev + valor);
    }
  };

  return (
    <div className={`contenedor-pagina ${modoOscuro ? "oscuro" : ""}`}>
      <div className="encabezado">
        React Calculator. Project by Joel Picazo
        <button className="modo-btn" onClick={() => setModoOscuro(!modoOscuro)}>
          {modoOscuro ? "☀️" : "🌙"}
        </button>
      </div>

      <div className="calculadora">
        <Pantalla valor={entrada} />
        <div className="botones">
          {botones.map((b, i) => (
            <Boton key={i} valor={b} manejarClick={manejarClick} />
          ))}
        </div>
      </div>
    </div>
  );
}
