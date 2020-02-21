// USA
export const locale = {
	lang: 'en',
	data: {
		TRANSLATOR: {
			SELECT: 'Select your language',
		},
		MENU: {
			NEW: 'new',
			ACTIONS: 'Actions',
			CREATE_POST: 'Create New Post',
			PAGES: 'Pages',
			FEATURES: 'Features',
			APPS: 'Apps',
			DASHBOARD: 'Dashboard',
		},
		AUTH: {
			GENERAL: {
				OR: 'ya da',
				SUBMIT_BUTTON: 'Onayla',
				NO_ACCOUNT: 'Henüz hesabın mı yok?',
				SIGNUP_BUTTON: 'Üye Ol',
				FORGOT_BUTTON: 'Şifremi Unuttum',
				BACK_BUTTON: 'Geri',
				PRIVACY: 'Gizlilik',
				LEGAL: 'Yasal',
				CONTACT: 'İletişim',
			},
			LOGIN: {
				TITLE: 'Giriş Hesabı',
				BUTTON: 'Giriş Yap',
			},
			FORGOT: {
				TITLE: 'Şifreni mi unuttun?',
				DESC: 'şifreni sıfırlamak için email adresini gir',
				SUCCESS: 'Hesabın başarıyla sıfırlandı.'
			},
			REGISTER: {
				TITLE: 'Üye Ol',
				DESC: 'Hesap oluşturmak için bilgilerinizi giriniz.',
				SUCCESS: 'Hesabın başarıyla oluşturuldu.'
			},
			INPUT: {
				EMAIL: 'Email',
				FULLNAME: 'Ad Soyad',
				PASSWORD: 'Şifre',
				CONFIRM_PASSWORD: 'Şifreni Onayla',
				USERNAME: 'Kullanıcı Adı'
			},
			VALIDATION: {
				INVALID: '{{name}} alanı geçersiz',
				REQUIRED: '{{name}} alanı zorunlu',
				MIN_LENGTH: '{{name}} alanı minimum {{min}} karakter uzunluğunda olmalıdır',
				AGREEMENT_REQUIRED: 'Koşullar ve şartlar alanı zorunludur',
				NOT_FOUND: '{{name}} alanı bulunamadı',
				INVALID_LOGIN: 'Giriş bilgileri geçersizdir',
				REQUIRED_FIELD: 'Zorunlu alan',
				MIN_LENGTH_FIELD: 'Minimum karakter uzunluğu:',
				MAX_LENGTH_FIELD: 'Maximum karakter uzunluğu:',
				INVALID_FIELD: 'geçersiz alan',
			}
		},
		ECOMMERCE: {
			COMMON: {
				SELECTED_RECORDS_COUNT: 'Selected records count: ',
				ALL: 'All',
				SUSPENDED: 'Suspended',
				ACTIVE: 'Active',
				FILTER: 'Filter',
				BY_STATUS: 'by Status',
				BY_TYPE: 'by Type',
				BUSINESS: 'Business',
				INDIVIDUAL: 'Individual',
				SEARCH: 'Search',
				IN_ALL_FIELDS: 'in all fields'
			},
			ECOMMERCE: 'eCommerce',
			CUSTOMERS: {
				CUSTOMERS: 'Customers',
				CUSTOMERS_LIST: 'Customers list',
				NEW_CUSTOMER: 'New Customer',
				DELETE_CUSTOMER_SIMPLE: {
					TITLE: 'Customer Delete',
					DESCRIPTION: 'Are you sure to permanently delete this customer?',
					WAIT_DESCRIPTION: 'Customer is deleting...',
					MESSAGE: 'Customer has been deleted'
				},
				DELETE_CUSTOMER_MULTY: {
					TITLE: 'Customers Delete',
					DESCRIPTION: 'Are you sure to permanently delete selected customers?',
					WAIT_DESCRIPTION: 'Customers are deleting...',
					MESSAGE: 'Selected customers have been deleted'
				},
				UPDATE_STATUS: {
					TITLE: 'Status has been updated for selected customers',
					MESSAGE: 'Selected customers status have successfully been updated'
				},
				EDIT: {
					UPDATE_MESSAGE: 'Customer has been updated',
					ADD_MESSAGE: 'Customer has been created'
				}
			}
		}
	}
};
