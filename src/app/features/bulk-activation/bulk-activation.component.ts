import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BulkActivationService } from 'src/app/services/bulk-activation.service';
import { PageEvent } from '@angular/material/paginator';
export interface PreviewRecord {

  mobile: string;

  toneId: string;

  toneName: string;

  artistName: string;

  packagePlan: string;

  valid: boolean;

  message: string;

  editing?: boolean;

}

@Component({
  selector: 'app-bulk-activation',
  templateUrl: './bulk-activation.component.html',
  styleUrls: ['./bulk-activation.component.scss']
})
export class BulkActivationComponent implements OnInit {
previewId = '';

processing = false;

constructor(
private BulkActivationService : BulkActivationService
) {}

downloadTemplate(): void {

  this.BulkActivationService.downloadTemplate()
    .subscribe({

      next: (blob: Blob) => {

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'Bulk_Activity_Template.csv';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);
      },

      error: (err) => {
        console.error(err);
        alert('Failed to download template.');
      }

    });

}
 selectedFile: File | null = null;
 totalRecords = 0;

validRecords = 0;

invalidRecords = 0;

onFileSelected(event: Event): void {

  const input = event.target as HTMLInputElement;

  if (!input.files || input.files.length === 0) {
    return;
  }

this.selectedFile = input.files[0];

const maxSize = 10 * 1024 * 1024; // 10 MB

if (this.selectedFile.size > maxSize) {

  alert("File size must not exceed 10 MB.");

  this.selectedFile = null;

  input.value = '';

  return;
}

  this.previewData = [];
  this.totalRecords = 0;
  this.validRecords = 0;
  this.invalidRecords = 0;

  this.BulkActivationService
      .previewFile(this.selectedFile)
      .subscribe({

        next: (response) => {
  this.previewId = response.previewId;

  this.totalRecords = response.totalRecords;
  this.validRecords = response.validRecords;
  this.invalidRecords = response.invalidRecords;

  this.previewData = response.records;

        },

        error: (err) => {

          console.error(err);

          alert("Unable to process file.");

        }

      });

  input.value = '';

  
}

  previewData: PreviewRecord[] = [];

  ngOnInit(): void {
  this.loadBulkHistory();
  }
  calculateSummary(): void {

  this.totalRecords = this.previewData.length;

  this.validRecords =
    this.previewData.filter(x => x.valid).length;

  this.invalidRecords =
    this.previewData.filter(x => !x.valid).length;

}

loadBulkHistory(): void {

  this.BulkActivationService
      .getBulkHistory(
        this.page,
        this.pageSize,
        this.searchPreviewId
      )
      .subscribe({

        next: (response) => {

          this.bulkHistory = response.content;
          this.historyTotalRecords = response.totalElements;

        },

        error: (err) => {

          console.error(err);

        }

      });

}
  reUpload(): void {

    this.selectedFile = null;
    this.previewId = '';
    this.previewData = [];

    this.totalRecords = 0;
    this.validRecords = 0;
    this.invalidRecords = 0;

  }
searchHistory() {

  this.page = 0;
  this.loadBulkHistory();

}
processFile(): void {

  if (!this.selectedFile) {
    return;
  }

  this.processing = true;

  const request = {

    previewId: this.previewId,

    fileName: this.selectedFile.name,

    records: this.previewData

  };

  this.BulkActivationService.processBulk(request).subscribe({
  next: (response) => {
    alert(response); 
    this.processing = false;
    this.reUpload();
    this.loadBulkHistory();
  },
  error: (err) => {
    this.processing = false;
    console.error(err);
  }
});

}
bulkHistory: any[] = [];

page = 0;
pageSize = 5;
historyTotalRecords = 0;
searchPreviewId = '';

pageChanged(event: PageEvent) {

  this.page = event.pageIndex;
  this.pageSize = event.pageSize;

  this.loadBulkHistory();

}
downloadReport(previewId: string): void {

  this.BulkActivationService.downloadReport(previewId)
    .subscribe({

      next: (blob: Blob) => {

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');

        link.href = url;
        link.download = `${previewId}_Report.xlsx`;

        link.click();

        window.URL.revokeObjectURL(url);
      },

      error: (err) => {
        console.error('Report download failed', err);
      }

    });

}
exportHistory(): void {

  this.BulkActivationService.exportHistory()
    .subscribe({

      next: (blob: Blob) => {

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');

        link.href = url;
        link.download = 'Bulk_History.xlsx';

        link.click();

        window.URL.revokeObjectURL(url);
      },

      error: (err) => {

        console.error('Failed to export history', err);

      }

    });

}
}