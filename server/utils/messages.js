module.exports = {
    error: {
        BAD_REQUEST: {
            statusCode: 400,
            code: "Bad Request",
            message: "The request body contains bad syntax or is incomplete."
        },
        DUPLICATE_KEY: {
            statusCode: 400,
            code: "Bad Request",
            message: "The request body contains a field that already exists in DB."
        },
        DOCUMENT_DOES_NOT_EXIST: {
            statusCode: 404,
            code: "Not Found",
            message: "The request doesn't contain a valid document id or the document doesn't exist."
        },
        USER_NOT_FOUND: {
            statusCode: 404,
            code: "Not Found",
            message: "User not found."
        },
    },
    success: {
        USER_REGISTER_SUCCESS: "Congratulations you've been registered successfully.",
        AGREEMENT_CREATION_SUCCESS: "Agreement created successfully.",
        BILL_CREATION_SUCCESS: "Bill generated successfully.",
        RECORD_CREATION_SUCCESS: "Hospilatization record created successfully.",
        RECORD_UPDATION_SUCCESS: "Hospilatization record updated successfully.",
        POLICY_CREATION_SUCCESS: "Policy created successfully.",
        PROCEDURE_CREATION_SUCCESS: "Procedure created successfully."
    }
}