window.addEventListener("load", async () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./sw.js")
      .then(() => console.log("Зарегистрировали"))
      .catch(() => console.log("Получилась ошибка"));
  }
});
