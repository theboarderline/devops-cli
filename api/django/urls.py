from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from api.views import redirect_view, TermsView, PrivacyView



urlpatterns = [
    path('accounts/', include('allauth.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path("redirect/", redirect_view, name="fe-redirect"),
    path('privacy/', PrivacyView.as_view()),
    path('terms/', TermsView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
