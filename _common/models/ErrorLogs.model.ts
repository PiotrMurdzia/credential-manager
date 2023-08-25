import * as AzureStorage from 'azure-storage';
import { v4 as uuidv4 } from 'uuid';
import { CONNECTION_STRING } from '../parameters/EnvParameters';

export class ErrorLogs {
    private static _table_name = 'errorLogs';
    private static _connection_string = CONNECTION_STRING;
    private static _table_service = AzureStorage.createTableService(this._connection_string);

    /**
     * Insert object into the table
     * @param {object} data - Object to insert
     * @param {string} message - Message
     * @param {string} tag - Tag
     * @return {void} - Return void
     **/
    public static insert = async (data: object, message: string, tag: string) => {
        const uuid = uuidv4();

        console.log("------------------------ insert errorLogs")

        // Create an entity object
        const object = {
            tag,
            RowKey: uuid,
            message: message,
            PartitionKey: uuid,
            data: JSON.stringify(data),
            created_at: new Date().toISOString()
        };

        // Insert the entity into the table
        this._table_service.insertEntity(this._table_name, object, function (error, result, response) {
            if (!error) {
                console.log('Entity inserted successfully')
            }
            else {
                console.log('---- error ----', error)
            }
        });

        return;
    }
}
