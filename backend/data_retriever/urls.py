from rest_framework import urlpatterns
from . import views
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register("locations", views.LocationViewSet, "locations")

urlpatterns = router.urls