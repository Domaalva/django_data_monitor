/**
 * Gráfico de respuestas por usuario.
 * Los datos provienen de Django y JSONPlaceholder.
 */

const dataElement = document.getElementById('posts-by-user-data')
const lineCtx = document.getElementById('line')

if (dataElement && lineCtx) {
  const postsByUser = JSON.parse(dataElement.textContent)

  const labels = Object.keys(postsByUser).map(function (userId) {
    return 'Usuario ' + userId
  })

  const values = Object.values(postsByUser)

  const lineConfig = {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Número de respuestas',
          backgroundColor: '#0694a2',
          borderColor: '#0694a2',
          borderWidth: 1,
          data: values,
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
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Usuarios',
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              precision: 0,
            },
            scaleLabel: {
              display: true,
              labelString: 'Respuestas',
            },
          },
        ],
      },
    },
  }

  window.myLine = new Chart(lineCtx, lineConfig)
}