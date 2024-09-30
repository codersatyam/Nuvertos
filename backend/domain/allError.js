class AllErrors extends Error {
    constructor(errorCode, errorDescription) {
        super(errorCode);
        this.errorCode = errorCode;
        this.errorDescription = errorDescription;
    }
    getJSONError() {
        return {
            errorCode: this.errorCode,
            errorDescription: this.errorDescription
        }
    }
}
module.exports = {
    AllErrors,
    jsonFieldRequired: (fieldName) => {
        return new AllErrors("jsonFieldMissing",`The required JSON field ${fieldName} is missing`)
    },
}