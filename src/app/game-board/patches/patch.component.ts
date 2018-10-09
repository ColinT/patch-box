import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

import { Patch } from './patch.class';

@Component({
  selector: 'pbx-patch',
  templateUrl: './patch.component.html',
})
export class PatchComponent implements OnInit { // Base class for patches, should not be used in template

  @Input() patch: Patch;
  @Input() set upPatch(value: Patch | void) { this.patch.upPatch = value; }
  @Input() set downPatch(value: Patch | void) { this.patch.downPatch = value; }
  @Input() set leftPatch(value: Patch | void) { this.patch.leftPatch = value; }
  @Input() set rightPatch(value: Patch | void) { this.patch.rightPatch = value; }
  @Input() width: number;
  @Input() height: number;
  @Output() submit = new EventEmitter<void>();

  // handle left click
  @HostListener('click', ['$event']) onLeftClick(event: Event) {
    event.preventDefault();
    this.patch.rotateCcw();
  }
  // handle right click
  @HostListener('contextmenu', ['$event']) onRightClick(event: Event) {
    event.preventDefault();
    this.patch.rotateCw();
  }

  ngOnInit() {
    this.patch.submit = this.submit;
  }

  get border() {
    if (this.patch.isConnected && this.patch.isLoose) {
      return '1px red solid';
    }
    return '1px black solid';
  }

}
