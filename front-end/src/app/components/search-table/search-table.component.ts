import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
})
export class SearchTableComponent implements OnChanges {
  @Input() title: string = '';
  @Input() count: number = 0;
  @Input() items: any[] = [];

  selectedItem: any = null;
  modalOpen: boolean = false;

  rowsPerPage: number | null = null;
  currentPage: number = 1;
  paginatedItems: any[] = [];

  translations: { [key: string]: string } = {
    SalesOrderID: 'ID do Pedido de Venda',
    Customer: 'Cliente',
    DeliveryDate: 'Data de Entrega',
    MaterialID: 'Código do Material',
    MaterialName: 'Nome do Produto',
    Quantity: 'Quantidade',
    TotalValue: 'Valor Total',

    PurchaseOrderID: 'ID do Pedido de Compra',
    Supplier: 'Fornecedor',
    TotalCost: 'Custo Total',

    EquipmentID: 'Código do Equipamento',
    EquipmentName: 'Nome do Equipamento',

    WorkforceID: 'Código da Mão de Obra',
    Name: 'Nome do Funcionário',
    Shift: 'Turno',

    ID: 'Identificação',
    Produto: 'Produto',
  };

  /**
   * 📌 Atualiza a paginação sempre que `items` for alterado.
   */
  ngOnChanges(changes: SimpleChanges) {
    if ('items' in changes) {
      this.currentPage = 1;
      this.updatePaginatedItems();
    }
  }

  /**
   * Abre o modal com os detalhes completos do item selecionado
   */
  openModal(event: Event, item: any) {
    event.preventDefault();
    this.modalOpen = true;
    setTimeout(() => {
      this.selectedItem = item._details || item;
    }, 50);
  }

  /**
   * Fecha o modal
   */
  closeModal() {
    this.modalOpen = false;
    setTimeout(() => {
      this.selectedItem = null;
    }, 300);
  }

  getTranslatedKeys(obj: any): { key: string; label: string }[] {
    if (!obj) return [];
    return Object.keys(obj).map((key) => ({
      key,
      label: this.translations[key] || key,
    }));
  }

  updatePage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updatePaginatedItems();
    }
  }

  updateRowsPerPage(rows: number) {
    this.rowsPerPage = rows;
    this.currentPage = 1;
    this.updatePaginatedItems();
  }

  updatePaginatedItems() {
    const start = (this.currentPage - 1) * (this.rowsPerPage || 10); // ✅ Ajusta para detectar `null`
    const end = start + (this.rowsPerPage || 10);
    this.paginatedItems = this.items.slice(start, end);
  }

  getTotalPages(): number {
    return Math.ceil(this.items.length / (this.rowsPerPage || 10));
  }
}
