from django.urls import path
from .views import ListaIncendiosView

urlpatterns = [
    path('', ListaIncendiosView.as_view(), name='lista-incendios'),
]