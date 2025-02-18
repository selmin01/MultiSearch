import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems: number = 0;
  @Input() rowsPerPage: number | null = null; // ✅ Agora pode ser `null`
  @Output() pageChange = new EventEmitter<number>();
  @Output() rowsPerPageChange = new EventEmitter<number>();

  currentPage: number = 1;
  totalPages: number = 1;
  rowOptions: number[] = [5, 10, 15, 20]; // ✅ Opções para selecionar quantas linhas exibir

  ngOnChanges(changes: SimpleChanges) {
    this.calculateTotalPages();
  }

  private calculateTotalPages() {
    if (!this.rowsPerPage) {
      // ✅ Ajusta automaticamente: exibe tudo se ≤ 10 registros, senão exibe 10
      this.rowsPerPage = this.totalItems <= 10 ? this.totalItems : 10;
    }

    this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.rowsPerPage));

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  getVisiblePages(): number[] {
    const pages: number[] = [];
    const range = 3;
    const start = Math.max(1, this.currentPage - range);
    const end = Math.min(this.totalPages, this.currentPage + range);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }

  handleNext() {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }

  handlePrevious() {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  updateRowsPerPage(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.rowsPerPage = Number(target.value);
    this.rowsPerPageChange.emit(this.rowsPerPage);
    this.currentPage = 1;
    this.calculateTotalPages();
    this.pageChange.emit(1); // ✅ Resetar para a primeira página
  }
}
