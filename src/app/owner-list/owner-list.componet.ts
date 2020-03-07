import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { async } from '@angular/core/testing';



@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  owners: Array<object> = [];
  selectedOwners = [];
  message: any;

  constructor(private ownerService: OwnerService,
              private router: Router, private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getOwners();
  }

  getOwners() {
    this.ownerService.getAll().subscribe(data => {
      this.owners = data;
    });
  }

  removeOwnersList() {
    this.ownerService.removeList(this.selectedOwners);
    this.selectedOwners = [];
    window.location.reload();
  }

  removeOwners(): void {
    if (this.owners.length > 0 && this.selectedOwners.length > 0) {
      this.owners =  this.owners.filter((own: object) => this.owners.includes(own));
      this.removeOwnersList();
    } else {
      this.message = 'There are no owners left or there are not owners selected';
    }

  }

  getSelectedOwners($event) {
    this.selectedOwners = $event;
  }
}
