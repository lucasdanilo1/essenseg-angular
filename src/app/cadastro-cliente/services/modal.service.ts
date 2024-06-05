import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessModalComponent } from '../components/success-modal/success-modal.component';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) { }

  openConfirmationModal() {
    const modalRef = this.modalService.open(SuccessModalComponent, { centered: true });
  }

  openErrorModal(errorMessage: string) {
    const modalRef = this.modalService.open(ErrorModalComponent, { centered: true });
    modalRef.componentInstance.errorMessage = errorMessage;
  }

}
