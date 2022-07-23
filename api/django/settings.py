import os
from datetime import timedelta


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

LIFECYCLE = os.environ.get("LIFECYCLE")
IS_LOCAL = os.environ.get("IS_LOCAL") == 'true'

IS_DEV = IS_LOCAL or LIFECYCLE == "ops" or LIFECYCLE == "dev"

DOMAIN = os.environ.get("DOMAIN")
USE_PROXY = os.environ.get("USE_PROXY") == "true"
USE_GCS = os.environ.get("USE_GCS") == "true"

GOOGLE_OAUTH_ID = os.environ.get("OAUTH_ID")
GOOGLE_OAUTH_SECRET = os.environ.get("OAUTH_SECRET")

SECRET_KEY = os.environ.get("DJANGO_KEY") or 'fake-key'
SENDGRID_KEY = os.environ.get('SENDGRID_KEY')
EMAIL_HOST_USER = os.environ.get("SENDGRID_EMAIL")

if not DOMAIN:
    CURRENT_URL = 'http://localhost:8000/'
else:
    CURRENT_URL = f'https://{DOMAIN}/'

DEBUG = False if LIFECYCLE == "prod" else True

ALLOWED_HOSTS = ['*']

LOGIN_URL = '/redirect/'
LOGIN_REDIRECT_URL = '/redirect/'
LOGOUT_REDIRECT_URL = '/redirect/'


ACCOUNT_ADAPTER = "accounts.adapter.CustomAccountAdapter"

ACCOUNT_AUTHENTICATION_METHOD = 'EMAIL'
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_UNIQUE_EMAIL = True

ACCOUNT_EMAIL_VERIFICATION = "none"
# ACCOUNT_EMAIL_VERIFICATION = "mandatory"
# ACCOUNT_CONFIRM_EMAIL_ON_GET = True


if not IS_LOCAL:
    ACCOUNT_DEFAULT_HTTP_PROTOCOL = "https"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "var/db.sqlite3"),
    }
}

if USE_PROXY:
    print('\n\n Running PROXY DB\n\n')
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'HOST': '127.0.0.1',
            'PORT': 5432,
            'NAME': os.environ.get('DB_NAME'),
            'USER': os.environ.get('DB_USER'),
        }
    }
else:
    print("\n\n Running SQLITE DB\n\n")


AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
)

SITE_ID = 1

INSTALLED_APPS = [
    "accounts",
    "api",
    "houses",
    "leads",
    "messaging",

    "django_twilio",
    "corsheaders",
    "psycopg2",

    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    "rest_framework",
    "rest_framework.authtoken",
    "rest_auth",
    "rest_auth.registration",

    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
    "django.contrib.redirects",
]


REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ),
    "DEFAULT_RENDERER_CLASSES": (
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ),
    "DEFAULT_PARSER_CLASSES": (
        "rest_framework.parsers.JSONParser",
        "rest_framework.parsers.FormParser",
        "rest_framework.parsers.MultiPartParser",
    ),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 5,
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.AllowAny",),
    "DEFAULT_FILTER_BACKENDS": (
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ),
    "SEARCH_PARAM": "q",
    "ORDERING_PARAM": "ordering",
}

if LIFECYCLE == 'prod':
    REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"] = (
        "rest_framework.renderers.JSONRenderer",
    )

WSGI_APPLICATION = "django.wsgi.application"

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
# CORS_ORIGIN_ALLOW_ALL = False
# CORS_ORIGIN_WHITELIST = ('http://localhost:3000',)


TWILIO_ACCOUNT_SID = os.environ.get("TWILIO_SID")
TWILIO_AUTH_TOKEN = os.environ.get("TWILIO_TOKEN")
TWILIO_NUMBER_SID = os.environ.get("TWILIO_NUMBER_SID")

TWILIO_NUMBER_IL = '+' + str(os.environ.get("TWILIO_NUMBER_IL"))
TWILIO_NUMBER_WA = '+' + str(os.environ.get("TWILIO_NUMBER_WA"))

TWILIO_DEFAULT_CALLERID = "django Group Solutions"

GS_PROJECT_ID = os.environ.get("GKE_PROJECT")
GS_STATIC_BUCKET_NAME = os.environ.get("STATIC_BUCKET")
GS_BUCKET_NAME = os.environ.get("STATIC_BUCKET")
PRIVATE_BUCKET_NAME = os.environ.get("PRIVATE_BUCKET")

if USE_GCS:
    DEFAULT_FILE_STORAGE = "storages.backends.gcloud.GoogleCloudStorage"
    STATICFILES_STORAGE = "storages.backends.gcloud.GoogleCloudStorage"
    GS_DEFAULT_ACL = "publicRead"
    STATIC_URL = f"https://storage.googleapis.com/{GS_STATIC_BUCKET_NAME}/"
else:
    STATIC_URL = "/static/"

STATIC_ROOT = "static/"
MEDIA_ROOT = "media/"

UPLOAD_ROOT = "media/uploads/"


SOCIALACCOUNT_AUTO_SIGNUP = True

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        },
        'APP': {
            'client_id': GOOGLE_OAUTH_ID,
            'secret': GOOGLE_OAUTH_SECRET,
            'key': ''
        }
    }
}

REST_USE_JWT = False


MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "django.contrib.redirects.middleware.RedirectFallbackMiddleware",
]

ROOT_URLCONF = "django.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

AUTH_PASSWORD_VALIDATORS = []

if not IS_DEV:
    AUTH_PASSWORD_VALIDATORS = [
        {
            "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
        },
        {
            "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        },
        {
            "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
        },
        {
            "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
        },
    ]

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
