import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageNotice } from './page-notices.model';

@Injectable({
	providedIn: 'root'
})
export class PageNoticeService {
	onNoticeChanged$: BehaviorSubject<PageNotice>;

	constructor() {
		this.onNoticeChanged$ = new BehaviorSubject(null);
	}

	setNotice(message: string, type?: string) {
		const notice: PageNotice = {
			message,
			type
		};
		this.onNoticeChanged$.next(notice);
    }
    
}