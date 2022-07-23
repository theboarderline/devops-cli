from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.views import APIView

from django import settings


@api_view(["GET"])
def redirect_view(request):

    if settings.IS_LOCAL:
        domain = 'http://localhost:3000'
    else:
        domain = f'https://{settings.DOMAIN}'

    html = f'<html><head><meta http-equiv="refresh" content="0;url={domain}/" /> </head></html'
    return HttpResponse(html)


class PrivacyView(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'privacy.html'

    def get(self, request):
        return Response()


class TermsView(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'terms.html'

    def get(self, request):
        return Response()
