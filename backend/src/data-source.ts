// import "reflect-metadata";
// import { DataSource } from "typeorm";
// import { User } from "./models/User"; 
// import { Weather } from "./models/Weather"; 
//
// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: "localhost",
//   port: 5433,
//   username: "user",
//   password: "password",
//   database: "clima",
//   synchronize: true,
//   logging: true,
//   entities: [User, Weather],
// });

    import "reflect-metadata";
    import { DataSource } from "typeorm";
    import { User } from "./models/User";
    import { Weather } from "./models/Weather";
    // Clase Singleton para la instancia de DataSource
    class AppDataSourceSingleton {
      // Variable estática para almacenar la única instancia de DataSource
      private static instance: DataSource;

      // Constructor privado para impedir instancias directas
      private constructor() {}

      // Método estático para obtener la única instancia de DataSource
        // Método estático para obtener la única instancia de DataSource
  public static getInstance(): DataSource {
    if (!AppDataSourceSingleton.instance) {
      AppDataSourceSingleton.instance = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5433,
        username: "user",
        password: "password",
        database: "clima",
        synchronize: true,
        logging: true,
        entities: [User, Weather],
      });
    }

    return AppDataSourceSingleton.instance;
  }
}

// Exportar la instancia para usarla en toda la app
export const AppDataSource = AppDataSourceSingleton.getInstance();