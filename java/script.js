function updateTime() {
  const timeDisplay = document.getElementById("timeDisplay")
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  const seconds = String(now.getSeconds()).padStart(2, "0")
  timeDisplay.textContent = `${hours}:${minutes}:${seconds}`
}

setInterval(updateTime, 1000)
updateTime()

function updateDate() {
  const dateElement = document.getElementById("dateDisplay")
  const now = new Date()

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }

  dateElement.textContent = now.toLocaleDateString("id-ID", options)
}

updateDate()

document
  .getElementById("closeNotification")
  .addEventListener("click", function () {
    var pemberitahuan = document.getElementById("pemberitahuan")
    var peb1 = document.getElementById("peb1")
    var tombolX = document.querySelector(".tombolX")
    var header = document.querySelector(".header-mad-nav")
    pemberitahuan.classList.add("hidden")
    peb1.classList.add("hidden")
    tombolX.classList.add("hidden")
    header.classList.add("reposition")
  })

document.addEventListener("DOMContentLoaded", () => {
  const toggleInput = document.querySelector('input[type="checkbox"]')

  const adjustTheme = () => {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    const body = document.body

    toggleInput.checked = isDarkMode

    if (isDarkMode) {
      body.classList.add("dark-mode")
    } else {
      body.classList.remove("dark-mode")
    }
  }

  adjustTheme()

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      const isDarkMode = e.matches
      const body = document.body

      toggleInput.checked = isDarkMode

      if (isDarkMode) {
        body.classList.add("dark-mode")
      } else {
        body.classList.remove("dark-mode")
      }
    })

  toggleInput.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", toggleInput.checked)

    localStorage.setItem("theme", toggleInput.checked ? "dark" : "light")
  })
})
