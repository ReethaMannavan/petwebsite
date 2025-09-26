from django.shortcuts import render

#navbar
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import NavbarSettings
from .serializers import NavbarSettingsSerializer

class NavbarSettingsViewSet(viewsets.ModelViewSet):
    queryset = NavbarSettings.objects.all()
    serializer_class = NavbarSettingsSerializer

    def list(self, request, *args, **kwargs):
        # Return the first settings object, not a list
        obj = self.get_queryset().first()
        if not obj:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(obj, context={"request": request})
        return Response(serializer.data)




#Categories
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Category, Subcategory, Subitem, Product
from .serializers import CategorySerializer, SubcategorySerializer, SubitemSerializer, ProductSerializer

# Categories, Subcategories, Subitems
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class SubcategoryViewSet(viewsets.ModelViewSet):
    queryset = Subcategory.objects.all()
    serializer_class = SubcategorySerializer


class SubitemViewSet(viewsets.ModelViewSet):
    queryset = Subitem.objects.all()
    serializer_class = SubitemSerializer





from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'subcategory', 'subitem']

    def get_queryset(self):
        queryset = super().get_queryset()

        category_id = self.request.query_params.get("category")
        subcategory_id = self.request.query_params.get("subcategory")
        subitem_id = self.request.query_params.get("subitem")

        if subitem_id:
            queryset = queryset.filter(subitem_id=subitem_id)
        elif subcategory_id:
            queryset = queryset.filter(subcategory_id=subcategory_id)
        elif category_id:
            queryset = queryset.filter(
                Q(category_id=category_id)
                | Q(subcategory__category_id=category_id)
                | Q(subitem__subcategory__category_id=category_id)
            )

        return queryset

    # Extra filtering by subitem name (partial match)
    @action(detail=False, methods=['get'])
    def filter_by_subitem_name(self, request):
        subitem_name = request.query_params.get('subitem_name', '')
        queryset = Product.objects.filter(
            Q(subitem__name__icontains=subitem_name) |
            Q(name__icontains=subitem_name)
        )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


# from django.db.models import Q
# from rest_framework import viewsets
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from django_filters.rest_framework import DjangoFilterBackend
# from .models import Product
# from .serializers import ProductSerializer


# class ProductViewSet(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['category', 'subcategory', 'subitem']

#     def get_queryset(self):
#         queryset = super().get_queryset()

#         category_id = self.request.query_params.get("category")
#         subcategory_id = self.request.query_params.get("subcategory")
#         subitem_id = self.request.query_params.get("subitem")

#         if subitem_id:
#             queryset = queryset.filter(subitem_id=subitem_id)
#         elif subcategory_id:
#             queryset = queryset.filter(subcategory_id=subcategory_id)
#         elif category_id:
#             queryset = queryset.filter(
#                 Q(category_id=category_id)
#                 | Q(subcategory__category_id=category_id)
#                 | Q(subitem__subcategory__category_id=category_id)
#             )

#         return queryset

#     # Extra filtering by subitem name (partial match)
#     @action(detail=False, methods=['get'])
#     def filter_by_subitem_name(self, request):
#         subitem_name = request.query_params.get('subitem_name', '')
#         queryset = Product.objects.filter(
#             Q(subitem__name__icontains=subitem_name) |
#             Q(name__icontains=subitem_name)
#         )
#         serializer = self.get_serializer(queryset, many=True)
#         return Response(serializer.data)






from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'subcategory', 'subitem']

    # Keep get_queryset minimal and safe
    def get_queryset(self):
        queryset = super().get_queryset()
        # Only apply filters if params exist
        category_id = self.request.query_params.get("category")
        subcategory_id = self.request.query_params.get("subcategory")
        subitem_id = self.request.query_params.get("subitem")

        if subitem_id:
            queryset = queryset.filter(subitem_id=subitem_id)
        elif subcategory_id:
            queryset = queryset.filter(subcategory_id=subcategory_id)
        elif category_id:
            queryset = queryset.filter(category_id=category_id)

        return queryset





#productdescription
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import ProductDetail, Review
from .serializers import ProductDetailSerializer, ReviewSerializer

# Section 2
class ProductDetailViewSet(viewsets.ModelViewSet):
    queryset = ProductDetail.objects.all()
    serializer_class = ProductDetailSerializer
    permission_classes = [permissions.AllowAny]


# Section 3
from rest_framework.permissions import IsAuthenticated

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]  # <-- Require login

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # user must be logged in



#promo
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Promo
from .serializers import PromoSerializer

class PromoViewSet(viewsets.ViewSet):
    """
    Returns promos linked to a category.
    URL example: /api/promos/?category=4
    """
    def list(self, request):
        category_id = request.GET.get("category")
        if category_id:
            promos = Promo.objects.filter(category_id=category_id)
        else:
            promos = Promo.objects.all()
        serializer = PromoSerializer(promos, many=True)
        return Response(serializer.data)



#herosection
from rest_framework import viewsets
from .models import HeroSection
from .serializers import HeroSectionSerializer

class HeroSectionViewSet(viewsets.ModelViewSet):
    queryset = HeroSection.objects.all().order_by("order")
    serializer_class = HeroSectionSerializer


#homelast3section
from rest_framework import viewsets
from .models import HomepagePromoSection, HomepageDealSection, HomepageServiceCard
from .serializers import HomepagePromoSectionSerializer, HomepageDealSectionSerializer, HomepageServiceCardSerializer

class HomepagePromoSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HomepagePromoSection.objects.all()
    serializer_class = HomepagePromoSectionSerializer

    def get_queryset(self):
        return HomepagePromoSection.objects.all()[:1]  # only one object


class HomepageDealSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HomepageDealSection.objects.all()
    serializer_class = HomepageDealSectionSerializer

    def get_queryset(self):
        return HomepageDealSection.objects.all()[:1]  # only one object


class HomepageServiceCardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HomepageServiceCard.objects.all()
    serializer_class = HomepageServiceCardSerializer



#shopbypet
from rest_framework import viewsets
from .models import ShopByPet
from .serializers import ShopByPetSerializer

class ShopByPetViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ShopByPet.objects.all()
    serializer_class = ShopByPetSerializer



#petbyservicecategory
from rest_framework import viewsets
from .models import PetServiceHero, PetServiceSection, PetServiceSpecial
from .serializers import (
    PetServiceHeroSerializer,
    PetServiceSectionSerializer,
    PetServiceSpecialSerializer
)


class PetServiceHeroViewSet(viewsets.ModelViewSet):
    queryset = PetServiceHero.objects.all()
    serializer_class = PetServiceHeroSerializer


class PetServiceSectionViewSet(viewsets.ModelViewSet):
    queryset = PetServiceSection.objects.all()
    serializer_class = PetServiceSectionSerializer


class PetServiceSpecialViewSet(viewsets.ModelViewSet):
    queryset = PetServiceSpecial.objects.all()
    serializer_class = PetServiceSpecialSerializer




#about
from rest_framework import viewsets
from .models import AboutHero, AboutCard, AboutSplitSection
from .serializers import (
    AboutHeroSerializer,
    AboutCardSerializer,
    AboutSplitSectionSerializer,
)

class AboutHeroViewSet(viewsets.ModelViewSet):
    queryset = AboutHero.objects.all()
    serializer_class = AboutHeroSerializer


class AboutCardViewSet(viewsets.ModelViewSet):
    queryset = AboutCard.objects.all()
    serializer_class = AboutCardSerializer


class AboutSplitSectionViewSet(viewsets.ModelViewSet):
    queryset = AboutSplitSection.objects.all()
    serializer_class = AboutSplitSectionSerializer



#contactpage
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import ContactHeader, QuickLink, BrowseTopic, ContactInfo
from .serializers import (
    ContactHeaderSerializer,
    QuickLinkSerializer,
    BrowseTopicSerializer,
    ContactInfoSerializer,
    ContactPageSerializer,
)

class ContactHeaderViewSet(viewsets.ModelViewSet):
    queryset = ContactHeader.objects.all()
    serializer_class = ContactHeaderSerializer


class QuickLinkViewSet(viewsets.ModelViewSet):
    queryset = QuickLink.objects.all()
    serializer_class = QuickLinkSerializer


class BrowseTopicViewSet(viewsets.ModelViewSet):
    queryset = BrowseTopic.objects.all()
    serializer_class = BrowseTopicSerializer


class ContactInfoViewSet(viewsets.ModelViewSet):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer


# 🔹 Special ViewSet for combined API
class ContactPageViewSet(viewsets.ViewSet):
    @action(detail=False, methods=["get"])
    def all(self, request):
        header = ContactHeader.objects.first()
        quick_links = QuickLink.objects.all()
        browse_topics = BrowseTopic.objects.all()
        contact_info = ContactInfo.objects.first()

        data = {
            "header": ContactHeaderSerializer(header, context={"request": request}).data if header else None,
            "quick_links": QuickLinkSerializer(quick_links, many=True, context={"request": request}).data,
            "browse_topics": BrowseTopicSerializer(browse_topics, many=True, context={"request": request}).data,
            "contact_info": ContactInfoSerializer(contact_info, context={"request": request}).data if contact_info else None,
        }
        return Response(data)




#footer
# petstore/views.py
from django.conf import settings
from django.db import IntegrityError
from django.core.mail import send_mail, BadHeaderError
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from .models import (
    FooterSettings,
    FooterSupportLink,
    FooterPetpaloozaLink,
    FooterSubscriber,
)
from .serializers import (
    FooterSettingsSerializer,
    FooterSupportLinkSerializer,
    FooterPetpaloozaLinkSerializer,
    FooterSubscriberSerializer,
)


class ReadAnyWriteAdminViewSet(viewsets.ModelViewSet):
    """
    Common pattern: safe methods (list/retrieve) => AllowAny,
    unsafe methods => IsAdminUser
    """
    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [p() for p in permission_classes]


class FooterSettingsViewSet(ReadAnyWriteAdminViewSet):
    queryset = FooterSettings.objects.all().order_by("-updated_at")
    serializer_class = FooterSettingsSerializer


class FooterSupportLinkViewSet(ReadAnyWriteAdminViewSet):
    queryset = FooterSupportLink.objects.all().order_by("order")
    serializer_class = FooterSupportLinkSerializer


class FooterPetpaloozaLinkViewSet(ReadAnyWriteAdminViewSet):
    queryset = FooterPetpaloozaLink.objects.all().order_by("order")
    serializer_class = FooterPetpaloozaLinkSerializer


class FooterSubscriberViewSet(viewsets.ModelViewSet):
    """
    - create (subscribe) => allowed to public (AllowAny)
    - list/retrieve/delete/update => admin only
    """
    queryset = FooterSubscriber.objects.all().order_by("-subscribed_at")
    serializer_class = FooterSubscriberSerializer

    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]
        # other actions (list, retrieve, destroy, update) require admin
        return [IsAdminUser()]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            subscriber = serializer.save()
        except IntegrityError:
            return Response(
                {"detail": "This email is already subscribed."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Send confirmation email (if EMAIL settings are configured)
        subject = getattr(settings, "SITE_NAME", "Site") + " - Subscription confirmation"
        message = (
            f"Thanks for subscribing to {getattr(settings, 'SITE_NAME', 'our site')}!\n\n"
            "You'll receive updates and offers to this email. If you did not subscribe, "
            "please ignore this message."
        )
        from_email = getattr(settings, "DEFAULT_FROM_EMAIL", None)
        recipient_list = [subscriber.email]

        if from_email:
            try:
                send_mail(subject, message, from_email, recipient_list, fail_silently=False)
            except BadHeaderError:
                # can't send header injection
                pass
            except Exception:
                # Do not error the API if email fails - still return success to user.
                # Optionally log the exception in production.
                pass

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)



#login
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

# Registration + auto JWT
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        user.is_active = True
        user.save()

        # generate tokens immediately
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email
            },
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }, status=201)

# class CustomTokenObtainPairView(TokenObtainPairView):
#     serializer_class = CustomTokenObtainPairSerializer


# views.py
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CustomTokenObtainPairSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data  # <- validated data contains tokens + user

        # Pull user info from validated_data
        user_info = data.pop("user", {})
        return Response({
            "user": user_info,
            "access": str(data["access"]),
            "refresh": str(data["refresh"])
        }, status=status.HTTP_200_OK)




#consult a vet
from rest_framework import viewsets
from .models import (
    ConsultVetHero,
    ConsultVetInfoBar,
    ConsultVetService,
    ConsultVetHighlight,
    ConsultVetCard,
)
from .serializers import (
    ConsultVetHeroSerializer,
    ConsultVetInfoBarSerializer,
    ConsultVetServiceSerializer,
    ConsultVetHighlightSerializer,
    ConsultVetCardSerializer,
)

class ConsultVetHeroViewSet(viewsets.ModelViewSet):
    queryset = ConsultVetHero.objects.all()
    serializer_class = ConsultVetHeroSerializer

class ConsultVetInfoBarViewSet(viewsets.ModelViewSet):
    queryset = ConsultVetInfoBar.objects.all()
    serializer_class = ConsultVetInfoBarSerializer

class ConsultVetServiceViewSet(viewsets.ModelViewSet):
    queryset = ConsultVetService.objects.all()
    serializer_class = ConsultVetServiceSerializer

class ConsultVetHighlightViewSet(viewsets.ModelViewSet):
    queryset = ConsultVetHighlight.objects.all()
    serializer_class = ConsultVetHighlightSerializer

class ConsultVetCardViewSet(viewsets.ModelViewSet):
    queryset = ConsultVetCard.objects.all()
    serializer_class = ConsultVetCardSerializer



# #cart
# from rest_framework import status
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from .models import Cart, CartItem
# from .models import Product
# from .serializers import CartSerializer

# def get_user_cart(user):
#     cart, created = Cart.objects.get_or_create(user=user)
#     return cart

# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def get_cart(request):
#     cart = get_user_cart(request.user)
#     serializer = CartSerializer(cart)
#     return Response(serializer.data)


# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def add_to_cart(request):
#     product_id = request.data.get("product_id")
#     quantity = int(request.data.get("quantity", 1))

#     try:
#         product = Product.objects.get(id=product_id)
#     except Product.DoesNotExist:
#         return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

#     cart = get_user_cart(request.user)
#     cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
#     if not created:
#         cart_item.quantity += quantity
#     else:
#         cart_item.quantity = quantity
#     cart_item.save()

#     return Response({"message": "Product added to cart"}, status=status.HTTP_200_OK)


# @api_view(["PUT"])
# @permission_classes([IsAuthenticated])
# def update_cart_item(request, item_id):
#     try:
#         cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)
#     except CartItem.DoesNotExist:
#         return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

#     quantity = int(request.data.get("quantity", 1))
#     if quantity <= 0:
#         cart_item.delete()
#         return Response({"message": "Item removed from cart"})
#     else:
#         cart_item.quantity = quantity
#         cart_item.save()

#     return Response({"message": "Cart updated"}, status=status.HTTP_200_OK)


# @api_view(["DELETE"])
# @permission_classes([IsAuthenticated])
# def remove_from_cart(request, item_id):
#     try:
#         cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)
#         cart_item.delete()
#     except CartItem.DoesNotExist:
#         return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

#     return Response({"message": "Item removed"}, status=status.HTTP_200_OK)


#cart
# cart/views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Cart, CartItem, Product
from .serializers import CartSerializer

def get_user_cart(user):
    cart, created = Cart.objects.get_or_create(user=user)
    return cart


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart = get_user_cart(request.user)
    serializer = CartSerializer(cart, context={"request": request})
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get("product_id")
    quantity = int(request.data.get("quantity", 1))

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

    cart = get_user_cart(request.user)
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        cart_item.quantity += quantity
    else:
        cart_item.quantity = quantity
    cart_item.save()

    serializer = CartSerializer(cart, context={"request": request})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_cart_item(request, item_id):
    try:
        cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)
    except CartItem.DoesNotExist:
        return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

    quantity = int(request.data.get("quantity", 1))
    if quantity <= 0:
        cart_item.delete()
    else:
        cart_item.quantity = quantity
        cart_item.save()

    cart = get_user_cart(request.user)
    serializer = CartSerializer(cart, context={"request": request})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, item_id):
    try:
        cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)
        cart_item.delete()
    except CartItem.DoesNotExist:
        return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

    cart = get_user_cart(request.user)
    serializer = CartSerializer(cart, context={"request": request})
    return Response(serializer.data, status=status.HTTP_200_OK)



#checkout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem, Cart, CartItem
from .serializers import OrderSerializer

def get_user_cart(user):
    cart, _ = Cart.objects.get_or_create(user=user)
    return cart

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):
    cart = get_user_cart(request.user)
    if not cart.items.exists():
        return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

    data = request.data
    subtotal = float(cart.subtotal)
    shipping_cost = float(cart.shipping_cost)
    discount = float(data.get("discount", 0))
    total = subtotal + shipping_cost - discount

    # Create Order
    order = Order.objects.create(
        user=request.user,
        first_name=data.get("first_name"),
        last_name=data.get("last_name"),
        email=data.get("email"),
        phone=data.get("phone"),
        address=data.get("address"),
        apartment=data.get("apartment", ""),
        city=data.get("city"),
        state=data.get("state"),
        pincode=data.get("pincode"),
        payment_method=data.get("payment_method"),
        save_info=data.get("save_info", False),
        subscribe=data.get("subscribe", False),
        subtotal=subtotal,
        shipping_cost=shipping_cost,
        discount=discount,
        total=total,
    )

    # Create Order Items
    for item in cart.items.all():
        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price,
            subtotal=item.subtotal,
        )

    # Clear Cart
    cart.items.all().delete()

    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def order_detail(request, order_id):
    try:
        order = Order.objects.get(id=order_id, user=request.user)
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = OrderSerializer(order)
    return Response(serializer.data)
