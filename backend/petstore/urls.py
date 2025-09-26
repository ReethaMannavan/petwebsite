from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    NavbarSettingsViewSet,
    FooterSettingsViewSet,
    FooterSupportLinkViewSet,
    FooterPetpaloozaLinkViewSet,
    FooterSubscriberViewSet,
    HeroSectionViewSet,
    CategoryViewSet,
    SubcategoryViewSet,
    SubitemViewSet,
    ProductViewSet,
    AboutHeroViewSet,
    AboutCardViewSet,
    AboutSplitSectionViewSet,
    ShopByPetViewSet, 
    HomepagePromoSectionViewSet, HomepageDealSectionViewSet, HomepageServiceCardViewSet
   
)
from .views import (
    PetServiceHeroViewSet,
    PetServiceSectionViewSet,
    PetServiceSpecialViewSet
)

from .views import (
    ContactHeaderViewSet,
    QuickLinkViewSet,
    BrowseTopicViewSet,
    ContactInfoViewSet,
    ContactPageViewSet,
)
from .views import ProductDetailViewSet, ReviewViewSet
from . import views


from .views import PromoViewSet

from .views import (
    ConsultVetHeroViewSet,
    ConsultVetInfoBarViewSet,
    ConsultVetServiceViewSet,
    ConsultVetHighlightViewSet,
    ConsultVetCardViewSet,
    get_cart, add_to_cart, update_cart_item, remove_from_cart
)

from .views import RegisterView, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()

# Existing routes
router.register(r"navbar", NavbarSettingsViewSet, basename="navbar")
router.register(r"footer/settings", FooterSettingsViewSet, basename="footer-settings")
router.register(r"footer/support-links", FooterSupportLinkViewSet, basename="footer-support-links")
router.register(r"footer/petpalooza-links", FooterPetpaloozaLinkViewSet, basename="footer-petpalooza-links")
router.register(r"footer/subscribe", FooterSubscriberViewSet, basename="footer-subscriber")
router.register(r"hero", HeroSectionViewSet, basename="hero")  


router.register(r'homepage-promo', HomepagePromoSectionViewSet, basename="homepage-promo")
router.register(r'homepage-deal', HomepageDealSectionViewSet, basename="homepage-deal")
router.register(r'homepage-services', HomepageServiceCardViewSet, basename="homepage-services")

# New routes for products and categories
router.register(r"categories", CategoryViewSet, basename="categories")
router.register(r"subcategories", SubcategoryViewSet, basename="subcategories")
router.register(r"subitems", SubitemViewSet, basename="subitems")
router.register(r"products", ProductViewSet, basename="products")


router.register(r"about/hero", AboutHeroViewSet, basename="about-hero")
router.register(r"about/cards", AboutCardViewSet, basename="about-cards")
router.register(r"about/split", AboutSplitSectionViewSet, basename="about-split")

router.register(r"shop-by-pet", ShopByPetViewSet, basename="shop-by-pet")

router.register("petservice/hero", PetServiceHeroViewSet, basename="petservice-hero")
router.register("petservice/section", PetServiceSectionViewSet, basename="petservice-section")
router.register("petservice/specials", PetServiceSpecialViewSet, basename="petservice-specials")


# Contact
router.register(r"contact/headers", ContactHeaderViewSet, basename="contact-headers")
router.register(r"contact/quick-links", QuickLinkViewSet, basename="contact-quick-links")
router.register(r"contact/browse-topics", BrowseTopicViewSet, basename="contact-browse-topics")
router.register(r"contact/info", ContactInfoViewSet, basename="contact-info")
router.register(r"contact/page", ContactPageViewSet, basename="contact-page")

router.register(r"product-details", ProductDetailViewSet, basename="product-detail")
router.register(r"reviews", ReviewViewSet, basename="review")

#consultvet
router.register(r"consultvet/hero", ConsultVetHeroViewSet, basename="consultvet-hero")
router.register(r"consultvet/infobar", ConsultVetInfoBarViewSet, basename="consultvet-infobar")
router.register(r"consultvet/services", ConsultVetServiceViewSet, basename="consultvet-services")
router.register(r"consultvet/highlight", ConsultVetHighlightViewSet, basename="consultvet-highlight")
router.register(r"consultvet/cards", ConsultVetCardViewSet, basename="consultvet-cards")

router.register(r'promos', PromoViewSet, basename='promo')



urlpatterns = [
    path("", include(router.urls)),

    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", CustomTokenObtainPairView.as_view(), name="login"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("cart/", get_cart, name="get_cart"),
    path("cart/add/", add_to_cart, name="add_to_cart"),
    path("cart/update/<int:item_id>/", update_cart_item, name="update_cart_item"),
    path("cart/remove/<int:item_id>/", remove_from_cart, name="remove_from_cart"),

    path("orders/", views.create_order, name="create_order"),
    path("orders/<int:order_id>/", views.order_detail, name="order_detail"),
]
