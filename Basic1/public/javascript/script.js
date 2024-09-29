document.body.setAttribute("theme", "light");

function toggleTheme() {
  const body = document.body;
  const theme = body.getAttribute("theme");
  const light = document.getElementById("light-theme");
  const dark = document.getElementById("dark-theme");

  if (theme === "light") {
    body.setAttribute("theme", "dark");
    light.style.display = "none";
    dark.style.display = "block";
  } else {
    body.setAttribute("theme", "light");
    light.style.display = "block";
    dark.style.display = "none";
  }
}
