import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerService } from '../shared/owner/owner.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit, OnDestroy {
  owners: Array<object> = [];
  owner: any = {};
  message: any;

  sub: Subscription;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private ownerService: OwnerService) { }

  ngOnInit() {
    this.getOwner();
    this.getOwners();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getOwner() {
    this.sub = this.route.params.subscribe(params => {
      const dni = params.dni;
      if (dni) {
        this.ownerService.get(dni).subscribe((owner: any) => {
          if (owner) {
            this.owner = owner[0];
            this.owner.href = owner[0]._links.self.href;
          } else {
            console.log(`Owner with this ${dni} does not exists`);
            this.gotoList();
          }
        });
      }
    });
  }

  getOwners() {
    this.ownerService.getAll().subscribe(data => {
      this.owners = data;
    });
  }

  gotoList() {
    this.router.navigate(['/owner-list']);
  }

  repeatedDni(dni: string): boolean {
    for (const element of this.owners) {
      if (dni === element.dni) {
        return true;
      }
    }
    return false;
  }
  save(form: NgForm) {
    if (! this.repeatedDni(form['dni'])) {
      this.ownerService.save(form).subscribe(result => {
        this.gotoList();
      }, error => console.error(error));
      this.getOwners();
    } else {
      window.alert('There is already an owner with that dni');
    }
  }

  remove(dni) {
    this.ownerService.remove(dni).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

}
