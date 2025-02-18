import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  
  static success(message: string) {
    ToastService.showToast(message, 'bg-green-500');
  }

  static error(message: string) {
    ToastService.showToast(message, 'bg-red-500');
  }

  static info(message: string) {
    ToastService.showToast(message, 'bg-blue-500');
  }

  private static showToast(message: string, bgColor: string) {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-5 right-5 px-4 py-2 text-white rounded shadow-lg ${bgColor}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}
