from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework.authtoken import views

from Api.Views.Store.Accounts.views import AccountsViewSet
from Api.Views.Store.Category.views import CategoryViewSet
from Api.Views.Store.Products.views import ProductViewSet
from Api.Views.Store.Purchases.views import PurchasesViewSet
from Api.Views.Store.Sales.views import SalesViewSet
from Api.Views.Store.Users.views import UsuariosViewSet, ProfileViewSet, Logout

router = SimpleRouter()


router.register('user', viewset=UsuariosViewSet)
router.register('profile', viewset=ProfileViewSet)
router.register('product', viewset=ProductViewSet)
router.register('category', viewset=CategoryViewSet)
router.register('sales', viewset=SalesViewSet)
router.register('purchases', viewset=PurchasesViewSet)
router.register('accounts', viewset=AccountsViewSet)



urlpatterns = [
    # Redes
    path('', include(router.urls)),
    path('login', views.obtain_auth_token),
    path('logout', Logout.as_view()),

]
