import cls from 'cls-hooked';
import { Sequelize } from 'sequelize';
import { registerModels } from '../models';
export default class Database {
  constructor(environment, dbConfig) {
    this.environment = environment;
    this.dbConfig = dbConfig;
    this.isTestEnvironment = this.environment === 'test';
  }

  async connect() {
    //Set up the namespace for transactions
    const namespace = cls.createNamespace('transactions-namespace');
    Sequelize.useCLS(namespace);

    //Create the connection
    const { username, password, host, port, database } =
      this.dbConfig[this.environment];
    this.connection = new Sequelize({
      username,
      password,
      host,
      port,
      database,
      dialect,
      logging: this.isTestEnvironment ? false : console.log,
    });

    //Check if the connection is successful
    await this.connection.authenticate({
      logging: false,
    });

    if (!this.isTestEnvironment) {
      console.log('Connection has been established successfully.');
    }

    //Register the models
    registerModels(this.connection);

    //Sync the model
    await this.sync();
  }

  async disconnect() {
    await this.connection.close();
  }

  async sync() {
    await this.connection.sync({
      logging: false,
      force: this.isTestEnvironment,
    });

    if (!this.isTestEnvironment) {
      console.log('Connection synced successfully');
    }
  }
}
