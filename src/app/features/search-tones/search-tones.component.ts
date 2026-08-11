import {Component,OnInit,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SearchTonesService } from '../../services/search-tones.service';
import { PageEvent } from '@angular/material/paginator';
import { DashboardService } from '../../services/dashboard.service';
import { SetRbtService } from '../../services/set-rbt.service';
@Component({
  selector: 'app-search-tones',
  templateUrl: './search-tones.component.html',
  styleUrls: ['./search-tones.component.scss']
})
export class SearchTonesComponent implements OnInit {

  searchText = '';
  selectedGenre = '';
  selectedLength = '';
  selectedSort = '';

 genres: string[] = [];
 lengths: string[] = [];

  displayedColumns: string[] = [
    'preview',
    'toneName',
    'toneId',
    'category',
    'artist',
    'release',
    'action'
  ];

  constructor(
  private searchTonesService: SearchTonesService,
  private dashboardService: DashboardService,
  private setRbtService: SetRbtService
) {}

 dataSource = new MatTableDataSource<any>([]);
totalRecords = 0;
pageSize = 5;
currentPage = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  showSetRbtPopup = false;
  showCatalogPopup = false;
  showSuccessPopup = false;
  showSubscriberInfo = false;

  mobileNumber = '';

  servicePackage = 'TSUBM';

  subscriber = {
    mobile: '',
    status: '',
    packName: '',
    toneName: ''
  };

  selectedTone: any = null;

  
  toneList: any[] = [];

  ngOnInit(): void {
      this.loadCatalog();
      this.loadCategories();
      this.loadLengths();

  }

  loadCategories(): void {

  this.searchTonesService.getCategories().subscribe({
    next: (response: string[]) => {
      this.genres = response;
    },
    error: (error) => {
      console.error('Error loading categories', error);
    }
  });

}

loadLengths(): void {
  this.searchTonesService.getArtists().subscribe({
    next: (response: string[]) => {
      this.lengths = response;
    },
    error: (error) => {
      console.error('Error loading artists', error);
    }
  });

}

loadCatalog(): void {

  this.searchTonesService.searchCatalog(
    this.currentPage,
    this.pageSize,
    this.searchText,
    this.selectedGenre,
    this.selectedLength,
    this.selectedSort
  ).subscribe({

    next: (response) => {

      this.dataSource.data = response.content.map((item: any) => ({

        toneName: item.toneName,

        toneId: item.toneCode,

        category: item.category,

        artist: item.artistName,

        release: item.updateTime,

        preview: item.toneUrl

      }));

      this.totalRecords = response.totalElements;

      this.toneList = this.dataSource.data;

    },

    error: err => {

      console.error(err);

    }

  });

}

  filterData(): void {

  this.currentPage = 0;

  this.loadCatalog();

}

pageChanged(event: PageEvent): void {

  this.currentPage = event.pageIndex;

  this.pageSize = event.pageSize;

  this.loadCatalog();

}
audio = new Audio();

playingUrl: string | null = null;

isPlaying = false;
playAudio(url: string): void {

  if (!url) {
    return;
  }
  if (this.playingUrl === url) {

    if (this.isPlaying) {

      this.audio.pause();
      this.isPlaying = false;

    } else {

      this.audio.play();
      this.isPlaying = true;

    }

    return;
  }
  this.audio.pause();
  this.audio.currentTime = 0;

  this.audio.src = url;
  this.audio.load();

  this.audio.play();

  this.playingUrl = url;
  this.isPlaying = true;

  this.audio.onended = () => {
    this.isPlaying = false;
    this.playingUrl = null;
  };

}


openPopup(row: any): void {

  this.selectedTone = row;

  this.mobileNumber = '';

  this.showSubscriberInfo = false;

  this.subscriber = {

    mobile: '',
    status: '',
    packName: '',
    toneName: ''

  };

  this.showSetRbtPopup = true;

}

 closePopup(): void {

  this.audio.pause();
  this.audio.currentTime = 0;
  this.playingUrl = null;
  this.isPlaying = false;

  this.showSetRbtPopup = false;

  this.resetForm();

}

  verifySubscriber(): void {

  if (!this.mobileNumber) {

    alert('Enter Mobile Number');
    return;

  }

  this.dashboardService
    .getSubscriber(this.mobileNumber)
    .subscribe({

      next: (response: any) => {

        this.subscriber = {

          mobile: response.msisdn,

          status: response.status === 1
            ? 'ACTIVE'
            : 'INACTIVE',

          packName:
            response.packName === 'TSUBD'
              ? 'SEARCH.DAILY_PACK'
              : response.packName === 'TSUBW'
              ? 'SEARCH.WEEKLY_PACK'
              : response.packName === 'TSUBM'
              ? 'SEARCH.MONTHLY_PACK'
              : response.packName,

          toneName: response.toneName

        };

        this.showSubscriberInfo = true;

      },

      error: () => {

        this.subscriber = {

          mobile: this.mobileNumber,

          status: 'NEW USER',

          packName: '',

          toneName: ''

        };

        this.showSubscriberInfo = true;

      }

    });

}

  filteredToneList(): any[] {

    if (!this.searchText) {

      return this.toneList;

    }

    return this.toneList.filter(tone =>

      tone.toneName.toLowerCase().includes(this.searchText.toLowerCase()) ||

      tone.toneId.toLowerCase().includes(this.searchText.toLowerCase()) ||

      tone.artist.toLowerCase().includes(this.searchText.toLowerCase())

    );

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
  if (!this.showSubscriberInfo) {

    alert('Please verify subscriber first');

    return;

}

  const payload = {

    msisdn: Number(this.mobileNumber),
    packName: this.servicePackage,
    toneCode: this.selectedTone.toneId

  };

  this.setRbtService.activateRbt(payload).subscribe({

    next: (response: any) => {

      alert(response.message || 'RBT Activated Successfully');

      this.closePopup();

    },

    error: err => {

      console.error(err);

      alert('Failed to activate RBT');

    }

  });

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

      toneName: ''

    };

  }

}

