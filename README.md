# CarServiceClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Owner Service

Este servicio se encarga de obtener los acercar de los dueños, se hizo necesario este servicio debido a que los componentes Owner-List y Owner-Edit necesitaban cierta información de todos los dueños para realizar operaciones.

### API'S consumidas:

OWNER_API:= //thawing-chamber-47973.herokuapp.com/owners', esta api se uso en una peticion http con el objetivo de obtener el arreglo de dueños, luego este arreglo se retornaria como un observable para ser usado en Owner-List y Owner-Edit.

Está Api se uso también con el objetivo de guardar algun nuevo dueño ingresado en a la lista de owners.

API_SEARCH:= //thawing-chamber-47973.herokuapp.com/search/findByDni?dni=', esta api se uso con el objetivo de facilitar la busqueda de un dueño.

### Funciones 

getall() -> Esta fución retorna solo la lista de dueños, de la API OWNER_API.
save() -> Guarda el owner ingresado y retorna un observable del resultado de guardado.

### Metodos
removeList() -> Recibe una lista con los DNI de los dueños que se desean eliminar.

## Owner-List Component

Este componente se hizo con la idea de representar visualmente la lista de dueños y con la idea de hacer algunas operaciones sobre ella.

Tiene tres atributos: 
owners: Array<object> := lista logica de los dueños.
selectedOwners := lista logica de los dueños que se seleccionaron.
message: any := mensaje para avisar si algún problema ocurrio.

### Metodos
getOwners() -> usar el servicio de owner service con el objetivo de asignar al atributo owners la lista de owners que se encuentran en OWNER_API.

removeOwnersList() -> hace uso del servicio de ownser service para borrar la lista de dueños seleccionados, una vez finalizada la eliminación, "limpia" la lista de selectedOwners.

removeOwners() -> si hay dueños para borrar y se selecciono al menos un dueño, filtra la lista de owners y se queda con aquellos que no estan en la lista de selectedOwners.

getSelectedOwners($event) -> Metodo asociado con la selección de dueños para borrar, cuando se da delete le asigna los dueños seleccionados a selectedOwners

## Owner-Edit-Component

Este componente se hizo con la idea de tener una forma visual de realizar operaciones de agregación, edición.

Atributos
owners: Array<object> = [] := Lista logica de los dueños.
owner: any = {} := Dueño representado con  un Json
sub: Subscription
 
### Metodos
getOwners() -> usar el servicio de owner service con el objetivo de asignar al atributo owners la lista de owners que se encuentran en OWNER_API.

save(form: NgForm) -> guarda el formulario, para guardar espacio y evitar repetir dueños se restringio los dni de los owner para que fueran únicos, si se trata de guardar un owner con el mismo dni, no lo permitira, solo en el caso que se edite un dueño se permitira un mismo dni.

### Funciones 
repeatedDni(dni: string): boolean -> retorna un boolean para saber si el dni esta ya en owners.

## Cambios a car-list

El cambio mas relevante fue hacer que se pudiera visualizar el dni del dueño junto con el auto.
