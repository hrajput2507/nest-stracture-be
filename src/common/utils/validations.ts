export class Validations {

    public static validateNameLength(name: string): Boolean {
        if(name.length > 2 && name.length < 257) return true;
        return false;
    }
}