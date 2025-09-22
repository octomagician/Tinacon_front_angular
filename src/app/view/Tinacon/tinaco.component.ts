import { Component, OnInit } from '@angular/core'; 
import { RouterModule } from '@angular/router';
import { RectangleRowsComponent } from '../../Components/rectangle-rows/rectangle-rows.component';
import { RectangleRowsNewItemComponent } from '../../Components/rectangle-rows-new-item/rectangle-rows-new-item.component';
import { CommonModule } from '@angular/common';
import { Tinacos } from '../../Interface/Tinacon/tinacos';
import { TinacoService } from '../../Services/tinaco/tinaco.service';
import { LoadingSkeletonComponent } from '../../Components/loading-skeleton/loading-skeleton.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '../../Components/modal/modal.component';

import { CardHoverComponent } from '../../Components/card-hover/card-hover.component';

@Component({
  selector: 'app-tinaco',
  standalone: true,
  imports: [ModalComponent, CardHoverComponent,ReactiveFormsModule, RouterModule, RectangleRowsComponent, RectangleRowsNewItemComponent, CommonModule, LoadingSkeletonComponent],
  templateUrl: './tinaco.component.html',
  styleUrls: ['./tinaco.component.css']
})

export class TinacoComponent implements OnInit {
  tinacos: Tinacos[] = [];
  isModalOpen = false;
  isLoading: boolean = true;
  // Formularios reactivos
  tinacoForm: FormGroup;
  // Mensajes de feedback
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private tinacoService: TinacoService) {
    // Formulario para agregar tinaco
    this.tinacoForm = new FormGroup({
      name: new FormBuilder().control('', [Validators.required, Validators.maxLength(50)])
    });
  }

  openModalNuevo(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    // Limpia mensajes de feedback
    this.successMessage = null;
    this.errorMessage = null;
    // Limpia formularios
    this.tinacoForm.reset();
    //obtenemos los datos actuales
    this.ngOnInit();
  }

  postTinaco(): void {
    // Check if the form is valid before trying to post
    if (this.tinacoForm.valid) {
      // Get the form's value, which is an object with a 'nombre' key
      const tinacoData = this.tinacoForm.value;
  
      this.tinacoService.postTinaco(tinacoData).subscribe({
        next: (response: any) => {
          // Handle a successful response from the backend
          this.successMessage = 'Tinaco creado correctamente.';
          this.errorMessage = null; // Clear any previous error messages
          this.tinacoForm.reset();
          this.ngOnInit(); // Refresh the list of tinacos
        },
        error: (error) => {
          // Handle an error response from the backend
          // This is where you would display the error message
          this.successMessage = null; // Clear any previous success message
          this.errorMessage = 'Hubo un error al crear el tinaco.';
          
          // Check for specific validation errors from Laravel
          if (error.error && error.error.errors && error.error.errors.nombre) {
            this.errorMessage = error.error.errors.nombre[0];
          }
        }
      });
    } else {
      // The form is not valid, display an error message to the user
      this.errorMessage = 'Por favor, llena el nombre del tinaco.';
    }
  }

  ngOnInit(): void {
    this.tinacoService.getTinacos().subscribe({
      next: (response: any) => {
        this.tinacos = response;
        this.isLoading = false;
        //console.log('Tinacos:', response);
      },
      error: (error) =>{
        //console.error('Error al obtener datos del usuario', error),
      }
    });
  }
  toggleTinaco(t: Tinacos): void {
    t.nivel_del_agua = t.nivel_del_agua > 0 ? 0 : 100;
  }
}
