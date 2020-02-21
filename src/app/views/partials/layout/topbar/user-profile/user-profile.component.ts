// Angular
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
// RxJS
import { Subscription } from 'rxjs';

import { AuthService } from '../../../../pages/auth/auth.service';
import { AuthData } from '../../../../pages/auth/auth.model';

@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit, OnDestroy {
	userIsAuthenticated = false;
	userId: string;
	userData: AuthData;
	private authListenerSubs: Subscription;

	@Input() avatar = true;
	@Input() greeting = true;
	@Input() badge: boolean;
	@Input() icon: boolean;


	constructor(private authService: AuthService) { }

	ngOnInit(): void {
		this.authService.getUserByToken().subscribe((data: AuthData) => {
			this.userData = data;
		})
		this.userId = this.authService.getUserId();
		this.userIsAuthenticated = this.authService.getIsAuth();
		this.authListenerSubs = this.authService.getAuthStatusListener()
			.subscribe(isAuthenticated => {
				this.userIsAuthenticated = isAuthenticated;
				this.userId = this.authService.getUserId();
			})


	}

	ngOnDestroy() {
		this.authListenerSubs.unsubscribe();
	}

	logout() {
		this.authService.logout();
	}
}
