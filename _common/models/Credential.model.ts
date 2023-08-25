import * as AzureStorage from 'azure-storage';
import { ErrorLogs } from './ErrorLogs.model';
import { v4 as uuidv4 } from 'uuid';
import { CONNECTION_STRING, TABLE_NAME } from '../parameters/EnvParameters';

export default class Credential {
    private static table_name = TABLE_NAME;
    private static connection_string = CONNECTION_STRING;
    private static table_service = AzureStorage.createTableService(this.connection_string);

    /**
     * Create new object
     * @param {string} password - Password
     * @param {string} id_entity - Client id_entity
     * @return {void} - Return void
     **/
    static create = async (password: string, id_entity: string) => {
        const uuid = uuidv4();

        // Create an entity object
        const object = {
            RowKey: uuid,
            PartitionKey: uuid,
            password: password,
            id_entity: id_entity,
            created_at: new Date().toISOString()
        };

        // Create object
        await new Promise((resolve, reject) => {
            this.table_service.insertEntity(this.table_name, object, function (error, result, response) {
                if (error) {
                    ErrorLogs.insert({}, `Problem when trying to create new object: ${error}`, '--- Create ---');

                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    }

    /**
     * Get object
     * @param {string} id_entity - Client id_entity
     * @return {object} - Return object from DB
     **/
    static get = async (id_entity: string) => {
        // Define the query
        const query = new AzureStorage.TableQuery().where('id_entity eq ?', id_entity);

        // Get objects from DB
        const results: any = await new Promise((resolve, reject) => {
            this.table_service.queryEntities(this.table_name, query, null, (error, result) => {
                if (error) {
                    ErrorLogs.insert({}, `Problem when trying to get object: ${error}`, '--- Get ---');

                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });

        return results.entries[0];
    }

    /**
     * Update object
     * @param {object} entity - Object from DB
     * @return {void} - Return void
     **/
    // TODO: Add interfaces
    static update = async (entity: any) => await new Promise((resolve, reject) => {
        this.table_service.replaceEntity(this.table_name, entity, (error, result) => {
            if (error) {
                ErrorLogs.insert({}, `Problem when trying to update object: ${error}`, '--- Update ---');

                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });

    /**
     * Delete object from DB
     * @param {object} entity - DB entity
     * @param {string} row_key - Row Key
     * @return {void} - Return void
     **/
    static delete = async (entity: object) => await new Promise((resolve, reject) => {
        this.table_service.deleteEntity(this.table_name, entity, (error, response) => {
            if (error) {
                ErrorLogs.insert({}, `Problem when trying to remove object: ${error}`, '--- Remove ---');

                reject(error);
            }
            else {
                resolve(response);
            }
        });
    });
}
