import { Component, OnInit  } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SetRbtService } from 'src/app/services/set-rbt.service';

@Component({
  selector: 'app-set-rbt',
  templateUrl: './set-rbt.component.html',
  styleUrls: ['./set-rbt.component.scss']
})
export class SetRbtComponent {
 mobileNumber = '';
searchText = '';
showSubscriberInfo = false;
showCatalogPopup = false;
showSuccessPopup = false;

servicePackage = 'TSUBM';

subscriber = {
   mobile: '',
  status: '',
  packName: '',
  toneName: '',
  message: ''

};
  selectedTone: any = null;

  toneList: any[] = [];
  constructor(
    private setRbtService: SetRbtService,
   private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.loadCatalog();
  }
  filteredToneList(): any[] {

  if (!this.searchText) {
    return this.toneList;
  }

  const search = this.searchText.toLowerCase();

  return this.toneList.filter(tone =>
      tone.toneName?.toLowerCase().includes(search) ||
      tone.toneCode?.toLowerCase().includes(search) ||
      tone.category?.toLowerCase().includes(search)
  );
}

  loadCatalog(): void {

    this.setRbtService.getCatalog()
      .subscribe({
        next: (response) => {

          this.toneList = response;

        },
        error: (error) => {

          console.error(error);

        }
      });
  }
  verifySubscriber(): void {

  this.dashboardService
    .getSubscriber(this.mobileNumber)
    .subscribe({

      next: (response) => {

        this.subscriber = {
          mobile: response.msisdn,
          status: response.status === 1 ? 'ACTIVE' : 'INACTIVE',
          packName:
          response.packName === 'TSUBD'
            ? 'DASHBOARD.DAILY'
            : response.packName === 'TSUBW'
            ? 'DASHBOARD.WEEKLY'
            : response.packName === 'TSUBM'
            ? 'DASHBOARD.MONTHLY'
            : response.packName,
          toneName: response.toneName,
          message: 'Existing user. Select a new tone.'
        };

        this.showSubscriberInfo = true;
      },

      error: () => {

        this.subscriber = {
          mobile: this.mobileNumber,
          status: 'NEW USER',
          packName: '',
          toneName: '',
          message: 'New user. Set RBT tone.'
        };

        this.showSubscriberInfo = true;
      }

    });

}
  selectTone(tone: any): void {

    this.selectedTone = tone;

    this.showCatalogPopup = false;
  }

  activateTone(): void {

  if (!this.selectedTone) {

    alert('Please select a tone');

    return;
  }

  const payload = {

    msisdn: Number(this.mobileNumber),

    toneCode: this.selectedTone.toneCode,

    toneName: this.selectedTone.toneName,

    packName: this.servicePackage

  };

  this.setRbtService
      .activateRbt(payload)
      .subscribe({

        next: () => {

          this.showSuccessPopup = true;

        },

        error: (err) => {

          console.error(err);

          alert('Activation failed');

        }

      });
}
closeSuccessPopup(): void {

  this.showSuccessPopup = false;

  this.resetForm();
}

resetForm(): void {

  this.mobileNumber = '';

  this.showSubscriberInfo = false;
  this.showCatalogPopup = false;
  this.showSuccessPopup = false;

  this.selectedTone = null;

  this.subscriber = {
    mobile: '',
    status: '',
    packName: '',
    toneName: '',
    message: ''
  };

}
}