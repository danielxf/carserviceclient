import {of} from 'rxjs';
import { Observable } from 'rxjs';


export class CommunicatorService {

public value: any = 4;

communicateValue(): Observable <any> {
    return of(this.value);
  }
}
