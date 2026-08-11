import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  selectedLanguage = 'en';

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {

    const savedLang = localStorage.getItem('language');

    this.selectedLanguage = savedLang || 'en';

    this.translate.setDefaultLang('en');
    this.translate.use(this.selectedLanguage);
  }

  changeLanguage(lang: string): void {

    this.selectedLanguage = lang;

    localStorage.setItem('language', lang);

    this.translate.use(lang);
  }

logout(): void {

  sessionStorage.clear();

  localStorage.removeItem('loggedInUser');

  // Keep language preference
  // localStorage.removeItem('language');

  this.router.navigate(['/login']);
}
}