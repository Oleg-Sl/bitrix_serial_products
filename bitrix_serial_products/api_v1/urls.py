from django.urls import include, path
from rest_framework import routers


from .views import (
    IndexApiView,
    InstallApiView,
    SmartApiView
)


app_name = 'api_v1'
router = routers.DefaultRouter()


urlpatterns = [
    path('', include(router.urls)),
    path('index/', IndexApiView.as_view()),
    path('index/', InstallApiView.as_view()),
    path('smart/<int:smart_type_id>/<int:smart_id>/', SmartApiView.as_view()),
]


urlpatterns += router.urls
