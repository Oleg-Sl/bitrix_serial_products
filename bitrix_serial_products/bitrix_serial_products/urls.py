from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('bitrix-serial-products/', include('api_v1.urls', namespace='api_v1')),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
