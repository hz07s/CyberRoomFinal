import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManageService } from '../services/user-manage.service';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css']
})
export class UserManageComponent implements OnInit {
  users: any[] = [];
  userForm: FormGroup;
  editMode = false;
  currentUserId: number | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
