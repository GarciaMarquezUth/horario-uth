document.addEventListener("DOMContentLoaded", () => {
  function actualizarEstado() {
    const ahora = new Date();
    const diaSemana = ahora.getDay(); // 1 = Lunes, 2 = Martes, ..., 5 = Viernes
    const hora = ahora.getHours();
    const minutos = ahora.getMinutes();
    const horaDecimal = hora + minutos / 60;

    // Actualizar reloj visual
    const clockEl = document.getElementById("clock-display");
    if (clockEl) {
      clockEl.textContent = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

    // Limpiar resALTADO previo
    document.querySelectorAll(".clase-activa").forEach(el => el.classList.remove("clase-activa"));
    
    const statusTextEl = document.getElementById("status-text");

    // Verificar si es de Lunes a Viernes (1 a 5) y si está dentro del horario escolar (7:00 a 15:00)
    if (diaSemana >= 1 && diaSemana <= 5 && horaDecimal >= 7 && horaDecimal < 15) {
      const filaIndex = Math.floor(horaDecimal) - 7; // Fila 0 es 7:00, fila 1 es 8:00, etc.
      const colIndex = diaSemana; // Columna 1 = Lunes, 2 = Martes, etc.

      const tabla = document.querySelector("table tbody");
      if (tabla && tabla.rows[filaIndex]) {
        const celdaActual = tabla.rows[filaIndex].cells[colIndex];
        
        if (celdaActual) {
          celdaActual.classList.add("clase-activa");
          const contenido = celdaActual.textContent.trim();
          
          if (statusTextEl) {
            statusTextEl.textContent = contenido ? `En clase actual: ${contenido}` : "Hora libre / Receso";
          }
        }
      }
    } else {
      if (statusTextEl) {
        statusTextEl.textContent = "Fuera de horario escolar";
      }
    }
  }

  // Ejecutar al cargar y actualizar cada segundo
  actualizarEstado();
  setInterval(actualizarEstado, 1000);
});