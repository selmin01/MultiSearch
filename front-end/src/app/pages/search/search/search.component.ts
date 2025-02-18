import { Component } from '@angular/core';
import { SearchResource } from 'src/app/resources/search-resource.resource';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  results: any[] = [];
  resultsCount: number = 0;
  searchPerformed = false;
  inputFocused = false;
  selectedCategories: Set<string> = new Set();

  constructor(private searchResource: SearchResource) {}

  // 🔹 Lista de Categorias com Ícones do FontAwesome
  availableCategories = [
    {
      key: 'sales_orders',
      label: 'Pedidos de Venda',
      icon: 'fas fa-shopping-cart',
    },
    {
      key: 'purchase_orders',
      label: 'Pedidos de Compra',
      icon: 'fas fa-truck',
    },
    { key: 'materials', label: 'Produtos', icon: 'fas fa-box' },
    { key: 'equipments', label: 'Equipamentos', icon: 'fas fa-tools' },
    { key: 'workforce', label: 'Mão de Obra', icon: 'fas fa-user-cog' },
  ];

  // 🔹 Retorna os resultados filtrados com base nas categorias selecionadas
  get filteredResults(): any[] {
    if (this.selectedCategories.size === 0) {
      return this.results;
    }
    return this.results.filter((category) =>
      this.selectedCategories.has(category.title)
    );
  }

  // 🔹 Calcula o número de resultados encontrados considerando os filtros
  get filteredResultsCount(): number {
    return this.filteredResults.reduce(
      (sum, category) => sum + category.items.length,
      0
    );
  }

  // 🔹 Alterna a seleção de categorias
  toggleCategory(categoryKey: string) {
    const categoryLabel =
      this.availableCategories.find((c) => c.key === categoryKey)?.label || '';

    if (this.selectedCategories.has(categoryLabel)) {
      this.selectedCategories.delete(categoryLabel);
    } else {
      this.selectedCategories.add(categoryLabel);
    }

    // Atualiza a contagem de registros quando o filtro é alterado
    this.resultsCount = this.filteredResultsCount;
  }

  private organizeResults(data: any): any[] {
    return this.availableCategories
      .map((category) => {
        const items: any[] = data[category.key] || [];

        let formattedItems: any[] = [];

        switch (category.key) {
          case 'sales_orders':
            formattedItems = items.map((item) => ({
              ID: item.SalesOrderID || '-',
              Produto: item.MaterialName || '-',
              Quantidade: item.Quantity ?? 'Não informado',
              _details: item,
            }));
            break;

          case 'purchase_orders':
            formattedItems = items.map((item) => ({
              ID: item.PurchaseOrderID || '-',
              Produto: item.MaterialName || '-',
              Quantidade: item.Quantity ?? 'Não informado',
              _details: item,
            }));
            break;

          case 'materials':
            formattedItems = items.map((item) => ({
              ID: item.MaterialID || '-',
              Produto: item.MaterialName || '-',
              Quantidade: 'N/A',
              _details: item,
            }));
            break;

          case 'equipments':
            formattedItems = items.map((item) => ({
              ID: item.EquipmentID || '-',
              Produto: item.EquipmentName || '-',
              Quantidade: 'N/A',
              _details: item,
            }));
            break;

          case 'workforce':
            formattedItems = items.map((item) => ({
              ID: item.WorkforceID || '-',
              Produto: item.Name || '-',
              Quantidade: 'N/A',
              _details: item,
            }));
            break;

          default:
            formattedItems = [];
        }

        return {
          title: category.label,
          items: formattedItems,
        };
      })
      .filter((category) => category.items.length > 0);
  }

  async onSearch(term: string) {
    this.searchPerformed = true;

    if (term.length < 2) {
      this.results = [];
      this.resultsCount = 0;
      return;
    }

    try {
      const data = await this.searchResource.search(term);
      console.log(data, '<< Resultado da API >>');

      this.results = this.organizeResults(data);

      // 🔹 Atualiza o contador de resultados
      this.resultsCount = this.filteredResultsCount;

      if (this.resultsCount === 0) {
        ToastService.info('Nenhum resultado encontrado.');
      } else {
        ToastService.success(`${this.resultsCount} resultados encontrados.`);
      }
    } catch (error) {
      ToastService.error('Erro ao buscar resultados.');
    } finally {
      console.log('Busca finalizada');
    }
  }

  // 🔹 Verifica se uma categoria está selecionada
  isCategorySelected(categoryKey: string): boolean {
    return this.selectedCategories.has(
      this.availableCategories.find((c) => c.key === categoryKey)?.label || ''
    );
  }

  onBlur() {
    this.inputFocused = false;
  }
}
