#navbar
from rest_framework import serializers
from .models import NavbarSettings

class NavbarSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NavbarSettings
        fields = ["navsite_name", "nav_logo", "nav_contact_phone", "nav_contact_email"]


#categories

from .models import Category, Subcategory, Subitem, Product, ProductImage

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']


class SubitemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subitem
        fields = ['id', 'name', 'slug']


class SubcategorySerializer(serializers.ModelSerializer):
    subitems = SubitemSerializer(many=True, read_only=True)

    class Meta:
        model = Subcategory
        fields = ['id', 'name', 'slug', 'subitems']


class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubcategorySerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'subcategories']


class ProductSerializer(serializers.ModelSerializer):
    additional_images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'



#productdescription

from django.contrib.auth.models import User
from .models import ProductDetail, Review

# Section 2
class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetail
        fields = "__all__"


# Section 3
class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Review
        fields = ["id", "product", "user", "user_name", "rating", "review_text", "created_at"]
        read_only_fields = ["user", "created_at"]



#promo
from rest_framework import serializers
from .models import Promo

class PromoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promo
        fields = ['id', 'title', 'description', 'image', 'bg_class', 'category']





#herosection

from .models import HeroSection, HeroSubItem

class HeroSubItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSubItem
        fields = ["id", "image", "text", "shape", "order"]

class HeroSectionSerializer(serializers.ModelSerializer):
    subitems = HeroSubItemSerializer(many=True, read_only=True)

    class Meta:
        model = HeroSection
        fields = [
            "id",
            "title",
            "description",
            "button_text",
            "button_link",
            "main_image",
            "layout_type",
            "order",
            "subitems",
        ]


#homelast3section

from .models import HomepagePromoSection, HomepageDealSection, HomepageServiceCard

class HomepagePromoSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomepagePromoSection
        fields = "__all__"


class HomepageDealSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomepageDealSection
        fields = "__all__"


class HomepageServiceCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomepageServiceCard
        fields = "__all__"


#homeshopbypet

from .models import ShopByPet

class ShopByPetSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopByPet
        fields = ["id", "image", "title", "order"]



#petservicecategory

from .models import (
    PetServiceHero, PetServiceHeroItem,
    PetServiceSection, PetServiceColumn,
    PetServiceSpecial
)


class PetServiceHeroItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetServiceHeroItem
        fields = ["id", "icon", "label"]


class PetServiceHeroSerializer(serializers.ModelSerializer):
    items = PetServiceHeroItemSerializer(many=True, read_only=True)

    class Meta:
        model = PetServiceHero
        fields = ["id", "left_image", "right_image", "logo", "title", "subtitle", "items"]


class PetServiceColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetServiceColumn
        fields = ["id", "title", "description", "image", "button_text", "button_link"]


class PetServiceSectionSerializer(serializers.ModelSerializer):
    columns = PetServiceColumnSerializer(many=True, read_only=True)

    class Meta:
        model = PetServiceSection
        fields = ["id", "title", "description", "customer_service_text", "phone_number", "columns"]


class PetServiceSpecialSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetServiceSpecial
        fields = ["id", "title", "description", "button_text", "button_link"]




#about

from .models import AboutHero, AboutCard, AboutSplitSection

class AboutHeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutHero
        fields = "__all__"


class AboutCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutCard
        fields = "__all__"


class AboutSplitSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSplitSection
        fields = "__all__"



#contactpage

from rest_framework import serializers
from .models import ContactHeader, QuickLink, BrowseTopic, ContactInfo

class ContactHeaderSerializer(serializers.ModelSerializer):
    icon = serializers.ImageField(use_url=True)  # ✅ full URL

    class Meta:
        model = ContactHeader
        fields = "__all__"


class QuickLinkSerializer(serializers.ModelSerializer):
    icon = serializers.ImageField(use_url=True)  # ✅ full URL

    class Meta:
        model = QuickLink
        fields = "__all__"


class BrowseTopicSerializer(serializers.ModelSerializer):
    icon = serializers.ImageField(use_url=True)  # ✅ full URL

    class Meta:
        model = BrowseTopic
        fields = "__all__"


class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = "__all__"


# 🔹 Combined serializer for one-shot API
class ContactPageSerializer(serializers.Serializer):
    header = ContactHeaderSerializer()
    quick_links = QuickLinkSerializer(many=True)
    browse_topics = BrowseTopicSerializer(many=True)
    contact_info = ContactInfoSerializer()












#footer
# petstore/serializers.py

from .models import (
    FooterSettings,
    FooterSupportLink,
    FooterPetpaloozaLink,
    FooterSubscriber,
)


class FooterSettingsSerializer(serializers.ModelSerializer):
    footer_logo = serializers.ImageField(use_url=True, required=False, allow_null=True)

    class Meta:
        model = FooterSettings
        fields = [
            "id",
            "footer_logo",
            "footer_text",
            "facebook",
            "instagram",
            "youtube",
            "whatsapp",
            "updated_at",
        ]
        read_only_fields = ["id", "updated_at"]


class FooterSupportLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterSupportLink
        fields = ["id", "title", "url", "order"]
        read_only_fields = ["id"]


class FooterPetpaloozaLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterPetpaloozaLink
        fields = ["id", "title", "url", "order"]
        read_only_fields = ["id"]


class FooterSubscriberSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = FooterSubscriber
        fields = ["id", "email", "subscribed_at"]
        read_only_fields = ["id", "subscribed_at"]

    def validate_email(self, value):
        # If your model has unique=True on email, the serializer will already enforce uniqueness,
        # but we can add a clearer validation message:
        if FooterSubscriber.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("This email is already subscribed.")
        return value



#login
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6, style={'input_type':'password'})
    password2 = serializers.CharField(write_only=True, style={'input_type':'password'})
    phone = serializers.CharField(required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "password", "password2", "phone", "address")

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password2": "Passwords do not match"})
        if User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError({"email": "Email already exists"})
        return attrs

    def create(self, validated_data):
        phone = validated_data.pop("phone", "")
        address = validated_data.pop("address", "")
        email = validated_data["email"]
        

        user = User(
            username=email,
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=email,
            is_active=True
        )
        user.set_password(validated_data["password"])
        user.save()

        profile = user.profile
        profile.phone = phone
        profile.address = address
        profile.save()
        return user
    


    

# JWT serializer for login


# from django.contrib.auth import authenticate
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
#     username_field = "email"

#     def validate(self, attrs):
#         # Authenticate using email
#         email = attrs.get("email")
#         password = attrs.get("password")

#         user = authenticate(username=email, password=password)
#         if not user:
#             raise serializers.ValidationError("No active account found with the given credentials")
#         if not user.is_active:
#             raise serializers.ValidationError("User account is not active")

#         data = super().validate({"username": user.username, "password": password})
#         # Add extra user info
#         data["user"] = {
#             "email": user.email,
#             "first_name": user.first_name,
#             "last_name": user.last_name,
#         }
#         return data
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from rest_framework import serializers

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = "email"

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = authenticate(username=email, password=password)
        if not user:
            raise serializers.ValidationError("No active account found with the given credentials")
        if not user.is_active:
            raise serializers.ValidationError("User account is not active")

        # Return tokens without calling super().validate
        from rest_framework_simplejwt.tokens import RefreshToken
        refresh = RefreshToken.for_user(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            }
        }




#consult a vet
from rest_framework import serializers
from .models import (
    ConsultVetHero,
    ConsultVetInfoBar,
    ConsultVetService,
    ConsultVetHighlight,
    ConsultVetCard,
)

class ConsultVetHeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultVetHero
        fields = "__all__"

class ConsultVetInfoBarSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultVetInfoBar
        fields = "__all__"

class ConsultVetServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultVetService
        fields = "__all__"

class ConsultVetHighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultVetHighlight
        fields = "__all__"

class ConsultVetCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultVetCard
        fields = "__all__"



# #cart
# from rest_framework import serializers
# from .models import Cart, CartItem
# from .models import Product

# class ProductMiniSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = ["id", "name", "price", "image"]


# class CartItemSerializer(serializers.ModelSerializer):
#     product = ProductMiniSerializer(read_only=True)
#     subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

#     class Meta:
#         model = CartItem
#         fields = ["id", "product", "quantity", "subtotal"]


# class CartSerializer(serializers.ModelSerializer):
#     items = CartItemSerializer(many=True, read_only=True)
#     subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
#     shipping_cost = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
#     total = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

#     class Meta:
#         model = Cart
#         fields = ["id", "items", "subtotal", "shipping_cost", "total"]


#cart

from rest_framework import serializers
from .models import Cart, CartItem, Product

class ProductMiniSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", "name", "price", "image"]

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductMiniSerializer(read_only=True)
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity", "subtotal"]


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    shipping_cost = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    total = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Cart
        fields = ["id", "items", "subtotal", "shipping_cost", "total"]



#checkout
from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["product", "quantity", "price", "subtotal"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "user",
            "first_name",
            "last_name",
            "email",
            "phone",
            "address",
            "apartment",
            "city",
            "state",
            "pincode",
            "payment_method",
            "save_info",
            "subscribe",
            "subtotal",
            "shipping_cost",
            "discount",
            "total",
            "items",
            "created_at",
        ]
