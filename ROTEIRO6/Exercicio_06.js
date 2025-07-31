const crypto = require("crypto");

const chave_secreta = "uma_chave_secreta";

const gerarChave = (chaveSecreta) => {
  return crypto.createHash("sha256").update(chaveSecreta).digest();
};

// Criptografia de dados
const criptografarMensagem = (texto, chaveSecreta) => {
  const algorithm = "aes-256-cbc";
  const iv = crypto.randomBytes(16);
  const key = gerarChave(chaveSecreta);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(texto, "utf8", "hex");
  encrypted += cipher.final("hex");
  // Retorna o IV junto com o texto criptografado
  return `${iv.toString("hex")}:${encrypted}`;
};

// Função para descriptografar dados
const decritografar = (textoCriptografado, chaveSecreta) => {
  const algorithm = "aes-256-cbc";
  const [ivHex, encrypted] = textoCriptografado.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const key = gerarChave(chaveSecreta);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const criptografaPares = (numeros) => {
  const numeros_pares = numeros.filter((num) => num % 2 == 0);
  const numeros_criptografados = numeros_pares.map((num) =>
    criptografarMensagem(num.toString(), chave_secreta)
  );
  return numeros_criptografados;
};

const processarNumeros = (numeros, callbackFunction) => {
  return callbackFunction(numeros);
};

console.log(processarNumeros(numeros, criptografaPares));
