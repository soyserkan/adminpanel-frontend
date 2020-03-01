// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, Output } from '@angular/core';
// RxJS
import { Subscription } from 'rxjs';
import { PageNoticeService } from './page-notices.service';
import { PageNotice } from './page-notices.model';
// Auth

@Component({
  selector: 'kt-page-notices',
  templateUrl: './page-notices.component.html'
})
export class PageNoticesComponent implements OnInit, OnDestroy {
  @Output() type: any;
  @Output() message: any = '';

  // Private properties
  private subscriptions: Subscription[] = [];

	/**
	 * Component Constructure
	 *
	 * @param pageNoticeService
	 * @param cdr
	 */
  constructor(public pageNoticeService: PageNoticeService, private cdr: ChangeDetectorRef) {
  }

	/*
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
    */

	/**
	 * On init
	 */
  ngOnInit() {
    this.subscriptions.push(this.pageNoticeService.onNoticeChanged$.subscribe(
      (notice: PageNotice) => {
        notice = Object.assign({}, { message: '', type: '' }, notice);
        this.message = notice.message;
        this.type = notice.type;
        this.cdr.markForCheck();
      }
    ));
  }

  onAlertClose($event) {
	this.message='';
	}

	/**
	 * On destroy
	 */
  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}