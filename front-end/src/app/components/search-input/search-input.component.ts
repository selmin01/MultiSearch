import { Component, EventEmitter, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  @Output() searchEvent = new EventEmitter<string>(); // Emite o termo digitado para o componente pai
  @Output() focusEvent = new EventEmitter<void>(); // Emite quando o input ganha foco
  @Output() blurEvent = new EventEmitter<void>(); // Emite quando o input perde foco
  private searchSubject = new Subject<string>(); // Controla os eventos de entrada para debounce

  constructor() {
    // Configura o debounce para evitar chamadas excessivas à API
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchTerm) => {
      this.searchEvent.emit(searchTerm); // Envia o termo de pesquisa para o componente pai
    });
  }

  onSearchChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchSubject.next(inputValue);
  }
  
}


