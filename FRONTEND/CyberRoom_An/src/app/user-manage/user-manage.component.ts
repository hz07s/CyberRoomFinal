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

  constructor(private fb: FormBuilder, private userManageService: UserManageService) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      user_type: ['client', Validators.required],
      name: [''],
      lastName: [''],
      imagen: [''],
      balance: [0.00, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      dni: [''],
      phoneNumber: [''],
      age: [null, Validators.pattern(/^\d+$/)],
      gender: ['']
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    console.log(this.users.length);
  }

  loadUsers(): void {
    this.userManageService.getUsers().subscribe(
      data => this.users = data,
      error => console.error(error)
    );
  }

}
