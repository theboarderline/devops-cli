from django.contrib import admin
from .models import Deal, DealType, State, Testimonial


admin.site.register(Deal)
admin.site.register(Testimonial)
admin.site.register(DealType)
admin.site.register(State)

