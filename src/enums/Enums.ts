export const enum Profile{
    CONTRATANTE,
    DIARISTA
}

export const enum Error{
    DATABASE_ERROR = 'Erro ao consultar base de dados'
}

export const enum StatusCode{
    OK = 200,
    INTERNAL_SERVER_ERROR = 500,
    NOT_FOUND = 404,
    FORBIDDEN = 403
}