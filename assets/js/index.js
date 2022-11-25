let btn = document.getElementById("btn-buscar");
let resultado = document.getElementById("resultado");

btn.addEventListener("click", () => {
  let pesos = document.getElementById("clp").value;
  var cod = document.getElementById("tipos-monedas").value;

  if (pesos !== "") {
    getMoneda(pesos, cod);
  } else {
    alert("Ingrese pesos");
  }
});

async function getMoneda(pesos, cod) {

  const res = await fetch(`https://mindicador.cl/api/${cod}`);
  const data = await res.json();

  resultado.innerHTML = `${(pesos / parseFloat(data.serie[0].valor)).toFixed(
    2
  )} ${data.nombre}`;

  let dias = data.serie.map((e) => e.fecha.slice(8, 10));
  console.log(dias);

  let valores = data.serie.map((e) => e.valor);
  console.log(valores);

  var speedCanvas = document.getElementById("speedChart");

  let speedData = {

    labels: dias.slice(0, 10).reverse(),
    datasets: [
      {
        data: valores.slice(0, 10).reverse(),
        label: "Noviembre",
        pointBackgroundColor: "rgb(75, 192, 192)",
        fill: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)"
      }
    ]
  };

  let lineChart = new Chart(speedCanvas, {
    type: "line",
    data: speedData
  });

}

