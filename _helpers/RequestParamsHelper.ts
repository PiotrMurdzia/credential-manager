type RequertParamsType = 'body' | 'query';

const returnRequiredParamsErrorMessage = (params: Array<string>, source: RequertParamsType) => `Missing some required ${source.toString()} params ( check: ${params.join(', ')} ).`;

export const checkRequestQueryParamsForDelete = (id_connection: string) => {
    // Check fi required query params exists
    if (!id_connection) {
        throw {
            status: 400,
            body: {
                status: 'Error',
                description: returnRequiredParamsErrorMessage(['id_connection'], 'query')
            }
        };
    }
}

export const checkRequestBodyParamsForCreateOrUpdate = (id_connection: string, password: string) => {
    if (!id_connection || !password) {
        throw {
            status: 400,
            body: {
                status: 'Error',
                description: returnRequiredParamsErrorMessage(['id_connection', 'password'], 'body')
            }
        };
    }
}

export const checkRequestQueryParamsForGetOrRemove = (id_connection: string) => {
    if (!id_connection) {
        throw {
            status: 400,
            body: {
                status: 'Error',
                description: returnRequiredParamsErrorMessage(['id_connection'], 'body')
            }
        };
    }
}
