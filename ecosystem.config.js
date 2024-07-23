module.exports = {
    apps: [
      {
        name: "apifull",
        script: "src/app.ts",
        watch: true,
        interpreter: "node",
        interpreter_args: "--loader ts-node/esm", // Permite rodar arquivos TypeScript diretamente
        env: {
          NODE_ENV: "development",
        },
        env_production: {
          NODE_ENV: "production",
        }
      }]
  };
  