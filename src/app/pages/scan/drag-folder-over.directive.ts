import {
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appDragFileOver]',
})
export class DragFolderOverDirective {
  @Input() activeClass: string;
  @Input() activeDescription: string;

  @Output() folderDropped = new EventEmitter<string>();

  @ContentChild('description') descriptionElement: ElementRef;

  @HostListener('dragover', ['$event']) draggedOver(event: DragEvent) {
    event.preventDefault();
    this.attachClass();
    this.changeDescription();
  }

  @HostListener('dragleave', ['$event']) draggedLeave(event: DragEvent) {
    event.preventDefault();
    this.detachClass();
    this.revertDescription();
  }

  @HostListener('drop', ['$event']) drop(event: DragEvent) {
    event.preventDefault();
    this.detachClass();
    this.revertDescription();
    const folderPath = event?.dataTransfer?.files.item(0)?.path;
    if (folderPath) {
      this.folderDropped.emit(folderPath);
    }
  }

  private oldDescription = '';

  constructor(private elementRef: ElementRef) {}

  private changeDescription() {
    if (!this.oldDescription) {
      this.oldDescription = this.descriptionElement.nativeElement.innerText;
    }
    this.descriptionElement.nativeElement.innerText = this.activeDescription;
  }

  private revertDescription() {
    this.descriptionElement.nativeElement.innerText = this.oldDescription;
  }

  private attachClass() {
    this.elementRef.nativeElement.classList.add(this.activeClass);
  }

  private detachClass() {
    this.elementRef.nativeElement.classList.remove(this.activeClass);
  }
}
