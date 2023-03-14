const sendError = (text = "", id = "") => {
  let msg = text;
  if (!msg) {
    msg =
      id && id !== 24
        ? "El identificador enviado no es correcto"
        : "Hable con el administrador";
  }
  return {
    ok: false,
    msg,
  };
};

const sendSuccess = (msg) => ({
  ok: true,
  msg,
});

module.exports = {
  sendError,
  sendSuccess,
};
