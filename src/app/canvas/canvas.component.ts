import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css'
})
export class CanvasComponent {
  @ViewChild('canvasContainer') canvasContainerRef!: ElementRef<HTMLDivElement>;
  images: { src: string, x: number, y: number, width: number, height: number }[] = [];
  selectedImageIndex: number | null = null;
  startX = 0;
  startY = 0;
  isDragging = false;

  constructor() {
    // Initialize with some sample images
    this.loadImage('https://via.placeholder.com/150', 50, 50, 150, 150);
    this.loadImage('https://via.placeholder.com/200', 250, 150, 200, 200);
    this.loadImage('https://via.placeholder.com/100', 500, 300, 100, 100);
  }

  loadImage(src: string, x: number, y: number, width: number, height: number) {
    this.images.push({ src, x, y, width, height });
  }

  onMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('image-layer')) {
      this.selectedImageIndex = Array.from(target.parentElement!.children).indexOf(target);
      this.startX = event.clientX;
      this.startY = event.clientY;
      this.isDragging = true;
    }
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging && this.selectedImageIndex !== null) {
      const dx = event.clientX - this.startX;
      const dy = event.clientY - this.startY;
      const image = this.images[this.selectedImageIndex];
      image.x += dx;
      image.y += dy;
      this.startX = event.clientX;
      this.startY = event.clientY;
    }
  }

  onMouseUp() {
    this.isDragging = false;
  }

  selectImage(index: number, event: MouseEvent) {
    this.selectedImageIndex = index;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.isDragging = true;
  }
}
