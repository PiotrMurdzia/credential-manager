type RequertParamsType = 'body' | 'query';

const returnRequiredParamsErrorMessage = (params: Array<string>, source: RequertParamsType) => `Missing some required ${source.toString()} params ( check: ${params.join(', ')} ).`;

export const checkRequestQueryParamsForDelete = (id_entity: string) => {
    // Check fi required query params exists
    if (!id_entity) {
        throw {
            status: 400,
            body: {
                status: 'Error',
                description: returnRequiredParamsErrorMessage(['id_entity'], 'query')
            }
        };
    }
}

export const checkRequestBodyParamsForCreateOrUpdate = (uuid: string, password: string) => {
    if (!uuid || !password) {
        throw {
            status: 400,
            body: {
                status: 'Error',
                description: returnRequiredParamsErrorMessage(['uuid', 'password'], 'body')
            }
        };
    }
}

export const checkRequestQueryParamsForGetOrRemove = (uuid: string) => {
    if (!uuid) {
        throw {
            status: 400,
            body: {
                status: 'Error',
                description: returnRequiredParamsErrorMessage(['uuid'], 'body')
            }
        };
    }
}
