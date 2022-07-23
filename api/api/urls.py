from django.conf.urls.static import static
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django import settings
from accounts.views import CurrentUserView, UsersView, ProfilesView, MemberView, import_users_view
from houses.views import HouseView, PictureView
from leads.views import DealView, DealTypeView, StateView, QuestionView, TestimonialView


router = DefaultRouter()

router.register(r"check", CurrentUserView)
router.register(r"users", UsersView)
router.register(r"profiles", ProfilesView)
router.register(r'members', MemberView)

router.register(r'houses', HouseView)
router.register(r'pictures', PictureView)

router.register(r'deals', DealView)
router.register(r'dealtypes', DealTypeView)
router.register(r'states', StateView)
router.register(r'questions', QuestionView)
router.register(r'testimonials', TestimonialView)

urlpatterns = [
    path('', include(router.urls)),

    path("rest/", include("rest_framework.urls")),
    path("register/", include("rest_auth.registration.urls")),
    path("auth/", include("rest_auth.urls")),
    path("import/", import_users_view),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
