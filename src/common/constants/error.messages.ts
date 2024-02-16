export class ErrorMessages {
    static errorMessage(
        message: string,
        httpStatus: number,
        customErrorNumber: number
      ) {
        return {
          timestamp: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
          message: message,
          httpStatus: httpStatus,
          customErrorNumber: customErrorNumber,
        };
    };
    static uuidErr(id: string) {
      return {
        timestamp: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
        message: `invalid id ${id}`,
        httpStatus: 400,
        customErrorNumber: -3,
      };
    }
    public static systemError: any = {
      invalidRequest: this.errorMessage("Invalid Request", 401, 0),
      oopsSomethingWentWrong: this.errorMessage("Oops! Something went wrong", 500, -1),
      externalProviderIssue: this.errorMessage("External Provider issue!", 401, -2),
      dbError: this.errorMessage("db Error", 400, -3),
      invalidApiKey: this.errorMessage("Invalid api key", 400, -4),
      notAvailable: this.errorMessage("Currenctly we are not availble in your country Please contact support team.", 500, -5)
    }; // -1000000 to 99999
  
}