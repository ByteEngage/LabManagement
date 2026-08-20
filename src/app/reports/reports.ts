import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-reports',
  standalone: true,
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss'],
})
export class ReportsComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly sanitizer = inject(DomSanitizer);

  // Reactive signal accessible by your HTML layout for rendering the iframe template
  pdfPreviewUrl = signal<SafeResourceUrl | null>(null);

  private async loadPdfMake(): Promise<any> {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const pdfMakeModule = await import('pdfmake/build/pdfmake');
    const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
    const pdfMake = pdfMakeModule.default ?? pdfMakeModule;
    const vfs = (pdfFontsModule as any)?.pdfMake?.vfs ?? (pdfFontsModule as any)?.default?.pdfMake?.vfs;

    if (vfs) {
      Object.defineProperty(pdfMake, 'vfs', {
        value: vfs,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }

    return pdfMake;
  }

  async generatePDF(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const pdfMake = await this.loadPdfMake();
    if (!pdfMake) return;

    const docDefinition = {
      header: 'C#Corner PDF Header',
      content: 'Sample PDF generated with Angular and PDFMake for C#Corner Blog',
      footer: (currentPage: number, pageCount: number) => {
        return {
          text: `Page ${currentPage} of ${pageCount}`,
          alignment: 'center',
        };
      }
    };

    pdfMake.createPdf(docDefinition).download('cs-corner-report.pdf');
  }

  async previewPDF(): Promise<void> {  
    // 1. Guard for SSR execution safety
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // 2. Fetch the lazily loaded pdfMake chunk
    const pdfMake = await this.loadPdfMake();
    if (!pdfMake) return;

    const docDefinition = {  
      header: 'C#Corner PDF Header',  
      content: 'Sample PDF generated with Angular and PDFMake for C#Corner Blog'  
    };  

    // 3. Process the file generator stream inside the scoped resolution
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    
    pdfDocGenerator.getBlob((blob: Blob) => {
      const localUrl = URL.createObjectURL(blob);
      const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(localUrl);
      
      this.pdfPreviewUrl.set(sanitizedUrl);
    });
  }  
}
