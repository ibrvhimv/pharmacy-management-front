import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreationAccountService } from '../creation-account.service';
import { NavigationExtras, Router ,RouterModule} from '@angular/router';
import { UserData } from '../../user.interface'
import { FactureData } from '../../facture.interface';
@Component({
  selector: 'app-factures',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './factures.component.html',
  styleUrl: './factures.component.css'
})
export class FacturesComponent {

  response: any;
  user!: UserData;
  facture!: FactureData;
  constructor(
    private router: Router,
    private createAccount:CreationAccountService
  ){
    const currentNavigation = this.router.getCurrentNavigation();
    this.response = currentNavigation?.extras.state?.['response'];
  }
  ngOnInit(): void 
  {
    if(this.response==null ||this.response==undefined)
    {
      this.router.navigate(['/con'])
    }
    else{
      this.user = this.response;
      this.createAccount.getFacture(this.user.id).subscribe(
        res=>{
          this
          this.facture=res;
          console.log(this.facture);
        }
      )
    }
  }
  naviguerAvecExtras(route: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        response: this.user
      }
    };
    this.router.navigate([route], navigationExtras);
  }
  
}
