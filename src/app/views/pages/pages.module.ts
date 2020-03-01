// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { MailModule } from './apps/mail/mail.module';
import { TwilioComponent } from './twilio/twilio.component';
import { MatGridListModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatSelectModule, MatIconModule, MatCheckboxModule, MatRadioModule, MatCardModule, MatToolbarModule } from '@angular/material';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { PageNoticesComponent } from './page-notices/page-notices.component';

@NgModule({
	declarations: [TwilioComponent, UserprofileComponent, PageNoticesComponent],
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		MailModule,
		MatGridListModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatSelectModule,
		MatIconModule,
		MatCheckboxModule,
		MatRadioModule,
		ReactiveFormsModule,
		MatCardModule,
		MatToolbarModule
	],
	providers: []
})
export class PagesModule {
}
