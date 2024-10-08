// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserManageService } from '../services/user-manage.service';

// @Component({
//   selector: 'app-user-manage',
//   templateUrl: './user-manage.component.html',
//   styleUrls: ['./user-manage.component.css']
// })
// export class UserManageComponent implements OnInit {
//   users: any[] = [];
//   userForm: FormGroup;
//   editMode = false;
//   currentUserId: number | null = null;

//   constructor(private fb: FormBuilder, private userManageService: UserManageService) {
//     this.userForm = this.fb.group({
//       username: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       user_type: ['client', Validators.required],
//       name: [''],
//       lastName: [''],
//       imagen: [''],
//       balance: [0.00, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
//       dni: [''],
//       phoneNumber: [''],
//       age: [''],
//       gender: ['']
//     });
//   }

//   ngOnInit(): void {
//     this.loadUsers();
//   }

//   loadUsers(): void {
//     this.userManageService.getUsers().subscribe(
//       data => this.users = data,
//       error => console.error(error)
//     );
//   }

//   onSubmit(): void {
//     if (this.userForm.invalid) return;

//     if (this.editMode) {
//       this.userManageService.updateUser(this.currentUserId!, this.userForm.value).subscribe(
//         () => this.loadUsers(),
//         error => console.error(error)
//       );
//     } else {
//       this.userManageService.createUser(this.userForm.value).subscribe(
//         () => this.loadUsers(),
//         error => console.error(error)
//       );
//     }

//     this.resetForm();
//   }

//   onEdit(user: any): void {
//     this.editMode = true;
//     this.currentUserId = user.id;
//     this.userForm.patchValue(user);
//   }

//   onDelete(id: number): void {
//     this.userManageService.deleteUser(id).subscribe(
//       () => this.loadUsers(),
//       error => console.error(error)
//     );
//   }

//   resetForm(): void {
//     this.editMode = false;
//     this.currentUserId = null;
//     this.userForm.reset();
//   }
// }


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

  onSubmit(): void {
    if (this.userForm.invalid) return;
    
    if (this.editMode) {
      console.log(this.userForm.value);
      console.log(this.currentUserId);
      this.userManageService.updateUser(this.currentUserId!, this.userForm.value).subscribe(
        () => this.loadUsers(),
        error => console.error(error)
      );
    } else {
      console.log(this.userForm.value);
      this.userManageService.createUser(this.userForm.value).subscribe(
        () => this.loadUsers(),
        error => console.error(error)
      );
    }

    this.resetForm();
  }

  onEdit(user: any): void {
    this.editMode = true;
    this.currentUserId = user.id;
    this.userForm.patchValue(user);
    console.log(user);
  }

  onDelete(id: number): void {
    this.userManageService.deleteUser(id).subscribe(
      () => this.loadUsers(),
      error => console.error(error)
    );
  }

  resetForm(): void {
    this.editMode = false;
    this.currentUserId = null;
    this.userForm.reset();
  }
}
