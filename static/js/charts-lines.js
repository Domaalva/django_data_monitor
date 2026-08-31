/**
 * Gráfico de respuestas por usuario.
 * Los datos provienen de Django y de la API JSONPlaceholder.
 */

const dataElement = document.getElementById('posts-by-user-data')

if (dataElement) {
  const postsByUser = JSON.parse(dataElement.textContent)

  const labels = Object.keys(postsByUser).map(
    userId => `Usuario ${userId}`
  )

  const values = Object.values(postsByUser)

  const lineConfig = {
    type: 'line',

    data: {
      labels: labels,

      datasets: [
        {
          label: 'Número de respuestas',
          backgroundColor: '#0694a2',
          borderColor: '#0694a2',
          data: values,
          fill: false,
          tension: 0.3,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: true,

      legend: {
        display: true,
      },

      tooltips: {
        mode: 'index',
        intersect: false,
      },

      hover: {
        mode: 'nearest',
        intersect: true,
      },

      scales: {
        x: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Usuarios',
          },
        },

        y: {
          display: true,
          beginAtZero: true,
          scaleLabel: {
            display: true,
            labelString: 'Respuestas',
          },
        },
      },
    },
  }

  const lineCtx = document.getElementById('line')

  if (lineCtx) {
    window.myLine = new Chart(lineCtx, lineConfig)
  }
}