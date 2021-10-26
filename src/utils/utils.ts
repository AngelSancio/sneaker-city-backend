export class Validations {

    // Validar un numero de telefono
    public validatePhoneNumber(input:string) {
        var phoneno = /^([8]{1}[024]{1}[9]{1}\-)[0-9]{3}-[0-9]{4}$/;
        if(input.match(phoneno)) {
            return true;
        }
        else {
            return false;
        }
    }

    // Validar una cedula
    public validateIdentificationCard(input:string) {
        var id = /^([0-9]{3}\-)[0-9]{7}-[0-9]{1}$/;
        if(input.match(id)) {
            return true;
        }
        else {
            return false;
        }
    }
}