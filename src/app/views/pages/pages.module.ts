// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { MailModule } from './apps/mail/mail.module';
import { TwilioComponent } from './twilio/twilio.component';
import { MatGridListModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';

@NgModule({
	declarations: [TwilioComponent],
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
		MatButtonModule
	],
	providers: []
})
export class PagesModule {
}
