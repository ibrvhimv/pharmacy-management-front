import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductData } from '../../produit.interface';
import { CreationAccountService } from '../creation-account.service';
import { NavigationExtras, Router ,RouterModule} from '@angular/router';
import { UserData } from '../../user.interface';
import { Panier } from '../../panier.interface';
@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent 
{

  response: any;
  produits: ProductData[] = [];
  user!: UserData;
  panier!:Panier;
  constructor(
    private creationAccount : CreationAccountService,
    private router: Router
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
      this.creationAccount.getProducts().subscribe
      (
        response=>{
          console.log('Succes',response);
          this.produits=response;
        }
      )
      this.creationAccount.getPanierById(this.user.id).subscribe
      (
        response=>{
          this.panier=response;
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
  addProduct(productId: number) {
    this.creationAccount.addProduct(productId,1,this.panier.id).subscribe({
      next: (response) => alert('Produit ajouté avec succès'),
      error: (error) => alert('Erreur lors de l\'ajout au panier'),
    });
  }
}
