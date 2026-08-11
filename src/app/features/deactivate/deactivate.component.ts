import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { DeactivateService } from '../../services/deactivate.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-deactivate',
  templateUrl: './deactivate.component.html',
  styleUrls: ['./deactivate.component.scss']
})
export class DeactivateComponent {

  mobileNumber = '';

  showDetails = false;
  showDeactivatePopup = false;
  showSuccessMessage = false;

  userData: any = {};

  constructor(
    private dashboardService: DashboardService,
    private deactivateService: DeactivateService,
    private translate: TranslateService
  ) {}

  fetchSubscriberDetails(): void {

    if (!this.mobileNumber) {
      return;
    }

    this.dashboardService
      .getSubscriber(this.mobileNumber)
      .subscribe({

        next: (res: any) => {

          this.userData = {

            whatsappNumber: res.msisdn,
            subscribedPlan:
            res.packName === 'TSUBD'
              ? 'DASHBOARD.DAILY'
              : res.packName === 'TSUBW'
              ? 'DASHBOARD.WEEKLY'
              : res.packName === 'TSUBM'
              ? 'DASHBOARD.MONTHLY'
              : res.packName,
            toneCode: res.toneCode,
            toneName: res.toneName,
            setFrom: res.billingDate,
            setTo: res.renewDate,

            currentRbtActive:
              !!res.toneCode && !!res.toneName
          };

          this.showDetails = true;
        },

        error: () => {

          alert(this.translate.instant('DASHBOARD.USER_NOT_FOUND'));

          this.showDetails = false;
        }

      });
  }

  openDeactivateModal(): void {

    this.showDeactivatePopup = true;
  }

  closeDeactivateModal(): void {

    this.showDeactivatePopup = false;
  }

  deactivateRbt(): void {

    this.deactivateService
      .deactivate(this.mobileNumber)
      .subscribe({

        next: (response) => {

          this.showDeactivatePopup = false;

          this.userData = {

            whatsappNumber: response.msisdn,
            subscribedPlan:
              response.packName === 'TSUBD'
                ? 'DASHBOARD.DAILY'
                : response.packName === 'TSUBW'
                ? 'DASHBOARD.WEEKLY'
                : response.packName === 'TSUBM'
                ? 'DASHBOARD.MONTHLY'
                : response.packName,
            toneCode: response.toneCode,
            toneName: '-',
            setFrom: response.billingDate,
            setTo: response.renewDate,
            currentRbtActive: false
          };

          this.showSuccessMessage = true;

          setTimeout(() => {

            this.showSuccessMessage = false;

            this.resetForm();

          }, 3000);
        },

        error: (err) => {

          console.error(err);

          alert(this.translate.instant('DEACTIVATE_RBT.DEACTIVATION_FAILED'));
        }

      });
  }

  resetForm(): void {

    this.mobileNumber = '';

    this.showDetails = false;
    this.showDeactivatePopup = false;
    this.showSuccessMessage = false;

    this.userData = {};
  }
}