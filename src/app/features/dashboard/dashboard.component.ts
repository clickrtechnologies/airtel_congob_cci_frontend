import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  whatsappNumber = '';

  showDetails = false;

  userData: any = {};

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private translate: TranslateService
  ) {}

  fetchUserDetails(): void {

    if (!this.whatsappNumber) {
      return;
    }

    this.dashboardService
      .getSubscriber(this.whatsappNumber)
      .subscribe({

        next: (res: any) => {

          this.showDetails = true;

            const planMap: { [key: string]: string } = {
                  TSUBD: 'DASHBOARD.DAILY',
                  TSUBW: 'DASHBOARD.WEEKLY',
                  TSUBM: 'DASHBOARD.MONTHLY'
            };

            const rbtSet =
            !!res.toneCode &&
            res.toneCode.trim() !== '' &&
            !!res.toneName &&
            res.toneName.trim() !== '';


          this.userData = {

            whatsappNumber: res.msisdn,
            subscribedPlan: planMap[res.packName?.toUpperCase()] || res.packName,

            currentRbtActive: rbtSet,

            toneCode: res.toneCode,
            toneName: res.toneName,

            setFrom: res.billingDate,
            setTo: res.renewDate,

            message: rbtSet
            ? 'DASHBOARD.RBT_FOUND'
            : 'DASHBOARD.RBT_NOT_FOUND'
          };
        },

        error: (err) => {

          this.showDetails = true;

          if (err.status === 404) {

            this.userData = {
              whatsappNumber: this.whatsappNumber,
              toneCode: '',
              toneName: '',
              message: 'DASHBOARD.USER_NOT_FOUND',
              currentRbtActive: false
            };

          } else {

            this.userData = {
              whatsappNumber: this.whatsappNumber,
              toneCode: '',
              toneName: '',
              message: 'DASHBOARD.USER_NOT_FOUND',
              currentRbtActive: false
            };
          }
        }
      });
  }
  logout(): void {

    localStorage.clear();

    this.router.navigate(['/login']);
  }
}