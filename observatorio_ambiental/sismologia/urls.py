from django.urls import path
from .views import ListaSismosView

urlpatterns = [
    path('', ListaSismosView.as_view(), name='lista-sismos'),
]