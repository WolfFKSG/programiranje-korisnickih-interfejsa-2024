import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatInputModule, MatCardModule, RouterLink, MatButtonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public email: string = ''
  public name: string = ''
  public password: string = ''
  public confirmPassword: string = ''
  private userService: UserService

  public constructor(private router: Router, private route: ActivatedRoute) {
    this.userService = UserService.getInstance()
  }

  public updateEmail(e: any) {
    this.email = e.target.value
  }

  public updateName(e: any) {
    this.name = e.target.value
  }

  public updatePassword(e: any) {
    this.password = e.target.value
  }

  public updateConfirmPassword(e: any) {
    this.confirmPassword = e.target.value
  }

  public doSignup() {
    if (this.email == '') return
    if (this.name == '') return
    if (this.password == '') return
    if (this.confirmPassword == '') return
    if (this.password != this.confirmPassword) {
      alert('passwords dont match')
      return
    }

    try {
      this.userService.createUser({
        email: this.email,
        name: this.name,
        password: this.password,
        booked: []
      })
    } catch (e) {
      alert(e)
      return
    }

    this.router.navigate(['/login'], {
      relativeTo: this.route
    })
  }
}
