const btnEs = document.getElementById("btn-es");
const btnEn = document.getElementById("btn-en");
const body = document.body;

btnEs.addEventListener("click", () => {
  body.classList.remove("lang-en-active");
  body.classList.add("lang-es-active");
});

btnEn.addEventListener("click", () => {
  body.classList.remove("lang-es-active");
  body.classList.add("lang-en-active");
});
