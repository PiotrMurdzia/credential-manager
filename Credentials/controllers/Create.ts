import { HttpRequest } from "@azure/functions";
import { checkRequestBodyParamsForCreateOrUpdate } from "../../_helpers/RequestParamsHelper";
import Credential from '../../_common/models/Credential.model';
import { Password } from '../models/Password';

export const create = async (req: HttpRequest) => {
    const { uuid, password } = req.body;

    try {
        // Chack body params
        checkRequestBodyParamsForCreateOrUpdate(uuid, password);

        // Check if row with uuid already exists
        const response_from_db = await Credential.get(uuid);

        if (response_from_db) {
            return {
                status: 409,
                body: {
                    status: 'Fail',
                    description: 'Resource with the provided UUID already exists.'
                }
            };
        }

        const encrypt_password = Password.encryptPassword(password);

        await Credential.create(encrypt_password, uuid);
    }
    catch (error) {
        return {
            status: 500,
            body: {
                status: 'Error',
                description: 'An unexpected error occurred. Please try again later.'
            }
        };
    }

    return {
        status: 201,
        body: {
            status: 'OK',
            description: 'New resource created successfully.'
        }
    };
}
